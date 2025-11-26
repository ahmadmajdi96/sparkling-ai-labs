import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Binary } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-12 px-4 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Binary className="w-5 h-5 text-primary" />
              <span className="font-bold text-lg text-primary tracking-wider">CORTANEX</span>
            </div>
            <p className="text-muted-foreground text-sm font-mono">
              &gt; Building_future // Intelligent_AI_solutions
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary font-mono tracking-wider">PRODUCT</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li><Link to="/solutions" className="hover:text-primary transition-colors">&gt; Features</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">&gt; Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">&gt; Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">&gt; API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary font-mono tracking-wider">COMPANY</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li><Link to="/about" className="hover:text-primary transition-colors">&gt; About</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">&gt; Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">&gt; Careers</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">&gt; Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary font-mono tracking-wider">CONNECT</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-8 text-center text-xs text-muted-foreground font-mono">
          <p>&gt; {new Date().getFullYear()} CORTANEX AI // ALL_RIGHTS_RESERVED</p>
        </div>
      </div>
    </footer>
  );
};
