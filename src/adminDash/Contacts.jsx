import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([
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

  const updateStatus = (id, newStatus) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getStatusColor = (status) => {
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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Contact Form Submissions</h3>
        <div className="text-sm text-gray-400">
          Total: {contacts.length} messages
        </div>
      </div>

      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-slate-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-lg text-white">{contact.name}</h4>
                <p className="text-gray-400">{contact.email}</p>
                <p className="text-sm text-gray-500">{contact.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={contact.status}
                  onChange={(e) => updateStatus(contact.id, e.target.value)}
                  className={`px-3 py-1 text-sm rounded-full border-0 ${getStatusColor(contact.status)}`}
                >
                  <option value="New">New</option>
                  <option value="Responded">Responded</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="font-medium text-white">Subject: </span>
              <span className="text-gray-300">{contact.subject}</span>
            </div>
            
            <div>
              <span className="font-medium text-white">Message: </span>
              <p className="text-gray-300 mt-1">{contact.message}</p>
            </div>
            
            <div className="mt-4 flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                Reply
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm">
                Mark as Spam
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManagement;
