/**
 * SLA Calculation Utility
 * Module 6.5 & 6.7 Real-time SLA engine
 */
export function calculateSla(createdAt, targetHours = 8, status = 'IN_PROGRESS') {
  if (status === 'RESOLVED') {
    return {
      status: 'RESOLVED',
      percent: 100,
      remainingMinutes: 0,
      isWarning: false,
      isBreached: false,
      badgeText: 'Resolved',
    };
  }

  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const totalMs = targetHours * 60 * 60 * 1000;
  const elapsedMs = Math.max(0, now - created);
  const remainingMs = totalMs - elapsedMs;

  const percent = Math.min(100, Math.round((elapsedMs / totalMs) * 100));
  const remainingMinutes = Math.max(0, Math.round(remainingMs / (60 * 1000)));

  const isWarning = percent >= 75 && percent < 100;
  const isBreached = percent >= 100 || remainingMinutes === 0;

  let badgeText = `${remainingMinutes}m left`;
  if (isBreached) badgeText = 'SLA Breached';
  else if (isWarning) badgeText = 'Breaching soon';

  return {
    status,
    percent,
    remainingMinutes,
    isWarning,
    isBreached,
    badgeText,
  };
}

