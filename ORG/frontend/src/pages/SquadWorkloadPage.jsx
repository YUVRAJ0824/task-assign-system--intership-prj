import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { calculateWorkload } from '../utils/workload';

export function SquadWorkloadPage({ workload }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Squad Workload</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Capacity management &bull; Formula: Hours = Points &times; 4 &bull; Weekly 40h capacity threshold
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workload.map((dev) => {
          const calc = calculateWorkload(dev.points || 0, 40);
          const isOverload = calc.isOverload;

          return (
            <Card key={dev.name} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-text">{dev.name}</h3>
                  <p className="text-xs text-text-muted">{dev.squad}</p>
                </div>
                <Badge variant={isOverload ? 'danger' : 'success'} dot>
                  {calc.status}
                </Badge>
              </div>

              {/* Workload Metric Details */}
              <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border">
                <span>
                  Allocated: <strong className="text-text tabular-nums font-semibold">{calc.hours}h</strong> ({calc.points} pts)
                </span>
                <span className="tabular-nums font-semibold text-text">{calc.percent}% capacity</span>
              </div>

              {/* Horizontal Capacity Bar with 40h marker */}
              <div className="space-y-1 relative">
                <div className="w-full bg-border rounded-full h-2 overflow-hidden relative">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isOverload ? 'bg-status-danger' : 'bg-accent'
                    }`}
                    style={{ width: `${Math.min(100, calc.percent)}%` }}
                  />
                </div>

                {/* 40h marker line indicator */}
                <div className="flex justify-between text-[10px] text-text-faint tabular-nums pt-1">
                  <span>0h</span>
                  <span>20h</span>
                  <span className="font-semibold text-text">40h limit</span>
                  <span>60h+</span>
                </div>
              </div>

              {isOverload && (
                <div className="p-2.5 rounded-input bg-status-danger-bg text-status-danger text-xs flex items-center justify-between">
                  <span>Capacity exceeded by {calc.hours - 40} hours</span>
                  <span className="text-[11px] font-semibold underline cursor-pointer">Rebalance tasks</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

