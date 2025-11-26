import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from './ui/card';
import { DollarSign, XCircle, Zap, Clock, BarChart3, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: DollarSign,
    title: 'Cost Reduction',
    description: 'Slash operational costs by 60% through neural automation protocols and quantum-optimized workflows.',
  },
  {
    icon: XCircle,
    title: 'Error Elimination',
    description: 'Achieve 95% error termination with AI-powered validation and real-time quality control systems.',
  },
  {
    icon: Zap,
    title: 'Efficiency Boost',
    description: 'Amplify productivity by 500% with hyper-streamlined, automated neural processes.',
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description: 'Reclaim thousands of hours annually by automating repetitive operational sequences.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Access instant neural insights with comprehensive HUD dashboards and AI decision engines.',
  },
  {
    icon: AlertTriangle,
    title: 'Bottleneck Detection',
    description: 'Identify and neutralize workflow bottlenecks before they compromise system integrity.',
  },
];

export const NeuralAdvantages = () => {
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
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm text-primary uppercase tracking-wider">System Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Neural Advantages
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card
                key={index}
                className="group p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow cursor-pointer"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
