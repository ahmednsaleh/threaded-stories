import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Formats a date string to a human-readable "time ago" format
 * @param dateString - ISO date string (e.g., "2025-01-05T12:30:00Z")
 * @returns Formatted string like "14m ago", "3h ago", "2d ago"
 */
export function formatTimeAgo(dateString: string | null | undefined): string {
  if (!dateString) return 'recently';
  
  try {
    const date = parseISO(dateString);
    const distance = formatDistanceToNow(date, { addSuffix: false });
    
    // Convert "about X hours" to "Xh ago" format
    return distance
      .replace('less than a minute', '1m')
      .replace('about ', '')
      .replace(' seconds', 's')
      .replace(' second', 's')
      .replace(' minutes', 'm')
      .replace(' minute', 'm')
      .replace(' hours', 'h')
      .replace(' hour', 'h')
      .replace(' days', 'd')
      .replace(' day', 'd')
      .replace(' months', 'mo')
      .replace(' month', 'mo')
      .replace(' years', 'y')
      .replace(' year', 'y')
      + ' ago';
  } catch {
    return 'recently';
  }
}
