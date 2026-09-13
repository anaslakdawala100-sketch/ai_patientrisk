export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDaysAdmitted(dateStr) {
  if (!dateStr) return '—';
  const admitted = new Date(dateStr);
  if (Number.isNaN(admitted.getTime())) return '—';
  const diffMs = Date.now() - admitted.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  return `${days} day${days === 1 ? '' : 's'}`;
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}
