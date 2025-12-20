import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageAlbumProps {
  images: string[];
  alt?: string;
}

export const ImageAlbum = ({ images, alt = 'Screenshot' }: ImageAlbumProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // iMessage-style grid layout
  const getGridLayout = () => {
    const count = images.length;
    
    if (count === 1) {
      return (
        <div 
          className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={images[0]} 
            alt={`${alt} 1`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
          {images.map((img, i) => (
            <div 
              key={i}
              className="relative aspect-square cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(i)}
            >
              <img 
                src={img} 
                alt={`${alt} ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
          <div 
            className="relative row-span-2 aspect-[9/16] cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <img 
              src={images[0]} 
              alt={`${alt} 1`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {images.slice(1).map((img, i) => (
            <div 
              key={i}
              className="relative aspect-square cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(i + 1)}
            >
              <img 
                src={img} 
                alt={`${alt} ${i + 2}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      );
    }

    // 4+ images: 2x2 grid with "+X more" overlay on the last visible
    const displayImages = images.slice(0, 4);
    const remaining = images.length - 4;

    return (
      <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden">
        {displayImages.map((img, i) => (
          <div 
            key={i}
            className="relative aspect-square cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(i)}
          >
            <img 
              src={img} 
              alt={`${alt} ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {i === 3 && remaining > 0 && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">+{remaining}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {getGridLayout()}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl w-full h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-primary/20">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-card/80 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 z-50 p-3 rounded-full bg-card/80 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 z-50 p-3 rounded-full bg-card/80 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main image */}
            <img
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card/80 border border-primary/20">
              <span className="text-sm text-foreground">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/10">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                      i === currentIndex 
                        ? "border-primary scale-110" 
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
