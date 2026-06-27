const Topbar = () => {
  return (
    <header className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-950">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-slate-400">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          S
        </div>
      </div>
    </header>
  );
};

export default Topbar;