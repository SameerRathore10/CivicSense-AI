const Badge = ({ children }) => {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium">
      {children}
    </span>
  );
};

export default Badge;