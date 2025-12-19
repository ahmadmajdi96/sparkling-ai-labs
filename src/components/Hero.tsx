import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      }, '-=0.6')
      .from(buttonsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      }, '-=0.5');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center z-10 w-full">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-card/50 border border-primary/20 mb-4 sm:mb-6 backdrop-blur-sm">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          <span className="text-xs sm:text-sm text-muted-foreground">Simplifying Complexity</span>
        </div>

        <h1
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight px-2"
        >
          Transform Your Business
          <br />
          With AI Systems
        </h1>

        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-2 sm:mb-3 leading-relaxed px-2"
        >
          Deploy intelligent systems, automate complex workflows, optimize operations in microseconds
        </p>
        
        <p className="text-sm sm:text-base md:text-lg text-primary/80 max-w-2xl mx-auto mb-6 sm:mb-10 px-2">
          Eliminate errors • Reduce costs • Unlock unprecedented efficiency
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-16 px-4">
          <Button
            size="lg"
            onClick={() => navigate('/contact')}
            className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-glow w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Initialize Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/solutions')}
            className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto"
          >
            Explore Systems
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4 max-w-5xl mx-auto px-2">
          {[
            { value: '60%', label: 'Cost Reduction', icon: '↓' },
            { value: '5x', label: 'Efficiency Gain', icon: '⚡' },
            { value: '99.9%', label: 'Accuracy Rate', icon: '◉' },
            { value: '24/7', label: 'Auto Runtime', icon: '∞' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2 opacity-50">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-40 h-32 sm:h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};
