import { useState, useEffect } from 'react';
import { X, Download, Trash2, FileUser, FileText, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '../components/Pagination';
import { adminAPI, AdminApplication } from '../api';

interface Application {
  id: number;
  name: string;
  email: string;
  position: string;
  date: string;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
  resume: string;
}

// Backend comment: AdminApplication interface from API has different field names
// Backend returns: first_name, last_name, position.title, applied_at, status
// Frontend expects: name, position, date

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await adminAPI.getApplications();
        const transformedData: Application[] = data.map((app: AdminApplication) => {
          console.log('Full application object:', app);
          console.log('Position field:', app.position);
          console.log('Position title field:', app.position_title);
          console.log('Applied at field:', app.applied_at);
          console.log('Applied at type:', typeof app.applied_at);
          
          return {
            id: app.id,
            name: `${app.first_name} ${app.last_name}`,
            email: app.email,
            position: app.position_title || `Position ID: ${app.position?.substring(0, 8)}...`,
            date: app.applied_at ? app.applied_at.split('T')[0] : '', 
            status: app.status as Application['status'],
            resume: app.resume
          };
        });
        setApplications(transformedData);
      } catch (err) {
        setError('Failed to fetch applications');
        console.error('Error fetching applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const updateStatus = async (id: number, newStatus: Application['status']): Promise<void> => {
    try {
      await adminAPI.updateApplication(id, newStatus);
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      toast.success(`Application status updated to ${newStatus} successfully!`);
    } catch (err) {
      toast.error('Failed to update application status. Please try again.');
      setError('Failed to update application status');
      console.error('Error updating application:', err);
    }
  };

  const deleteApplication = async (id: number): Promise<void> => {
    try {
      await adminAPI.deleteApplication(id);
      setApplications(applications.filter(app => app.id !== id));
      toast.success('Application deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete application. Please try again.');
      setError('Failed to delete application');
      console.error('Error deleting application:', err);
    }
  };

  const viewApplication = (application: Application): void => {
    setSelectedApplication(application);
  };

  const closeModal = (): void => {
    setSelectedApplication(null);
  };

  const downloadResume = async (application: Application): Promise<void> => {
    try {
      const blob = await adminAPI.downloadResume(application.id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${application.name.replace(' ', '_')}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download resume');
      console.error('Error downloading resume:', err);
    }
  };

  const getStatusColor = (status: Application['status']): string => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Reviewed': return 'bg-blue-100 text-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = applications.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        <title>Manage Applications - Dashur AI Admin</title>
        <meta name="description" content="Review and manage job applications in Dashur AI admin dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Job Applications</h3>
        <div className="text-sm text-gray-400">
          Total: {applications.length} applications
        </div>
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-400">
          Loading applications...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (

      <div className="bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Position</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Resume</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentApplications.map((application) => (
              <tr key={application.id}>
                <td className="px-4 sm:px-6 py-4 font-medium text-gray-300">
                  <div>
                    <div className="font-medium">{application.name}</div>
                    <div className="text-sm text-gray-400 sm:hidden">{application.email}</div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-300 hidden sm:table-cell">{application.email}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-300">{application.position}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-300 hidden md:table-cell">{application.date}</td>
                <td className="px-4 sm:px-6 py-4">
                  {application.resume ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">PDF</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">None</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={application.status}
                    onChange={(e) => updateStatus(application.id, e.target.value as Application['status'])}
                    className={`px-3 py-2 text-sm rounded-full border-0 ${getStatusColor(application.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      onClick={() => viewApplication(application)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      <FileUser />
                    </button>
                    {application.resume && (
                      <button
                        onClick={() => downloadResume(application)}
                        className="text-green-400 hover:text-green-300 text-sm font-medium"
                        title="Download Resume"
                      >
                        <Download />
                      </button>
                    )}
                    <button
                      onClick={() => deleteApplication(application.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      )}

      {totalPages > 1 && (
        <Pagination 
          count={totalPages} 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
        />
      )}

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedApplication?.name}</h3>
                  <p className="text-gray-400 text-sm">Application for {selectedApplication?.position}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Email:</span>
                  <span className="text-gray-300 text-sm">{selectedApplication?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Date Applied:</span>
                  <span className="text-gray-300 text-sm">{selectedApplication?.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Resume:</span>
                  <div className="flex items-center gap-2">
                    {selectedApplication?.resume ? (
                      <>
                        <FileText className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">PDF Available</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-500 text-sm">No Resume</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedApplication?.status || 'Pending')}`}>
                    {selectedApplication?.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {selectedApplication?.resume && (
                  <button
                    onClick={() => selectedApplication && downloadResume(selectedApplication)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download />
                    Download Resume
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ApplicationsManagement;
