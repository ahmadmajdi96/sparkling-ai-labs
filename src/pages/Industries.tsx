import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';

const Industries = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono mb-4">&gt; DEPLOYMENT_SECTORS</p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-wider">
              INDUSTRIES
            </h1>
            <p className="text-lg text-muted-foreground font-mono max-w-3xl mx-auto">
              &gt; Neural_systems_deployed // Across_multiple_sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'MANUFACTURING',
              'HEALTHCARE',
              'FINANCE',
              'RETAIL',
              'LOGISTICS',
              'TECHNOLOGY',
              'ENERGY',
              'TELECOMMUNICATIONS',
              'AUTOMOTIVE',
            ].map((industry) => (
              <div
                key={industry}
                className="p-6 border border-primary/20 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-glow group cursor-pointer"
              >
                <h3 className="text-xl font-bold text-primary font-mono tracking-wider group-hover:translate-x-2 transition-transform">
                  &gt; {industry}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Industries;
