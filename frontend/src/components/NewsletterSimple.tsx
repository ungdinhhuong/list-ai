import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Image from "next/image";

export default function NewsletterSimple() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <div className="w-full mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative flex flex-col lg:flex-row items-center justify-between p-4 lg:p-8 gap-2">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500 rounded-full blur-xl"></div>
        </div>

        {/* Left Side - AI Tools Grid */}
        <div className="relative flex-1 mb-8 xl:mb-0">
          <Image
            src="/images/ads.png"
            alt="Tôi vượt mình - Hành trình phát triển bản thân"
            width={600}
            height={400}
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>

        {/* Right Side - Newsletter Signup */}
        <div className="flex-1 max-w-md ml-8">
          <div className="space-y-6">
            <div>
              <p className="text-white text-lg font-medium mb-2">
                Be part of our Newsletter to get Exclusive content and Get{' '}
                <span className="text-blue-400 font-bold">100+ free AI tools</span>{' '}
                to help increase your productivity today!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400"
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
              <span className="text-gray-300">Already over</span>
              <span className="text-white font-bold text-lg">50,000 Subscribers</span>
              <span className="text-yellow-400">🔥</span>
              <span className="text-red-400 font-semibold">DON&#39;T</span>
              <span className="text-gray-300">get behind.</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce"
             style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-8 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce"
             style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-8 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}