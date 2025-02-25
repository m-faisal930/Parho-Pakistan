import { useState } from 'react';
import Sidebar from '../../components/StudentAdminProfile/Sidebar';
import Dashboard from '../../components/StudentAdminProfile/Dashboard';
import Sponsorship from '../../components/StudentAdminProfile/Sponsership';
import Navbar from '../../components/StudentAdminProfile/Navbar';
import Home from '../../components/StudentAdminProfile/Home';
import Profile from '../../components/StudentAdminProfile/Profile';
import Settings from '../../components/StudentAdminProfile/Settings';

export default function StudentAdminProfile() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderComponent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Sponserships':
        return <Sponsorship />;
      case 'Profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen">
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
        <div className="flex-1 overflow-auto p-5 bg-gray-100">{renderComponent()}</div>
      </div>
    </div>
  );
}


