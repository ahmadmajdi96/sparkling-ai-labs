import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, BarChart3, Bot, Users, Calculator, Shield, Building2, UserCheck,
  Sparkles, LineChart, FileText, Target, Clock, Zap, Database, Settings,
  Factory, Cog, Monitor, AlertTriangle, Wrench, HardDrive, User, 
  CalendarDays, ClipboardCheck, DollarSign, Key, Search, LayoutDashboard, Bell,
  Truck, MapPin, Package, Smartphone, Star, Lock, Map, Route
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

// PRODUCTION HUB System Data
const productionHubSystem = {
  name: 'PRODUCTION HUB',
  tagline: 'Enterprise Manufacturing Management Platform',
  description: 'A comprehensive manufacturing execution system that provides real-time production monitoring, workflow automation, resource management, and AI-powered analytics for modern factories and production facilities.',
  icon: Factory,
  gradient: 'from-orange-500 to-red-500',
  screenshots: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format',
    'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format',
    'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&auto=format',
    'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=800&auto=format',
  ],
  categories: [
    {
      icon: Factory,
      title: '1. Production Operations',
      gradient: 'from-orange-500 to-red-500',
      features: [
        { name: 'Production Line Management', description: 'Create, configure, and manage multiple production lines with capacity targets' },
        { name: 'Manager Assignment', description: 'Assign managers and track operational status (active/inactive/maintenance)' },
        { name: 'Real-time Progress Monitoring', description: 'Live production progress tracking across all lines' },
        { name: 'Section Management', description: 'Organize production lines into logical sections with capacity and resource allocation' },
        { name: 'Section Performance Metrics', description: 'Track section-level performance and efficiency metrics' },
        { name: 'Station Management', description: 'Physical workstation configuration with multi-workflow assignment' },
        { name: 'Dynamic Workflow Ordering', description: 'Configure workflow sequencing and status tracking per station' },
      ]
    },
    {
      icon: Cog,
      title: '2. Workflow Engine',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { name: 'Automated Steps', description: 'Configure machine-driven operations with duration parameters and hardware/software resources' },
        { name: 'Manual Steps', description: 'Define human-operator tasks with skill requirements and time estimation' },
        { name: 'Semi-Automated Steps', description: 'Hybrid human-machine operations with coordinated resource allocation' },
        { name: 'Visual Workflow Builder', description: 'Drag-and-drop workflow design with step sequencing and dependencies' },
        { name: 'Workflow-to-Station Assignment', description: 'Assign workflows to specific stations with resource allocation per step' },
      ]
    },
    {
      icon: Monitor,
      title: '3. Real-Time Monitoring & Intelligence',
      gradient: 'from-green-500 to-emerald-500',
      features: [
        { name: 'Live Production Feed', description: 'Real-time event streaming with categorization (start/complete/error)' },
        { name: 'Machine Status Dashboard', description: 'Real-time machine health, efficiency tracking, and output metrics' },
        { name: 'Critical Alerts System', description: 'Severity-based classification with acknowledgment and resolution workflow' },
        { name: 'Bottleneck Detection', description: 'Automatic identification with impact assessment and delay estimation' },
        { name: 'Production Performance Analytics', description: 'Efficiency trends, target vs actual comparison, and quality rate tracking' },
      ]
    },
    {
      icon: Wrench,
      title: '4. Resource Management',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        { name: 'Hardware Asset Management', description: 'Inventory tracking with IP address, protocol configuration, and warranty tracking' },
        { name: 'Software Asset Management', description: 'Version tracking, license management, and deployment status' },
        { name: 'Operator Management', description: 'Operator profiles, skill sets, certification tracking, and performance monitoring' },
        { name: 'Workstation Assignment', description: 'Dynamic operator-to-workstation assignment based on skills' },
      ]
    },
    {
      icon: CalendarDays,
      title: '5. Employee Portal',
      gradient: 'from-indigo-500 to-violet-500',
      features: [
        { name: 'Shift Scheduling', description: 'Shift pattern configuration with employee assignment and conflict detection' },
        { name: 'Attendance Management', description: 'Clock-in/clock-out tracking with history and exception handling' },
        { name: 'No-Pay Roles & Time Tracking', description: 'Unpaid leave tracking with approval workflows and reporting' },
        { name: 'Reports & Analytics', description: 'Attendance reports, performance reports, and custom report generation' },
        { name: 'Access Control', description: 'Role-based permissions with department-based access and audit logging' },
      ]
    },
    {
      icon: Search,
      title: '6. Data & Compliance',
      gradient: 'from-teal-500 to-cyan-500',
      features: [
        { name: 'Traceability System', description: 'Unique item identifier tracking with full production journey visibility' },
        { name: 'Step-by-Step Audit Trail', description: 'Station-level tracking with compliance documentation' },
        { name: 'Standalone Auditor Access', description: 'Secure access portal for external auditors' },
        { name: 'Database API Portal', description: 'Schema visualization with REST API endpoint management' },
        { name: 'Query Interface', description: 'Data query interface with export capabilities' },
      ]
    },
    {
      icon: Bot,
      title: '7. AI-Powered Features',
      gradient: 'from-primary to-secondary',
      features: [
        { name: 'AI Assistant', description: 'Natural language queries for operational insights and data analysis' },
        { name: 'Contextual Recommendations', description: '24/7 AI-powered suggestions and assistance' },
        { name: 'Predictive Insights', description: 'Trend analysis and anomaly detection for proactive management' },
        { name: 'Performance Optimization', description: 'AI-driven suggestions for improving production efficiency' },
      ]
    },
    {
      icon: LayoutDashboard,
      title: '8. Platform Infrastructure',
      gradient: 'from-gray-500 to-slate-600',
      features: [
        { name: 'Multi-Dashboard Architecture', description: 'Employee, Factory, and Executive dashboards for different user roles' },
        { name: 'Notification System', description: 'In-app notifications with alert escalation and event-based triggers' },
        { name: 'User Profile Management', description: 'Profile customization, preferences, and activity history' },
        { name: 'Modular Architecture', description: 'Scalable design supporting growth from SMB to enterprise' },
        { name: 'Third-Party Integration', description: 'Database API enables seamless connectivity with external systems' },
      ]
    },
  ]
};

// DELIVERY MANAGEMENT System Data
const deliveryManagementSystem = {
  name: 'DELIVERY HUB',
  tagline: 'AI-Powered Delivery Management Platform',
  description: 'An intelligent delivery management system with AI-powered driver assignment, real-time fleet tracking, route optimization, and comprehensive analytics for modern logistics operations.',
  icon: Truck,
  gradient: 'from-emerald-500 to-teal-500',
  screenshots: [
    'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format',
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&auto=format',
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&auto=format',
  ],
  categories: [
    {
      icon: Users,
      title: '1. User & Access Management',
      gradient: 'from-emerald-500 to-teal-500',
      features: [
        { name: 'Role-Based Access Control', description: 'Four distinct user roles: Owner, Manager, Supervisor, Driver' },
        { name: 'Secure Authentication', description: 'Email/password login with session management' },
        { name: 'User Management Portal', description: 'Add, edit, and manage team members and permissions' },
        { name: 'Driver Portal Access', description: 'One-click access to any driver\'s mobile interface' },
      ]
    },
    {
      icon: LayoutDashboard,
      title: '2. Executive Dashboards',
      gradient: 'from-blue-500 to-indigo-500',
      features: [
        { name: 'Owner Dashboard', description: 'Global system oversight with financial metrics and AI policy controls' },
        { name: 'Manager Dashboard', description: 'Operational control with driver assignment and live monitoring' },
        { name: 'Supervisor Dashboard', description: 'Field-level oversight with real-time alerts and driver communication' },
        { name: 'KPI Stat Cards', description: 'Live metrics: deliveries, active drivers, on-time rate, revenue, pending issues' },
      ]
    },
    {
      icon: Truck,
      title: '3. Fleet & Driver Management',
      gradient: 'from-orange-500 to-amber-500',
      features: [
        { name: 'Driver Registry', description: 'Complete driver profiles with vehicle info and contact details' },
        { name: 'Status Tracking', description: 'Real-time status: Available, En Route, Delivering, On Break, Offline' },
        { name: 'Performance Scoring', description: 'Automated driver scoring based on delivery history' },
        { name: 'Driver Route Preview', description: 'View driver\'s current delivery route with all stops' },
        { name: 'Quick Actions', description: 'Direct call/message drivers from dashboard' },
      ]
    },
    {
      icon: Package,
      title: '4. Order & Delivery Management',
      gradient: 'from-violet-500 to-purple-500',
      features: [
        { name: 'Order Creation', description: 'Create orders with customer details, items, and delivery notes' },
        { name: 'Order Status Pipeline', description: 'Pending → Assigned → Picked Up → In Transit → Delivered' },
        { name: 'COD Support', description: 'Cash-on-delivery amount tracking' },
        { name: 'Delivery Zones', description: 'Geographic zone assignment for orders' },
        { name: 'Bulk Order Management', description: 'Search, filter, and export order data' },
      ]
    },
    {
      icon: Bot,
      title: '5. AI-Powered Automation',
      gradient: 'from-primary to-secondary',
      features: [
        { name: 'AI Driver Assignment', description: 'Intelligent driver selection based on location, load, and performance' },
        { name: 'Confidence Scoring', description: 'AI recommendations with confidence percentages' },
        { name: 'Route Optimization', description: 'Multi-driver route comparison with distance and time estimates' },
        { name: 'Intelligent Batching', description: 'Auto-group orders by proximity for efficiency' },
        { name: 'AI Decision Logging', description: 'Full audit trail of AI recommendations and overrides' },
        { name: 'AI Controls Panel', description: 'Configure automation thresholds and policies' },
      ]
    },
    {
      icon: Map,
      title: '6. Live Tracking & Maps',
      gradient: 'from-cyan-500 to-sky-500',
      features: [
        { name: 'Real-Time Fleet Map', description: 'Live driver positions with status indicators' },
        { name: 'Route Visualization', description: 'View optimized delivery routes on interactive maps' },
        { name: 'Driver Position Updates', description: 'GPS tracking every 30 seconds' },
        { name: 'Pulsing Location Markers', description: 'Animated driver positions for visual clarity' },
        { name: 'Zone Boundaries', description: 'Delivery zone overlays on maps' },
      ]
    },
    {
      icon: Smartphone,
      title: '7. Driver Mobile Application',
      gradient: 'from-rose-500 to-pink-500',
      features: [
        { name: 'Delivery Queue', description: 'Ordered list of assigned deliveries' },
        { name: 'Turn-by-Turn Navigation', description: 'Direct integration with device navigation' },
        { name: 'Status Updates', description: 'One-tap status changes (picked up, in transit, delivered)' },
        { name: 'Issue Reporting', description: 'Report delivery problems with notes' },
        { name: 'Proof of Delivery', description: 'Camera capture with GPS timestamp' },
        { name: 'Offline Support', description: 'Continue working during connectivity issues' },
      ]
    },
    {
      icon: Star,
      title: '8. Customer Experience',
      gradient: 'from-yellow-500 to-orange-500',
      features: [
        { name: 'Live Tracking Link', description: 'Unique URL for customers to track their delivery' },
        { name: 'Real-Time Driver Location', description: 'See driver approaching on map' },
        { name: 'Delivery Timeline', description: 'Step-by-step progress updates' },
        { name: 'ETA Display', description: 'Estimated time of arrival' },
        { name: 'Feedback & Rating', description: 'Post-delivery rating and comments' },
      ]
    },
    {
      icon: LineChart,
      title: '9. Analytics & Reporting',
      gradient: 'from-indigo-500 to-violet-500',
      features: [
        { name: 'Delivery Analytics', description: 'Weekly/monthly delivery volume charts' },
        { name: 'Revenue Tracking', description: 'Daily and trend-based revenue visualization' },
        { name: 'Performance Metrics', description: 'On-time rates, average delivery times' },
        { name: 'Driver Performance', description: 'Individual driver statistics and rankings' },
        { name: 'AI Insights Panel', description: 'System recommendations and anomaly detection' },
      ]
    },
    {
      icon: Settings,
      title: '10. System Administration',
      gradient: 'from-gray-500 to-slate-600',
      features: [
        { name: 'Settings Panel', description: 'System-wide configuration options' },
        { name: 'Delivery Zone Management', description: 'Create and manage geographic zones' },
        { name: 'Audit Logging', description: 'Track all system changes and user actions' },
        { name: 'Customer Database', description: 'Manage customer profiles and addresses' },
      ]
    },
    {
      icon: Lock,
      title: '11. Security & Compliance',
      gradient: 'from-red-500 to-rose-600',
      features: [
        { name: 'Row-Level Security', description: 'Database-level access controls' },
        { name: 'Session Management', description: 'Secure authentication tokens' },
        { name: 'Data Encryption', description: 'Secure data transmission' },
        { name: 'Location Privacy', description: 'Controlled access to driver GPS data' },
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

      {/* PRODUCTION HUB System */}
      <section className="portfolio-section py-24 px-4 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-6xl mx-auto">
          <SystemCard {...productionHubSystem} />
        </div>
      </section>

      {/* DELIVERY HUB System */}
      <section className="portfolio-section py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SystemCard {...deliveryManagementSystem} />
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
