import { LucideIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';

interface Feature {
  name: string;
  description: string;
}

interface FeatureCategoryProps {
  icon: LucideIcon;
  title: string;
  features: Feature[];
  gradient?: string;
  defaultOpen?: boolean;
}

export const FeatureCategory = ({ 
  icon: Icon, 
  title, 
  features, 
  gradient = 'from-primary to-secondary',
  defaultOpen = false 
}: FeatureCategoryProps) => {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? 'item-1' : undefined}>
      <AccordionItem value="item-1" className="border-primary/10">
        <AccordionTrigger className="hover:no-underline group py-4">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground text-left">{title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-14 space-y-3">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-card/40 border border-primary/5 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
