import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Factory, Heart, Landmark, ShoppingCart, Truck, 
  Monitor, Zap, Radio, Car, GraduationCap, Building2, 
  Wheat, ArrowRight, Check, BarChart3, Clock, Shield, Target
} from 'lucide-react';

const industries = [
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    tagline: 'Smart Factory Solutions',
    description: 'Optimize production lines, predict maintenance needs, and ensure quality control with AI-powered systems.',
    stats: { efficiency: '45%', downtime: '60%', quality: '99.2%' },
    useCases: ['Predictive maintenance', 'Quality inspection', 'Supply chain optimization', 'Production scheduling'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare',
    tagline: 'Intelligent Patient Care',
    description: 'Enhance patient outcomes with AI diagnostics, automated workflows, and intelligent resource management.',
    stats: { accuracy: '98%', time: '70%', satisfaction: '94%' },
    useCases: ['Diagnostic assistance', 'Patient flow optimization', 'Medical records automation', 'Resource allocation'],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Finance & Banking',
    tagline: 'Secure Financial Intelligence',
    description: 'Automate transactions, detect fraud in real-time, and provide personalized customer experiences.',
    stats: { fraud: '99.9%', processing: '80%', compliance: '100%' },
    useCases: ['Fraud detection', 'Risk assessment', 'Customer service automation', 'Regulatory compliance'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail & E-commerce',
    tagline: 'Personalized Shopping Experience',
    description: 'Drive sales with AI recommendations, optimize inventory, and create seamless customer journeys.',
    stats: { conversion: '35%', inventory: '40%', retention: '50%' },
    useCases: ['Product recommendations', 'Inventory management', 'Price optimization', 'Customer analytics'],
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics & Supply Chain',
    tagline: 'Intelligent Distribution',
    description: 'Streamline operations with route optimization, demand forecasting, and warehouse automation.',
    stats: { delivery: '30%', costs: '25%', accuracy: '99.5%' },
    useCases: ['Route optimization', 'Demand forecasting', 'Warehouse automation', 'Fleet management'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'technology',
    icon: Monitor,
    title: 'Technology',
    tagline: 'Next-Gen Tech Solutions',
    description: 'Accelerate development cycles, automate testing, and enhance product intelligence.',
    stats: { deployment: '60%', bugs: '75%', productivity: '40%' },
    useCases: ['Automated testing', 'Code optimization', 'DevOps automation', 'Product analytics'],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy & Utilities',
    tagline: 'Smart Grid Management',
    description: 'Optimize energy distribution, predict demand, and manage renewable resources efficiently.',
    stats: { efficiency: '35%', outages: '50%', renewable: '45%' },
    useCases: ['Grid optimization', 'Demand prediction', 'Asset management', 'Sustainability tracking'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'telecom',
    icon: Radio,
    title: 'Telecommunications',
    tagline: 'Network Intelligence',
    description: 'Enhance network performance, automate customer support, and predict infrastructure needs.',
    stats: { uptime: '99.99%', support: '65%', capacity: '40%' },
    useCases: ['Network optimization', 'Churn prediction', 'Customer support AI', 'Capacity planning'],
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 'automotive',
    icon: Car,
    title: 'Automotive',
    tagline: 'Driving Innovation',
    description: 'Power autonomous systems, optimize manufacturing, and enhance vehicle intelligence.',
    stats: { safety: '40%', production: '30%', defects: '60%' },
    useCases: ['Autonomous driving', 'Quality control', 'Supply chain', 'Predictive maintenance'],
    color: 'from-slate-500 to-zinc-500',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    tagline: 'Personalized Learning',
    description: 'Create adaptive learning experiences, automate administration, and enhance student outcomes.',
    stats: { engagement: '55%', completion: '40%', satisfaction: '92%' },
    useCases: ['Adaptive learning', 'Automated grading', 'Student analytics', 'Content personalization'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'realestate',
    icon: Building2,
    title: 'Real Estate',
    tagline: 'Smart Property Management',
    description: 'Optimize property valuations, automate transactions, and enhance tenant experiences.',
    stats: { valuations: '95%', transactions: '50%', occupancy: '20%' },
    useCases: ['Property valuation', 'Lead scoring', 'Document automation', 'Market analysis'],
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'agriculture',
    icon: Wheat,
    title: 'Agriculture',
    tagline: 'Precision Farming',
    description: 'Maximize yields with precision farming, predictive analytics, and automated monitoring.',
    stats: { yield: '30%', water: '40%', waste: '35%' },
    useCases: ['Crop monitoring', 'Yield prediction', 'Resource optimization', 'Disease detection'],
    color: 'from-lime-500 to-green-500',
  },
];

const Industries = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      
      <main className="pt-24 sm:pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-xs sm:text-sm text-primary uppercase tracking-wider">Industry Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6">
              Transforming Industries
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              AI solutions tailored for every sector. From manufacturing to healthcare, 
              we deliver intelligent automation that drives real results.
            </p>
          </div>

          {/* Featured Industry */}
          <Card className="p-6 sm:p-8 lg:p-12 bg-card/50 backdrop-blur-sm border border-primary/20 mb-12 sm:mb-16 overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br ${selectedIndustry.color} opacity-5 blur-3xl`} />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 mb-8">
                <div className="flex-shrink-0">
                  <div className={`inline-flex p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${selectedIndustry.color} text-white`}>
                    <selectedIndustry.icon className="w-8 h-8 sm:w-12 sm:h-12" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">{selectedIndustry.tagline}</p>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{selectedIndustry.title}</h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    {selectedIndustry.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={() => navigate('/contact')}
                      className={`bg-gradient-to-r ${selectedIndustry.color} text-white hover:opacity-90`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                      View Case Study
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
                {Object.entries(selectedIndustry.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 rounded-xl bg-background/50 border border-primary/10">
                    <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{value}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground capitalize">
                      {key === 'efficiency' ? 'Efficiency Gain' : 
                       key === 'downtime' ? 'Downtime Reduced' :
                       key === 'quality' ? 'Quality Rate' :
                       key === 'accuracy' ? 'Accuracy' :
                       key === 'time' ? 'Time Saved' :
                       key === 'satisfaction' ? 'Satisfaction' :
                       key === 'fraud' ? 'Fraud Detection' :
                       key === 'processing' ? 'Faster Processing' :
                       key === 'compliance' ? 'Compliance' :
                       key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Use Cases */}
              <div className="p-4 sm:p-6 rounded-xl bg-primary/5 border border-primary/10">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Key Use Cases
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {selectedIndustry.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-1 rounded-full bg-primary/20">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm text-muted-foreground">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* All Industries Grid */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
              All Industries We Serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {industries.map((industry) => {
                const Icon = industry.icon;
                const isSelected = selectedIndustry.id === industry.id;
                return (
                  <Card
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:shadow-glow ${
                      isSelected 
                        ? 'bg-card border-primary/40' 
                        : 'bg-card/50 border-primary/10 hover:border-primary/30'
                    }`}
                  >
                    <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-gradient-to-br ${industry.color} text-white mb-3`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">{industry.title}</h3>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
            <Card className="p-6 bg-card/50 border-primary/10 text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">Average 40% efficiency improvement across all industry deployments</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/10 text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Fast Deployment</h3>
              <p className="text-sm text-muted-foreground">Go live in weeks, not months, with our rapid implementation process</p>
            </Card>
            <Card className="p-6 bg-card/50 border-primary/10 text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">SOC 2 compliant with industry-specific regulatory adherence</p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Industry?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join leading companies already leveraging CortaNex to drive innovation and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              >
                Schedule a Consultation
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

export default Industries;
