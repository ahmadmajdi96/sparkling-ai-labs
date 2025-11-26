import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from './ui/card';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    title: 'COST_REDUCTION',
    description: 'Slash operational costs by 60% through neural automation protocols and quantum-optimized workflows.',
  },
  {
    title: 'ERROR_ELIMINATION',
    description: 'Achieve 95% error termination with AI-powered validation and real-time quality control systems.',
  },
  {
    title: 'EFFICIENCY_BOOST',
    description: 'Amplify productivity by 500% with hyper-streamlined, automated neural processes.',
  },
  {
    title: 'TIME_SAVINGS',
    description: 'Reclaim thousands of hours annually by automating repetitive operational sequences.',
  },
  {
    title: 'REAL-TIME_ANALYTICS',
    description: 'Access instant neural insights with comprehensive HUD dashboards and AI decision engines.',
  },
  {
    title: 'BOTTLENECK_DETECTION',
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
        <div className="text-center mb-4">
          <p className="text-sm text-primary font-mono mb-4">&gt; SYSTEM_CAPABILITIES</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary tracking-wider">
            NEURAL ADVANTAGES
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
            >
              <h3 className="text-lg font-bold mb-3 text-primary font-mono tracking-wider">
                {advantage.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                &gt; {advantage.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
