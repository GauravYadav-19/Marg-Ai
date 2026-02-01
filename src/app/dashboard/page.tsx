import NavigationBar from '@/components/common/NavigationBar';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <header className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back, Scholar 🎓</h1>
            <p className="text-gray-400">Here is an overview of your learning journey.</p>
          </div>
          <button className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors">
            + New Goal
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Hours Learned', val: '12.5', icon: '⏱️' },
            { label: 'Topics Mastered', val: '8', icon: '✅' },
            { label: 'Current Streak', val: '3 Days', icon: '🔥' },
            { label: 'Completion', val: '14%', icon: '📈' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800/40 p-6 rounded-xl border border-gray-700/50">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.val}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Empty State / Recent Activity */}
        <div className="bg-gray-800/30 rounded-2xl p-12 text-center border border-gray-700/50 border-dashed">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4 text-3xl">
            🚀
          </div>
          <h3 className="text-xl font-bold mb-2">No Active Roadmaps</h3>
          <p className="text-gray-400 mb-6">You haven't started a new learning path recently.</p>
          <a href="/roadmap-generator" className="inline-block bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
            Generate Roadmap
          </a>
        </div>
      </main>
    </div>
  );
}