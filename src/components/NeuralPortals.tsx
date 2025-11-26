import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Brain, Factory, Workflow, Link2, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const portals = [
  {
    id: '01',
    icon: Brain,
    title: 'AI Neural Core',
    description: 'Build custom AI models and intelligent chatbots with quantum neural networks.',
    tab: 'ai',
  },
  {
    id: '02',
    icon: Factory,
    title: 'Industrial Matrix',
    description: 'Hardware integration and production line optimization with real-time neural analysis.',
    tab: 'industrial',
  },
  {
    id: '03',
    icon: Workflow,
    title: 'Automation Engine',
    description: 'Design complex business workflows in seconds with neural workflow architecture.',
    tab: 'automation',
  },
  {
    id: '04',
    icon: Link2,
    title: 'Integration Hub',
    description: 'AI-powered seamless connectivity between all systems and third-party networks.',
    tab: 'integration',
  },
  {
    id: '05',
    icon: GitBranch,
    title: 'Workflow Nexus',
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
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm text-primary uppercase tracking-wider">Access Portals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Five Neural Portals
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete platform suite for digital transformation
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card
                key={portal.id}
                className="group p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                  {portal.id}
                </div>
                
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{portal.title}</h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {portal.description}
                </p>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/solutions?tab=${portal.tab}`)}
                  className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary text-sm group/btn"
                >
                  Access Portal
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
