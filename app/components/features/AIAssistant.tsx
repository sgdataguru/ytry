'use client';

/**
 * @file AIAssistant.tsx
 * @description Feature 08 - Ask Better Questions (AI Assistant)
 * Global floating AI chat assistant with context-aware responses
 */

import { useState, useRef, useEffect } from 'react';
import { cn, formatRelativeTime } from '@/app/lib/utils';
import { Button } from '@/app/components/ui/Button';
import type { Message, FollowUpQuestion } from '@/app/types';

interface AIAssistantProps {
  initialOpen?: boolean;
}

const suggestedQuestions = [
  'What are my top priorities today?',
  'Show me deals that need attention',
  'What experiments should I run?',
  'Summarize pipeline health',
  'What decisions are pending?',
];

const mockResponses: Record<string, { text: string; followUps: string[] }> = {
  default: {
    text: "I'm your AI assistant. I can help you with insights, recommendations, and analysis. What would you like to know?",
    followUps: [
      'What are my priorities?',
      'Show pipeline summary',
      'Any urgent decisions?',
    ],
  },
  priorities: {
    text: "Based on your current data, here are your top 3 priorities:\n\n1. **Critical Decision**: Budget approval for Q2 marketing campaign is overdue by 2 days\n2. **Pipeline Risk**: TechCorp deal momentum is slowing - recommend immediate follow-up\n3. **Experiment Ready**: Homepage CTA test has reached significance - review results",
    followUps: [
      'Tell me more about the TechCorp deal',
      'Show experiment results',
      'Help me decide on the budget',
    ],
  },
  pipeline: {
    text: "**Pipeline Health Summary**:\n\n📊 Total Value: $4.2M\n✅ Weighted Value: $2.1M\n📈 Win Rate: 68%\n\n**Attention Needed**:\n- 2 deals showing slowing momentum\n- 1 deal stalled for 10+ days\n\nOverall pipeline health is good, but I recommend focusing on the stalled deals.",
    followUps: [
      'Which deals are stalled?',
      'How can I improve win rate?',
      'Forecast for this quarter',
    ],
  },
};

export function AIAssistant({ initialOpen = false }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: mockResponses.default.text,
      timestamp: new Date(),
      followUpQuestions: mockResponses.default.followUps.map((q, i) => ({
        id: `fu-${i}`,
        question: q,
      })),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getAIResponse = (query: string): { text: string; followUps: string[] } => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('priorit') || lowerQuery.includes('today')) {
      return mockResponses.priorities;
    }
    if (
      lowerQuery.includes('pipeline') ||
      lowerQuery.includes('deal') ||
      lowerQuery.includes('sales')
    ) {
      return mockResponses.pipeline;
    }
    return {
      text: `I understand you're asking about "${query}". Let me analyze the relevant data...\n\nBased on your current context, I'd recommend focusing on high-impact items first. Would you like me to provide specific recommendations?`,
      followUps: [
        'Show me the data',
        'What are the risks?',
        'Generate a report',
      ],
    };
  };

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = getAIResponse(message);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.text,
      timestamp: new Date(),
      followUpQuestions: response.followUps.map((q, i) => ({
        id: `fu-${Date.now()}-${i}`,
        question: q,
      })),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleFollowUp = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--ps-orange)] text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center z-40',
          isOpen && 'hidden'
        )}
      >
        <span className="text-2xl">🤖</span>
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed bottom-6 right-6 w-[420px] h-[600px] bg-[var(--bg-primary)] rounded-2xl shadow-2xl border border-[var(--border-primary)] flex flex-col z-50 transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-primary)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--ps-orange)] flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">AI Assistant</h3>
              <p className="text-xs text-[var(--ps-success)] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[var(--ps-success)] animate-pulse" />
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-2"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl p-4',
                  message.role === 'user'
                    ? 'bg-[var(--ps-orange)] text-white rounded-br-md'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-bl-md'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={cn(
                    'text-xs mt-2',
                    message.role === 'user'
                      ? 'text-white/70'
                      : 'text-[var(--text-muted)]'
                  )}
                >
                  {formatRelativeTime(message.timestamp)}
                </p>

                {/* Follow-up Questions */}
                {message.role === 'assistant' &&
                  message.followUpQuestions &&
                  message.followUpQuestions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-primary)] space-y-2">
                      <p className="text-xs text-[var(--text-muted)]">
                        Suggested follow-ups:
                      </p>
                      {message.followUpQuestions.map((fq) => (
                        <button
                          key={fq.id}
                          onClick={() => handleFollowUp(fq.question)}
                          className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] text-[var(--ps-orange)] transition-colors"
                        >
                          {fq.question}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[var(--bg-secondary)] rounded-2xl rounded-bl-md p-4">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions (when empty) */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-[var(--text-muted)] mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-[var(--border-primary)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm focus:border-[var(--ps-orange)] focus:ring-2 focus:ring-[rgba(255,89,0,0.2)] outline-none transition-all"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 rounded-xl"
            >
              ↑
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
