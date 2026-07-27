export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export type Application = {
  _id: string;
  job: {
    _id: string;
    title: string;
    company: string;
    location?: string;
    type?: string;
    salary?: string;
  };
  user: { _id: string; username: string };
  name: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
};
