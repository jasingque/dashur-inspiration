import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const PositionsManagement = () => {
  const [positions, setPositions] = useState([
    { id: 1, title: 'Frontend Developer', department: 'Engineering', type: 'Full-time', status: 'Active' },
    { id: 2, title: 'UX Designer', department: 'Design', type: 'Full-time', status: 'Active' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', department: '', type: 'Full-time', status: 'Active' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPosition = { ...formData, id: Date.now() };
    setPositions([...positions, newPosition]);
    setFormData({ title: '', department: '', type: 'Full-time', status: 'Active' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Career Positions</h3>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Add Position
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800 p-6 rounded-lg shadow mb-6">
          <h4 className="text-lg font-semibold mb-4 text-white">Add New Position</h4>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <input
              type="text"
              placeholder="Position Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="px-4 py-3 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="px-4 py-3 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="px-4 py-3 border border-gray-600 rounded-lg bg-slate-700 focus:border-blue-500 focus:outline-none"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
            </select>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="px-4 py-3 border border-gray-600 rounded-lg bg-slate-700 focus:border-blue-500 focus:outline-none"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <div className="col-span-2 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-sm font-medium">
                Save
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 text-sm font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
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
            {positions.map((position) => (
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
    </div>
  );
};

export default PositionsManagement;
