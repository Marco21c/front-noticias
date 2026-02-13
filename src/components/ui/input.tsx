import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors duration-200",
          "hover:bg-zinc-100", 
          "focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-600 focus:bg-zinc-100",
          "disabled:cursor-not-allowed disabled:opacity-50",
  className
)}

        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
