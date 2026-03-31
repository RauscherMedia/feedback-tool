'use client'

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
  onClick?: () => void;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, children, className, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.querySelector(to);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: "smooth" });
      }
      onClick?.();
    };

    const cls = typeof className === "function" ? className({ isActive: false }) : className;

    return (
      <a ref={ref} href={to} onClick={handleClick} className={cn(cls)} {...props}>
        {children}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
