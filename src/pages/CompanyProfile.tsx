import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { 
  Brain, Zap, Target, Layers, Cpu, Globe, 
  Clock, Shield, TrendingUp, ArrowRight, 
  Building2, Factory, Stethoscope, Truck, 
  ShoppingCart, Landmark, Server, Eye,
  Workflow, Database, Cloud, Lock,
  CheckCircle2, Sparkles, BarChart3, Settings,
  Users, Award, Lightbulb, Heart, Briefcase,
  LineChart, Package, CreditCard, FileText, Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const CompanyProfile = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.profile-section').forEach((section: any) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: Zap,
      title: 'Rapid Software Development',
      description: 'We design and launch fully functional beta systems within 1 to 10 working days.',
      features: [
        'Functional beta launch in days',
        'Clean, scalable system architecture',
        '12 months of modification and technical support',
        'Designed for production from day one'
      ],
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Brain,
      title: 'Custom Artificial Intelligence Services',
      description: 'We build custom AI solutions tailored to real operational needs, not generic demos.',
      features: [
        'Natural Language Processing',
        'Computer Vision & Image Processing',
        'Business Intelligence & Predictive Analytics',
        'AI-driven Decision Engines'
      ],
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Layers,
      title: 'Custom SaaS Platforms',
      description: 'Fully customized SaaS platforms for internal operations and external customers.',
      features: [
        'Enterprise management systems',
        'Client-facing platforms',
        'AI-powered dashboards',
        'Multi-tenant architectures'
      ],
      gradient: 'from-accent to-primary'
    },
    {
      icon: Workflow,
      title: 'Workflow Optimization & Automation',
      description: 'Analyze, redesign, and automate workflows to eliminate inefficiencies.',
      features: [
        'End-to-end process mapping',
        'Automation of repetitive operations',
        'AI-assisted decision flows',
        'Measurable cost and time reductions'
      ],
      gradient: 'from-primary to-accent'
    },
    {
      icon: Cpu,
      title: 'AI-Powered Business Systems',
      description: 'Custom AI-powered systems that act as an intelligent operational layer.',
      features: [
        'Purpose-built for your business',
        'Learns and adapts over time',
        'Seamless integration',
        'No templates or generic products'
      ],
      gradient: 'from-secondary to-primary'
    },
    {
      icon: Factory,
      title: 'Industrial & Production Line AI',
      description: 'AI-powered systems for industrial environments and production lines.',
      features: [
        'Vision-based quality control',
        'Automated inspection systems',
        'Sensor and camera-driven intelligence',
        'PLC and hardware integration'
      ],
      gradient: 'from-accent to-secondary'
    }
  ];

  const industries = [
    { icon: Landmark, name: 'Finance & FinTech', color: 'text-green-400' },
    { icon: Stethoscope, name: 'Healthcare & Pharma', color: 'text-red-400' },
    { icon: Truck, name: 'Logistics & Transportation', color: 'text-orange-400' },
    { icon: Factory, name: 'Manufacturing & Industrial', color: 'text-yellow-400' },
    { icon: ShoppingCart, name: 'Retail & E-commerce', color: 'text-pink-400' },
    { icon: Building2, name: 'Smart Cities & Infrastructure', color: 'text-cyan-400' },
    { icon: Server, name: 'Enterprise & Government', color: 'text-purple-400' },
  ];

  const methodology = [
    { step: '01', title: 'Discovery & System Mapping', description: 'We understand the business, workflows, and constraints.' },
    { step: '02', title: 'Architecture & AI Design', description: 'We design a scalable system and AI decision layer.' },
    { step: '03', title: 'Rapid Build & Integration', description: 'Core system development and integrations.' },
    { step: '04', title: 'Beta Launch (1–10 Days)', description: 'Functional system deployed.' },
    { step: '05', title: 'Iteration & Optimization', description: 'Refinement based on real usage.' },
    { step: '06', title: 'Long-Term Support & Scaling', description: 'Ongoing improvements and expansion.' },
  ];

  const technologies = [
    { icon: Brain, title: 'Artificial Intelligence & Machine Learning' },
    { icon: Cloud, title: 'Cloud-native Infrastructure' },
    { icon: Workflow, title: 'Automation & Messaging Systems' },
    { icon: Database, title: 'Data Engineering & Analytics' },
    { icon: Lock, title: 'Security-focused Architecture' },
  ];

  const whyUs = [
    { icon: Clock, title: 'Production-ready in Days', description: 'Not months of waiting' },
    { icon: Brain, title: 'AI-first Architecture', description: 'Not AI retrofitting' },
    { icon: Layers, title: 'Modular & Scalable', description: 'Future-proof design' },
    { icon: Factory, title: 'Industrial Expertise', description: 'Enterprise and industrial under one roof' },
    { icon: Heart, title: 'Partnership Mindset', description: 'Long-term relationship focus' },
  ];

  const coreValues = [
    { icon: Brain, title: 'Intelligence First', description: 'AI is not a feature—it is the decision layer' },
    { icon: Zap, title: 'Speed with Structure', description: 'Speed without structure is chaos' },
    { icon: Settings, title: 'Reduce Complexity', description: 'Automation should reduce cognitive load, not add it' },
    { icon: Layers, title: 'Future-Proof', description: 'Systems must be modular, adaptable, and scalable' },
  ];

  const caseStudies = [
    {
      icon: BarChart3,
      title: 'CORTANEX BI',
      client: 'Enterprise Corporation',
      industry: 'Business Intelligence',
      duration: '10 Days',
      challenge: 'Fragmented business data across multiple systems with no unified analytics or AI-driven insights.',
      solution: 'Comprehensive BI platform with executive dashboards, AI-powered insights, sales performance management, and multi-tenant administration.',
      results: [
        { metric: '85%', label: 'Faster Decisions' },
        { metric: '60%', label: 'Cost Reduction' },
        { metric: '99.5%', label: 'Data Accuracy' },
        { metric: '95%', label: 'User Adoption' },
      ],
      technologies: ['AI Analytics', 'Real-time Dashboards', 'Multi-tenant Architecture', 'Cloud Infrastructure'],
      gradient: 'from-primary to-secondary',
      color: 'text-primary'
    },
    {
      icon: Factory,
      title: 'PRODUCTION HUB',
      client: 'Industrial Manufacturing Group',
      industry: 'Manufacturing',
      duration: '10 Days',
      challenge: 'Production inefficiencies with manual workflow management and no real-time monitoring capabilities.',
      solution: 'Enterprise manufacturing execution system with real-time production monitoring, workflow automation, and AI-powered analytics.',
      results: [
        { metric: '45%', label: 'Efficiency Gain' },
        { metric: '60%', label: 'Less Downtime' },
        { metric: '99.2%', label: 'Quality Rate' },
        { metric: '75%', label: 'Faster Output' },
      ],
      technologies: ['IoT Integration', 'Workflow Engine', 'Real-time Monitoring', 'Predictive Analytics'],
      gradient: 'from-orange-500 to-red-500',
      color: 'text-orange-400'
    },
    {
      icon: Truck,
      title: 'DELIVERY HUB',
      client: 'National Logistics Company',
      industry: 'Logistics',
      duration: '8 Days',
      challenge: 'Inefficient driver assignment and route planning causing delays and high operational costs.',
      solution: 'AI-powered delivery management with intelligent driver assignment, real-time fleet tracking, and route optimization.',
      results: [
        { metric: '32%', label: 'Fuel Savings' },
        { metric: '41%', label: 'Faster Delivery' },
        { metric: '99.1%', label: 'On-time Rate' },
        { metric: '85%', label: 'Fleet Utilization' },
      ],
      technologies: ['AI Driver Assignment', 'GPS Tracking', 'Route Optimization', 'Real-time Analytics'],
      gradient: 'from-emerald-500 to-teal-500',
      color: 'text-emerald-400'
    },
    {
      icon: Settings,
      title: 'MAINTENANCE HUB',
      client: 'Industrial Operations Corp',
      industry: 'Industrial',
      duration: '9 Days',
      challenge: 'Reactive maintenance causing unexpected equipment failures and production losses.',
      solution: 'Comprehensive maintenance management with predictive scheduling, safety compliance tracking, and AI-powered analytics.',
      results: [
        { metric: '50%', label: 'Less Downtime' },
        { metric: '35%', label: 'Cost Reduction' },
        { metric: '99.8%', label: 'Compliance Rate' },
        { metric: '80%', label: 'MTBF Improvement' },
      ],
      technologies: ['Predictive Maintenance', 'IoT Sensors', 'Safety Compliance', 'AI Analytics'],
      gradient: 'from-amber-500 to-yellow-500',
      color: 'text-amber-400'
    },
    {
      icon: Briefcase,
      title: 'CORTANEX CRM',
      client: 'Enterprise Sales Organization',
      industry: 'Sales & CRM',
      duration: '10 Days',
      challenge: 'Disconnected sales processes with poor client communication tracking and no AI-driven insights.',
      solution: 'Intelligent CRM platform with AI-powered insights, sales pipeline management, and comprehensive client communications.',
      results: [
        { metric: '156%', label: 'Conversion Lift' },
        { metric: '43%', label: 'Cycle Reduction' },
        { metric: '89%', label: 'Engagement Rate' },
        { metric: '92%', label: 'Team Adoption' },
      ],
      technologies: ['AI Insights', 'Pipeline Management', 'Communication Tracking', 'Analytics Dashboard'],
      gradient: 'from-violet-500 to-purple-500',
      color: 'text-violet-400'
    },
    {
      icon: Building2,
      title: 'MANAGEMENT PORTAL',
      client: 'Enterprise Corporation',
      industry: 'Enterprise Management',
      duration: '10 Days',
      challenge: 'No unified view of workforce, strategic planning, and organizational performance metrics.',
      solution: 'Enterprise management platform with workforce management, strategic planning tools, and AI-powered decision support.',
      results: [
        { metric: '40%', label: 'Productivity Gain' },
        { metric: '65%', label: 'Faster Planning' },
        { metric: '98%', label: 'Goal Alignment' },
        { metric: '85%', label: 'Visibility Score' },
      ],
      technologies: ['OKR Framework', 'Workforce Analytics', 'AI Decision Support', 'Role-based Access'],
      gradient: 'from-indigo-500 to-blue-500',
      color: 'text-indigo-400'
    },
    {
      icon: Bot,
      title: 'AI ASSISTANCE',
      client: 'Customer Service Enterprise',
      industry: 'Customer Engagement',
      duration: '7 Days',
      challenge: 'High support ticket volume with slow response times and inconsistent customer experience.',
      solution: 'Intelligent chatbot platform with knowledge base management, multi-channel deployment, and conversation analytics.',
      results: [
        { metric: '80%', label: 'Query Resolution' },
        { metric: '24/7', label: 'Availability' },
        { metric: '92%', label: 'Satisfaction Rate' },
        { metric: '70%', label: 'Cost Reduction' },
      ],
      technologies: ['NLP', 'Knowledge Base', 'Multi-channel', 'Analytics Dashboard'],
      gradient: 'from-pink-500 to-rose-500',
      color: 'text-pink-400'
    },
    {
      icon: CreditCard,
      title: 'CORPORATE FINANCE AI',
      client: 'Multi-National Corporation',
      industry: 'Corporate Finance',
      duration: '8 Days',
      challenge: 'Manual accounting processes causing delays in financial reporting and high error rates in reconciliation.',
      solution: 'AI-powered corporate accounting system with automated reconciliation, financial reporting, and predictive cash flow management.',
      results: [
        { metric: '94%', label: 'Faster Closing' },
        { metric: '67%', label: 'Cost Reduction' },
        { metric: '99.2%', label: 'Accuracy Rate' },
        { metric: '85%', label: 'Time Savings' },
      ],
      technologies: ['Financial AI', 'Auto Reconciliation', 'Predictive Analytics', 'Cloud Infrastructure'],
      gradient: 'from-green-500 to-emerald-600',
      color: 'text-green-400'
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* Cover / Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Logo/Brand */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/60 border border-primary/30 backdrop-blur-sm mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CORTANEX AI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Intelligent Systems.
            </span>
            <br />
            <span className="text-foreground">Delivered at Speed.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            Hybrid AI & Automation Solutions for Modern Digital and Industrial Operations
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm">
              AI-Powered Systems
            </div>
            <div className="px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm">
              1-10 Day Delivery
            </div>
            <div className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm">
              Enterprise Ready
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '1-10', label: 'Days to Launch', suffix: 'days' },
              { value: '12', label: 'Months Support', suffix: 'mo' },
              { value: '99.9%', label: 'System Uptime', suffix: '' },
              { value: '24/7', label: 'Operations', suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-card/50 border border-primary/10 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </section>

      {/* Executive Overview */}
      <section className="profile-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Executive Overview</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Who We Are
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cortanex AI is a hybrid automation and artificial intelligence company that designs, builds, 
                and deploys intelligent software systems for modern businesses. We specialize in transforming 
                complex operations into streamlined, AI-driven systems that operate with speed, precision, and scalability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Unlike traditional software companies, Cortanex AI delivers functional, production-ready beta 
                systems in as little as <span className="text-primary font-semibold">1 to 10 working days</span>, 
                without compromising architectural integrity or future scalability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our solutions are designed to evolve—supported by a structured 
                <span className="text-secondary font-semibold"> 12-month modification and support program</span> that 
                ensures long-term operational success.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
              <div className="relative p-8 rounded-3xl bg-card/80 border border-primary/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Brain, label: 'AI-Powered', value: 'Systems' },
                    { icon: Zap, label: 'Rapid', value: 'Deployment' },
                    { icon: Shield, label: 'Enterprise', value: 'Security' },
                    { icon: TrendingUp, label: 'Scalable', value: 'Architecture' },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-background/50">
                      <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="text-lg font-semibold text-foreground">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Philosophy */}
      <section className="profile-section py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Vision, Mission & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Philosophy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Vision */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become a global leader in intelligent system design—where artificial intelligence, 
                automation, and software operate as one cohesive operational brain for modern enterprises.
              </p>
            </div>

            {/* Mission */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To simplify complexity by designing and delivering AI-powered systems that improve efficiency, 
                reduce operational friction, and enable businesses to scale with confidence and clarity.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="p-8 rounded-2xl bg-card/60 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Philosophy</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, i) => (
                <div key={i} className="text-center p-6 rounded-xl bg-background/50 hover:bg-primary/5 transition-colors">
                  <value.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Services */}
      <section className="profile-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Settings className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What We <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Do</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From rapid software development to industrial AI integration, we deliver end-to-end solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-2xl bg-card/60 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="profile-section py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent">Field-Agnostic Capability</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Industries We <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our expertise is not limited to a single domain. We operate across multiple industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-xl bg-card/60 border border-primary/10 hover:border-primary/30 transition-all duration-300 text-center"
              >
                <industry.icon className={`w-10 h-10 ${industry.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <h4 className="font-semibold text-foreground text-sm">{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Case Studies */}
      <section className="profile-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Portfolio & Case Studies</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Proven <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Results</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real projects. Real impact. See how we've transformed operations across industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((study, i) => (
              <div 
                key={i} 
                className="group relative p-6 rounded-2xl bg-card/60 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-glow overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${study.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <study.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{study.title}</h3>
                        <p className="text-sm text-muted-foreground">{study.client}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${study.gradient} text-primary-foreground font-medium`}>
                        {study.industry}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {study.duration}
                      </span>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-3 mb-6">
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <p className="text-xs font-semibold text-destructive/80 mb-1">THE CHALLENGE</p>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-xs font-semibold text-primary mb-1">OUR SOLUTION</p>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {study.results.map((result, j) => (
                      <div key={j} className="text-center p-2 rounded-lg bg-background/50">
                        <div className={`text-lg font-bold ${study.color}`}>{result.metric}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '98%', label: 'Client Satisfaction' },
                { value: '95%', label: 'Efficiency Improvement' },
                { value: '15+', label: 'Industries Served' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="profile-section py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Workflow className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Our Methodology</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              How We <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our methodology is designed for speed, clarity, and reliability.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />
            
            <div className="space-y-8">
              {methodology.map((step, i) => (
                <div key={i} className={`relative flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Step Number */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary items-center justify-center z-10">
                    <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="p-6 rounded-xl bg-card/60 border border-primary/10 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3 md:hidden mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-foreground">{step.step}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Cortanex AI */}
      <section className="profile-section py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Why <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Cortanex AI</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-card/60 border border-primary/10 hover:border-primary/30 transition-all text-center group">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="profile-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Cpu className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary">Technology Stack</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Technology <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Overview</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-full bg-card/60 border border-primary/10 hover:border-primary/30 transition-all">
                <tech.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{tech.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="profile-section py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Engagement <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Models</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Rapid Fixed-Scope Builds', description: 'Fast delivery with defined scope' },
              { icon: Brain, title: 'Long-term AI Partnerships', description: 'Ongoing AI development and support' },
              { icon: Building2, title: 'Enterprise System Development', description: 'Large-scale enterprise solutions' },
              { icon: Factory, title: 'Industrial AI Integration', description: 'Production line and industrial AI' },
            ].map((model, i) => (
              <div key={i} className="p-6 rounded-xl bg-card/60 border border-primary/10 hover:border-primary/30 transition-all text-center group">
                <model.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-foreground mb-2">{model.title}</h4>
                <p className="text-sm text-muted-foreground">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="profile-section py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
            
            <div className="relative z-10">
              <Brain className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Cortanex AI exists to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">simplify complexity.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We build intelligent systems that work—fast, reliably, and at scale.
              </p>
              <p className="text-2xl font-orbitron font-bold text-foreground mb-8">
                Let's build something intelligent.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 px-8 py-6 text-lg shadow-glow"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-orbitron font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CORTANEX AI
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Intelligent Systems. Delivered at Speed.
          </p>
          <p className="text-muted-foreground/60 text-xs">
          © {new Date().getFullYear()} Cortanex AI. All rights reserved.
        </p>
        </div>
      </footer>
    </div>
  );
};

export default CompanyProfile;
