import NavigationBar from '@/components/common/NavigationBar';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <NavigationBar />
      
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                <input type="text" placeholder="Gaurav Yadav" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                <input type="email" value="user@example.com" disabled className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Email Notifications</span>
              <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-300">Public Profile</span>
              <button className="w-12 h-6 bg-gray-700 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
              </button>
            </div>
          </section>
          
          <div className="flex justify-end gap-4 pt-4">
            <button className="text-gray-400 hover:text-white">Cancel</button>
            <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}