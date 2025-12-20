import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, BarChart3, Bot, Users, Calculator, Shield, Building2, UserCheck,
  Sparkles, LineChart, FileText, Target, Clock, Zap, Database, Settings
} from 'lucide-react';
import { SystemCard } from '@/components/portfolio/SystemCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

// CORTANEX BI System Data
const cortanexBISystem = {
  name: 'CORTANEX BI',
  tagline: 'Business Intelligence & Analytics Platform',
  description: 'A comprehensive business intelligence platform that combines executive analytics, AI-powered insights, sales performance management, workforce intelligence, and multi-tenant administration into one cohesive system.',
  icon: BarChart3,
  gradient: 'from-primary to-secondary',
  // Placeholder screenshots - replace with actual screenshots
  screenshots: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format',
  ],
  categories: [
    {
      icon: LineChart,
      title: '1. Executive Intelligence & Analytics',
      gradient: 'from-primary to-secondary',
      features: [
        { name: 'Executive Overview Dashboard', description: 'Real-time business health snapshot with MRR, growth rate, and cash runway metrics' },
        { name: 'KPI Management System', description: 'Professional taxonomy (Strategic, Operational, Financial, Customer, Process) with drill-downs and filtering' },
        { name: 'Enhanced KPI Cards', description: 'Visual indicators for trends, targets, and performance variance' },
      ]
    },
    {
      icon: Bot,
      title: '2. AI-Powered Insights',
      gradient: 'from-secondary to-accent',
      features: [
        { name: 'AI Business Assistant', description: 'Conversational agent for business analysis and recommendations' },
        { name: 'Document Analysis', description: 'Upload Word/PowerPoint files for AI-driven contextual insights' },
        { name: 'Decision Intelligence', description: 'Track decisions with AI risk/advantage analysis' },
      ]
    },
    {
      icon: Target,
      title: '3. Sales Performance Management',
      gradient: 'from-accent to-primary',
      features: [
        { name: 'Deal Pipeline (Kanban)', description: 'Visual sales pipeline with drag-and-drop stage management' },
        { name: 'Salesperson Directory', description: 'Team roster with roles, status, and contact information' },
        { name: 'Activity Tracking', description: 'Log calls, meetings, emails, and presentations' },
        { name: 'Performance Ratings', description: 'Score salespeople with rating levels and periods' },
        { name: 'Revenue Forecasting', description: 'Project revenue with confidence levels' },
        { name: 'Quota Management', description: 'Set and track sales quotas by person/team' },
      ]
    },
    {
      icon: Users,
      title: '4. Workforce Intelligence',
      gradient: 'from-primary to-accent',
      features: [
        { name: 'Employee Directory', description: 'Complete employee management with profiles' },
        { name: 'Organization Chart', description: 'Visual hierarchy with reporting relationships' },
        { name: 'Performance Analytics', description: 'Timeliness, quality, collaboration scoring' },
        { name: 'AI Insights', description: 'Automated alerts for burnout risk, promotion candidates, training needs' },
      ]
    },
    {
      icon: Calculator,
      title: '5. Financial Planning',
      gradient: 'from-secondary to-primary',
      features: [
        { name: 'Scenario Modeling', description: 'Interactive sliders for growth/churn projections' },
        { name: 'Runway Calculator', description: 'Project cash runway based on variables' },
        { name: 'Billing Management', description: 'Plan tiers and payment tracking' },
      ]
    },
    {
      icon: Shield,
      title: '6. Governance & Compliance',
      gradient: 'from-accent to-secondary',
      features: [
        { name: 'Rules & Policies Manager', description: 'Create, categorize, and export business rules' },
        { name: 'Alert System', description: 'Configurable notifications for business events' },
        { name: 'Document Repository', description: 'Secure file storage with MinIO cloud integration' },
      ]
    },
    {
      icon: Building2,
      title: '7. Multi-Tenant Administration',
      gradient: 'from-primary to-secondary',
      features: [
        { name: 'Company Management', description: 'Create/edit multiple companies per user' },
        { name: 'Data Isolation', description: 'Row-Level Security ensures complete data separation' },
        { name: 'Company Switching', description: 'Quick toggle between companies from header' },
        { name: 'User Authentication', description: 'Secure login/signup with email confirmation' },
        { name: 'Profile Management', description: 'User profiles with avatar and preferences' },
        { name: 'Admin Settings', description: 'Regional settings (USD, SAR, JOD), roles, configurations' },
      ]
    },
    {
      icon: UserCheck,
      title: '8. Customer Management',
      gradient: 'from-secondary to-accent',
      features: [
        { name: 'Customer Directory', description: 'Track customer accounts and relationships' },
        { name: 'Customer Insights', description: 'View engagement and revenue metrics' },
      ]
    },
  ]
};

const Portfolio = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.portfolio-section').forEach((section: any) => {
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

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Our Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            Explore our suite of intelligent systems designed to transform your business operations
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '8+', label: 'Feature Categories' },
              { value: '30+', label: 'Core Features' },
              { value: 'AI', label: 'Powered Insights' },
              { value: '24/7', label: 'Operations' },
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
      </section>

      {/* CORTANEX BI System */}
      <section className="portfolio-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SystemCard {...cortanexBISystem} />
        </div>
      </section>

      {/* More Systems Coming Soon */}
      <section className="portfolio-section py-24 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm text-secondary">Coming Soon</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            More <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Systems</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're continuously expanding our portfolio with more intelligent systems across different industries and use cases.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
