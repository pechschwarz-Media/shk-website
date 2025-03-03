import { cn } from "@/lib/utils";

export default function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      className={cn("size-4", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle id="Dot" cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}
