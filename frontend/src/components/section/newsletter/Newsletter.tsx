'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Zap,
  Brain,
  Sparkles,
  Wand2,
  Bot,
  Cpu,
  Lightbulb,
  Camera,
  Palette,
  Code,
  Music,
  FileText
} from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  const toolIcons = [
    { Icon: Brain, color: 'text-purple-400', size: 'w-8 h-8' },
    { Icon: Sparkles, color: 'text-pink-400', size: 'w-6 h-6' },
    { Icon: Wand2, color: 'text-blue-400', size: 'w-7 h-7' },
    { Icon: Bot, color: 'text-green-400', size: 'w-8 h-8' },
    { Icon: Cpu, color: 'text-orange-400', size: 'w-6 h-6' },
    { Icon: Lightbulb, color: 'text-yellow-400', size: 'w-7 h-7' },
    { Icon: Camera, color: 'text-indigo-400', size: 'w-6 h-6' },
    { Icon: Palette, color: 'text-red-400', size: 'w-7 h-7' },
    { Icon: Code, color: 'text-cyan-400', size: 'w-6 h-6' },
    { Icon: Music, color: 'text-emerald-400', size: 'w-7 h-7' },
    { Icon: FileText, color: 'text-violet-400', size: 'w-6 h-6' },
    { Icon: Zap, color: 'text-amber-400', size: 'w-8 h-8' }
  ];

  return (
    <div className="w-full mx-auto bg-gradient-to-r from-background via-purple-950 to-background rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative flex flex-col xl:flex-row items-center justify-between p-8 lg:p-12">

        {/* Background Blurs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-4 left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500 rounded-full blur-xl"></div>
        </div>

        {/* Icon Grid */}
        <div className="relative flex-1 max-w-md mb-8 xl:mb-0">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {toolIcons.map(({ Icon, color, size }, index) => (
              <div
                key={index}
                className={`flex items-center justify-center p-3 rounded-xl bg-muted/60 backdrop-blur-sm border border-border hover:bg-muted transition-all duration-300 hover:scale-110 hover:rotate-3 ${index % 3 === 0 ? 'animate-pulse' : ''}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '2s'
                }}
              >
                <Icon className={`${size} ${color} drop-shadow`} />
              </div>
            ))}
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              FIND THE ONLY{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI TOOLS
              </span>
            </h2>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              YOU NEED{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TO KNOW
              </span>
            </h3>
          </div>
        </div>

        {/* Newsletter Form */}
        <div className="flex-1 max-w-md ml-8">
          <div className="space-y-6">
            <p className="text-foreground text-lg font-medium">
              Be part of our Newsletter to get exclusive content and get{' '}
              <span className="text-blue-400 font-bold">100+ free AI tools</span>{' '}
              to help increase your productivity today!
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-muted border-border text-foreground placeholder-muted-foreground"
                />
                <Button
                  onClick={handleSubmit}
                  className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Already over</span>
              <span className="text-foreground font-bold text-lg">50,000 Subscribers</span>
              <span className="text-yellow-400">🔥</span>
              <span className="text-red-400 font-semibold">DON'T</span>
              <span className="text-muted-foreground">get behind.</span>
            </div>
          </div>
        </div>

        {/* Floating Dots */}
        <div className="absolute top-6 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
