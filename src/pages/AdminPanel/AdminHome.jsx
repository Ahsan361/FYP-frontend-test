import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Archive, Eye, Download, Heart } from 'lucide-react';
import  Card from "../../components/ui/Card"

// Test data
const monthlyVisitors = [
  { month: 'Jan', visitors: 1200, artifacts: 45 },
  { month: 'Feb', visitors: 1800, artifacts: 52 },
  { month: 'Mar', visitors: 2400, artifacts: 63 },
  { month: 'Apr', visitors: 3100, artifacts: 71 },
  { month: 'May', visitors: 2800, artifacts: 58 },
  { month: 'Jun', visitors: 3500, artifacts: 89 }
];

const artifactCategories = [
  { name: 'Manuscripts', value: 156, color: '#1B4332' },
  { name: 'Pottery', value: 89, color: '#2D5A3D' },
  { name: 'Jewelry', value: 134, color: '#B8860B' },
  { name: 'Textiles', value: 67, color: '#D4AF37' },
  { name: 'Coins', value: 98, color: '#616161' }
];

const topArtifacts = [
  { name: 'Mughal Manuscript', views: 2847 },
  { name: 'Ancient Pottery', views: 2156 },
  { name: 'Traditional Jewelry', views: 1932 },
  { name: 'Silk Textile', views: 1687 },
  { name: 'Historic Coins', views: 1456 }
];

const StatCard = ({ icon: Icon, title, value, change, color }) => (
  <Card sx={{ p: 3, height: '100%', borderLeft: `4px solid ${color}` }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="textPrimary">
          {value}
        </Typography>
        <Typography variant="body2" color={change > 0 ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
          {change > 0 ? '+' : ''}{change}% from last month
        </Typography>
      </Box>
      <Box sx={{ 
        p: 1.5, 
        borderRadius: 2, 
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Icon size={24} color={color} />
      </Box>
    </Box>
  </Card>
);

function AdminHome() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        MIRAS Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Welcome to your cultural heritage management center
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size = {{ xs:12, sm:6, md:3}}>
          <StatCard
            icon={Users}
            title="Total Users"
            value="2,847"
            change={12.5}
            color="#1B4332"
          />
        </Grid>
        <Grid size = {{ xs:12, sm:6, md:3}}>
          <StatCard
            icon={Archive}
            title="Artifacts"
            value="544"
            change={8.2}
            color="#B8860B"
          />
        </Grid>
        <Grid size = {{ xs:12, sm:6, md:3}}>
          <StatCard
            icon={Eye}
            title="Monthly Views"
            value="18.2K"
            change={15.7}
            color="#2D5A3D"
          />
        </Grid>
        <Grid size = {{ xs:12, sm:6, md:3}}>
          <StatCard
            icon={Download}
            title="Downloads"
            value="1,234"
            change={-3.1}
            color="#8B6914"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Visitor Trends */}
        <Grid size = {{ xs:12, lg:8}}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Visitor Trends & Artifacts Added
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={monthlyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#1B4332" 
                  strokeWidth={3}
                  dot={{ fill: '#1B4332', r: 6 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="artifacts" 
                  stroke="#B8860B" 
                  strokeWidth={3}
                  dot={{ fill: '#B8860B', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Artifact Distribution */}
        <Grid size = {{ xs:12, lg:4}}>
          <Card sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Artifact Categories
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={artifactCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {artifactCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Top Artifacts */}
        <Grid size = {{ xs:12, lg:6}}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Most Viewed Artifacts
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topArtifacts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="views" fill="#B8860B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size = {{ xs:12, lg:6}}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {[
                { action: 'New artifact uploaded', item: 'Mughal Miniature Painting', time: '2 hours ago', type: 'upload' },
                { action: 'User registered', item: 'Dr. Sarah Ahmed', time: '4 hours ago', type: 'user' },
                { action: 'Artifact favorited', item: 'Ancient Pottery Collection', time: '6 hours ago', type: 'favorite' },
                { action: 'Download request', item: 'Historical Documents Set', time: '8 hours ago', type: 'download' },
                { action: 'New artifact uploaded', item: 'Traditional Textile Sample', time: '1 day ago', type: 'upload' }
              ].map((activity, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    py: 2, 
                    borderBottom: index < 4 ? '1px solid' : 'none',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1, 
                    backgroundColor: activity.type === 'upload' ? '#1B433220' : 
                                   activity.type === 'user' ? '#B8860B20' : 
                                   activity.type === 'favorite' ? '#D4AF3720' : '#61616120',
                    mr: 2 
                  }}>
                    {activity.type === 'upload' ? <Archive size={16} /> : 
                     activity.type === 'user' ? <Users size={16} /> :
                     activity.type === 'favorite' ? <Heart size={16} /> : <Download size={16} />}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {activity.item} • {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;