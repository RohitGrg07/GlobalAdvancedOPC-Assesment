import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { submitApplication } from "@/hooks/useApplications";
import { useToast } from "@/hooks/use-toast";
import { formatJobType } from "@/lib/format";

interface Props {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allowApply?: boolean;
}

export default function JobDetailsDialog({ job, open, onOpenChange, allowApply }: Props) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.username || "");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setApplied(false);
    setName(user?.username || "");
    setEmail("");
  }, [job?._id, open, user?.username]);

  if (!job) return null;

  const handleApply = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      await submitApplication(job._id, name.trim(), email.trim());
      setApplied(true);
      toast({ title: "Application submitted", description: "Good luck!" });
    } catch (err) {
      toast({
        title: "Application failed",
        description: err instanceof Error ? err.message : "Could not submit application",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {job.title}
          </DialogTitle>
          <p className="text-sm text-slate-500 mt-1">
            {job.company} · {job.location}
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Salary</p>
              <p className="font-medium text-slate-900">{job.salary || "Not specified"}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Job Type</p>
              <p className="font-medium text-slate-900">{formatJobType(job.type)}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Remote</p>
              <p className="font-medium text-slate-900">{job.remote ? "Available" : "On-site"}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Description</p>
            <p className="text-slate-600 leading-relaxed text-sm">{job.description}</p>
          </div>

          {job.requirements?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Requirements</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">Benefits</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {allowApply && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              {applied ? (
                <div className="text-center py-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-700 font-medium text-sm">Application submitted successfully!</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-slate-900">Apply for this position</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="apply-name">Full Name</Label>
                      <Input
                        id="apply-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="apply-email">Email</Label>
                      <Input
                        id="apply-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleApply}
                    disabled={submitting}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full px-4 py-2.5 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
