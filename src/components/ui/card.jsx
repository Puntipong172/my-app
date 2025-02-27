// components/ui/card.jsx
export const Card = ({ children, className, ...props }) => (
    <div className={`bg-white rounded-xl shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ children, className, ...props }) => (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
  
  export const CardTitle = ({ children, className, ...props }) => (
    <h3 className={`text-2xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
  
  export const CardDescription = ({ children, className, ...props }) => (
    <p className={`text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  );
  
  export const CardContent = ({ children, className, ...props }) => (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );