import { useState } from 'react';
import Sidebar from '../../components/DonorAdminProfile/Sidebar';
import Dashboard from '../../components/DonorAdminProfile/Dashboard';
import Navbar from '../../components/DonorAdminProfile/Navbar';

import SponsorshipManagement from '../../components/DonorAdminProfile/SponsorshipManagement';
import TransactionHistory from '../../components/DonorAdminProfile/TransactionHistory';
import GraphicalInsights from '../../components/DonorAdminProfile/GraphicalInsights';

export default function DonorAdminPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderComponent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Sponsorships':
        return <SponsorshipManagement />;
      case 'Transaction History':
        return <TransactionHistory />;
      case 'Graphical Insights':
        return <GraphicalInsights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen font-work">
      {/* Sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar
          setActiveTab={setActiveTab}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto p-5 bg-light text-dark">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
