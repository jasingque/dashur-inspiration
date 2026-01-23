export const FloatingAI = () => {
  const bars = ['bg-cyan-500', 'bg-blue-500', 'bg-indigo-900', 'bg-blue-900'];
  const corners = [
    { pos: '-top-0.5 -left-0.5', color: 'bg-blue-500', delay: 0 },
    { pos: '-top-0.5 -right-0.5', color: 'bg-blue-900', delay: 100 },
    { pos: '-bottom-0.5 -left-0.5', color: 'bg-cyan-500', delay: 200 },
    { pos: '-bottom-0.5 -right-0.5', color: 'bg-blue-500', delay: 300 },
  ];

  return (
    <div className="group fixed bottom-15 left-15 z-50 w-16 h-16 flex items-center justify-center cursor-pointer">
      {/* Background Glows */}
      <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-lg animate-pulse" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-900 animate-spin blur-sm" />

      {/* Main Container */}
      <div className="absolute inset-0.5 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden z-10">
        <div className="flex gap-0.5 items-center">
          {bars.map((color, i) => (
            <div key={i} className={`w-1 h-6 ${color} rounded-full animate-bounce`} style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse" />
      </div>

      {/* dots */}
      {corners.map(({ pos, color, delay }, i) => (
        <div key={i} className={`absolute ${pos} w-1.5 h-1.5 ${color} rounded-full animate-ping`} style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  );
};

export default FloatingAI;