import NavigationBar from '@/components/common/NavigationBar';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400">Start for free, upgrade when you land the job.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-emerald-500 relative shadow-2xl shadow-emerald-500/10">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              CURRENT PLAN
            </div>
            <h3 className="text-2xl font-bold mb-2">Student</h3>
            <div className="text-4xl font-bold mb-6">₹0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-gray-300">
              <li className="flex gap-3">✅ Unlimited AI Roadmaps</li>
              <li className="flex gap-3">✅ Basic Progress Tracking</li>
              <li className="flex gap-3">✅ Community Access</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro Tier (Placeholder) */}
          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800 opacity-75">
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="text-4xl font-bold mb-6">₹199<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-gray-500">
              <li className="flex gap-3">🔒 1-on-1 Mentorship</li>
              <li className="flex gap-3">🔒 Resume Review</li>
              <li className="flex gap-3">🔒 Mock Interviews</li>
            </ul>
            <button disabled className="w-full py-3 rounded-lg bg-gray-800 text-gray-400 font-bold cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}