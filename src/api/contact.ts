import api from './axios';

export interface ContactData {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData: ContactData): Promise<{ message: string }> => {
    const response = await api.post('/contact/submit/', contactData);
    // Handle wrapped response structure from api_response function
    return response.data.data || response.data;
  },
};
