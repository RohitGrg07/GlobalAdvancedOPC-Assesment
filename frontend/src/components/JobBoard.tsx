import { useState, useEffect } from "react";
import { Job, JobFormData } from "@/types/job";
import { JobCard } from "./JobCard";
import { JobForm } from "./JobForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Briefcase, RefreshCw, Edit, Trash2 } from "lucide-react";
import heroImage from "./assets/hero-job-board.jpg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Mock API data - simulating real API response
const mockApiData = {
  success: true,
  message: "Jobs retrieved successfully",
  data: [
    {
      _id: "job_64f8a1b2c3d4e5f6a7b8c9d0",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "full-time",
      description:
        "We're looking for an experienced Frontend Developer to join our growing team. You'll be working on cutting-edge React applications and contributing to our design system. This role involves leading frontend architecture decisions, mentoring junior developers, and collaborating with design and backend teams.",
      requirements: [
        "5+ years React experience",
        "TypeScript proficiency",
        "UI/UX design skills",
        "Experience with modern build tools",
        "Strong problem-solving abilities",
      ],
      benefits: [
        "Health insurance",
        "401(k) matching",
        "Flexible hours",
        "Remote work options",
        "Annual conference budget",
        "Stock options",
      ],
      postedDate: "2024-01-15",
      remote: true,
      createdAt: "2024-01-15T10:30:00.000Z",
      updatedAt: "2024-01-15T10:30:00.000Z",
      status: "active",
      applications: 47,
      views: 234,
      companyLogo: "https://api.example.com/logos/techcorp.png",
      tags: ["React", "TypeScript", "Frontend", "Senior", "Remote"],
    },
    {
      _id: "job_64f8a1b2c3d4e5f6a7b8c9d1",
      title: "Product Manager",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$100k - $140k",
      type: "full-time",
      description:
        "Join our product team and help shape the future of our platform. You'll work closely with engineering and design teams to deliver amazing user experiences. This role requires strategic thinking, excellent communication skills, and a passion for creating products that users love.",
      requirements: [
        "3+ years product management",
        "Agile methodology",
        "Data-driven mindset",
        "User research experience",
        "Technical background preferred",
      ],
      benefits: [
        "Equity package",
        "Health insurance",
        "Professional development budget",
        "Flexible PTO",
        "Home office stipend",
      ],
      postedDate: "2024-01-14",
      remote: false,
      createdAt: "2024-01-14T14:15:00.000Z",
      updatedAt: "2024-01-14T14:15:00.000Z",
      status: "active",
      applications: 23,
      views: 156,
      companyLogo: "https://api.example.com/logos/startupxyz.png",
      tags: ["Product", "Management", "Agile", "Strategy", "On-site"],
    },
    {
      _id: "job_64f8a1b2c3d4e5f6a7b8c9d2",
      title: "UX Designer",
      company: "Design Studio",
      location: "Austin, TX",
      salary: "$80k - $110k",
      type: "full-time",
      description:
        "We're seeking a talented UX Designer to create intuitive and beautiful user experiences. You'll collaborate with cross-functional teams to solve complex design challenges. This role involves user research, wireframing, prototyping, and working closely with developers to ensure design quality.",
      requirements: [
        "Portfolio of UX projects",
        "Figma expertise",
        "User research experience",
        "Prototyping skills",
        "Design system knowledge",
      ],
      benefits: [
        "Creative freedom",
        "Conference budget",
        "Health insurance",
        "Unlimited PTO",
        "Latest design tools",
        "Remote work options",
      ],
      postedDate: "2024-01-13",
      remote: true,
      createdAt: "2024-01-13T09:45:00.000Z",
      updatedAt: "2024-01-13T09:45:00.000Z",
      status: "active",
      applications: 34,
      views: 189,
      companyLogo: "https://api.example.com/logos/designstudio.png",
      tags: ["UX", "Design", "Figma", "Research", "Remote"],
    },
    {
      _id: "job_64f8a1b2c3d4e5f6a7b8c9d3",
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Seattle, WA",
      salary: "$110k - $150k",
      type: "full-time",
      description:
        "Join our infrastructure team to build and maintain scalable cloud solutions. You'll work with cutting-edge technologies like Kubernetes, Docker, and AWS. This role involves automating deployment processes, monitoring system performance, and ensuring high availability.",
      requirements: [
        "3+ years DevOps experience",
        "Kubernetes expertise",
        "AWS/Azure knowledge",
        "Infrastructure as Code",
        "Monitoring tools experience",
      ],
      benefits: [
        "Competitive salary",
        "Health insurance",
        "401(k) matching",
        "Remote work options",
        "Learning budget",
        "Flexible hours",
      ],
      postedDate: "2024-01-12",
      remote: true,
      createdAt: "2024-01-12T11:20:00.000Z",
      updatedAt: "2024-01-12T11:20:00.000Z",
      status: "active",
      applications: 28,
      views: 167,
      companyLogo: "https://api.example.com/logos/cloudtech.png",
      tags: ["DevOps", "Kubernetes", "AWS", "Infrastructure", "Remote"],
    },
    {
      _id: "job_64f8a1b2c3d4e5f6a7b8c9d4",
      title: "Data Scientist",
      company: "Analytics Corp",
      location: "Boston, MA",
      salary: "$90k - $130k",
      type: "full-time",
      description:
        "Help us turn data into actionable insights. You'll work with large datasets, build predictive models, and create data visualizations. This role involves statistical analysis, machine learning, and presenting findings to stakeholders.",
      requirements: [
        "MS/PhD in Statistics/CS",
        "Python/R proficiency",
        "Machine learning experience",
        "SQL knowledge",
        "Statistical analysis skills",
      ],
      benefits: [
        "Health insurance",
        "401(k) matching",
        "Conference attendance",
        "Research budget",
        "Flexible work hours",
        "Remote options",
      ],
      postedDate: "2024-01-11",
      remote: false,
      createdAt: "2024-01-11T16:30:00.000Z",
      updatedAt: "2024-01-11T16:30:00.000Z",
      status: "active",
      applications: 19,
      views: 134,
      companyLogo: "https://api.example.com/logos/analyticscorp.png",
      tags: [
        "Data Science",
        "Machine Learning",
        "Python",
        "Statistics",
        "On-site",
      ],
    },
    {
      _id: "job_64f8a1b2c3d4e5f6a7b8c9d5",
      title: "Mobile Developer (React Native)",
      company: "AppWorks",
      location: "Miami, FL",
      salary: "$85k - $120k",
      type: "contract",
      description:
        "Join our mobile development team to build cross-platform applications. You'll work with React Native, implement new features, and ensure app performance. This contract role offers flexibility and the opportunity to work on exciting projects.",
      requirements: [
        "2+ years React Native",
        "JavaScript/TypeScript",
        "Mobile app development",
        "API integration experience",
        "Performance optimization",
      ],
      benefits: [
        "Competitive hourly rate",
        "Flexible schedule",
        "Remote work options",
        "Latest devices for testing",
        "Professional development",
      ],
      postedDate: "2024-01-10",
      remote: true,
      createdAt: "2024-01-10T13:15:00.000Z",
      updatedAt: "2024-01-10T13:15:00.000Z",
      status: "active",
      applications: 31,
      views: 198,
      companyLogo: "https://api.example.com/logos/appworks.png",
      tags: ["React Native", "Mobile", "Contract", "JavaScript", "Remote"],
    },
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 6,
    totalPages: 1,
  },
  timestamp: "2024-01-15T15:30:00.000Z",
};

export const JobBoard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  // Simulate API call with mock data
  useEffect(() => {
    const simulateApiCall = async () => {
      setIsLoading(true);
      setApiStatus("loading");

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simulate successful API response
        const response = mockApiData;

        if (response.success) {
          // Type assertion to match Job interface
          setJobs(response.data as Job[]);
          setApiStatus("success");
          toast({
            title: "Success",
            description: `${response.data.length} jobs loaded successfully`,
          });
        } else {
          throw new Error("API returned error");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setApiStatus("error");
        toast({
          title: "Error",
          description: "Failed to load jobs from server.",
          variant: "destructive",
        });
        // Fallback to mock data if API fails
        setJobs(mockApiData.data as Job[]);
      } finally {
        setIsLoading(false);
      }
    };

    simulateApiCall();
  }, []);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Simulate real-time job count updates
  const totalJobs = jobs.length;
  const remoteJobs = jobs.filter((job) => job.remote).length;
  const fullTimeJobs = jobs.filter((job) => job.type === "full-time").length;
  const recentJobs = jobs.filter(
    (job) =>
      new Date(job.postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length;

  const handleAddJob = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleSaveJob = async (jobData: JobFormData) => {
    try {
      // Validate required fields
      if (
        !jobData.title.trim() ||
        !jobData.company.trim() ||
        !jobData.location.trim()
      ) {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields (Title, Company, Location).",
          variant: "destructive",
        });
        return;
      }

      const payload = {
        ...jobData,
        requirements: jobData.requirements
          .split("\n")
          .filter((req) => req.trim()),
        benefits: jobData.benefits
          .split("\n")
          .filter((benefit) => benefit.trim()),
      };

      if (editingJob) {
        // Update existing job
        try {
          const response = await fetch(`${API_BASE}/jobs/${editingJob._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const updated = await response.json();
            setJobs((prev) =>
              prev.map((job) => (job._id === editingJob._id ? updated : job)),
            );
            toast({
              title: "Success",
              description: "Job updated successfully.",
            });
            setIsFormOpen(false);
            setEditingJob(null);
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
          // Fallback: update locally if API fails
          const updatedJob = {
            ...editingJob,
            ...payload,
            requirements: payload.requirements,
            benefits: payload.benefits,
          };
          setJobs((prev) =>
            prev.map((job) => (job._id === editingJob._id ? updatedJob : job)),
          );
          toast({
            title: "Updated Locally",
            description: "Job updated in local state (API unavailable).",
          });
          setIsFormOpen(false);
          setEditingJob(null);
        }
      } else {
        // Add new job
        try {
          const response = await fetch(`${API_BASE}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const created = await response.json();
            setJobs((prev) => [created, ...prev]);
            toast({
              title: "Success",
              description: "Job created successfully.",
            });
            setIsFormOpen(false);
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        } catch (apiError) {
          console.error("API Error:", apiError);
          // Fallback: create locally if API fails
          const newJob: Job = {
            _id: `local_${Date.now()}`,
            ...payload,
            requirements: payload.requirements,
            benefits: payload.benefits,
            postedDate: new Date().toISOString().split("T")[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setJobs((prev) => [newJob, ...prev]);
          toast({
            title: "Created Locally",
            description: "Job created in local state (API unavailable).",
          });
          setIsFormOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast({
        title: "Error",
        description: "Failed to save job. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setDeleteJobId(jobId);
  };

  const confirmDeleteJob = async () => {
    if (!deleteJobId) return;
    try {
      const response = await fetch(`${API_BASE}/jobs/${deleteJobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs((prev) => prev.filter((job) => job._id !== deleteJobId));
        toast({
          title: "Job Deleted",
          description: "The job posting has been removed successfully.",
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      // Fallback: delete locally if API fails
      setJobs((prev) => prev.filter((job) => job._id !== deleteJobId));
      toast({
        title: "Deleted Locally",
        description: "Job removed from local state (API unavailable).",
      });
    } finally {
      setDeleteJobId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        {/* Hero Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-indigo-900/80"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-400/15 rounded-full blur-lg"></div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white/90 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Join thousands of professionals finding their dream jobs
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl leading-relaxed">
              Discover amazing opportunities from top companies around the
              world. Build your career with the best employers in the industry.
            </p>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 mt-12 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Companies</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm">Jobs Posted</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm">Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="container mx-auto px-20 py-8">
        <div className="flex items-center justify-between mb-8">
          {/* Search Bar - Left Side - Aligned with job cards */}
          <div className="relative w-80 ml-[89px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search jobs, companies, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>

          {/* Job Count and Add Job Button - Right Side */}
          <div className="flex justify-start items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Briefcase className="w-full h-6" />
              <span className="text-sm font-medium">
                {filteredJobs.length} jobs found
              </span>
            </div>
            <Button
              onClick={handleAddJob}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Briefcase className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                Loading Jobs...
              </h3>
              <p className="text-gray-600">
                Fetching the latest opportunities from our database
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce mx-1"></div>
                <div
                  className="w-2 h-2 bg-pink-500 rounded-full animate-bounce mx-1"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce mx-1"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}

          {/* API Status Indicator */}
          {!isLoading && filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {searchTerm
                  ? "No jobs match your search"
                  : "No jobs available yet"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? "Try adjusting your search terms or browse all available positions"
                  : "Be the first to post a job and start building your team!"}
              </p>
              {!searchTerm && (
                <Button
                  onClick={handleAddJob}
                  className="bg-blue-10000 hover:bg-blue-10000 text-white font-medium px-1000 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4 m-0" />
                  Post the First Job
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Job Form Modal */}
      <JobForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveJob}
        editingJob={editingJob}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteJobId}
        onOpenChange={() => setDeleteJobId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job posting? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteJobId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteJob}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
