import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Responded' | 'Pending' | 'Closed';
}

const ContactsManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your services.',
      date: '2026-02-15',
      status: 'New'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      subject: 'Support Request',
      message: 'I need help with my account.',
      date: '2026-02-14',
      status: 'Responded'
    },
  ]);

  const updateStatus = (id: number, newStatus: Contact['status']): void => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
  };

  const deleteContact = (id: number): void => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getStatusColor = (status: Contact['status']): string => {
    switch(status) {
      case 'New': return 'bg-green-100 text-green-800';
      case 'Responded': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Helmet>
        <title>Manage Contact - Dashur AI Admin</title>
        <meta name="description" content="Manage contact form submissions and inquiries in Dashur AI admin dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Contact Form Submissions</h3>
        <div className="text-sm text-gray-400">
          Total: {contacts.length} messages
        </div>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-slate-800 rounded-lg shadow p-4 sm:p-6 relative">
            <button
              onClick={() => deleteContact(contact.id)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 />
            </button>
            
            <div className="mb-4">
              <h4 className="font-semibold text-lg text-white">{contact.name}</h4>
              <p className="text-gray-400 text-sm sm:text-base">{contact.email}</p>
              <p className="text-sm text-gray-500">{contact.date}</p>
            </div>
            
            <div className="mb-3">
              <span className="font-medium text-white">Subject: </span>
              <span className="text-gray-300 text-sm sm:text-base">{contact.subject}</span>
            </div>
            
            <div className="mb-4">
              <span className="font-medium text-white">Message: </span>
              <p className="text-gray-300 mt-1 text-sm sm:text-base">{contact.message}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Status:</span>
                <select
                  value={contact.status}
                  onChange={(e) => updateStatus(contact.id, e.target.value as Contact['status'])}
                  className={`px-3 py-1 text-sm rounded-full border-0 ${getStatusColor(contact.status)}`}
                >
                  <option value="New">New</option>
                  <option value="Responded">Responded</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm w-full sm:w-auto">
                  Reply
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm w-full sm:w-auto">
                  Mark as Spam
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManagement;
