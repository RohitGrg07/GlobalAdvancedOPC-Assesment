import { useState } from 'react';
import { Search, RefreshCw, Briefcase } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { JobCard } from '@/components/JobCard';
import JobDetailsDialog from '@/components/JobDetailsDialog';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types/job';

export function UserDashboard() {
  const { jobs, isLoading, error, fetchJobs } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      role="user"
      title="Browse Opportunities"
      subtitle="Explore open positions and find your next role."
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search jobs, companies, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-neutral-300 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-500 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4" />
            {filteredJobs.length} jobs
          </span>
          <button
            onClick={fetchJobs}
            className="p-2.5 border border-neutral-300 hover:border-black transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 text-sm font-mono">
          // ERROR: {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-20">
          <p className="font-mono text-sm text-neutral-500">// LOADING JOBS...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-300">
          <Briefcase className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-neutral-700 mb-2">
            {searchTerm ? 'No matching jobs' : 'No jobs available'}
          </h3>
          <p className="text-neutral-500 text-sm">
            {searchTerm ? 'Try a different search term.' : 'Check back soon for new listings.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              readOnly
              onView={setViewJob}
            />
          ))}
        </div>
      )}

      <JobDetailsDialog
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
        allowApply
      />
    </DashboardLayout>
  );
}
