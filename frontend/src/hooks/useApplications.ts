import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { Application, ApplicationStatus } from '@/types/application';

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFetch<Application[]>('/applications');
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    const updated = await apiFetch<Application>(`/applications/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    setApplications((prev) => prev.map((a) => (a._id === id ? updated : a)));
    return updated;
  };

  return { applications, isLoading, error, fetchApplications, updateStatus };
}

export async function submitApplication(jobId: string, name: string, email: string) {
  return apiFetch<Application>('/applications', {
    method: 'POST',
    body: JSON.stringify({ jobId, name, email }),
  });
}
