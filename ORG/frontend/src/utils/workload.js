/**
 * Workload Utility
 * Formula: Hours = Points * 4
 * Capacity Threshold: 40 hours per week
 */
export function calculateWorkload(storyPoints = 0, maxHours = 40) {
  const hours = storyPoints * 4;
  const percent = Math.round((hours / maxHours) * 100);
  const isOverload = hours > maxHours;

  return {
    points: storyPoints,
    hours,
    maxHours,
    percent,
    isOverload,
    status: isOverload ? 'OVERLOAD' : 'OPTIMAL',
  };
}

