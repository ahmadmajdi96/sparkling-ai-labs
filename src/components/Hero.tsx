import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Button } from './ui/button';
import { ChevronRight, Terminal } from 'lucide-react';

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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-primary/30 mb-8 backdrop-blur-sm bg-card/50">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-xs text-primary font-mono">&gt; INITIALIZE_NEURAL_SYSTEM</span>
        </div>

        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary leading-tight tracking-wider"
        >
          TRANSFORM REALITY
          <br />
          WITH AI NEURAL SYSTEMS
        </h1>

        <div ref={subtitleRef} className="space-y-4 mb-12">
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto font-mono">
            &gt; Deploy intelligent systems_automate complex workflows_optimize operations in microseconds.
          </p>
          <p className="text-sm md:text-base text-primary max-w-3xl mx-auto font-mono">
            &gt; Eliminate_errors // Reduce_costs // Unlock_unprecedented_efficiency
          </p>
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={() => navigate('/contact')}
            className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm shadow-glow font-mono tracking-wider"
          >
            <ChevronRight className="w-4 h-4 mr-2" />
            INITIALIZE_NOW
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/solutions')}
            className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-6 text-sm backdrop-blur-sm font-mono tracking-wider"
          >
            <Terminal className="w-4 h-4 mr-2" />
            EXPLORE_SYSTEMS
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { value: '60%', label: 'COST_REDUCTION', icon: '↓' },
            { value: '5x', label: 'EFFICIENCY_GAIN', icon: '⚡' },
            { value: '99.9%', label: 'ACCURACY_RATE', icon: '◎' },
            { value: '24/7', label: 'AUTO_RUNTIME', icon: '↯' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="text-xs text-primary mb-2 font-mono">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
