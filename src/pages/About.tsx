import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Target, Eye, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary uppercase tracking-wider">System Info</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              About CortaNex
            </h1>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Mission Statement</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Transform reality with AI neural systems. We deploy intelligent systems that automate 
                complex workflows and optimize operations in microseconds. Our mission is to eliminate 
                errors, reduce costs, and unlock unprecedented efficiency for businesses worldwide.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading provider of neural AI systems, empowering industries with 
                quantum-optimized workflows and real-time analytics. We envision a future where 
                AI seamlessly integrates with human operations to create unparalleled productivity gains.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Core Values</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Innovation first - Cutting-edge technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Client success - Partnership driven</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Excellence - 99.9% accuracy standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Transparency - Open communication</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Scalability - Enterprise ready solutions</span>
                </li>
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
