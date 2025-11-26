import { WebGLBackground } from '@/components/WebGLBackground';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Features } from '@/components/Features';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Hero />
      <Services />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
