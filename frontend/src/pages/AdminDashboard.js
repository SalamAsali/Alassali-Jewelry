import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, inquiriesRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/stats`),
        axios.get(`${API_URL}/api/inquiries`)
      ]);
      setStats(statsRes.data);
      setInquiries(inquiriesRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-champagne-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white py-12" data-testid="admin-content">
      <div className="section-container">
        <div className="flex justify-between items-center mb-12">
          <h1 className="heading-section">Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn-ghost">
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" data-testid="dashboard-overview">
          {stats && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6"
              >
                <p className="text-sm text-taupe mb-2">Total Products</p>
                <p className="text-3xl font-bold text-deep-charcoal">{stats.total_products}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-6"
              >
                <p className="text-sm text-taupe mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-deep-charcoal">{stats.total_orders}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-6"
              >
                <p className="text-sm text-taupe mb-2">Pending Inquiries</p>
                <p className="text-3xl font-bold text-champagne-gold">{stats.pending_inquiries}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-6"
              >
                <p className="text-sm text-taupe mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-deep-charcoal">${stats.total_revenue.toLocaleString()}</p>
              </motion.div>
            </>
          )}
        </div>

        {/* Custom Inquiries */}
        <div className="bg-white rounded-lg p-6" data-testid="custom-inquiries-table">
          <h2 className="font-heading text-2xl font-semibold mb-6">Custom Jewelry Inquiries</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone">
                  <th className="text-left py-3 px-4 font-medium text-charcoal">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-charcoal">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-charcoal">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-charcoal">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-charcoal">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-stone/50">
                    <td className="py-3 px-4">{inquiry.name}</td>
                    <td className="py-3 px-4 capitalize">{inquiry.type.replace('-', ' ')}</td>
                    <td className="py-3 px-4">{inquiry.budget || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === 'new' ? 'bg-champagne-gold/20 text-champagne-gold' :
                        inquiry.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-taupe">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
