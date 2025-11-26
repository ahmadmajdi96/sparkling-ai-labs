import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';

const Solutions = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono mb-4">&gt; NEURAL_PORTALS</p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-wider">
              SOLUTIONS
            </h1>
            <p className="text-lg text-muted-foreground font-mono max-w-3xl mx-auto">
              &gt; Comprehensive_AI_suite // Transform_your_operations
            </p>
          </div>

          <div className="grid gap-8">
            {[
              {
                id: '0x001',
                title: 'AI_NEURAL_CORE',
                description: 'Build custom AI models and intelligent chatbots with quantum neural networks.',
              },
              {
                id: '0x002',
                title: 'INDUSTRIAL_MATRIX',
                description: 'Hardware integration and production line optimization with real-time neural analysis.',
              },
              {
                id: '0x003',
                title: 'AUTOMATION_ENGINE',
                description: 'Design complex business workflows in seconds with neural workflow architecture.',
              },
              {
                id: '0x004',
                title: 'INTEGRATION_HUB',
                description: 'AI-powered seamless connectivity between all systems and third-party networks.',
              },
              {
                id: '0x005',
                title: 'WORKFLOW_NEXUS',
                description: 'Orchestrate intelligent AI-driven workflows for maximum system efficiency.',
              },
            ].map((solution) => (
              <div
                key={solution.id}
                className="p-8 border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-primary font-mono tracking-wider">
                    {solution.title}
                  </h2>
                  <span className="text-xs text-primary/50 font-mono">{solution.id}</span>
                </div>
                <p className="text-muted-foreground font-mono">&gt; {solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
