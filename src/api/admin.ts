import api from './axios';

export interface AdminApplication {
  id: number;
  position: string; // Backend returns position as string UUID from to_representation
  position_title?: string; // Backend may also return position_title from serializer
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cover_letter: string;
  resume: string;
  status: string;
  applied_at: string; // Backend field name is applied_at, not created_at
}

export interface AdminContact {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  status_display: string;
  submitted_at: string;
  date: string;
}

export interface AdminPosition {
  id: string;
  title: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'inactive';
  description: string;
  tags: string[];
  image_url: string;
  created_at: string;
  updated_at: string;
  role_overview: string; // Add role_overview field
  key_responsibilities: Responsibility[]; // Add key_responsibilities field
}

interface Responsibility {
  title: string;
  desc: string;
}

interface IDashboardStats {
  total_applications: number
  total_contacts: number
  total_positions: number
  active_positions: number
}

export interface Activity {
  id: number;
  type: 'position' | 'application' | 'contact_form' | 'document' | 'image' | 'page';
  action: 'created' | 'updated' | 'closed' | 'reviewed' | 'deleted' | 'interview' | 'responded';
  description: string;
  created_at: string;
}

export const adminAPI = {
  getDashboardStats: async (): Promise<IDashboardStats> => {
    const response = await api.get('admin/dashboard')

    return response.data.data
  },

  getRecentActivity: async (): Promise<Activity[]> => {
    const response = await api.get('admin/activities/')
    console.log('Raw recent activity response:', response.data);
    
    // Handle the actual API response structure: { results: { activities: [...] } }
    const data = response.data.results?.activities || response.data.activities || response.data.data || response.data.results || response.data;
    console.log('Processed recent activity data:', data);
    
    // Ensure we return an array
    return Array.isArray(data) ? data : [];
  },
  // Applications management
  getApplications: async (): Promise<AdminApplication[]> => {
    const response = await api.get('/admin/applications/');
    console.log('Raw applications response:', response.data);
    // Handle paginated response structure from paginator.get_paginated_response
    const data = response.data.data || response.data.results?.data || response.data.results || response.data;
    console.log('Processed applications data:', data);
    // Ensure we return an array
    return Array.isArray(data) ? data : [];
  },

  updateApplication: async (id: number, status: string): Promise<AdminApplication> => {
    const response = await api.patch(`/admin/applications/${id}/`, { status });
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  deleteApplication: async (id: number): Promise<void> => {
    await api.delete(`/admin/applications/${id}/delete/`);
  },

  downloadResume: async (id: number): Promise<Blob> => {
    const response = await api.get(`/admin/applications/${id}/resume/`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Contacts management
  getContacts: async (): Promise<AdminContact[]> => {
    const response = await api.get('/admin/contacts/');
    console.log('Raw contacts response:', response.data);
    // Handle wrapped response structure from api_response function
    const data = response.data.results.data || response.data;
    console.log('Processed contacts data:', data);
    // Ensure we return an array
    return Array.isArray(data) ? data : [];
  },

  updateContact: async (id: number, status: string): Promise<AdminContact> => {
    const response = await api.patch(`/admin/contacts/${id}/`, { status });
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    await api.delete(`/admin/contacts/${id}/delete/`);
  },

  // Positions management
  getPositions: async (): Promise<AdminPosition[]> => {
    const response = await api.get('/admin/positions/');
    console.log('Raw positions response:', response.data);
    // Handle wrapped response structure from api_response function
    const data = response.data.results.data || response.data;
    console.log('Processed positions data:', data);
    // Ensure we return an array
    return Array.isArray(data) ? data : [];
  },

  getPosition: async (id: string): Promise<AdminPosition> => {
    const response = await api.get(`/admin/positions/${id}/`);
    console.log('Raw position response:', response.data);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  createPosition: async (positionData: Omit<AdminPosition, 'id' | 'created_at' | 'updated_at'>): Promise<AdminPosition> => {
    const response = await api.post('/admin/positions/create/', positionData);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  updatePosition: async (id: string, positionData: Partial<AdminPosition>): Promise<AdminPosition> => {
    const response = await api.patch(`/admin/positions/${id}/`, positionData);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },

  deletePosition: async (id: string): Promise<void> => {
    console.log('API: Deleting position with ID:', id);
    console.log('API: Full URL:', `/admin/positions/${id}/delete/`);
    const response = await api.delete(`/admin/positions/${id}/delete/`);
    console.log('API: Delete response:', response.data);
  },
};
