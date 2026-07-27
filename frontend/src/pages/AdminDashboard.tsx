import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from 'lucide-react';
import { AdminLayout } from '@/components/AdminLayout';
import { JobForm } from '@/components/JobForm';
import { useJobs } from '@/hooks/useJobs';
import { useApplications } from '@/hooks/useApplications';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Job, JobFormData } from '@/types/job';
import { ApplicationStatus } from '@/types/application';
import { formatJobType, timeAgo } from '@/lib/format';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Tab = 'jobs' | 'applications';

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: 'Pending',
  reviewed: 'Reviewed',
  accepted: 'Accepted',
  rejected: 'Rejected',
};

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: 'text-amber-600 bg-amber-50 border-amber-200',
  reviewed: 'text-blue-600 bg-blue-50 border-blue-200',
  accepted: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  rejected: 'text-red-600 bg-red-50 border-red-200',
};

export function AdminDashboard() {
  const { user } = useAuth();
  const { jobs, isLoading, error, createJob, updateJob, deleteJob } = useJobs();
  const {
    applications,
    isLoading: appsLoading,
    updateStatus,
  } = useApplications();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<Tab>('jobs');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

  const pendingCount = applications.filter((a) => a.status === 'pending').length;
  const displayName = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : 'Admin';

  const handleSaveJob = async (formData: JobFormData) => {
    try {
      if (editingJob) {
        await updateJob(editingJob._id, formData);
        toast({ title: 'Job updated', description: 'Changes saved successfully.' });
      } else {
        await createJob(formData);
        toast({ title: 'Job posted', description: 'New listing is now live.' });
      }
      setIsFormOpen(false);
      setEditingJob(null);
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to save job',
        variant: 'destructive',
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteJobId) return;
    try {
      await deleteJob(deleteJobId);
      toast({ title: 'Job deleted', description: 'Listing removed successfully.' });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to delete job',
        variant: 'destructive',
      });
    } finally {
      setDeleteJobId(null);
    }
  };

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    try {
      await updateStatus(id, status);
      toast({ title: 'Status updated', description: `Application marked as ${STATUS_LABELS[status]}.` });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to site
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {displayName}</p>
        </div>
        <button
          onClick={() => {
            setEditingJob(null);
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Briefcase} label="Total Jobs" value={jobs.length} />
        <StatCard icon={Users} label="Applications" value={applications.length} />
        <StatCard icon={Clock} label="Pending" value={pendingCount} accent="amber" />
        <StatCard icon={CheckCircle2} label="Active Jobs" value={jobs.length} accent="emerald" />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mb-6">
        <TabButton
          active={activeTab === 'jobs'}
          onClick={() => setActiveTab('jobs')}
          label={`Jobs (${jobs.length})`}
        />
        <TabButton
          active={activeTab === 'applications'}
          onClick={() => setActiveTab('applications')}
          label={`Applications (${applications.length})`}
        />
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Jobs tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-3">
          {isLoading ? (
            <LoadingState message="Loading jobs..." />
          ) : jobs.length === 0 ? (
            <EmptyState
              title="No jobs posted yet"
              description="Create your first job listing to get started."
              action={
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  Post New Job
                </button>
              }
            />
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900 truncate">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-slate-500">
                    <span>{job.company}</span>
                    <span className="hidden sm:inline text-slate-300">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="hidden sm:inline text-slate-300">·</span>
                    <span>{formatJobType(job.type)}</span>
                    {job.salary && (
                      <>
                        <span className="hidden md:inline text-slate-300">·</span>
                        <span className="hidden md:inline">{job.salary}</span>
                      </>
                    )}
                    <span className="hidden lg:inline text-slate-300">·</span>
                    <span className="hidden lg:inline">{timeAgo(job.postedDate || job.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingJob(job);
                      setIsFormOpen(true);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteJobId(job._id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Applications tab */}
      {activeTab === 'applications' && (
        <div className="space-y-3">
          {appsLoading ? (
            <LoadingState message="Loading applications..." />
          ) : applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="Applications from users will appear here."
            />
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-slate-900">{app.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{app.email}</p>
                  <p className="text-sm text-slate-600 mt-2">
                    Applied for:{' '}
                    <span className="font-medium text-slate-800">
                      {app.job?.title} at {app.job?.company}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_COLORS[app.status]}`}
                  >
                    {STATUS_LABELS[app.status]}
                  </span>
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value as ApplicationStatus)
                    }
                    className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  >
                    {(['pending', 'reviewed', 'accepted', 'rejected'] as ApplicationStatus[]).map(
                      (s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <JobForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingJob(null);
        }}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />

      <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <AlertDialogContent className="bg-white border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Delete job posting?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              This action cannot be undone. The listing will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent?: 'amber' | 'emerald';
}) {
  const valueColor =
    accent === 'amber'
      ? 'text-amber-600'
      : accent === 'emerald'
        ? 'text-emerald-600'
        : 'text-slate-900';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center gap-2 text-slate-500 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
        active
          ? 'border-slate-900 text-slate-900'
          : 'border-transparent text-slate-500 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-slate-500 text-sm">{message}</div>
  );
}

function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-xl">
      <h3 className="font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{description}</p>
      {action}
    </div>
  );
}
