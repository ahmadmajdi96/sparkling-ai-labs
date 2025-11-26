import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portals = [
  {
    id: '0x001',
    title: 'AI_NEURAL_CORE',
    description: 'Build custom AI models and intelligent chatbots with quantum neural networks.',
    tab: 'ai',
  },
  {
    id: '0x002',
    title: 'INDUSTRIAL_MATRIX',
    description: 'Hardware integration and production line optimization with real-time neural analysis.',
    tab: 'industrial',
  },
  {
    id: '0x003',
    title: 'AUTOMATION_ENGINE',
    description: 'Design complex business workflows in seconds with neural workflow architecture.',
    tab: 'automation',
  },
  {
    id: '0x004',
    title: 'INTEGRATION_HUB',
    description: 'AI-powered seamless connectivity between all systems and third-party networks.',
    tab: 'integration',
  },
  {
    id: '0x005',
    title: 'WORKFLOW_NEXUS',
    description: 'Orchestrate intelligent AI-driven workflows for maximum system efficiency.',
    tab: 'workflows',
  },
];

export const NeuralPortals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm text-primary font-mono mb-4">&gt; ACCESS_PORTALS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary tracking-wider">
            FIVE NEURAL PORTALS
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            &gt; Complete_platform_suite // Digital_transformation_protocol
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <Card
              key={portal.id}
              className="group p-6 bg-card/30 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-xs text-primary/50 font-mono">{portal.id}</div>
              
              <h3 className="text-xl font-bold mb-3 text-primary font-mono tracking-wider mt-4">
                {portal.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed font-mono mb-6">
                &gt; {portal.description}
              </p>

              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/solutions?tab=${portal.tab}`)}
                className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary font-mono text-xs group"
              >
                ACCESS_PORTAL
                <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
