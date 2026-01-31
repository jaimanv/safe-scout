import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles, User, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const sampleResponses: Record<string, string> = {
  'safe': "Based on current data, this area has a safety score of 82/100. It's generally safe during daytime (6 AM - 10 PM). I'd recommend avoiding poorly lit areas after 11 PM on weekends.",
  'route': "For the safest route, I recommend taking MG Road → 100 Feet Road → Destination. This path has better lighting and higher foot traffic. Avoid the back alleys near the market after dark.",
  'risk': "This area shows elevated risk primarily due to:\n\n• 📈 15% increase in theft incidents on weekends\n• 🌙 Most incidents occur between 10 PM - 2 AM\n• 📍 Hotspots near ATMs and parking lots\n\nConsider traveling with others after 9 PM.",
  'time': "Based on crime patterns:\n\n🟢 **Safest**: 8 AM - 6 PM\n🟡 **Moderate**: 6 PM - 10 PM  \n🔴 **Higher Risk**: 10 PM - 4 AM\n\nWeekday evenings are safer than weekends.",
  'default': "I can help you with:\n\n• Area safety assessments\n• Safest travel times\n• Route recommendations\n• Crime trend explanations\n• Nearest police stations\n\nWhat would you like to know?"
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('safe') && (lower.includes('go') || lower.includes('travel') || lower.includes('visit'))) {
    return sampleResponses['safe'];
  }
  if (lower.includes('route') || lower.includes('way') || lower.includes('path')) {
    return sampleResponses['route'];
  }
  if (lower.includes('risk') || lower.includes('why') || lower.includes('high')) {
    return sampleResponses['risk'];
  }
  if (lower.includes('time') || lower.includes('when') || lower.includes('avoid')) {
    return sampleResponses['time'];
  }
  return sampleResponses['default'];
};

export function SafetyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm your Safety Assistant. I can help you understand area safety, find safe routes, and explain crime patterns. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    "Is it safe to go out tonight?",
    "What's the safest route?",
    "Why is this area high risk?",
    "When should I avoid this area?",
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary shadow-lg shadow-primary/30 hover:scale-105 transition-transform z-50"
        size="icon"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        'fixed z-50 glass border border-border shadow-xl transition-all duration-300',
        isMinimized
          ? 'bottom-6 right-6 w-72 h-14 rounded-2xl'
          : 'bottom-6 right-6 w-[380px] h-[600px] rounded-2xl sm:w-96'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Safety Assistant</h4>
            {!isMinimized && (
              <p className="text-xs text-muted-foreground">Ask about area safety</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' && 'flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    message.role === 'user'
                      ? 'bg-primary/10'
                      : 'gradient-primary'
                  )}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(action)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-accent text-foreground transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/50 backdrop-blur-sm rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about safety..."
                className="flex-1 bg-muted/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl gradient-primary"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
