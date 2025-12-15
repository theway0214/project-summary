import { useState, useRef, useEffect, type KeyboardEvent } from 'react'
import { Input } from 'antd'
import {
  RobotOutlined,
  CloseOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './index.css'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

const { TextArea } = Input

function AiAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  const simulateAiResponse = async (userMessage: string): Promise<string> => {
    // 模拟 AI 响应延迟
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    // 简单的模拟回复逻辑
    const responses = [
      `我收到了你的消息："${userMessage}"。作为 AI 助手，我很乐意帮助你解答问题。`,
      `关于"${userMessage}"，这是一个很好的问题。让我为你分析一下...`,
      `感谢你的提问！针对"${userMessage}"，我建议你可以从以下几个方面考虑...`,
      `好的，关于${userMessage}，这里有一些建议供你参考。`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: inputValue.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const aiResponse = await simulateAiResponse(userMessage.content)
      const aiMessage: Message = {
        id: generateId(),
        role: 'ai',
        content: aiResponse,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch {
      const errorMessage: Message = {
        id: generateId(),
        role: 'ai',
        content: '抱歉，我遇到了一些问题，请稍后再试。',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <button className="ai-agent-trigger" onClick={togglePanel} title="智能问答">
        <RobotOutlined />
      </button>

      {/* 对话面板 */}
      {isOpen && (
        <div className="ai-agent-panel">
          {/* 头部 */}
          <div className="ai-agent-header">
            <div className="ai-agent-header-title">
              <RobotOutlined />
              <span>智能问答助手</span>
            </div>
            <button className="ai-agent-close" onClick={togglePanel}>
              <CloseOutlined />
            </button>
          </div>

          {/* 消息列表 */}
          <div className="ai-agent-messages">
            {messages.length === 0 ? (
              <div className="ai-agent-welcome">
                <div className="ai-agent-welcome-icon">
                  <RobotOutlined />
                </div>
                <div className="ai-agent-welcome-title">你好！我是智能助手</div>
                <div className="ai-agent-welcome-desc">有什么我可以帮助你的吗？</div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`ai-agent-message ai-agent-message-${message.role}`}
                >
                  <div className="ai-agent-avatar">
                    {message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                  </div>
                  <div className="ai-agent-bubble">{message.content}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="ai-agent-message ai-agent-message-ai">
                <div className="ai-agent-avatar">
                  <RobotOutlined />
                </div>
                <div className="ai-agent-bubble">
                  <div className="ai-agent-typing">
                    <span className="ai-agent-typing-dot"></span>
                    <span className="ai-agent-typing-dot"></span>
                    <span className="ai-agent-typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="ai-agent-input-area">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入你的问题..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              disabled={isLoading}
            />
            <button
              className="ai-agent-send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
            >
              <SendOutlined />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AiAgent
