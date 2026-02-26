import { useState, FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Pagination from '../components/Pagination';

interface Position {
  id: number;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Active' | 'Inactive';
}

interface FormData {
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Active' | 'Inactive';
}

const PositionsManagement = () => {
  const [positions, setPositions] = useState<Position[]>([
    { id: 1, title: 'Frontend Developer', department: 'Engineering', type: 'Full-time', status: 'Active' },
    { id: 2, title: 'UX Designer', department: 'Design', type: 'Full-time', status: 'Active' },
    { id: 3, title: 'Backend Developer', department: 'Engineering', type: 'Full-time', status: 'Active' },
    { id: 4, title: 'Product Manager', department: 'Product', type: 'Full-time', status: 'Active' },
    { id: 5, title: 'DevOps Engineer', department: 'Engineering', type: 'Full-time', status: 'Active' },
    { id: 6, title: 'QA Engineer', department: 'Engineering', type: 'Full-time', status: 'Active' },
    { id: 7, title: 'Data Scientist', department: 'Data', type: 'Full-time', status: 'Active' },
    { id: 8, title: 'UI Designer', department: 'Design', type: 'Part-time', status: 'Active' },
    { id: 9, title: 'Full Stack Developer', department: 'Engineering', type: 'Full-time', status: 'Active' },
    { id: 10, title: 'Product Designer', department: 'Design', type: 'Full-time', status: 'Active' },
    { id: 11, title: 'Technical Writer', department: 'Content', type: 'Part-time', status: 'Active' },
    { id: 12, title: 'Marketing Manager', department: 'Marketing', type: 'Full-time', status: 'Active' },
    { id: 13, title: 'Sales Representative', department: 'Sales', type: 'Full-time', status: 'Active' },
    { id: 14, title: 'Customer Success Manager', department: 'Support', type: 'Full-time', status: 'Active' },
    { id: 15, title: 'Security Engineer', department: 'Engineering', type: 'Full-time', status: 'Active' },
  ]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ title: '', department: '', type: 'Full-time', status: 'Active' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newPosition = { ...formData, id: Date.now() };
    setPositions([...positions, newPosition]);
    setFormData({ title: '', department: '', type: 'Full-time', status: 'Active' });
    setShowForm(false);
  };

  const handleDelete = (id: number): void => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const totalPages = Math.ceil(positions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPositions = positions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Helmet>
        <title>Manage Jobs - Dashur AI Admin</title>
        <meta name="description" content="Manage career positions and job listings in Dashur AI admin dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-white">Career Positions</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 text-sm font-medium w-full sm:w-auto"
        >
          Add Position
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800 p-6 rounded-lg shadow mb-6">
          <h4 className="text-lg font-semibold mb-4 text-white">Add New Position</h4>
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Position Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full h-12 px-4 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full h-12 px-4 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as Position['type']})}
                className="w-full h-12 px-4 border border-gray-600 rounded-lg bg-slate-700 focus:border-blue-500 focus:outline-none text-gray-300"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as Position['status']})}
                className="w-full h-12 px-4 border border-gray-600 rounded-lg bg-slate-700 focus:border-blue-500 focus:outline-none text-gray-300"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-sm font-medium w-full sm:w-auto">
                Save
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 text-sm font-medium w-full sm:w-auto">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">Department</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentPositions.map((position) => (
              <tr key={position.id}>
                <td className="px-4 sm:px-6 py-4 text-gray-300">
                  <div>
                    <div className="font-medium">{position.title}</div>
                    <div className="text-sm text-gray-400 sm:hidden">{position.department}</div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-gray-300 hidden sm:table-cell">{position.department}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-300">{position.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-2 text-sm rounded-full ${
                    position.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {position.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(position.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination 
          count={totalPages} 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PositionsManagement;
