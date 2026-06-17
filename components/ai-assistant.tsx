"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

const quickQuestions = [
  "What services do you offer?",
  "How does the borderless model work?",
  "Tell me about your tech stack.",
  "How do we start a project?"
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onError: (err) => {
      console.error('Chat error:', err)
    },
  })

  // The SDK starts in `ready`; only request-in-flight states should show loading.
  const isLoading = status === 'submitted' || status === 'streaming'
  const showError = Boolean(error && (messages.length > 0 || inputText.length > 0))
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isLoading])

  // Handle immediate form submit
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const text = inputText.trim()
    if (!text) return
    setInputText('') // Clear input instantly for snappy user experience
    sendMessage({ text })
  }

  // Handle clicking a quick question
  const handleQuickQuestionClick = (question: string) => {
    sendMessage({ text: question })
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_4px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-primary/40 transition-shadow group border border-primary/20"
          >
            <Sparkles className="w-5 h-5 absolute group-hover:opacity-0 transition-opacity" />
            <MessageCircle className="w-5 h-5 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] md:w-[420px] h-[620px] max-h-[calc(100vh-3rem)] bg-card/90 backdrop-blur-xl border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/60 bg-background/40 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[12px] font-bold text-foreground uppercase tracking-[0.15em] font-sans">BuildBlock AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[9px] text-muted-foreground uppercase tracking-[0.1em]">SYSTEM ONLINE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-foreground/5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-border bg-gradient-to-b from-transparent to-background/20">
              {messages.length === 0 && !isLoading && (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5 border border-primary/20">
                    <Bot className="w-5 h-5" />
                  </div>
                  <p className="text-[15px] text-foreground font-serif italic max-w-[280px] leading-relaxed">
                    "I am the BuildBlock AI. How can I help you forge your digital presence?"
                  </p>
                  
                  {/* Quick Questions Starter Grid */}
                  <div className="mt-8 w-full max-w-sm space-y-2.5">
                    <p className="text-technical text-[9px] text-muted-foreground uppercase tracking-[0.15em] mb-4">SUGGESTED ENQUIRIES</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestionClick(q)}
                          className="w-full text-left px-4 py-3 bg-secondary/40 hover:bg-secondary border border-border/40 hover:border-primary/30 rounded-xl text-technical text-[10px] text-muted-foreground hover:text-foreground transition-all duration-300 pointer-events-auto"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Message History Bubble List */}
              <div className="space-y-6">
                {messages.map((m) => {
                  const textParts = m.parts
                    .filter((part) => part.type === 'text' || part.type === 'reasoning')
                    .map((part) => part.text)
                    .join(' ')

                  const isUser = m.role === 'user'

                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Avatar */}
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 self-start mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[78%] p-4 text-[13px] leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? 'bg-foreground text-background rounded-2xl rounded-tr-none font-sans font-medium shadow-md'
                            : 'bg-secondary/60 text-foreground rounded-2xl rounded-tl-none border border-border/40 font-serif italic shadow-sm'
                        }`}
                      >
                        {textParts || ' '}
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center text-foreground shrink-0 self-start mt-0.5">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </motion.div>
                  )
                })}

                {/* Animated Typing Loader bubble */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 self-start mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-secondary/60 text-foreground rounded-2xl rounded-tl-none border border-border/40 p-4 flex gap-1.5 items-center shadow-sm">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  </motion.div>
                )}

                {showError && (
                  <div className="flex justify-center">
                    <div className="bg-destructive/10 text-destructive text-[11px] px-4 py-2.5 rounded-xl border border-destructive/20 max-w-[85%] text-center font-sans tracking-wide">
                      Connection interrupted. Check network and try again.
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleFormSubmit}
              className="p-5 border-t border-border/60 bg-background/50 backdrop-blur-md z-10"
            >
              <div className="relative flex items-center">
                <input
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder="Ask BuildBlock AI..."
                  className="w-full bg-secondary/50 border border-border/60 rounded-xl py-3.5 pl-4 pr-12 text-[12px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/80 focus:bg-secondary/80 focus:shadow-[0_0_15px_rgba(var(--primary-rgb),0.05)] transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2 w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 border border-primary/20 shadow-sm shadow-primary/10"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
