import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  if (!name) return "";

  // Split the name into words, filter out empty parts, and take the first letter of each word.
  const initials = name
    .split(" ")
    .filter(Boolean) // Remove any extra spaces
    .map((word) => word[0].toUpperCase()) // Get the first letter in uppercase
    .join(""); // Combine them into a single string

  return initials;
}
