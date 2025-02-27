// components/ui/input.jsx
const Input = ({ className, ...props }) => (
    <input 
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
  
  export { Input };