import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle, Info, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map(toast => {
        let icon = <Info className="w-5 h-5 text-blue-400" />;
        let borderColor = 'border-brass-500/40';

        if (toast.type === 'success') {
          icon = <CheckCircle className="w-5 h-5 text-emerald-400" />;
          borderColor = 'border-emerald-500/40';
        } else if (toast.type === 'brass') {
          icon = <Sparkles className="w-5 h-5 text-brass-400" />;
          borderColor = 'border-brass-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#0B1F3A]/95 text-ivory border ${borderColor} p-4 rounded shadow-2xl flex items-start space-x-3 animate-slideIn`}
          >
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1 text-xs sm:text-sm font-sans text-ivory-100">
              {toast.message}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-ivory-400 hover:text-white p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

