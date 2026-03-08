import api from './axios';

export interface ContactData {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactAPI = {
  submitContact: async (contactData: ContactData): Promise<{ message: string }> => {
    const response = await api.post('/contact/submit/', contactData);
    return response.data.data || response.data;
  },
};
