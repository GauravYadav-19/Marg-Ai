import NavigationBar from '@/components/common/NavigationBar';

export default function ExplorePage() {
  const featuredRoadmaps = [
    { title: 'Full Stack React', role: 'Frontend', level: 'Intermediate', users: '2.4k' },
    { title: 'AI/ML Engineering', role: 'Data Science', level: 'Beginner', users: '1.8k' },
    { title: 'DevOps & Cloud', role: 'Operations', level: 'Advanced', users: '900+' },
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Explore Community Roadmaps
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what others are learning. Discover top-rated paths curated by the community and industry experts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredRoadmaps.map((map, i) => (
            <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-emerald-500/50 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">
                  {map.role}
                </span>
                <span className="text-gray-500 text-xs flex items-center gap-1">
                  👥 {map.users}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{map.title}</h3>
              <p className="text-gray-400 text-sm mb-4">A complete step-by-step guide for {map.level} level developers.</p>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-3/4 opacity-50"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}