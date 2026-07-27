import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";

import {
  MapPin,
  Building2,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
} from "lucide-react";

interface JobCardProps {
  job: Job;
  readOnly?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
  onView?: (job: Job) => void;
}

export const JobCard = ({ job, readOnly, onEdit, onDelete, onView }: JobCardProps) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>

          {!readOnly && onEdit && onDelete && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(job)}
                className="h-8 w-8 p-0 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 border border-gray-300 rounded-full transition-all duration-200 flex items-center justify-center"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(job._id)}
                className="h-8 w-8 p-0 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-300 rounded-full transition-all duration-200 flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* Badges Section */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 capitalize">
            {job.type.replace("-", " ")}
          </span>
          {job.remote && (
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
              Remote
            </span>
          )}
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="font-medium">
              {new Date(job.postedDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
          {job.description}
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            className="w-full bg-white hover:bg-blue-600 text-gray-700 hover:text-white font-medium py-2 rounded-md border border-gray-300 transition-all duration-200"
            onClick={() => (readOnly && onView ? onView(job) : onEdit?.(job))}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
