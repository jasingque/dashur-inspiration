import api from './axios';

export interface Position {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  employment_type: string;
  department?: string;
  type?: string;
  salary_min?: number;
  salary_max?: number;
  status: string;
  status_display: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: number;
  position: Position;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume: string;
  status: string;
  created_at: string;
}

export interface ApplicationData {
  position: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume: File;
}

export const careersAPI = {
  // Get all positions
  getPositions: async (): Promise<Position[]> => {
    const response = await api.get('/careers/positions/');
    console.log('Raw careers positions response:', response.data);
    // Handle wrapped response structure from api_response function
    const data = response.data.data || response.data;
    console.log('Processed careers positions data:', data);
    // Ensure we return an array
    return Array.isArray(data) ? data : [];
  },

  // Get position by ID
  getPosition: async (id: string): Promise<Position> => {
    const response = await api.get(`/careers/positions/${id}/`);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  // Apply for a job
  applyForJob: async (applicationData: ApplicationData): Promise<JobApplication> => {
    const formData = new FormData();
    Object.keys(applicationData).forEach(key => {
      const value = applicationData[key as keyof ApplicationData];
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await api.post('/careers/apply/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },
};
