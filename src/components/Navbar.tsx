import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Cpu } from 'lucide-react';

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
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CortaNex
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              AI Neural Systems
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/solutions"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Solutions
          </Link>
          <Link
            to="/industries"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Industries
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
        >
          Initialize
        </Button>
      </div>

      <style>{`
        .nav-scrolled {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid hsla(220, 15%, 20%, 0.5);
        }
      `}</style>
    </nav>
  );
};
