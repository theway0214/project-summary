/**
 * PC 端通用 Form 组件（React 版）
 * 基于 antd Form，支持通过配置快速生成表单
 */
import type { ForwardRefRenderFunction } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Form, Row, Col, Input, Select, Switch, Cascader, DatePicker } from 'antd'
import type { SelectProps } from 'antd'
import type { FormInstance } from 'antd/es/form'
import dayjs from 'dayjs'

import {
  datePickerDefaultConfig,
  dateRangeDefaultConfig,
  formDefaultConfig,
  selectDefaultConfig,
} from './formDefaultConfig'
import { FormColumnTypeEnum, type FormColumnType, type FormConfigType } from './types'
import './index.css'

const { RangePicker } = DatePicker
const { TextArea } = Input

export interface PCFormProps<TData extends Record<string, unknown> = Record<string, unknown>> {
  config?: FormConfigType
  columns: FormColumnType[]
  data: TData
  onDataChange?: (data: TData) => void
  onChange?: (key?: string) => void
}

export interface PCFormRef {
  formValidFn: () => Promise<unknown>
  clearValidFn: () => void
  formInstance: FormInstance
}

const cascaderFieldNames = {
  children: 'items',
  label: 'name',
  value: 'id',
}

const selectFieldNames = {
  options: 'options',
  label: 'label',
  value: 'value',
}

const filterOption: SelectProps['filterOption'] = (input, option) => {
  const value = option?.value
  if (value === undefined || value === null) return false
  return String(value).toLowerCase().includes(input.toLowerCase())
}

const PCFormInner: ForwardRefRenderFunction<PCFormRef, PCFormProps> = (
  { config, columns, data, onDataChange, onChange },
  ref,
) => {
  const [form] = Form.useForm()
  const [internalColumns, setInternalColumns] = useState<FormColumnType[]>(columns)
  const [internalData, setInternalData] = useState<Record<string, unknown>>(data ?? {})

  const mergedConfig: FormConfigType = {
    ...formDefaultConfig,
    ...(config || {}),
  }

  // 同步外部 data
  useEffect(() => {
    const nextData = data ?? {}
    setInternalData(nextData)
    form.setFieldsValue(nextData)
  }, [data, form])

  // 同步外部 columns
  useEffect(() => {
    setInternalColumns(columns)
  }, [columns])

  const changeValueEvent = (key?: string) => {
    const values = form.getFieldsValue()
    setInternalData(values)
    onDataChange?.(values)
    onChange?.(key)
  }

  const pickerChange = (item: FormColumnType) => {
    const value = form.getFieldValue(item.field)
    if (item.beginWidth && value) {
      const ts = +value
      const start = String(dayjs(ts).startOf('day').valueOf())
      const end = String(dayjs(ts).endOf('day').valueOf())
      const finalValue = item.beginWidth === 'start' ? start : end
      form.setFieldsValue({ [item.field]: finalValue })
    }
    changeValueEvent(item.field)
  }

  const pickerRangeChange = (item: FormColumnType) => {
    const value = form.getFieldValue(item.field)
    if (value && Array.isArray(value) && value.length === 2) {
      const start = String(dayjs(+value[0]).startOf('day').valueOf())
      const end = String(dayjs(+value[1]).endOf('day').valueOf())
      const next = [start, end]
      form.setFieldsValue({ [item.field]: next })
    }
    changeValueEvent(item.field)
  }

  useImperativeHandle(ref, () => ({
    formValidFn: () => form.validateFields(),
    clearValidFn: () => form.resetFields(),
    formInstance: form,
  }))

  return (
    <Form
      form={form}
      {...mergedConfig}
      initialValues={internalData}
    >
      <Row {...mergedConfig.row} className="items-start">
        {internalColumns.map((item, index) => {
          if (item?.hidden) return null

          const colProps = item.span ?? { ...(mergedConfig.col || {}), ...(item.col || {}) }

          return (
            <Col key={index} {...colProps}>
              <Form.Item
                label={item.label}
                name={item.name ?? item.field}
                rules={item.rules}
                className={[
                  !mergedConfig.hasValidator ? 'hasNotValidatorClass' : '',
                  mergedConfig.isEmbedded ? 'isEmbeddedClass' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <>
                  {mergedConfig.isEmbedded && <span>{item.label}：</span>}

                  {item.type === FormColumnTypeEnum.INPUT && (
                    <Input
                      {...item}
                      readOnly={item.readonly}
                      allowClear
                      onChange={() => changeValueEvent()}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.NUMBER && (
                    <Input
                      {...item}
                      type="number"
                      allowClear
                      onChange={() => changeValueEvent()}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.SELECT && (
                    <Select
                      {...selectDefaultConfig}
                      {...item}
                      options={item.options}
                      optionFilterProp="label"
                      onChange={() => changeValueEvent()}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.SEARCH_SELECT && (
                    <Select
                      {...selectDefaultConfig}
                      {...item}
                      options={item.options}
                      optionFilterProp="label"
                      fieldNames={item.fieldNames || selectFieldNames}
                      filterOption={filterOption}
                      onChange={() => changeValueEvent(item.field)}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.SWITCH && (
                    <Switch
                      checked={Boolean(internalData?.[item.field])}
                      onChange={() => changeValueEvent(item.field)}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.TEXTAREA && (
                    <TextArea
                      {...item}
                      rows={4}
                      maxLength={item.max ?? 1000}
                      showCount
                      onChange={() => changeValueEvent()}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.CASCADER && (
                    <Cascader
                      {...item}
                      options={item.options}
                      fieldNames={cascaderFieldNames}
                      onChange={() => changeValueEvent()}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.DATE_RANGE && (
                    <RangePicker
                      {...dateRangeDefaultConfig}
                      {...item}
                      onChange={() => pickerRangeChange(item)}
                    />
                  )}

                  {item.type === FormColumnTypeEnum.DATE && (
                    <DatePicker
                      {...datePickerDefaultConfig}
                      {...item}
                      onChange={() => pickerChange(item)}
                    />
                  )}
                </>
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    </Form>
  )
}

const PCForm = forwardRef<PCFormRef, PCFormProps>(PCFormInner)

export default PCForm


