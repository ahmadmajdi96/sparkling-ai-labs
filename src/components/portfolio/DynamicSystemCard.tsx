import { ImageAlbum } from './ImageAlbum';
import { FeatureCategory } from './FeatureCategory';
import { Badge } from '@/components/ui/badge';
import { Layers, Sparkles, LucideIcon } from 'lucide-react';
import { PortfolioSystem } from '@/hooks/usePortfolioData';
import * as LucideIcons from 'lucide-react';

// Map icon string names to actual components
const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  return iconMap[iconName] || Layers;
};

interface DynamicSystemCardProps {
  system: PortfolioSystem;
}

export const DynamicSystemCard = ({ system }: DynamicSystemCardProps) => {
  const Icon = getIconComponent(system.icon);
  const totalFeatures = system.categories.reduce((acc, cat) => acc + cat.features.length, 0);
  
  return (
    <div className="space-y-8">
      {/* System Header */}
      <div className="relative p-6 md:p-8 rounded-3xl bg-card/60 border border-primary/10 overflow-hidden group hover:border-primary/30 transition-all duration-500">
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${system.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />
        <div className={`absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr ${system.gradient} opacity-5 blur-3xl`} />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* System Info */}
            <div className="flex-1">
              {/* Header with icon and badges */}
              <div className="flex flex-wrap items-start gap-4 mb-6">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${system.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-1 truncate">
                    {system.name}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">{system.tagline}</p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <Layers className="w-3 h-3 mr-1" />
                  {system.categories.length} Modules
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {totalFeatures} Features
                </Badge>
              </div>
              
              {/* Description */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {system.description}
              </p>
            </div>

            {/* Screenshot Album */}
            {system.screenshots.length > 0 && (
              <div className="lg:w-80 xl:w-96 flex-shrink-0">
                <div className="rounded-2xl overflow-hidden border border-primary/10 bg-card/30">
                  <ImageAlbum images={system.screenshots} alt={system.name} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      {system.categories.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2 mb-4">
            <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${system.gradient}`} />
            <h3 className="text-lg font-semibold text-foreground">System Modules</h3>
            <span className="text-sm text-muted-foreground">({system.categories.length})</span>
          </div>
          
          <div className="grid gap-3">
            {system.categories.map((category, i) => {
              const CategoryIcon = getIconComponent(category.icon);
              return (
                <FeatureCategory
                  key={category.id}
                  icon={CategoryIcon}
                  title={category.title}
                  features={category.features.map(f => ({ name: f.name, description: f.description }))}
                  gradient={category.gradient}
                  defaultOpen={i === 0}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
