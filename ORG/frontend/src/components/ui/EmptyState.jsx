import React from 'react';
import { Button } from './Button';

export function EmptyState({
  title = 'No items found',
  description = 'Get started by creating a new entry.',
  actionLabel,
  onAction,
  icon: Icon,
}) {
  return (
    <div className="py-12 px-4 border border-dashed border-border rounded-card flex flex-col items-center justify-center text-center">
      {Icon && (
        <div className="p-2 mb-3 bg-bg-subtle rounded-input text-text-muted">
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <p className="text-xs text-text-muted mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

