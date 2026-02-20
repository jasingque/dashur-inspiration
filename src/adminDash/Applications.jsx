import React, { useState } from 'react';
import {X, Download, Trash2} from 'lucide-react';

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Frontend Developer',
      date: '2026-02-15',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      position: 'UX Designer',
      date: '2026-02-14',
      status: 'Reviewed'
    },
  ]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const viewApplication = (application) => {
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  const downloadResume = (application) => {
    const resumeContent = `Resume for ${application.name}\n\nPosition: ${application.position}\nEmail: ${application.email}\nDate Applied: ${application.date}\nStatus: ${application.status}`;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${application.name.replace(' ', '_')}_resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Reviewed': return 'bg-blue-100 text-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Job Applications</h3>
        <div className="text-sm text-gray-400">
          Total: {applications.length} applications
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Position</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {applications.map((application) => (
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
                <td className="px-6 py-4">
                  <select
                    value={application.status}
                    onChange={(e) => updateStatus(application.id, e.target.value)}
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
                      View
                    </button>
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

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedApplication.name}</h3>
                  <p className="text-gray-400 text-sm">Application for {selectedApplication.position}</p>
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
                  <span className="text-gray-300 text-sm">{selectedApplication.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Date Applied:</span>
                  <span className="text-gray-300 text-sm">{selectedApplication.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => downloadResume(selectedApplication)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;
