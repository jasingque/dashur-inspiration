import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../components/Pagination';
import { adminAPI, AdminContact } from '../api';
import { useDashboardTrigger } from '../hooks/useDashboardRefresh';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Responded' | 'Pending' | 'Closed';
}

// Backend comment: AdminContact interface from API has different field names
// Backend returns: first_name, last_name, subject, message, submitted_at, status
// Frontend expects: name, date

const ContactsManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Get dashboard trigger function
  const triggerActivityRefresh: () => void = useDashboardTrigger().triggerActivityRefresh;

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await adminAPI.getContacts();
        console.log('Raw contacts response from API:', data);
        console.log('First contact data:', data[0]);
        
        // Transform backend data to frontend format
        const transformedData: Contact[] = data.map((contact: AdminContact) => ({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          message: contact.message,
          date: new Date(contact.submitted_at).toISOString().split('T')[0],
          status: contact.status as Contact['status']
        }));
        console.log('Transformed contacts data:', transformedData);
        setContacts(transformedData);
      } catch (err) {
        setError('Failed to fetch contacts');
        console.error('Error fetching contacts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const updateStatus = async (id: number, newStatus: Contact['status']): Promise<void> => {
    try {
      await adminAPI.updateContact(id, newStatus);
      setContacts(contacts.map(contact => 
        contact.id === id ? { ...contact, status: newStatus } : contact
      ));
      toast.success(`Contact status updated to ${newStatus} successfully!`);
      // Trigger dashboard refresh to show new activity
      console.log('Triggering dashboard refresh after contact status update');
      triggerActivityRefresh();
    } catch (err) {
      toast.error('Failed to update contact status. Please try again.');
      setError('Failed to update contact status');
      console.error('Error updating contact:', err);
    }
  };

  const deleteContact = async (id: number): Promise<void> => {
    try {
      await adminAPI.deleteContact(id);
      setContacts(contacts.filter(contact => contact.id !== id));
      toast.success('Contact deleted successfully!');
      // Trigger dashboard refresh to show new activity
      console.log('Triggering dashboard refresh after contact deletion');
      if (typeof triggerActivityRefresh === 'function') {
        triggerActivityRefresh();
      } else {
        console.error('triggerActivityRefresh is not a function');
      }
    } catch (err) {
      toast.error('Failed to delete contact. Please try again.');
      setError('Failed to delete contact');
      console.error('Error deleting contact:', err);
    }
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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

      {loading && (
        <div className="text-center py-8 text-gray-400">
          Loading contacts...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (

      <div className="space-y-4">
        {currentContacts.map((contact) => (
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
      )}

      {totalPages > 1 && (
        <Pagination 
          count={totalPages} 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
        />
      )}
    </div>
    </>
  );
};

export default ContactsManagement;
