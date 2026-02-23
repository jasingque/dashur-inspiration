import React from 'react';
import { BriefcaseBusiness, NotepadText, Check, Mail } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface Activity {
  type: 'application' | 'contact' | 'position';
  message: string;
  time: string;
}

const DashboardHome = () => {
  const stats: Stat[] = [
    { label: 'Total Positions', value: '12', icon: <BriefcaseBusiness />, color: 'bg-blue-500' },
    { label: 'Applications', value: '48', icon: <NotepadText />, color: 'bg-green-500' },
    { label: 'Contact Messages', value: '23', icon: <Mail />, color: 'bg-purple-500' },
    { label: 'Active Jobs', value: '8', icon: <Check />, color: 'bg-orange-500' },
  ];

  const recentActivity: Activity[] = [
    { type: 'application', message: 'New application for Frontend Developer', time: '2 hours ago' },
    { type: 'contact', message: 'New contact form submission', time: '4 hours ago' },
    { type: 'position', message: 'New position added: UX Designer', time: '1 day ago' },
    { type: 'application', message: 'Application reviewed: Senior React Developer', time: '2 days ago' },
    { type: 'contact', message: 'Response sent to inquiry about partnerships', time: '3 days ago' },
    { type: 'position', message: 'Position closed: Junior Developer', time: '4 days ago' },
    { type: 'application', message: 'Interview scheduled: Backend Engineer', time: '5 days ago' },
    { type: 'contact', message: 'New subscription request received', time: '1 week ago' },
  ];

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
        <h4 className="text-lg sm:text-xl font-semibold mb-4 text-white">Recent Activity</h4>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  activity.type === 'application' ? 'bg-green-500' :
                  activity.type === 'contact' ? 'bg-purple-500' :
                  'bg-blue-500'
                }`}></div>
                <span className="text-gray-300 text-sm sm:text-base">{activity.message}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
