const variants = {
  primary:
    "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30",

  secondary:
    "border border-stone-700 bg-stone-900 text-white hover:border-green-500 hover:bg-stone-800",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
  px-6 py-3
  rounded-xl
  font-semibold
  cursor-pointer
  transition-all
  duration-300
  hover:-translate-y-1
  ${variants[variant]}
  ${className}
`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;