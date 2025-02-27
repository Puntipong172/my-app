// components/ui/button.jsx
const Button = ({ children, className, ...props }) => (
    <button 
      className={`px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  
  export { Button };