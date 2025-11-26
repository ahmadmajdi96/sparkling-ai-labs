import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message transmitted successfully!');
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm text-primary uppercase tracking-wider">Initialize Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Contact
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with the neural network and begin your transformation
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  type="text"
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <Input
                  type="text"
                  className="bg-background/50 border-primary/30 focus:border-primary"
                  placeholder="Enter your company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  required
                  rows={6}
                  className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                  placeholder="Tell us about your project"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              >
                {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
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
