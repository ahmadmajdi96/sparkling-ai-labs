import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Brain, Factory, Workflow, Link2, GitBranch, 
  ArrowRight, Check, Zap, Shield, BarChart3, 
  Clock, Target, Layers, Settings, Database,
  Bot, Cog, Network, LineChart, Lock
} from 'lucide-react';

const solutions = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Core',
    tagline: 'Intelligent Automation at Scale',
    description: 'Build custom AI models and intelligent chatbots designed specifically for your business needs. Zero code required.',
    longDescription: 'Our AI Core platform enables you to create, train, and deploy sophisticated AI models without writing a single line of code. From conversational AI to predictive analytics, harness the power of machine learning to transform your business operations.',
    features: [
      { icon: Bot, title: 'Custom Chatbots', description: 'Deploy intelligent conversational agents across all channels' },
      { icon: Database, title: 'Data Training', description: 'Train AI on your proprietary datasets securely' },
      { icon: LineChart, title: 'Predictive Analytics', description: 'Forecast trends and make data-driven decisions' },
      { icon: Lock, title: 'Enterprise Security', description: 'Military-grade encryption for all AI operations' },
    ],
    benefits: ['Reduce response time by 80%', 'Handle unlimited concurrent queries', '24/7 intelligent customer support', 'Continuous learning and improvement'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Matrix',
    tagline: 'Smart Manufacturing Solutions',
    description: 'Integrate AI with hardware solutions and optimize production lines with real-time analysis and predictive insights.',
    longDescription: 'Transform your manufacturing operations with our Industrial Matrix. Connect IoT devices, monitor production in real-time, predict equipment failures before they happen, and optimize every aspect of your production line.',
    features: [
      { icon: Cog, title: 'IoT Integration', description: 'Connect all sensors and equipment to a unified platform' },
      { icon: BarChart3, title: 'Real-time Monitoring', description: 'Track production metrics with live dashboards' },
      { icon: Shield, title: 'Predictive Maintenance', description: 'Prevent failures before they occur' },
      { icon: Target, title: 'Quality Assurance', description: 'AI-powered inspection and quality control' },
    ],
    benefits: ['Reduce downtime by 45%', 'Increase production efficiency by 30%', 'Cut maintenance costs by 25%', 'Zero unexpected equipment failures'],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Automation Engine',
    tagline: 'Workflow Excellence',
    description: 'Design and deploy complex workflows with an intuitive visual designer. Zero technical expertise required.',
    longDescription: 'Our drag-and-drop Automation Engine lets you create sophisticated business workflows in minutes. Connect applications, automate repetitive tasks, and orchestrate complex processes across your entire organization.',
    features: [
      { icon: Layers, title: 'Visual Builder', description: 'Drag-and-drop interface for workflow creation' },
      { icon: Network, title: 'App Connectors', description: 'Connect to thousands of applications instantly' },
      { icon: Clock, title: 'Scheduling', description: 'Automate tasks with intelligent scheduling' },
      { icon: Shield, title: 'Error Handling', description: 'Built-in recovery and error management' },
    ],
    benefits: ['Save 20+ hours per week', 'Eliminate manual data entry', 'Zero human errors', 'Instant process deployment'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'integration',
    icon: Link2,
    title: 'Integration Hub',
    tagline: 'Seamless Connectivity',
    description: 'AI-powered seamless integration to connect any system instantly. Zero manual coding required.',
    longDescription: 'Break down data silos with our Integration Hub. Connect your CRM, ERP, marketing tools, and custom applications with intelligent data mapping and real-time synchronization across your entire tech stack.',
    features: [
      { icon: Network, title: 'Universal Connectors', description: 'Pre-built integrations for 500+ platforms' },
      { icon: Zap, title: 'Real-time Sync', description: 'Bidirectional data synchronization' },
      { icon: Settings, title: 'API Gateway', description: 'Create and manage custom API endpoints' },
      { icon: Lock, title: 'Secure Transfer', description: 'Encrypted data transfer protocols' },
    ],
    benefits: ['Connect any system in minutes', 'Real-time data accuracy', 'Eliminate data silos', 'Custom API creation'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'workflows',
    icon: GitBranch,
    title: 'Workflows Nexus',
    tagline: 'Intelligent Orchestration',
    description: 'Create and orchestrate intelligent workflows for maximum efficiency. AI designs, optimizes, and manages autonomously.',
    longDescription: 'Let AI design your optimal workflows. Our Workflows Nexus analyzes your processes, identifies bottlenecks, and automatically creates optimized workflows that adapt and improve over time.',
    features: [
      { icon: Brain, title: 'AI Optimization', description: 'Algorithms that continuously improve processes' },
      { icon: Target, title: 'Smart Routing', description: 'Intelligent task assignment and routing' },
      { icon: LineChart, title: 'Performance Analytics', description: 'Deep insights into workflow efficiency' },
      { icon: Zap, title: 'Auto-Scaling', description: 'Workflows that scale with demand' },
    ],
    benefits: ['50% faster process completion', 'Automatic bottleneck resolution', 'Self-optimizing workflows', 'Unlimited scalability'],
    color: 'from-indigo-500 to-violet-500',
  },
];

const Solutions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'ai';
  const [activeTab, setActiveTab] = useState(initialTab);

  const activeSolution = solutions.find(s => s.id === activeTab) || solutions[0];
  const ActiveIcon = activeSolution.icon;

  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      
      <main className="pt-24 sm:pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-xs sm:text-sm text-primary uppercase tracking-wider">Complete AI Solutions Suite</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4 sm:mb-6">
              Five Specialized Portals
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform every aspect of your business with our comprehensive AI platform. 
              Seamless integration, maximum efficiency.
            </p>
          </div>

          {/* Solution Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <button
                  key={solution.id}
                  onClick={() => setActiveTab(solution.id)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeTab === solution.id
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-primary/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{solution.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Solution Detail */}
          <div className="mb-16 sm:mb-24">
            <Card className="p-6 sm:p-8 lg:p-12 bg-card/50 backdrop-blur-sm border border-primary/20 overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br ${activeSolution.color} opacity-5 blur-3xl`} />
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 mb-8 sm:mb-12">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${activeSolution.color} text-white`}>
                      <ActiveIcon className="w-8 h-8 sm:w-12 sm:h-12" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-primary text-xs sm:text-sm font-medium uppercase tracking-wider mb-2">{activeSolution.tagline}</p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">{activeSolution.title}</h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      {activeSolution.longDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        onClick={() => navigate('/contact')}
                        className={`bg-gradient-to-r ${activeSolution.color} text-white hover:opacity-90`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                        View Demo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                  {activeSolution.features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <div 
                        key={index}
                        className="p-4 sm:p-6 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <FeatureIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Benefits */}
                <div className="p-4 sm:p-6 rounded-xl bg-primary/5 border border-primary/10">
                  <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Key Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {activeSolution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1 rounded-full bg-primary/20">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* All Solutions Overview */}
          <div className="mb-16 sm:mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
              Complete Platform Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Card
                    key={solution.id}
                    onClick={() => setActiveTab(solution.id)}
                    className={`p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-glow ${
                      activeTab === solution.id 
                        ? 'bg-card border-primary/40' 
                        : 'bg-card/50 border-primary/10 hover:border-primary/30'
                    }`}
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${solution.color} text-white mb-4`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{solution.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">{solution.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-primary hover:bg-primary/10 p-0 h-auto"
                    >
                      Learn more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using CortaNex to simplify complexity and drive innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/contact')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
              >
                Schedule a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Solutions;
