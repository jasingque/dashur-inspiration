import React, { useState, useEffect, FormEvent } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { toast, ToastContainer } from 'react-toastify';
import { adminAPI, AdminPosition } from '../api';
import { useDashboardTrigger } from '../hooks/useDashboardRefresh';
import Pagination from '../components/Pagination';

// Function to update JobDetails.tsx file
const updateJobDetailsFile = async (jobDetails: { id: string; title: string; code: string }) => {
  try {
    // Read the current JobDetails.tsx file
    const response = await fetch('/src/components/JobDetails.tsx');
    const fileContent = await response.text();
    
    // Find the JOB_CONTENT object and THEME_MAP
    const jobContentMatch = fileContent.match(/const JOB_CONTENT: Record<string, JobRole> = \{([\s\S]*?)\};/);
    const themeMapMatch = fileContent.match(/const THEME_MAP: Record<string, \{ border: string; icon: string \}> = \{([\s\S]*?)\};/);
    
    if (jobContentMatch && themeMapMatch) {
      // Add new job content
      const newJobContent = jobContentMatch[1].trim() + ',\n  ' + jobDetails.code;
      const newThemeMap = themeMapMatch[1].trim() + ',\n  ' + `"${jobDetails.id}": { border: "border-blue-500", icon: "bg-blue-500/20 text-blue-500" }`;
      
      // Replace the content
      const updatedContent = fileContent
        .replace(/const JOB_CONTENT: Record<string, JobRole> = \{[\s\S]*?\};/, `const JOB_CONTENT: Record<string, JobRole> = {\n${newJobContent}\n};`)
        .replace(/const THEME_MAP: Record<string, \{ border: string; icon: string \}> = \{[\s\S]*?\};/, `const THEME_MAP: Record<string, { border: string; icon: string }> = {\n${newThemeMap}\n};`);
      
      // Note: In a real application, you would need a backend API to write files
      // For now, we'll copy to clipboard and show instructions
      return {
        success: true,
        content: updatedContent,
        message: `JobDetails.tsx would be updated with position "${jobDetails.title}"`
      };
    }
  } catch (error) {
    console.error('Error updating JobDetails.tsx:', error);
    return { success: false, error };
  }
};
const generateJobDetails = (title: string, description: string, roleOverview: string, keyResponsibilities: (Responsibility | string)[]) => {
  const id = title.toLowerCase().replace(/\s+/g, '-');
  const overview = roleOverview || description || `As a ${title} at Dashur AI, LLC, you will be a key member of our innovative team, helping us deliver cutting-edge AI solutions to our clients.`;
  
  const responsibilities = keyResponsibilities.length > 0 
    ? keyResponsibilities.map((resp: Responsibility | string) => {
        // Handle both Responsibility objects and string formats
        if (typeof resp === 'object' && resp !== null && resp.title && resp.desc) {
          return resp;
        } else if (typeof resp === 'string') {
          const parts = resp.split(':');
          return {
            title: parts[0]?.trim() || resp,
            desc: parts[1]?.trim() || parts[0]?.trim() || resp
          };
        } else {
          // Fallback for any other format
          return {
            title: "Responsibility",
            desc: String(resp)
          };
        }
      })
    : [
        { title: "Core Development", desc: `Apply your expertise in ${title} to build and maintain our AI-driven products.` },
        { title: "Team Collaboration", desc: "Work closely with cross-functional teams to deliver high-quality solutions." },
        { title: "Innovation", desc: "Contribute to the development of new features and improvements to our existing systems." },
        { title: "Best Practices", desc: "Follow industry best practices and maintain high code quality standards." }
      ];

  return {
    id,
    title,
    overview,
    responsibilities,
    theme: {
      border: "border-blue-500",
      icon: "bg-blue-500/20 text-blue-500"
    },
    code: `"${id}": {
  overview: "${overview.replace(/"/g, '\\"')}",
  responsibilities: [
    ${responsibilities.map(r => `    { title: "${r.title}", desc: "${r.desc.replace(/"/g, '\\"')}" }`).join(',\n')}
  ]
}`
  };
};

interface Position {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Active' | 'Inactive';
  description: string;
  role_overview: string;
  key_responsibilities: (Responsibility | string)[]; // Use Responsibility objects or strings
}

// Backend comment: AdminPosition interface from API has different field names
// Backend returns: id, title, description, requirements, location, employment_type, is_active
// Frontend expects: title, department, type, status

interface FormData {
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Active' | 'Inactive';
  description: string;
  role_overview: string;
  key_responsibilities: (Responsibility | string)[]; // Allow both Responsibility objects and strings
}

interface Responsibility {
  title: string;
  desc: string;
}

const PositionsManagement = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState<FormData>({ title: '', department: '', type: 'Full-time', status: 'Active', description: '', role_overview: '', key_responsibilities: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { triggerActivityRefresh } = useDashboardTrigger();

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await adminAPI.getPositions();

        console.log('Raw positions response from API:', data);
        console.log('Positions array length:', data.length);
        console.log('Positions array type:', typeof data);
        console.log('Is array?', Array.isArray(data));
        
        const transformedData: Position[] = data.map((position: AdminPosition) => ({
          id: position.id,
          title: position.title,
          department: position.department,
          type: position.type.charAt(0).toUpperCase() + position.type.slice(1) as Position['type'],
          status: position.status.charAt(0).toUpperCase() + position.status.slice(1) as Position['status'],
          description: position.description,
          role_overview: position.role_overview || '',
          key_responsibilities: (position.key_responsibilities || []) as (Responsibility | string)[]
        }));
        console.log('Transformed positions data:', transformedData);
        setPositions(transformedData);
      } catch (err) {
        setError('Failed to fetch positions');
        console.error('Error fetching positions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleAddResponsibility = () => {
    setFormData({
      ...formData,
      key_responsibilities: [...formData.key_responsibilities, { title: '', desc: '' }]
    });
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData({
      ...formData,
      key_responsibilities: formData.key_responsibilities.filter((_, i) => i !== index)
    });
  };

  const handleResponsibilityChange = (index: number, field: 'title' | 'desc', value: string) => {
    const updatedResponsibilities = formData.key_responsibilities.map((resp, i) => {
      if (i === index) {
        if (typeof resp === 'string') {
          return { title: field === 'title' ? value : resp, desc: field === 'desc' ? value : '' };
        }
        return { ...resp, [field]: value };
      }
      return resp;
    });
    setFormData({
      ...formData,
      key_responsibilities: updatedResponsibilities
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (!formData.role_overview.trim()) {
        setError('Role Overview is required');
        return;
      }
      
      if (formData.key_responsibilities.length === 0) {
        setError('At least one Key Responsibility is required');
        return;
      }
      
      if (formData.description.length < 10) {
        setError('Description must be at least 10 characters long');
        return;
      }
      
      setError(null); 
      
      const newPositionData = {
        title: formData.title,
        department: formData.department,
        type: formData.type.toLowerCase() as 'full-time' | 'part-time' | 'contract', 
        status: formData.status.toLowerCase() as 'active' | 'inactive', 
        description: formData.description, 
        role_overview: formData.role_overview, 
        key_responsibilities: formData.key_responsibilities.map((resp) => {

          if (resp && typeof resp === 'object' && resp.title && resp.desc) {
            return {
              title: resp.title.trim(),
              desc: resp.desc.trim()
            };
          }
          if (typeof resp === 'string') {
            const parts = resp.split(':');
            if (parts.length >= 2) {
              return {
                title: parts[0].trim(),
                desc: parts.slice(1).join(':').trim()
              };
            }
            return {
              title: resp.trim(),
              desc: ''
            };
          }
          return {
            title: resp?.title || 'Untitled Responsibility',
            desc: resp?.desc || ''
          };
        }),
        tags: [],
        image_url: '',
      };
      console.log('Creating position with data:', newPositionData);
      const newPosition = await adminAPI.createPosition(newPositionData);
      const transformedPosition: Position = {
        id: newPosition.id,
        title: newPosition.title,
        department: newPosition.department,
        type: newPosition.type.charAt(0).toUpperCase() + newPosition.type.slice(1) as Position['type'],
        status: newPosition.status.charAt(0).toUpperCase() + newPosition.status.slice(1) as Position['status'],
        description: newPosition.description,
        role_overview: formData.role_overview,
        key_responsibilities: formData.key_responsibilities
      };
      setPositions([...positions, transformedPosition]);
      
      triggerActivityRefresh();
      
      toast.success(`Position "${formData.title}" created successfully!`);
      
      const jobDetails = generateJobDetails(formData.title, formData.description, formData.role_overview, formData.key_responsibilities);
      console.log('Generated Job Details:', jobDetails);
      
      const updateResult = await updateJobDetailsFile(jobDetails);
      
      if (updateResult && updateResult.success) {
        try {
          await navigator.clipboard.writeText(updateResult.content || '');
          alert(`Position "${formData.title}" created successfully!\n\n✅ JobDetails.tsx updated and copied to clipboard!\n\nThe file has been updated with:\n- Position: ${jobDetails.title}\n- ID: ${jobDetails.id}\n- Role Overview and Responsibilities added\n\nPaste the updated content into JobDetails.tsx to apply changes.`);
        } catch (error) {
          console.error('Clipboard error:', error);
          alert(`Position "${formData.title}" created successfully!\n\n${updateResult?.message || 'Job details generated'}\n\nGenerated code:\n${jobDetails.code}\n\nTheme mapping:\n"${jobDetails.id}": { border: "border-blue-500", icon: "bg-blue-500/20 text-blue-500" }`);
        }
      } else {
        const fullJobDetailsCode = `${jobDetails.code},\n  "${jobDetails.id}": { border: "border-blue-500", icon: "bg-blue-500/20 text-blue-500" }`;
        try {
          await navigator.clipboard.writeText(fullJobDetailsCode);
          alert(`Position "${formData.title}" created successfully!\n\nJob Details code copied to clipboard!\n\nPaste this into JobDetails.tsx JOB_CONTENT object and THEME_MAP:\n\n${fullJobDetailsCode}`);
        } catch (error) {
          console.error('Clipboard error:', error);
          alert(`Position "${formData.title}" created successfully!\n\nAdd this to JobDetails.tsx:\n${fullJobDetailsCode}`);
        }
      }
      
      setFormData({ title: '', department: '', type: 'Full-time', status: 'Active', description: '', role_overview: '', key_responsibilities: [] });
      setShowForm(false);
    } catch (err) {
      toast.error('Failed to create position. Please try again.');
      setError('Failed to create position');
      console.error('Error creating position:', err);
    }
  };

  const handleEdit = (position: Position) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      department: position.department,
      type: position.type,
      status: position.status,
      description: position.description,
      role_overview: position.role_overview || '', 
      key_responsibilities: position.key_responsibilities || [] 
    });
    setShowForm(true);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!editingPosition) return;
    
    try {
      if (!formData.role_overview.trim()) {
        setError('Role Overview is required');
        return;
      }
      
      if (formData.key_responsibilities.length === 0) {
        setError('At least one Key Responsibility is required');
        return;
      }
      
      if (formData.description.length < 10) {
        setError('Description must be at least 10 characters long');
        return;
      }
      
      setError(null); 
      
      const updatedPositionData = {
        title: formData.title,
        department: formData.department,
        type: formData.type.toLowerCase() as 'full-time' | 'part-time' | 'contract',
        status: formData.status.toLowerCase() as 'active' | 'inactive', 
        description: formData.description, 
        role_overview: formData.role_overview, 
        key_responsibilities: formData.key_responsibilities.map((resp) => {
          if (resp && typeof resp === 'object' && resp.title && resp.desc) {
            return {
              title: resp.title.trim(),
              desc: resp.desc.trim()
            };
          }
          if (typeof resp === 'string') {
            const parts = resp.split(':');
            if (parts.length >= 2) {
              return {
                title: parts[0].trim(),
                desc: parts.slice(1).join(':').trim()
              };
            }
            return {
              title: resp.trim(),
              desc: ''
            };
          }
          return {
            title: resp?.title || 'Untitled Responsibility',
            desc: resp?.desc || ''
          };
        }),
        tags: [],
        image_url: '', 
      };
      console.log('Updating position with data:', updatedPositionData);
      await adminAPI.updatePosition(editingPosition.id, updatedPositionData);
      
      setPositions(positions.map(pos => 
        pos.id === editingPosition.id 
          ? { 
              ...pos, 
              title: formData.title,
              department: formData.department,
              type: formData.type,
              status: formData.status,
              description: formData.description,
              role_overview: formData.role_overview,
              key_responsibilities: formData.key_responsibilities
            }
          : pos
      ));
      
      triggerActivityRefresh();
      
      toast.success(`Position "${formData.title}" updated successfully!`);
      
      setFormData({ title: '', department: '', type: 'Full-time', status: 'Active', description: '', role_overview: '', key_responsibilities: [] });
      setEditingPosition(null);
      setShowForm(false);
    } catch (err) {
      toast.error('Failed to update position. Please try again.');
      setError('Failed to update position');
      console.error('Error updating position:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingPosition(null);
    setFormData({ title: '', department: '', type: 'Full-time', status: 'Active', description: '', role_overview: '', key_responsibilities: [] });
    setShowForm(false);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      console.log('Attempting to delete position with ID:', id);
      console.log('Type of ID:', typeof id);
      await adminAPI.deletePosition(id);
      console.log('Delete successful, filtering positions');
      setPositions(positions.filter(p => p.id !== id));
      toast.success('Position deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete position. Please try again.');
      setError('Failed to delete position');
      console.error('Error deleting position:', err);
      if (err && typeof err === 'object' && 'response' in err) {
        const errorResponse = err as { response?: { data?: unknown } };
        console.error('Error details:', errorResponse.response?.data);
      } else {
        console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
      }
    }
  };

  const totalPages = Math.ceil(positions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPositions = positions.slice(indexOfFirstItem, indexOfLastItem);
  
  console.log('Total positions:', positions.length);
  console.log('Current page:', currentPage);
  console.log('Items per page:', itemsPerPage);
  console.log('Index of first item:', indexOfFirstItem);
  console.log('Index of last item:', indexOfLastItem);
  console.log('Current positions (paginated):', currentPositions);

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

      {loading && (
        <div className="text-center py-8 text-gray-400">
          Loading positions...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
      <>
      {showForm && (
        <div className="bg-slate-800 p-6 rounded-lg shadow mb-6">
          <h4 className="text-lg font-semibold mb-4 text-white">
            {editingPosition ? 'Edit Position' : 'Add New Position'}
          </h4>
          <form onSubmit={editingPosition ? handleUpdate : handleSubmit} className="space-y-4 text-gray-300">
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
            <div className="mt-4">
              <textarea
                placeholder="Position Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full h-24 px-4 py-3 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                rows={4}
                required
              />
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Role Overview (for Job Details page)"
                value={formData.role_overview}
                onChange={(e) => setFormData({...formData, role_overview: e.target.value})}
                className="w-full h-24 px-4 py-3 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Responsibilities:</label>
              {formData.key_responsibilities.map((resp, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-600 rounded-lg bg-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-white">Responsibility {index + 1}</h4>
                    {formData.key_responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Responsibility Title"
                      value={typeof resp === 'string' ? resp : resp.title}
                      onChange={(e) => handleResponsibilityChange(index, 'title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Responsibility Description"
                      value={typeof resp === 'string' ? '' : resp.desc}
                      onChange={(e) => handleResponsibilityChange(index, 'desc', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="mt-3 w-full px-4 py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
              >
                + Add Another Responsibility
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-sm font-medium w-full sm:w-auto">
                {editingPosition ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={handleCancelEdit} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 text-sm font-medium w-full sm:w-auto">
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(position)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                      title="Edit Position"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(position.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium"
                      title="Delete Position"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </>
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

export default PositionsManagement;
