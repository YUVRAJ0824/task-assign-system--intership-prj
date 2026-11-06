import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-input transition focus-visible:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-accent text-accent-fg hover:opacity-95 active:opacity-90',
    secondary: 'bg-surface text-text border border-border hover:border-border-strong hover:bg-bg-subtle',
    ghost: 'text-text-muted hover:text-text hover:bg-bg-subtle',
    danger: 'bg-status-danger text-white hover:opacity-95',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
    md: 'text-sm px-4 py-2 h-9 gap-2',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

