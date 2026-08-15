import * as React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    primary: "bg-blue-900 text-white hover:bg-blue-800 shadow-sm",
    accent: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    outline: "border border-slate-200 bg-white hover:bg-slate-100 text-slate-900",
    ghost: "hover:bg-slate-100 text-slate-900",
    link: "text-slate-900 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
