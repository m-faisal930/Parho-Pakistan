import { Menu, Bell, UserCircle } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <button className="lg:hidden" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <h1 className="text-lg">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Bell size={24} />
        <UserCircle size={24} />
      </div>
    </div>
  );
};

export default Navbar;
