import React from 'react';
import { Router, Route, useRouter } from '@/router';
import { StoreProvider } from '@/context/StoreContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { SiteVisitModal } from '@/components/common/SiteVisitModal';
import { ShortlistDrawer } from '@/components/common/ShortlistDrawer';
import { CompareModal } from '@/components/common/CompareModal';
import { AuthModal } from '@/components/common/AuthModal';
import { ToastContainer } from '@/components/common/ToastContainer';
import { AIChatbot } from '@/components/common/AIChatbot';

// Pages
import { Home } from '@/pages/Home';
import { Projects } from '@/pages/Projects';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { UnitDetail } from '@/pages/UnitDetail';
import { BookingFlow } from '@/pages/BookingFlow';
import { CustomerDashboard } from '@/pages/CustomerDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { About } from '@/pages/About';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';
import { Tools } from '@/pages/Tools';
import { NRI } from '@/pages/NRI';
import { Careers } from '@/pages/Careers';
import { Legal } from '@/pages/Legal';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Hide standard header/footer if in isolated admin mode or full immersion
  const isAdmin = currentPath.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <div className="flex-grow">
        {/* Route Definitions */}
        <Route pattern="/" element={() => <Home />} />
        <Route pattern="/projects" element={() => <Projects />} />
        <Route pattern="/projects/:slug" element={(params) => <ProjectDetail slug={params.slug} />} />
        <Route pattern="/units/:id" element={(params) => <UnitDetail id={params.id} />} />
        <Route pattern="/booking/:unitId" element={(params) => <BookingFlow unitId={params.unitId} />} />
        <Route pattern="/dashboard" element={() => <CustomerDashboard />} />
        <Route pattern="/admin" element={() => <AdminDashboard />} />
        <Route pattern="/about" element={() => <About />} />
        <Route pattern="/gallery" element={() => <Gallery />} />
        <Route pattern="/contact" element={() => <Contact />} />
        <Route pattern="/tools" element={() => <Tools />} />
        <Route pattern="/nri" element={() => <NRI />} />
        <Route pattern="/careers" element={() => <Careers />} />
        <Route pattern="/privacy" element={() => <Legal type="privacy" />} />
        <Route pattern="/terms" element={() => <Legal type="terms" />} />
      </div>

      <Footer />

      {/* Global Modals & Drawers */}
      <SiteVisitModal />
      <ShortlistDrawer />
      <CompareModal />
      <AuthModal />
      <ToastContainer />
      <AIChatbot />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <StoreProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </StoreProvider>
    </Router>
  );
}

export default App;

