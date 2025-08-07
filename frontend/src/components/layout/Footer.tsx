import { ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'AI Tools Directory', href: '/tools' },
      { name: 'Featured Tools', href: '/featured' },
      { name: 'New Tools', href: '/new' },
      { name: 'Popular Tools', href: '/popular' },
    ],
    categories: [
      { name: 'Writing & Content', href: '/category/writing' },
      { name: 'Design & Art', href: '/category/design' },
      { name: 'Development', href: '/category/development' },
      { name: 'Marketing', href: '/category/marketing' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Submit Tool', href: '/submit' },
      { name: 'Newsletter', href: '/newsletter' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@benlistai.com', icon: Mail },
  ];

  return (
    <footer className="bg-background text-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Latest AI Tools</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join over 50,000 subscribers and get exclusive access to new AI tools, curated lists, and productivity
              tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                Subscribe
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <h3 className="text-xl font-bold">BenListAI</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The Best AI Websites & AI Tools Directory. Discover, explore, and find the perfect AI tools to boost your
              productivity and creativity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg flex items-center justify-center transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Columns */}
          {['product', 'categories', 'company', 'legal'].map(section => (
            <div key={section}>
              <h4 className="text-lg font-semibold mb-4 capitalize">{section}</h4>
              <ul className="space-y-3">
                {footerLinks[section as keyof typeof footerLinks].map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© {currentYear} BenListAI. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="text-muted-foreground text-sm">Follow Us:</span>
              <div className="flex space-x-3">
                {socialLinks.slice(0, 3).map(social => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
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

export default Footer;
