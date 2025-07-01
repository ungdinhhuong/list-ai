import React from 'react';
import {ExternalLink, Github, Linkedin, Mail, Twitter} from 'lucide-react';

const FooterSimple = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {name: 'Twitter', href: '#', icon: Twitter},
    {name: 'GitHub', href: '#', icon: Github},
    {name: 'LinkedIn', href: '#', icon: Linkedin},
    {name: 'Email', href: 'mailto:hello@benlistai.com', icon: Mail},
  ];

  return (
    <footer className="bg-black text-white px-4">
      {/* Newsletter Section */}
      <div className="border-gray-800">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Latest AI Tools</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Join over 50,000 subscribers and get exclusive access to new AI tools,
              curated lists, and productivity tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                Subscribe
                <ExternalLink size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} BenListAI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">Follow Us:</span>
              <div className="flex space-x-3">
                {socialLinks.slice(0, 3).map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon size={18}/>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;