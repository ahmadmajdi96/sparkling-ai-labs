import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Target, Eye, Lightbulb, ArrowRight, Users, Award, 
  Globe, Zap, Shield, Clock, Check, Sparkles,
  Building, MapPin, Mail, Phone
} from 'lucide-react';

const values = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'Cutting-edge AI technology that pushes boundaries',
  },
  {
    icon: Users,
    title: 'Client Success',
    description: 'Your success is our primary measure of achievement',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: '99.9% accuracy standard across all solutions',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade protection for your data',
  },
  {
    icon: Globe,
    title: 'Scalability',
    description: 'Solutions that grow with your business',
  },
  {
    icon: Zap,
    title: 'Speed',
    description: 'Rapid deployment and real-time processing',
  },
];

const stats = [
  { value: '500+', label: 'Enterprise Clients' },
  { value: '50M+', label: 'Workflows Automated' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Global Support' },
];

const milestones = [
  { year: '2020', title: 'Founded', description: 'CortaNex established with a vision to simplify complexity through AI' },
  { year: '2021', title: 'First Product', description: 'Launched AI Core platform with initial enterprise clients' },
  { year: '2022', title: 'Expansion', description: 'Expanded to 5 specialized portals serving 12+ industries' },
  { year: '2023', title: 'Global Reach', description: 'Operations in 30+ countries with 500+ enterprise clients' },
  { year: '2024', title: 'Innovation', description: 'Next-gen AI capabilities with autonomous workflow optimization' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      
      <main className="pt-24 sm:pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-xs sm:text-sm text-primary uppercase tracking-wider">About CortaNex</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6">
              Simplifying Complexity
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to transform how businesses operate through intelligent automation 
              and AI-powered solutions that deliver real, measurable results.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 sm:p-6 bg-card/50 border-primary/10 text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 sm:mb-16">
            <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-5 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower businesses worldwide with intelligent AI systems that automate complex workflows, 
                  eliminate errors, reduce costs, and unlock unprecedented efficiency. We believe every organization 
                  deserves access to transformative technology that simplifies their operations.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in AI-powered business transformation, creating a future where 
                  intelligent automation seamlessly integrates with human operations. We envision a world 
                  where complexity is simplified, and every business can achieve its full potential.
                </p>
              </div>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm text-primary uppercase tracking-wider">What Drives Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Our Core Values
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-5 sm:p-6 bg-card/50 border-primary/10 hover:border-primary/30 transition-all group">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary inline-flex mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Our Journey
              </h2>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-primary/20 transform sm:-translate-x-1/2" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${
                      index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : ''}`}>
                      <Card className="p-5 sm:p-6 bg-card/50 border-primary/10 ml-10 sm:ml-0">
                        <div className="text-primary font-bold text-lg mb-1">{milestone.year}</div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-1/2 top-6 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 ring-4 ring-background" />
                    
                    <div className="flex-1 hidden sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <Card className="p-6 sm:p-8 lg:p-12 bg-card/50 backdrop-blur-sm border border-primary/20 mb-12 sm:mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Get in Touch</h2>
              <p className="text-muted-foreground">We'd love to hear from you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-primary/10">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Company</div>
                  <div className="text-sm font-medium text-foreground">CortaNex AI</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-primary/10">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Location</div>
                  <div className="text-sm font-medium text-foreground">Amman, Jordan</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-primary/10">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Email</div>
                  <div className="text-sm font-medium text-foreground">info@cortanexai.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-primary/10">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Phone</div>
                  <div className="text-sm font-medium text-foreground">+962 79 629 8358</div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Join the Future?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Partner with CortaNex and transform how your business operates with intelligent AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/solutions')}
                className="border-primary/30 hover:bg-primary/10"
              >
                Explore Solutions
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
