import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import type { Incident } from '../types';
// import { incidentService } from '../services/api'; // Uncomment when API is ready

export default function Dashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState({
    open: 0,
    resolved: 0,
    total: 0
  });

  // test data - replace with API call to backend later
  useEffect(() => {
    const mockIncidents: Incident[] = [
      {
        _id: '1',
        title: 'Hazard 1',
        description: 'Desc.',
        reportedBy: 'user123',
        workplaceId: 'workplace123',
        status: 'Open',
        riskLevel: 'High',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      },
      {
        _id: '2',
        title: 'Hazard 2',
        description: 'Desc.',
        reportedBy: 'user456',
        workplaceId: 'workplace123',
        status: 'In Progress',
        riskLevel: 'Medium',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      },
      {
        _id: '3',
        title: 'Hazard 3',
        description: 'Desc.',
        reportedBy: 'user789',
        workplaceId: 'workplace123',
        status: 'Resolved',
        riskLevel: 'Low',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      }
    ];

    setIncidents(mockIncidents);
    
    // calc stats
    const openCount = mockIncidents.filter(i => i.status === 'Open' || i.status === 'In Progress').length;
    const resolvedCount = mockIncidents.filter(i => i.status === 'Resolved' || i.status === 'Closed').length;
    
    setStats({
      open: openCount,
      resolved: resolvedCount,
      total: mockIncidents.length
    });
  }, []);

  const getRiskLevelColor = (riskLevel: string) => {
    switch(riskLevel) {
      case 'High': return 'bg-danger-500 text-white';
      case 'Medium': return 'bg-warning-500 text-white';
      case 'Low': return 'bg-success-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Layout title="Dashboard">
      {/* stats cards -- get rid*/}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-warning-500">{stats.open}</div>
          <div className="text-xs text-gray-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-success-500">{stats.resolved}</div>
          <div className="text-xs text-gray-600">Resolved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-700">{stats.total}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
      </div>

      {/* recent incidents */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Recent Incidents</h2>
          <button 
           onClick={() => navigate('/all-incidents')}
            className="text-primary-500 hover:text-blue-600 transition-colors flex items-center"
            >
          <span className="text-sm mr-1">View All</span>
          <span className="text-lg">→</span>
        </button>
      </div>

        <div className="space-y-3">
          {incidents.map(incident => (
            <div 
              key={incident._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/incidents/${incident._id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{incident.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskLevelColor(incident.riskLevel)}`}>
                  {incident.riskLevel}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {incident.description}
              </p>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span className={`px-2 py-1 rounded ${
                  incident.status === 'Open' ? 'bg-red-100 text-red-700' :
                  incident.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {incident.status}
                </span>
                <span>{getTimeAgo(incident.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
