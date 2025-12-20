import { LucideIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      <AccordionItem value="item-1" className="border border-primary/10 rounded-xl overflow-hidden bg-card/30 hover:bg-card/50 transition-colors data-[state=open]:bg-card/60">
        <AccordionTrigger className="hover:no-underline group px-4 py-3">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
              <Icon className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-medium text-foreground text-left flex-1">{title}</span>
            <Badge variant="outline" className="text-xs text-muted-foreground border-muted-foreground/20 hidden sm:flex">
              {features.length} features
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 pb-4 pt-1">
            <div className="grid sm:grid-cols-2 gap-2.5 pl-12">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="p-3 rounded-lg bg-background/50 border border-primary/5 hover:border-primary/20 hover:bg-background/80 transition-all group/feature"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 group-hover/feature:scale-110 transition-transform" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-0.5">{feature.name}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
