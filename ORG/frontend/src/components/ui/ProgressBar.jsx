import React from 'react';

export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'accent',
  className = '',
}) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variants = {
    accent: 'bg-accent',
    success: 'bg-status-success',
    warning: 'bg-status-warning',
    danger: 'bg-status-danger',
    info: 'bg-status-info',
  };

  return (
    <div className={`w-full bg-border rounded-full h-1 overflow-hidden ${className}`}>
      <div
        className={`h-1 rounded-full transition-all duration-300 ease-out ${variants[variant] || variants.accent}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

