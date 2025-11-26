import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from './ui/card';
import { Brain, Cpu, Zap, Code, Database, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Brain,
    title: 'Machine Learning',
    description: 'Custom ML models trained on your data for predictive analytics and intelligent automation.',
  },
  {
    icon: Cpu,
    title: 'Neural Networks',
    description: 'Deep learning solutions for complex pattern recognition and decision-making systems.',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    description: 'Streamline operations with intelligent process automation that adapts and improves.',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Bespoke AI solutions tailored to your unique business requirements and workflows.',
  },
  {
    icon: Database,
    title: 'Data Intelligence',
    description: 'Transform raw data into actionable insights with advanced analytics and visualization.',
  },
  {
    icon: Shield,
    title: 'Secure AI Systems',
    description: 'Enterprise-grade security and compliance for all your AI implementations.',
  },
];

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI solutions designed to propel your business into the future
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow cursor-pointer"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
