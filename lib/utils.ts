import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isPremiumUser = (email: string | null) => {
  if (!email) return false;
  
  // List of emails that should have premium access
  const premiumEmails = [
    'zourv@gmail.com',
    // Add any other premium emails here
  ];
  
  return premiumEmails.includes(email.toLowerCase());
};
