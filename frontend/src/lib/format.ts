export function timeAgo(date: string | Date | undefined): string {
  if (!date) return 'Recently';
  const then = new Date(date).getTime();
  const now = Date.now();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function formatJobType(type: string): string {
  return type.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export type JobSortOption =
  | 'newest'
  | 'oldest'
  | 'salary-high'
  | 'salary-low'
  | 'title-az'
  | 'company-az';

export const JOB_SORT_OPTIONS: { value: JobSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'salary-high', label: 'Salary: High to low' },
  { value: 'salary-low', label: 'Salary: Low to high' },
  { value: 'title-az', label: 'Title: A to Z' },
  { value: 'company-az', label: 'Company: A to Z' },
];

/** Parse the minimum salary value from strings like "₹18L - ₹24L" or "₹25k - ₹35k/month". */
export function parseSalaryMin(salary?: string): number {
  if (!salary) return 0;

  const normalized = salary.replace(/,/g, '').toLowerCase();
  const match = normalized.match(/(\d+(?:\.\d+)?)\s*(cr|l|lpa|k)?/);
  if (!match) return 0;

  const amount = parseFloat(match[1]);
  const unit = match[2] ?? '';

  if (unit === 'cr') return amount * 10_000_000;
  if (unit === 'l' || unit === 'lpa') return amount * 100_000;
  if (unit === 'k') return amount * 1_000;
  return amount;
}

function getJobTimestamp(job: { postedDate?: string | Date; createdAt?: string }): number {
  const date = job.postedDate ?? job.createdAt ?? 0;
  return new Date(date).getTime();
}

export function sortJobs<T extends { title: string; company: string; salary?: string; postedDate?: string | Date; createdAt?: string }>(
  jobs: T[],
  sortBy: JobSortOption
): T[] {
  const sorted = [...jobs];

  switch (sortBy) {
    case 'oldest':
      return sorted.sort((a, b) => getJobTimestamp(a) - getJobTimestamp(b));
    case 'salary-high':
      return sorted.sort((a, b) => parseSalaryMin(b.salary) - parseSalaryMin(a.salary));
    case 'salary-low':
      return sorted.sort((a, b) => parseSalaryMin(a.salary) - parseSalaryMin(b.salary));
    case 'title-az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'company-az':
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
    case 'newest':
    default:
      return sorted.sort((a, b) => getJobTimestamp(b) - getJobTimestamp(a));
  }
}
