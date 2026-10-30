import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface RouteMatch {
  path: string;
  params: Record<string, string>;
}

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Pattern matcher for routes like /projects/:slug or /units/:id
function matchRoute(routePattern: string, path: string): { match: boolean; params: Record<string, string> } {
  const patternParts = routePattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return { match: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart.startsWith(':')) {
      const paramName = patternPart.slice(1);
      params[paramName] = decodeURIComponent(pathPart);
    } else if (patternPart.toLowerCase() !== pathPart.toLowerCase()) {
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}

export const Router: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Normalize initial path, supporting both direct paths and fallback hash
  const getInitialPath = () => {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) {
      return hash;
    }
    return window.location.pathname || '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        setCurrentPath(hash);
      } else {
        setCurrentPath(window.location.pathname || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options?: { replace?: boolean }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (options?.replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params: {} }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};

export const Link: React.FC<{
  to: string;
  className?: string;
  children: ReactNode;
  title?: string;
  onClick?: () => void;
}> = ({ to, className, children, title, onClick }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      return; // normal external link
    }
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} className={className} title={title} onClick={handleClick}>
      {children}
    </a>
  );
};

export const Route: React.FC<{
  pattern: string;
  element: (params: Record<string, string>) => ReactNode;
}> = ({ pattern, element }) => {
  const { currentPath } = useRouter();
  const cleanCurrent = currentPath.split('?')[0].replace(/\/+$/, '') || '/';
  const cleanPattern = pattern.replace(/\/+$/, '') || '/';

  const { match, params } = matchRoute(cleanPattern, cleanCurrent);

  if (!match) {
    return null;
  }

  return <>{element(params)}</>;
};

