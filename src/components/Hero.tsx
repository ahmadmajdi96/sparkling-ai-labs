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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/20 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Initialize Neural System</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight"
        >
          Transform Reality
          <br />
          With AI Neural Systems
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Deploy intelligent systems, automate complex workflows, optimize operations in microseconds.
        </p>
        
        <p className="text-base text-primary/80 max-w-2xl mx-auto mb-12">
          Eliminate errors // Reduce costs // Unlock unprecedented efficiency
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={() => navigate('/contact')}
            className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg shadow-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              Initialize Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/solutions')}
            className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 px-8 py-6 text-lg backdrop-blur-sm"
          >
            Explore Systems
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { value: '60%', label: 'Cost Reduction', icon: '↓' },
            { value: '5x', label: 'Efficiency Gain', icon: '⚡' },
            { value: '99.9%', label: 'Accuracy Rate', icon: '◉' },
            { value: '24/7', label: 'Auto Runtime', icon: '∞' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-2xl mb-2 opacity-50">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};
