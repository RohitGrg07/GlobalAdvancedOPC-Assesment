export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description?: string;
  requirements: string[];
  benefits: string[];
  remote?: boolean;
  postedDate?: string | Date;
  createdAt?: string;
  updatedAt?: string;
};
export type JobFormData = {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string;
  benefits: string;
  remote: boolean;
};
