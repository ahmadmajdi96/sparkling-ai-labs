import { LucideIcon } from 'lucide-react';
import { ImageAlbum } from './ImageAlbum';
import { FeatureCategory } from './FeatureCategory';

interface Feature {
  name: string;
  description: string;
}

interface Category {
  icon: LucideIcon;
  title: string;
  features: Feature[];
  gradient?: string;
}

interface SystemCardProps {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  screenshots: string[];
  categories: Category[];
}

export const SystemCard = ({
  name,
  tagline,
  description,
  icon: Icon,
  gradient,
  screenshots,
  categories
}: SystemCardProps) => {
  return (
    <div className="space-y-8">
      {/* System Header */}
      <div className="relative p-8 rounded-3xl bg-card/60 border border-primary/10 overflow-hidden">
        {/* Background glow */}
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${gradient} opacity-10 blur-3xl`} />
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* System Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {name}
                  </h2>
                  <p className="text-muted-foreground">{tagline}</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Screenshot Album */}
            <div className="lg:w-96">
              <ImageAlbum images={screenshots} alt={name} />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      <div className="grid gap-4">
        {categories.map((category, i) => (
          <FeatureCategory
            key={i}
            icon={category.icon}
            title={category.title}
            features={category.features}
            gradient={category.gradient}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
};
