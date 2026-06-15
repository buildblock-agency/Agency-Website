"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState('')
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    onError: (err) => {
      console.error('Chat error:', err)
    },
  })

  const isLoading = status === 'streaming'
  const showError = Boolean(error && (messages.length > 0 || inputText.length > 0))
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isLoading])

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
            className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-primary/20 transition-shadow group"
          >
            <Sparkles className="w-6 h-6 absolute group-hover:opacity-0 transition-opacity" />
            <MessageCircle className="w-6 h-6 absolute opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="fixed bottom-6 right-6 z-[100] w-[calc(100vw-3rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-3rem)] bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-foreground uppercase tracking-widest">BuildBlock AI</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.length === 0 && !isLoading && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <Sparkles className="w-8 h-8 text-primary mb-4" />
                  <p className="text-[12px] text-muted-foreground font-serif italic max-w-[200px]">
                    I am the BuildBlock AI. How can I help you forge your digital presence?
                  </p>
                </div>
              )}
              {messages.map((m) => {
                const textParts = m.parts
                  .filter((part) => part.type === 'text' || part.type === 'reasoning')
                  .map((part) => part.text)
                  .join(' ')

                return (
                  <div
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 text-[13px] leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-foreground text-background rounded-l-2xl rounded-tr-2xl'
                          : 'bg-secondary text-foreground rounded-r-2xl rounded-tl-2xl border border-border font-serif italic'
                      }`}
                    >
                      {textParts || ' '}
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className="flex flex-col gap-2">
                  <div className="px-3 py-2 rounded-full bg-primary/10 text-primary text-[11px] uppercase tracking-[0.14em] font-semibold text-center">
                    BuildBlock AI is typing...
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary text-foreground rounded-r-2xl rounded-tl-2xl border border-border p-4 flex gap-1 items-center">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              )}
              {showError && (
                <div className="flex justify-center">
                  <div className="bg-destructive/10 text-destructive text-[11px] px-4 py-2 rounded-lg border border-destructive/20 max-w-[85%] text-center">
                    Connection Error. Please try again.
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={async (event) => {
                event.preventDefault()
                if (!inputText.trim()) return
                await sendMessage({ text: inputText.trim() })
                setInputText('')
              }}
              className="p-4 border-t border-border bg-background"
            >
              <div className="relative flex items-center">
                <input
                  value={inputText}
                  onChange={(event) => setInputText(event.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-secondary border border-border rounded-full py-3 pl-4 pr-12 text-[13px] text-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <Send className="w-3 h-3 translate-x-[1px]" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
