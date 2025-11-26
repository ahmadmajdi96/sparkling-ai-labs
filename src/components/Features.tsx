import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Real-time data processing and analysis',
  'Scalable cloud infrastructure',
  'Advanced natural language processing',
  'Computer vision capabilities',
  'Predictive analytics and forecasting',
  'Seamless integration with existing systems',
];

export const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Choose NeuralTech?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We combine cutting-edge technology with industry expertise to deliver AI solutions
              that drive real business value. Our platform is built for scale, security, and performance.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/20 p-8 flex items-center justify-center">
              <div className="w-full h-full bg-card/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
                <span className="text-6xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent z-10">
                  AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
