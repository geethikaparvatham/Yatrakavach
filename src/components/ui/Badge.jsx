import * as React from 'react';
import { cn } from '../../lib/utils';

function Badge({ className, variant = 'default', ...props }) {
  const variants = {
    default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
    primary: "border-transparent bg-blue-900 text-white hover:bg-blue-800",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    danger: "border-transparent bg-red-500 text-white hover:bg-red-600",
    success: "border-transparent bg-green-500 text-white hover:bg-green-600",
    warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
    outline: "text-slate-950",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
