export default function Philosophy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/earnedreach-logo_3d80f824.png" alt="EarnedReach" className="w-11 h-11" />
              <span className="text-white font-bold text-xl tracking-tight">EarnedReach</span>
            </a>
            <nav className="hidden md:flex items-center gap-8">
              <a href="/#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="/#offer" className="text-slate-300 hover:text-white transition-colors">
                Our Offer
              </a>
              <a href="/philosophy" className="text-white font-medium">
                Philosophy
              </a>
            </nav>
            <a href="/apply">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all text-sm sm:text-base">
                Book Discovery Call
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              Our Principles
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              The EarnedReach Philosophy
            </h1>
            <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto">
              Clarity first. Systems always. Growth that compounds.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid gap-6 sm:gap-8">
            {/* Principle 1 */}
            <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Attention is useless without ownership
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Views don't compound. Algorithms don't care. If you don't own the traffic, you don't own the outcome.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Strategy comes before execution
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Great editing can't fix unclear thinking. We design the system first, then execute inside it. Content without systems is just noise.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Outcomes over output
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                We don't sell videos. We sell clarity, leverage, and measurable progress toward revenue.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Incentives must align
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                If growth doesn't translate to revenue, something's broken. That's why rev share exists—we win when clients win.
              </p>
            </div>

            {/* Principle 5 */}
            <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Compounding beats virality
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                We optimize for systems that improve over 90 days, not spikes that disappear in 72 hours.
              </p>
            </div>

            {/* Principle 6 */}
            <div className="group bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Systems scale. Personal effort doesn't.
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                EarnedReach is built to work across markets, platforms, and time zones—without relying on heroics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Build a System That Scales?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Book a discovery call. We'll review your content, identify gaps, and show you exactly how the 90-day arc works for your brand.
            </p>
            <a href="/apply">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105">
                Book Discovery Call Now
              </button>
            </a>
            <p className="text-sm text-slate-400 mt-4">
              No pressure. Just a strategic conversation about your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299156531/afakcTX83KHyqkFc2EnKin/earnedreach-logo_3d80f824.png" alt="EarnedReach" className="w-10 h-10" />
              <span className="text-lg font-bold text-white">EarnedReach</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="/#how-it-works" className="text-slate-400 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="/#offer" className="text-slate-400 hover:text-white transition-colors">
                Our Offer
              </a>
              <a href="/philosophy" className="text-slate-400 hover:text-white transition-colors">
                Philosophy
              </a>
              <a href="/journey" className="text-slate-400 hover:text-white transition-colors">
                Client Journey
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
