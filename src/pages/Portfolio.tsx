import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { DynamicSystemCard } from '@/components/portfolio/DynamicSystemCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WebGLBackground } from '@/components/WebGLBackground';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [activeSection, setActiveSection] = useState<string>('');
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  const { systems, loading, error } = usePortfolioData();

  // Check scroll arrows visibility
  const checkScrollArrows = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollArrows();
    window.addEventListener('resize', checkScrollArrows);
    return () => window.removeEventListener('resize', checkScrollArrows);
  }, [systems]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navContainerRef.current) {
      const scrollAmount = 200;
      navContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (systems.length === 0) return;

    // Set up scroll tracking for each system section
    systems.forEach((system) => {
      const element = sectionRefs.current[system.id];
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(system.id),
          onEnterBack: () => setActiveSection(system.id),
        });
      }
    });

    // Animate sections on scroll
    gsap.utils.toArray('.system-section').forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [systems]);

  const scrollToSection = (systemId: string) => {
    const element = sectionRefs.current[systemId];
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get short name for nav tabs
  const getShortName = (name: string) => {
    const nameMap: Record<string, string> = {
      'CORTANEX BI': 'BI',
      'PRODUCTION HUB': 'Production',
      'DELIVERY HUB': 'Delivery',
      'MAINTENANCE HUB': 'Maintenance',
      'CORTANEX CRM': 'CRM',
      'MANAGEMENT PORTAL': 'Portal',
      'AI ASSISTANCE': 'AI',
    };
    return nameMap[name] || name.split(' ')[0];
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <WebGLBackground />
        <Navbar />
        <main className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading portfolio...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen">
        <WebGLBackground />
        <Navbar />
        <main className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-destructive mb-2">Failed to load portfolio</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      
      {/* Sticky Navigation */}
      {systems.length > 0 && (
        <div className="sticky top-20 z-30 py-3">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 p-2">
              {/* Left scroll button */}
              {showLeftArrow && (
                <button
                  onClick={() => scrollNav('left')}
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-background/90 backdrop-blur rounded-full border border-border/50 shadow-lg hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
              )}

              {/* Scrollable nav container */}
              <div
                ref={navContainerRef}
                className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide scroll-smooth px-8"
                onScroll={checkScrollArrows}
              >
                {systems.map((system) => (
                  <button
                    key={system.id}
                    onClick={() => scrollToSection(system.id)}
                    className={cn(
                      "relative flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                      activeSection === system.id
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    )}
                  >
                    {/* Active background with gradient */}
                    {activeSection === system.id && (
                      <div 
                        className={cn(
                          "absolute inset-0 rounded-xl transition-all duration-300",
                          "bg-gradient-to-r shadow-lg",
                          system.gradient
                        )} 
                        style={{
                          boxShadow: '0 4px 20px rgba(var(--primary), 0.3)'
                        }}
                      />
                    )}
                    <span className="relative z-10">{getShortName(system.name)}</span>
                  </button>
                ))}
              </div>

              {/* Right scroll button */}
              {showRightArrow && (
                <button
                  onClick={() => scrollNav('right')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center bg-background/90 backdrop-blur rounded-full border border-border/50 shadow-lg hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              )}
            </div>

            {/* Progress dots for mobile */}
            <div className="flex justify-center gap-1.5 mt-3 md:hidden">
              {systems.map((system) => (
                <button
                  key={system.id}
                  onClick={() => scrollToSection(system.id)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSection === system.id
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <main className="pt-12 pb-24 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary uppercase tracking-wider">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
              Product Portfolio
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive suite of AI-powered enterprise solutions designed to transform 
              business operations across industries.
            </p>
          </div>

          {/* Systems */}
          <div className="space-y-24">
            {systems.map((system) => (
              <section
                key={system.id}
                id={system.id}
                ref={(el) => (sectionRefs.current[system.id] = el)}
                className="system-section"
              >
                <DynamicSystemCard system={system} />
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <Footer />
    </div>
  );
};

export default Portfolio;
