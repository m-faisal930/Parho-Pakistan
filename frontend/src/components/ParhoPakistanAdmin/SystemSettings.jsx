// components/ParhoPakistanAdmin/SystemSettings.jsx
export default function SystemSettings() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">System Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-100">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">
            Platform Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Maintenance Mode</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Two-Factor Authentication</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
          <h3 className="text-lg font-semibold mb-4 text-green-800">
            User Roles
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Permissions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">Admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">Full Access</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">Moderator</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Limited Access
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-100">
        <h3 className="text-lg font-semibold mb-4 text-purple-800">
          Database Management
        </h3>
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all">
            Backup Now
          </button>
          <button className="bg-red-500 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all">
            Restore Backup
          </button>
        </div>
      </div>
    </div>
  );
}
