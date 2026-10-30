import React from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { formatINR, getMediaUrl } from '@/utils/media';
import { X, Heart, Trash2, ArrowRight, Home } from 'lucide-react';

export const ShortlistDrawer: React.FC = () => {
  const { navigate } = useRouter();
  const {
    units,
    shortlist,
    toggleShortlist,
    clearShortlist,
    isShortlistDrawerOpen,
    setShortlistDrawerOpen,
  } = useStore();

  if (!isShortlistDrawerOpen) return null;

  const shortlistedUnits = units.filter(u => shortlist.includes(u.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E1520]/75 backdrop-blur-sm transition-opacity"
        onClick={() => setShortlistDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0E1520] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 fill-[#D4E845] text-[#D4E845]" />
              <h2 className="text-lg font-display font-bold text-white">Shortlisted Properties</h2>
              <span className="bg-[#D4E845]/20 text-[#D4E845] text-xs font-mono px-2.5 py-0.5 rounded-full font-bold">
                {shortlistedUnits.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShortlistDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Unit List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {shortlistedUnits.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#D4E845]">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Your shortlist is empty</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                  Browse our portfolio of luxury villas, apartments, and planned plots and tap the heart icon to save your favourites.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShortlistDrawerOpen(false);
                    navigate('/projects');
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] text-xs font-bold font-display uppercase tracking-wider rounded-full shadow-md transition-colors"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              shortlistedUnits.map(unit => (
                <div
                  key={unit.id}
                  className="bg-white/5 border border-white/10 p-5 rounded-[24px] group relative hover:border-white/25 transition-all space-y-3"
                >
                  <div className="flex space-x-3">
                    <img
                      src={getMediaUrl(unit.floorPlanImage, 600)}
                      alt={unit.unitNumber}
                      className="w-20 h-20 object-cover rounded-xl border border-white/10 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4E845] block font-semibold">
                            {unit.projectName}
                          </span>
                          <h4 className="text-sm font-display font-bold text-white truncate">
                            {unit.unitNumber} &middot; {unit.configuration}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleShortlist(unit.id)}
                          className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 mt-1 font-mono">
                        {unit.areaSqYd} sq. yd. ({unit.areaSqFt} sq. ft.) &middot; {unit.facing}
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">All-inclusive Est.</span>
                          <span className="text-sm font-bold text-white font-mono">
                            {formatINR(unit.totalPrice)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Link
                            to={`/units/${unit.id}`}
                            onClick={() => setShortlistDrawerOpen(false)}
                            className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                          >
                            Details
                          </Link>
                          <Link
                            to={`/booking/${unit.id}`}
                            onClick={() => setShortlistDrawerOpen(false)}
                            className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold rounded-full transition-colors"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer actions */}
          {shortlistedUnits.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0E1520] flex items-center justify-between">
              <button
                type="button"
                onClick={clearShortlist}
                className="text-xs font-mono text-slate-400 hover:text-red-400 uppercase tracking-wider"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => {
                  setShortlistDrawerOpen(false);
                  navigate('/projects');
                }}
                className="text-xs font-mono text-[#D4E845] hover:text-white uppercase tracking-wider flex items-center space-x-1"
              >
                <span>Continue Browsing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
