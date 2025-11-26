import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';
import { ArrowRight, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded border border-primary/30 p-12 md:p-16 text-center overflow-hidden backdrop-blur-sm bg-card/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary tracking-wider">
              INITIALIZE TRANSFORMATION
            </h2>
            
            <div className="space-y-3 mb-8">
              <p className="text-base text-muted-foreground font-mono">
                &gt; Join_neural_network // Industry_leaders_transforming_operations
              </p>
              <p className="text-sm text-primary font-mono">
                &gt; Begin_journey // Zero-code_AI_automation_protocol
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                className="group bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm shadow-glow font-mono tracking-wider"
              >
                SCHEDULE_DEMO
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/industries')}
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-6 text-sm backdrop-blur-sm font-mono tracking-wider"
              >
                <Eye className="w-4 h-4 mr-2" />
                VIEW_INDUSTRIES
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
