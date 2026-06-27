const Badge = ({ children }) => {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
      {children}
    </span>
  );
};

export default Badge;