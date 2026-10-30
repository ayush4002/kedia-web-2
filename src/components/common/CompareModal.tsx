import React from 'react';
import { useRouter, Link } from '@/router';
import { useStore } from '@/context/StoreContext';
import { formatINR, getMediaUrl } from '@/utils/media';
import { X, Scale, Trash2, Check, ArrowRight } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { navigate } = useRouter();
  const {
    units,
    compareList,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setCompareModalOpen,
  } = useStore();

  if (!isCompareModalOpen) return null;

  const comparedUnits = units.filter(u => compareList.includes(u.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E1520]/85 backdrop-blur-md"
        onClick={() => setCompareModalOpen(false)}
      />

      <div className="relative bg-[#0E1520] border border-white/15 text-white w-full max-w-5xl p-6 sm:p-10 rounded-[32px] shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-[#D4E845]" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Compare Units (Max 3)</h2>
            <span className="text-xs font-mono text-[#D4E845] bg-[#D4E845]/20 px-3 py-1 rounded-full font-bold">
              {comparedUnits.length} / 3 Selected
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {comparedUnits.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="text-xs font-mono text-slate-400 hover:text-red-400 uppercase tracking-wider"
              >
                Clear Matrix
              </button>
            )}
            <button
              type="button"
              onClick={() => setCompareModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="flex-1 overflow-x-auto py-6">
          {comparedUnits.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Scale className="w-12 h-12 text-[#D4E845] mx-auto opacity-70" />
              <h3 className="font-display font-bold text-xl text-white">No properties selected for comparison</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Check the "Compare" button on any property card or unit detail page to view side-by-side architectural metrics.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedUnits.map(unit => (
                <div
                  key={unit.id}
                  className="bg-white/5 border border-white/10 p-6 rounded-[28px] relative flex flex-col justify-between"
                >
                  <button
                    type="button"
                    onClick={() => removeFromCompare(unit.id)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-400 flex items-center justify-center transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-4">
                    <img
                      src={getMediaUrl(unit.floorPlanImage, 600)}
                      alt={unit.unitNumber}
                      className="w-full h-40 object-cover rounded-2xl border border-white/10"
                    />

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4E845] block font-semibold">
                        {unit.projectName}
                      </span>
                      <h4 className="text-lg font-display font-bold text-white">
                        {unit.unitNumber} &middot; {unit.configuration}
                      </h4>
                      <p className="text-xs text-slate-300 font-mono mt-0.5">{unit.towerOrBlock}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">All-Inclusive Price:</span>
                        <span className="text-[#D4E845] font-bold">{formatINR(unit.totalPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Base Cost:</span>
                        <span className="text-white">{formatINR(unit.basePrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plot/Unit Area:</span>
                        <span className="text-white">{unit.areaSqYd} sq. yd.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bedrooms/Baths:</span>
                        <span className="text-white">{unit.bedrooms > 0 ? `${unit.bedrooms} BHK / ${unit.bathrooms} Baths` : 'Plotted Land'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Orientation:</span>
                        <span className="text-white">{unit.facing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={`font-semibold capitalize ${
                          unit.status === 'available' ? 'text-emerald-400' : unit.status === 'on_hold' ? 'text-[#D4E845]' : 'text-slate-400'
                        }`}>
                          {unit.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex space-x-2">
                    <Link
                      to={`/units/${unit.id}`}
                      onClick={() => setCompareModalOpen(false)}
                      className="flex-1 py-2.5 text-center text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                      View Specs
                    </Link>
                    <Link
                      to={`/booking/${unit.id}`}
                      onClick={() => setCompareModalOpen(false)}
                      className="flex-1 py-2.5 text-center text-xs font-mono uppercase tracking-wider bg-[#D4E845] hover:bg-[#c2d735] text-[#0E1520] font-bold rounded-full transition-colors"
                    >
                      Book Unit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
