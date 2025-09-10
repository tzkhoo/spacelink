import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, X, Loader2, Shuffle } from 'lucide-react';

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
  const [currentSuggestions, setCurrentSuggestions] = useState<[string, string]>(['Overview', 'Target Market']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // SpaceLink prompts with labels and full questions
  const spaceLinkPrompts = [
    { label: 'Overview', question: 'What is the core idea behind SpaceLink?' },
    { label: 'Target Market', question: 'Who is the target audience for SpaceLink?' },
    { label: 'Business Model', question: 'How does SpaceLink make money?' },
    { label: 'Market Demand', question: 'Why is there a need for this service in Hong Kong?' },
    { label: 'Key Features', question: 'What are the key features of the SpaceLink platform?' },
    { label: 'User Experience', question: 'How does SpaceLink improve the user experience compared to traditional storage?' },
    { label: 'Technology', question: 'What technologies are used in the SpaceLink platform?' },
    { label: 'AI Integration', question: 'How is AI integrated into the SpaceLink service?' },
    { label: 'Insurance', question: 'Does SpaceLink offer insurance?' },
    { label: 'Pricing', question: 'How is pricing determined for storage?' },
    { label: 'Support', question: 'What support services are available for SpaceLink users?' },
    { label: 'Partnerships', question: 'Does SpaceLink have any strategic partnerships?' },
    { label: 'Competition', question: 'How does SpaceLink differ from its competitors?' },
    { label: 'Risk Management', question: 'How does SpaceLink mitigate potential risks?' },
    { label: 'Compliance', question: 'How does SpaceLink ensure compliance with regulations?' },
    { label: 'Marketing', question: 'What is SpaceLink\'s marketing approach?' },
    { label: 'Revenue Model', question: 'What is the revenue model for SpaceLink?' },
    { label: 'Market Size', question: 'What is the projected market size for SpaceLink?' },
    { label: 'Expansion', question: 'Are there any plans to expand outside Hong Kong?' },
    { label: 'Sustainability', question: 'Does SpaceLink have a sustainability plan?' }
  ];

  const getRandomSuggestions = () => {
    const shuffled = [...spaceLinkPrompts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    return [selected[0].label, selected[1].label] as [string, string];
  };

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

    try {
      // Send to webhook
      const response = await fetch('https://wonder6.app.n8n.cloud/webhook/ad30832c-1f6b-4293-8eec-85490817e62d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          timestamp: new Date().toISOString(),
          userId: 'user_' + Date.now() // Generate a simple user ID
        }),
      });

      let botResponseContent = '';
      if (response.ok) {
        const responseData = await response.text();
        try {
          // Parse JSON response and extract the "response" field
          const parsedResponse = JSON.parse(responseData);
          botResponseContent = parsedResponse.response || responseData || getBotResponse(content);
        } catch (parseError) {
          // If parsing fails, use the raw response or fallback
          botResponseContent = responseData || getBotResponse(content);
        }
      } else {
        botResponseContent = getBotResponse(content);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponseContent,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      // Fallback to local response if webhook fails
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
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

  const handleSuggestedPrompt = (label: string) => {
    const prompt = spaceLinkPrompts.find(p => p.label === label);
    if (prompt) {
      setInputMessage(prompt.question);
    }
  };

  const randomizeSuggestions = () => {
    setCurrentSuggestions(getRandomSuggestions());
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

          {/* Suggested Prompts */}
          <div className="px-4 pb-2">
            <div className="text-xs text-muted-foreground mb-2 flex items-center justify-between">
              <span>Suggested Prompts:</span>
              <Button
                onClick={randomizeSuggestions}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-white/20 rounded-full"
                title="Randomize suggestions"
              >
                <Shuffle className="h-3 w-3" strokeWidth={1.5} />
              </Button>
            </div>
            <div className="flex gap-2">
              {currentSuggestions.map((label, index) => (
                <Badge
                  key={`${label}-${index}`}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth text-xs rounded-lg flex-1 justify-center py-1.5 border-primary/20 hover:border-primary"
                  onClick={() => handleSuggestedPrompt(label)}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>

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