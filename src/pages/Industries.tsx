import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';

const industries = [
  'Manufacturing',
  'Healthcare',
  'Finance',
  'Retail',
  'Logistics',
  'Technology',
  'Energy',
  'Telecommunications',
  'Automotive',
  'Education',
  'Real Estate',
  'Agriculture',
];

const Industries = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary uppercase tracking-wider">Deployment Sectors</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Industries
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Neural systems deployed across multiple sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <div
                key={industry}
                className="group p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow cursor-pointer"
              >
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary/50 group-hover:text-primary transition-colors">→</span>
                  {industry}
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
