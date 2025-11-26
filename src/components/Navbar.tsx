import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Binary } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      scrollTrigger: {
        start: 50,
        end: 51,
        onEnter: () => nav.classList.add('nav-scrolled'),
        onLeaveBack: () => nav.classList.remove('nav-scrolled'),
      },
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded border border-primary/30 bg-background/50 backdrop-blur-sm group-hover:border-primary transition-colors">
            <Binary className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold text-primary tracking-wider">CORTANEX</span>
            <span className="text-[10px] text-muted-foreground tracking-widest">AI NEURAL SYSTEMS</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            HOME
          </Link>
          <Link
            to="/solutions"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            SOLUTIONS
          </Link>
          <Link
            to="/industries"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            INDUSTRIES
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wider"
          >
            CONTACT
          </Link>
        </div>

        <Button
          size="sm"
          className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-glow"
        >
          &gt; INITIALIZE
        </Button>
      </div>

      <style>{`
        .nav-scrolled {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid hsla(142, 40%, 15%, 0.5);
        }
      `}</style>
    </nav>
  );
};
