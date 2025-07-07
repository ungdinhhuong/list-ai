import React from 'react';
import {APP_NAME} from "@/constants/env";
import {SOCIALS} from "@/constants/constants";

const FooterSimple = () => {

  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 {APP_NAME}. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <span className="text-muted-foreground text-sm">Follow Us:</span>
            <div className="flex space-x-3">
              {Object.values(SOCIALS).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
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
    </footer>
  );
};

export default FooterSimple;