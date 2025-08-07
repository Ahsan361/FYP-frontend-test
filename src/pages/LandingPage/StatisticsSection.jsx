
import {
  Paper,
  Typography,
  Grid,
  Box,
  Container,
  Fade,
  Grow,
} from '@mui/material';
import { Museum, History, Visibility, School } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../../styles/theme';
import { useSelector } from 'react-redux';

function StatisticsSection() {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const theme = darkMode ? darkTheme : lightTheme;
    
    // Statistics data
      const stats = [
        { icon: <Museum />, value: '25,000+', label: 'Artifacts' },
        { icon: <History />, value: '5,000', label: 'Years of History' },
        { icon: <Visibility />, value: '2.5M', label: 'Virtual Visits' },
        { icon: <School />, value: '500+', label: 'Educational Programs' }
      ];
    return(
    <Fade in={true} timeout={1000}>
        <Paper 
          sx={{ 
            py: { xs: 4, md: 6 }, 
            mt: 0, 
            borderRadius: 0,
            background: theme.palette.mode === 'light' 
              ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.divider} 100%)`
              : `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
          }} 
          elevation={0}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid key={index} size={{ xs: 6, md: 3 }}>
                  <Grow in={true} timeout={1000 + index * 200}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          color: 'white',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
    </Fade>
    )
}

export default StatisticsSection;