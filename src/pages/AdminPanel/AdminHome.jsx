import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, Archive, Eye, Download, Heart } from 'lucide-react';
import Card from "../../components/ui/Card";
import { motion } from 'framer-motion';

//user context
import { UserContext } from '../../contexts/UserContext';
//services 
import { getArtifacts, getArtifactStats } from '../../services/artifactService';
import { getEventRegistrations, getEventRegistrationStats } from '../../services/EventRegistrationService';
import { getEvents, getEventStats } from '../../services/EventService';
import {getExhibitions, getExhibitionStats} from "../../services/ExhibitionService";
import { getAllListings, getMarketplaceStats } from '../../services/marketPlaceService';
import { getAllUsers, getUserStats } from '../../services/userService';

const COLORS = ['#1B4332', '#2D5A3D', '#B8860B', '#D4AF37', '#616161', '#8B6914'];

const typeToIcon = {
  upload: Archive,
  user: Users,
  event: TrendingUp,
  exhibition: Eye,
  listing: Heart,
  registration: Download,
};

const timeAgo = (date) => {
  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'second', seconds: 1 },
  ];
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  for (let unit of units) {
    const interval = Math.floor(seconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

const getMonthlyData = (items, dateField = 'createdAt') => {
  const data = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const count = items.filter((item) => {
      const d = new Date(item[dateField]);
      return d >= monthStart && d < monthEnd;
    }).length;
    const monthName = monthStart.toLocaleString('default', { month: 'short' });
    data.push({ month: monthName, count });
  }
  return data;
};

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card sx={{ p: 3, height: '100%', borderLeft: `4px solid ${color}` }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            {value}
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
  </motion.div>
);

function AdminHome() {
  const [userStatistics, setUserStatistics] = useState(null);
  const [artifactStatistics, setArtifactStatistics] = useState(null);
  const [eventStatistics, setEventStatistics] = useState(null);
  const [exhibitionStatistics, setExhibitionStatistics] = useState(null);
  const [marketplaceStatistics, setMarketplaceStatistics] = useState(null);
  const [registrationStatistics, setRegistrationStatistics] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [artifactCategories, setArtifactCategories] = useState([]);
  const [topArtifacts, setTopArtifacts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchStatistics = async () => {
      try {
        const [userStatisticsData, artifactStatisticsData, eventStatisticsData, exhibitionStatisticsData, marketplaceStatisticsData, registrationStatisticsData] = await Promise.all([
          getUserStats(token),
          getArtifactStats(token),
          getEventStats(token),
          getExhibitionStats(token),
          getMarketplaceStats(token),
          getEventRegistrationStats(token),
        ]);
        setUserStatistics(userStatisticsData);
        setArtifactStatistics(artifactStatisticsData);
        setEventStatistics(eventStatisticsData);
        setExhibitionStatistics(exhibitionStatisticsData);
        setMarketplaceStatistics(marketplaceStatisticsData);
        setRegistrationStatistics(registrationStatisticsData);
      } catch (err) {
        console.error('Error fetching statistics:', err);
      }
    };

    const fetchDataForCharts = async () => {
      try {
        const [artifacts, users, events, exhibitions, listings, registrations] = await Promise.all([
          getArtifacts(token),
          getAllUsers(token),
          getEvents(token),
          getExhibitions(token),
          getAllListings(token),
          getEventRegistrations(token),
        ]);

        // Monthly data
        const monthlyUsers = getMonthlyData(users);
        const monthlyArtifacts = getMonthlyData(artifacts);
        const combinedMonthly = monthlyUsers.map((user, index) => ({
          month: user.month,
          visitors: user.count, // Using new users as proxy for visitors
          artifacts: monthlyArtifacts[index]?.count || 0,
        }));
        setMonthlyData(combinedMonthly);

        // Artifact categories
        const categoryCounts = artifacts.reduce((acc, artifact) => {
          const category = artifact.category || 'Unknown';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        const categories = Object.entries(categoryCounts).map(([name, value], index) => ({
          name,
          value,
          color: COLORS[index % COLORS.length],
        }));
        setArtifactCategories(categories);

        // Top artifacts (assuming artifacts have 'views' field)
        const top = [...artifacts]
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
          .map((artifact) => ({ name: artifact.name || 'Unnamed', views: artifact.views || 0 }));
        setTopArtifacts(top);

        // Recent activities
        const eventMap = new Map(events.map((event) => [event._id, event.title]));
        let activities = [];
        activities = activities.concat(
          artifacts.map((artifact) => ({
            type: 'upload',
            action: 'New artifact uploaded',
            item: artifact.name || 'Unnamed artifact',
            time: artifact.createdAt,
            color: '#1B4332',
          }))
        );
        activities = activities.concat(
          users.map((user) => ({
            type: 'user',
            action: 'User registered',
            item: user.username || user.email || 'Unknown user',
            time: user.createdAt,
            color: '#B8860B',
          }))
        );
        activities = activities.concat(
          events.map((event) => ({
            type: 'event',
            action: 'New event created',
            item: event.title || 'Unnamed event',
            time: event.createdAt,
            color: '#2D5A3D',
          }))
        );
        activities = activities.concat(
          exhibitions.map((exhibition) => ({
            type: 'exhibition',
            action: 'New exhibition created',
            item: exhibition.title || 'Unnamed exhibition',
            time: exhibition.createdAt,
            color: '#D4AF37',
          }))
        );
        activities = activities.concat(
          listings.map((listing) => ({
            type: 'listing',
            action: 'New marketplace listing',
            item: listing.title || 'Unnamed listing',
            time: listing.createdAt,
            color: '#616161',
          }))
        );
        activities = activities.concat(
          registrations.map((registration) => ({
            type: 'registration',
            action: 'New event registration',
            item: eventMap.get(registration.eventId) ? `for ${eventMap.get(registration.eventId)}` : 'for unknown event',
            time: registration.createdAt,
            color: '#8B6914',
          }))
        );
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        setRecentActivities(activities.slice(0, 5));
      } catch (err) {
        console.error('Error fetching data for charts:', err);
      }
    };

    fetchStatistics();
    fetchDataForCharts();
  }, [token]);

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
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Users}
            title="Total Users"
            value={userStatistics?.totalUsers || 0}
            color="#1B4332"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Archive}
            title="Artifacts"
            value={artifactStatistics?.total || 0}
            color="#B8860B"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Eye}
            title="Event Registrations"
            value={registrationStatistics?.totalBookings || 0}
            color="#2D5A3D"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Download}
            title="Marketplace Listings"
            value={marketplaceStatistics?.activeListings || 0}
            color="#8B6914"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={TrendingUp}
            title="Events"
            value={eventStatistics?.upcomingEvents || 0}
            color="#616161"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            icon={Eye}
            title="Exhibitions"
            value={exhibitionStatistics?.totalExhibitions || 0}
            color="#D4AF37"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Visitor Trends */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ p: 3, height: 400 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                User Growth & Artifacts Added
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={monthlyData}>
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
          </motion.div>
        </Grid>

        {/* Artifact Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
          </motion.div>
        </Grid>

        {/* Top Artifacts */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
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
          </motion.div>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {recentActivities.map((activity, index) => {
                  const Icon = typeToIcon[activity.type] || Archive;
                  return (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        py: 2, 
                        borderBottom: index < recentActivities.length - 1 ? '1px solid' : 'none',
                        borderColor: 'divider'
                      }}
                    >
                      <Box sx={{ 
                        p: 1, 
                        borderRadius: 1, 
                        backgroundColor: `${activity.color}20`,
                        mr: 2 
                      }}>
                        <Icon size={16} color={activity.color} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {activity.action}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {activity.item} • {timeAgo(activity.time)}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;