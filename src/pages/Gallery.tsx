import React, { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '@/data/galleryData';
import { getMediaUrl } from '@/utils/media';
import { Award, Camera, Newspaper, X, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'project' | 'event' | 'press' | 'csr'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-28 pb-24 text-[#0E1520]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Hero Banner */}
        <div className="rounded-[32px] sm:rounded-[36px] bg-[#0E1520] text-white p-8 sm:p-14 mb-10 border border-white/10 relative overflow-hidden shadow-2xl text-center">
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/10 text-[#D4E845] border border-white/15">
              Visual Archive &middot; 4 Decades of Jaipur Milestones
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
              Architecture, Milestones &amp; CSR
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-light max-w-xl mx-auto">
              A photographic retrospective of Kedia's completed landmarks, foundation ceremonies, media features, and community stewardship.
            </p>

            {/* Filter Pills matching exact prompt requirements */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', label: 'All Archives' },
                { id: 'project', label: 'Project Gallery' },
                { id: 'event', label: 'Event Gallery' },
                { id: 'press', label: 'Press Release' },
                { id: 'csr', label: 'CSR & Sustainability' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as any)}
                  className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all ${
                    filter === tab.id
                      ? 'bg-[#D4E845] text-[#0E1520] font-bold shadow-md'
                      : 'bg-white/10 text-slate-300 hover:text-white border border-white/15'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveItem(item)}
              className="bg-white rounded-[28px] overflow-hidden border border-[#E5E7EB] shadow-2xs hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-64 bg-[#0E1520] overflow-hidden">
                <img
                  src={getMediaUrl(item.path, 600)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1520]/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-[#0E1520]/90 backdrop-blur-md text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase border border-white/20">
                  {item.category}
                </span>
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#D4E845] text-[#0E1520] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-4 bg-white text-xs font-mono">
                <span className="font-display font-bold text-[#0E1520] line-clamp-1 text-sm">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1520]/95 backdrop-blur-md animate-fadeIn">
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 text-white hover:text-[#D4E845] p-2 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="max-w-4xl max-h-[85vh] p-4 text-center space-y-4">
              <img
                src={getMediaUrl(activeItem.path, 1920)}
                alt={activeItem.title}
                className="max-h-[75vh] w-auto mx-auto object-contain rounded-[24px] shadow-2xl border border-white/10"
              />
              <div className="text-white font-display font-bold text-lg">
                {activeItem.title} &middot; <span className="uppercase text-xs font-mono text-[#D4E845]">{activeItem.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
