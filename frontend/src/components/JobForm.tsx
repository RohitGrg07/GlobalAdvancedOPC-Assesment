import { useState, useEffect } from "react";
import { Job, JobFormData } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface JobFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobData: JobFormData) => void;
  editingJob?: Job | null;
}

export const JobForm = ({
  isOpen,
  onClose,
  onSave,
  editingJob,
}: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "full-time",
    description: "",
    requirements: "",
    benefits: "",
    remote: false,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        company: editingJob.company,
        location: editingJob.location,
        salary: editingJob.salary,
        type: editingJob.type,
        description: editingJob.description,
        requirements: editingJob.requirements.join("\n"),
        benefits: editingJob.benefits.join("\n"),
        remote: editingJob.remote,
      });
    } else {
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "full-time",
        description: "",
        requirements: "",
        benefits: "",
        remote: false,
      });
    }
  }, [editingJob, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.description
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  const handleInputChange = (
    field: keyof JobFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {editingJob ? "Update Job" : "Create New Job Posting"}
          </DialogTitle>
        </DialogHeader>

        <div className="container mx-auto px-6 py-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Tech Corp"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  placeholder="e.g., ₹8L - ₹12L"
                  value={formData.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Job Type</Label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    handleInputChange(
                      "type",
                      e.target.value as
                        | "full-time"
                        | "part-time"
                        | "contract"
                        | "internship"
                    )
                  }
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <Switch
                  id="remote"
                  checked={formData.remote}
                  onCheckedChange={(checked) =>
                    handleInputChange("remote", checked)
                  }
                />
                <Label htmlFor="remote">Remote Work Available</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="List requirements (one per line)&#10;• Bachelor's degree in Computer Science&#10;• 3+ years of experience with React&#10;• Strong problem-solving skills"
                value={formData.requirements}
                onChange={(e) =>
                  handleInputChange("requirements", e.target.value)
                }
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits</Label>
              <Textarea
                id="benefits"
                placeholder="List benefits (one per line)&#10;• Health insurance&#10;• 401(k) matching&#10;• Flexible work schedule"
                value={formData.benefits}
                onChange={(e) => handleInputChange("benefits", e.target.value)}
                rows={3}
              />
            </div>

            <DialogFooter className="gap-2 !border-t-0 px-6 pb-6">
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white border-slate-900"
              >
                {editingJob ? "Update Job" : "Create Job"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
