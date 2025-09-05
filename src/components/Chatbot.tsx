import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen = false, onClose }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    t('chat.quickReply.nearestSpaces'),
    t('chat.quickReply.insurance')
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        content: t('chat.welcome'),
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, t, messages.length]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('24') || msg.includes('nearest')) {
      return 'I found 12 storage spaces with 24/7 access within 2km of your location. The closest one is in Kwun Tong at HK$150/day with excellent security features.';
    }
    
    if (msg.includes('insurance')) {
      return 'Our comprehensive insurance covers up to HK$50,000 per item. Coverage includes theft, fire, water damage, and natural disasters. Premium starts from HK$15/month.';
    }
    
    if (msg.includes('price') || msg.includes('cost')) {
      return 'Storage prices in Hong Kong typically range from HK$80-300 per day depending on location, size, and features. Central areas are more expensive, while New Territories offer better value.';
    }
    
    if (msg.includes('secure') || msg.includes('safe')) {
      return 'All our verified hosts meet strict security standards including CCTV monitoring, secure access systems, and background checks. Look for the blue security badge on listings.';
    }
    
    return 'Thank you for your question! Our team is here to help you find the perfect storage solution. Would you like me to search for spaces in a specific area?';
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[340px] h-[500px] glass-card rounded-2xl flex flex-col z-50 transition-spring animate-scale-in md:bottom-6 md:right-6">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-glass-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Storage Assistant</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-white/20 rounded-full"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground ml-4'
                      : 'glass-surface border border-glass-border mr-4'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-surface border border-glass-border p-3 rounded-2xl mr-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth text-xs rounded-lg"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t('chat.placeholder')}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                className="glass-surface border-glass-border rounded-xl text-sm"
                disabled={isTyping}
              />
              <Button
                onClick={() => sendMessage(inputMessage)}
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 p-0 rounded-xl"
              >
                {isTyping ? (
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                ) : (
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};