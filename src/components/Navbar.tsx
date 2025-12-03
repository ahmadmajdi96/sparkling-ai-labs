import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { Cpu, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/industries', label: 'Industries' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CortaNex
              </span>
              <span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest">
                Simplifying Complexity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              asChild
              className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
            >
              <Link to="/contact">Get Started</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <style>{`
          .nav-scrolled {
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid hsla(220, 15%, 20%, 0.5);
          }
        `}</style>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-lg" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-4 right-4 bg-card border border-primary/20 rounded-2xl p-6 transition-all duration-300 ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
