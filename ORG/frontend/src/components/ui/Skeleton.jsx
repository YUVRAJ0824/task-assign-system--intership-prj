import React from 'react';

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`bg-border/60 dark:bg-border/40 animate-pulse rounded-input ${className}`}
    />
  );
}

