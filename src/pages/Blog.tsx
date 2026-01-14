import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, Factory, Truck, BarChart3, Bot, Cpu, 
  ArrowRight, Calendar, Clock, User, TrendingUp,
  Zap, Shield, Settings
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  icon: React.ElementType;
  date: string;
  readTime: string;
  author: string;
  gradient: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 'ai-manufacturing-revolution',
    title: 'How AI is Revolutionizing Manufacturing Operations',
    excerpt: 'Discover how artificial intelligence is transforming production lines, reducing downtime, and improving quality control in modern manufacturing facilities.',
    category: 'Manufacturing',
    icon: Factory,
    date: 'January 10, 2026',
    readTime: '8 min read',
    author: 'CortaNex Team',
    gradient: 'from-orange-500 to-red-500',
    featured: true,
  },
  {
    id: 'business-intelligence-guide',
    title: 'The Complete Guide to AI-Powered Business Intelligence',
    excerpt: 'Learn how to leverage AI-driven analytics to make faster, data-backed decisions and gain competitive advantages in your industry.',
    category: 'Business Intelligence',
    icon: BarChart3,
    date: 'January 8, 2026',
    readTime: '10 min read',
    author: 'CortaNex Team',
    gradient: 'from-primary to-secondary',
    featured: true,
  },
  {
    id: 'logistics-optimization',
    title: 'AI-Driven Logistics: Optimizing Delivery Routes in Real-Time',
    excerpt: 'Explore how machine learning algorithms can reduce fuel costs, improve delivery times, and enhance fleet utilization for logistics companies.',
    category: 'Logistics',
    icon: Truck,
    date: 'January 5, 2026',
    readTime: '6 min read',
    author: 'CortaNex Team',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'rapid-development-methodology',
    title: 'From Concept to Production in 10 Days: Our Rapid Development Approach',
    excerpt: 'An inside look at how CortaNex delivers fully functional AI-powered systems in just 1-10 working days without sacrificing quality.',
    category: 'Development',
    icon: Zap,
    date: 'January 3, 2026',
    readTime: '7 min read',
    author: 'CortaNex Team',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance: Preventing Equipment Failures Before They Happen',
    excerpt: 'How IoT sensors and AI analytics work together to predict equipment failures, reduce maintenance costs, and extend asset lifecycles.',
    category: 'Industrial',
    icon: Settings,
    date: 'December 28, 2025',
    readTime: '9 min read',
    author: 'CortaNex Team',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'ai-chatbots-customer-service',
    title: 'Building Intelligent Chatbots That Actually Help Customers',
    excerpt: 'Best practices for designing AI assistants that understand context, resolve issues efficiently, and improve customer satisfaction.',
    category: 'Customer Service',
    icon: Bot,
    date: 'December 22, 2025',
    readTime: '8 min read',
    author: 'CortaNex Team',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'enterprise-ai-security',
    title: 'Security Best Practices for Enterprise AI Systems',
    excerpt: 'Essential security considerations when implementing AI solutions in enterprise environments, from data protection to model security.',
    category: 'Security',
    icon: Shield,
    date: 'December 18, 2025',
    readTime: '11 min read',
    author: 'CortaNex Team',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'future-of-automation',
    title: 'The Future of Business Automation: 2026 Trends and Predictions',
    excerpt: 'What to expect in the rapidly evolving landscape of business automation, from generative AI to autonomous decision-making systems.',
    category: 'Industry Trends',
    icon: TrendingUp,
    date: 'December 15, 2025',
    readTime: '12 min read',
    author: 'CortaNex Team',
    gradient: 'from-cyan-500 to-sky-500',
  },
];

const Blog = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.blog-card').forEach((card: any, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background relative">
      <WebGLBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Insights & Updates</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CortaNex Blog
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights on AI automation, business intelligence, and digital transformation for modern enterprises.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Featured Articles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="blog-card group relative overflow-hidden bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${post.gradient}`} />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${post.gradient}`}>
                      <post.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {post.category}
                    </Badge>
                    <Badge variant="outline" className="border-secondary/30 text-secondary">
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-secondary" />
            Latest Articles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="blog-card group relative overflow-hidden bg-card/50 border-border/50 hover:border-primary/40 transition-all duration-300">
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${post.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${post.gradient} opacity-80`}>
                      <post.icon className="w-4 h-4 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <CardContent className="relative p-8 md:p-12 text-center">
              <Brain className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Get the latest insights on AI automation, industry trends, and digital transformation delivered to your inbox.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">
                  Subscribe to Updates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
