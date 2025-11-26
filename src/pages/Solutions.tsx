import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Brain, Factory, Workflow, Link2, GitBranch } from 'lucide-react';

const solutions = [
  {
    id: '01',
    icon: Brain,
    title: 'AI Neural Core',
    description: 'Build custom AI models and intelligent chatbots with quantum neural networks. Deploy intelligent conversational agents that understand context and provide precise responses.',
  },
  {
    id: '02',
    icon: Factory,
    title: 'Industrial Matrix',
    description: 'Hardware integration and production line optimization with real-time neural analysis. Monitor and optimize every aspect of your manufacturing process.',
  },
  {
    id: '03',
    icon: Workflow,
    title: 'Automation Engine',
    description: 'Design complex business workflows in seconds with neural workflow architecture. Eliminate manual processes and streamline operations end-to-end.',
  },
  {
    id: '04',
    icon: Link2,
    title: 'Integration Hub',
    description: 'AI-powered seamless connectivity between all systems and third-party networks. Connect your entire technology stack in one unified platform.',
  },
  {
    id: '05',
    icon: GitBranch,
    title: 'Workflow Nexus',
    description: 'Orchestrate intelligent AI-driven workflows for maximum system efficiency. Coordinate multiple processes and systems with intelligent automation.',
  },
];

const Solutions = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary uppercase tracking-wider">Neural Portals</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI suite to transform your operations
            </p>
          </div>

          <div className="grid gap-8">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.id}
                  className="group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-2xl font-bold">{solution.title}</h2>
                        <span className="text-4xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                          {solution.id}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
