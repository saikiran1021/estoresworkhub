import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Role } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRoleClassNames = (role: Role) => {
  switch (role) {
    case "Employee":
      return "bg-employee-highlight text-employee-highlight-foreground border-blue-300";
    case "Admin":
      return "bg-admin-highlight text-admin-highlight-foreground border-green-300";
    case "College":
      return "bg-college-highlight text-college-highlight-foreground border-purple-300";
    case "Industry":
      return "bg-industry-highlight text-industry-highlight-foreground border-purple-300";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};
