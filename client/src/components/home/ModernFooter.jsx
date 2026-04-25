import React from 'react'
import { Github, Twitter, Linkedin, Sparkle } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Product: ["Home", "Support", "Pricing", "Resources"],
  Company: ["Blogs", "Community", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"]
}

const ModernFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                 <Sparkle size={20} fill="currentColor" />
              </div>
              <div className="flex items-center gap-0">
                 <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">Resumify</span>
                 <span className="text-2xl font-black text-accent">.</span>
              </div>
            </Link>
            <p className="max-w-xs text-secondary text-sm leading-relaxed">
              AI-powered resume builder designed to help you land your dream job faster.
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-8">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-secondary hover:text-primary transition-colors font-medium">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-xs text-secondary font-medium">
             © 2026 Resumify. All Rights Reserved.
           </p>
           
           <div className="flex items-center gap-8">
              <a href="https://x.com/home" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                 <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/yashpreet-gupta-b92a45369/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                 <Linkedin size={20} />
              </a>
              <a href="https://github.com/Yashpreetg24" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                 <Github size={20} />
              </a>
           </div>
        </div>
      </div>
    </footer>
  )
}

export default ModernFooter
