import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-mono mb-4">&gt; INITIALIZE_CONTACT</p>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-wider">
              CONTACT
            </h1>
            <p className="text-lg text-muted-foreground font-mono">
              &gt; Connect_with_neural_network // Begin_transformation
            </p>
          </div>

          <div className="p-8 border border-primary/20 bg-card/30 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-mono text-primary mb-2">&gt; NAME</label>
                <Input
                  type="text"
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary text-foreground font-mono"
                  placeholder="Enter_name"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-primary mb-2">&gt; EMAIL</label>
                <Input
                  type="email"
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary text-foreground font-mono"
                  placeholder="Enter_email"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-primary mb-2">&gt; COMPANY</label>
                <Input
                  type="text"
                  className="bg-background/50 border-primary/30 focus:border-primary text-foreground font-mono"
                  placeholder="Enter_company"
                />
              </div>

              <div>
                <label className="block text-sm font-mono text-primary mb-2">&gt; MESSAGE</label>
                <Textarea
                  required
                  rows={6}
                  className="bg-background/50 border-primary/30 focus:border-primary text-foreground font-mono resize-none"
                  placeholder="Enter_message"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono tracking-wider shadow-glow"
              >
                &gt; TRANSMIT_MESSAGE
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
