import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Job, JobFormData } from '@/types/job';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Job[]>('/jobs');
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const createJob = async (formData: JobFormData) => {
    const payload = toPayload(formData);
    const created = await apiFetch<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setJobs((prev) => [created, ...prev]);
    return created;
  };

  const updateJob = async (id: string, formData: JobFormData) => {
    const payload = toPayload(formData);
    const updated = await apiFetch<Job>(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    setJobs((prev) => prev.map((j) => (j._id === id ? updated : j)));
    return updated;
  };

  const deleteJob = async (id: string) => {
    await apiFetch(`/jobs/${id}`, { method: 'DELETE' });
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  return { jobs, isLoading, error, fetchJobs, createJob, updateJob, deleteJob };
}

function toPayload(formData: JobFormData) {
  return {
    ...formData,
    requirements: formData.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean),
    benefits: formData.benefits
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean),
  };
}
