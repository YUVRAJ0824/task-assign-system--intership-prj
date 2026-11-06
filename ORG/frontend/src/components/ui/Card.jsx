import React from 'react';

export function Card({
  children,
  className = '',
  hoverable = true,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-border rounded-card p-5 ${
        hoverable ? 'hover:border-border-strong transition-colors duration-150' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

