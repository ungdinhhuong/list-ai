import React from 'react';
import {Github, Linkedin, Mail, Twitter} from 'lucide-react';

const FooterSimple = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {name: 'Twitter', href: '#', icon: Twitter},
    {name: 'GitHub', href: '#', icon: Github},
    {name: 'LinkedIn', href: '#', icon: Linkedin},
    {name: 'Email', href: 'mailto:hello@benlistai.com', icon: Mail},
  ];

  return (
    <footer className="bg-black text-white">
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