import React, { useState, useEffect } from 'react';
import { BriefcaseBusiness, NotepadText, Check, Mail, RefreshCw, Clock, FileText } from 'lucide-react';
import { adminAPI, Activity } from '../api';
import { useDashboardRefresh } from '../hooks/useDashboardRefresh';

const initialStats = [
    { label: 'Total Positions', value: '0', icon: <BriefcaseBusiness />, color: 'bg-blue-500' },
    { label: 'Applications', value: '0', icon: <NotepadText />, color: 'bg-green-500' },
    { label: 'Contact Messages', value: '0', icon: <Mail />, color: 'bg-purple-500' },
    { label: 'Active Jobs', value: '0', icon: <Check />, color: 'bg-orange-500' },
]

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardHome = () => {
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityFilter, setActivityFilter] = useState<'all' | 'application' | 'contact' | 'position'>('all');

  useDashboardRefresh(() => {
    console.log('Dashboard refresh event received - triggering refreshRecentActivity');
    refreshRecentActivity();
  });

  const refreshRecentActivity = async () => {
    try {
      setLoading(true);
      console.log('Refreshing recent activity...');
      const activity = await adminAPI.getRecentActivity();
      console.log('Refreshed activity data:', activity);
      setRecentActivity(activity);
    } catch (err) {
      console.error('Error refreshing recent activity:', err);
      setRecentActivity([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const stats = await adminAPI.getDashboardStats();
        console.log('Dashboard stats:', stats);

        setStats([
          { label: 'Total Positions', value: stats.total_positions.toString(), icon: <BriefcaseBusiness />, color: 'bg-blue-500' },
          { label: 'Applications', value: stats.total_applications.toString(), icon: <NotepadText />, color: 'bg-green-500' },
          { label: 'Contact Messages', value: stats.total_contacts.toString(), icon: <Mail />, color: 'bg-purple-500' },
          { label: 'Active Jobs', value: stats.active_positions.toString(), icon: <Check />, color: 'bg-orange-500' },
        ]);

        try {
          const recentActivity = await adminAPI.getRecentActivity();
          console.log('Recent activity data:', recentActivity);
          setRecentActivity(recentActivity);
        } catch (activityErr) {
          console.error('Error fetching recent activity:', activityErr);
          setRecentActivity([]); 
        }
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const filteredActivities = Array.isArray(recentActivity) ? recentActivity.filter(activity => {
    const mappedType = activity.type === 'contact_form' ? 'contact' : activity.type;
    return activityFilter === 'all' || mappedType === activityFilter;
  }) : [];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const getActivityDisplayType = (type: string) => {
    return type === 'contact_form' ? 'contact' : type;
  };

  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800 rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm sm:text-base">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white text-2xl sm:text-3xl p-2 sm:p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg sm:text-xl font-semibold text-white">Recent Activity</h4>
          <button
            onClick={refreshRecentActivity}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
        
        <div className="flex gap-2 mb-4">
          {['all', 'application', 'contact', 'position'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActivityFilter(filter as typeof activityFilter)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activityFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => {
              const displayType = getActivityDisplayType(activity.type);
              return (
                <div key={activity.id || index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      displayType === 'application' ? 'bg-green-500' :
                      displayType === 'contact' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{activity.description}</p>
                      <p className="text-gray-400 text-xs">{formatTime(activity.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Clock className="w-4 h-4" />
                    {formatTime(activity.created_at)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-400">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No recent activity found</p>
              <p className="text-xs text-gray-500">Try refreshing to see the latest activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
