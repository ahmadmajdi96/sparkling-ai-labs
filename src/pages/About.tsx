import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono mb-4">&gt; SYSTEM_INFO</p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-wider">
              ABOUT CORTANEX
            </h1>
          </div>

          <div className="space-y-8">
            <div className="p-8 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-primary mb-4 font-mono tracking-wider">
                &gt; MISSION_STATEMENT
              </h2>
              <p className="text-muted-foreground font-mono leading-relaxed">
                Transform reality with AI neural systems. We deploy intelligent systems that automate 
                complex workflows and optimize operations in microseconds. Our mission is to eliminate 
                errors, reduce costs, and unlock unprecedented efficiency for businesses worldwide.
              </p>
            </div>

            <div className="p-8 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-primary mb-4 font-mono tracking-wider">
                &gt; VISION
              </h2>
              <p className="text-muted-foreground font-mono leading-relaxed">
                To be the leading provider of neural AI systems, empowering industries with 
                quantum-optimized workflows and real-time analytics. We envision a future where 
                AI seamlessly integrates with human operations to create unparalleled productivity gains.
              </p>
            </div>

            <div className="p-8 border border-primary/20 bg-card/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-primary mb-4 font-mono tracking-wider">
                &gt; CORE_VALUES
              </h2>
              <ul className="space-y-3 text-muted-foreground font-mono">
                <li>&gt; Innovation_first // Cutting-edge_technology</li>
                <li>&gt; Client_success // Partnership_driven</li>
                <li>&gt; Excellence // 99.9%_accuracy_standard</li>
                <li>&gt; Transparency // Open_communication</li>
                <li>&gt; Scalability // Enterprise_ready_solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
