import { useState } from 'react';
import { 
  ThemeProvider, 
  CssBaseline, 
  Typography, 
  Container, 
  Box, 
  Grid,
  Paper,
  Divider
} from '@mui/material';
import { 
  Search, 
  Email, 
  Phone, 
  LocationOn, 
  Star,
  Favorite,
  Share,
  Download,
  Edit,
  Delete
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './styles/theme';

// Import all custom components
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Modal, 
  Loading, 
  Alert, 
  Navbar,
  Footer
} from './components/ui';

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  // State for demonstrations
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [loading, setLoading] = useState(false);

  // Sample artifact data
  const sampleArtifacts = [
    {
      id: 1,
      title: "Gandhara Buddha Statue",
      period: "2nd-3rd Century CE",
      location: "Peshawar Museum",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      status: "Preserved"
    },
    {
      id: 2,
      title: "Mughal Miniature Painting",
      period: "16th Century",
      location: "Lahore Museum",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      status: "Restored"
    },
    {
      id: 3,
      title: "Indus Valley Seal",
      period: "2500-1900 BCE",
      location: "National Museum Karachi",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=300&fit=crop",
      status: "Research"
    }
  ];

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
         <Navbar
            title="MIRAS"
            subtitle="Cultural Heritage"
          />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to MIRAS
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Digital Archive and Preservation of Pakistani Cultural Artifacts
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" startIcon={<Search />}>
                Explore Artifacts
              </Button>
              <Button variant="outlined" size="large" onClick={() => setModalOpen(true)}>
                Learn More
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                loading={loading}
                onClick={handleLoadingDemo}
              >
                {loading ? 'Processing...' : 'Start Journey'}
              </Button>
            </Box>
          </Box>

          {showAlert && (
            <Box sx={{ mb: 4 }}>
              <Alert 
                severity="info" 
                title="Welcome to MIRAS!"
                closable 
                onClose={() => setShowAlert(false)}
              >
                Discover Pakistan's rich cultural heritage through our digital archive. 
                This demo showcases all the reusable components built for the project.
              </Alert>
            </Box>
          )}

          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Input Components Demo
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{xs:12, md:6}}>
                <Input
                  label="Search Artifacts"
                  placeholder="Enter artifact name, period, or location..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  startIcon={<Search />}
                  fullWidth
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  startIcon={<Email />}
                  fullWidth
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{xs:12, md:6}}>
                <Input
                  label="Contact Information"
                  multiline
                  rows={3}
                  placeholder="Enter your contact details..."
                  startIcon={<Phone />}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Button Components Demo
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{xs:12, sm:6 , md:3}}>
                <Typography variant="h6" gutterBottom>Primary Buttons</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="contained" size="small">Small</Button>
                  <Button variant="contained" size="medium">Medium</Button>
                  <Button variant="contained" size="large">Large</Button>
                </Box>
              </Grid>
              <Grid size={{xs:12, sm:6 , md:3}}>
                <Typography variant="h6" gutterBottom>Outlined Buttons</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Edit />}>Edit</Button>
                  <Button variant="outlined" endIcon={<Share />}>Share</Button>
                  <Button variant="outlined" color="secondary">Secondary</Button>
                </Box>
              </Grid>
              <Grid size={{xs:12, sm:6 , md:3}}>
                <Typography variant="h6" gutterBottom>Text Buttons</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="text">Cancel</Button>
                  <Button variant="text" color="error" startIcon={<Delete />}>Delete</Button>
                  <Button variant="text" disabled>Disabled</Button>
                </Box>
              </Grid>
              <Grid size={{xs:12, sm:6 , md:3}}>
                <Typography variant="h6" gutterBottom>Special Buttons</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="contained" fullWidth>Full Width</Button>
                  <Button variant="contained" loading>Loading</Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Badge Components Demo
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Badge label="Preserved" color="success" />
              <Badge label="Under Restoration" color="warning" />
              <Badge label="Research Phase" color="info" />
              <Badge label="Ancient" color="primary" />
              <Badge label="Medieval" color="secondary" />
              <Badge label="Premium" variant="gradient" />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Badge label="Gandhara" variant="outlined" />
              <Badge label="Mughal Era" variant="outlined" color="secondary" />
              <Badge label="Indus Valley" variant="outlined" color="primary" />
              <Badge 
                label="Featured" 
                variant="filled" 
                color="error" 
                icon={<Star />}
              />
            </Box>
          </Paper>

          {/* Cards Demo */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Artifact Cards Demo
            </Typography>
            <Grid container spacing={3}>
              {sampleArtifacts.map((artifact) => (
                <Grid size={{xs:12, sm:6 , md:4}} key={artifact.id}>
                  <Card
                    image={artifact.image}
                    imageHeight={200}
                    onClick={() => console.log(`Clicked on ${artifact.title}`)}
                    actions={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button size="small" startIcon={<Favorite />}>
                          Like
                        </Button>
                        <Button size="small" variant="outlined" startIcon={<Download />}>
                          Save
                        </Button>
                      </Box>
                    }
                  >
                    <Typography variant="h6" component="h3" gutterBottom>
                      {artifact.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Period: {artifact.period}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      {artifact.location}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Badge 
                        label={artifact.status} 
                        color={
                          artifact.status === 'Preserved' ? 'success' :
                          artifact.status === 'Restored' ? 'warning' : 'info'
                        }
                        size="small"
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Loading Demo */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Loading Components Demo
            </Typography>
            <Grid container spacing={4}>
              <Grid size={{xs:12 , md:4}}>
                <Typography variant="h6" gutterBottom>Spinner Loading</Typography>
                <Loading type="spinner" message="Loading artifacts..." />
              </Grid>
              <Grid size={{xs:12 , md:4}}>
                <Typography variant="h6" gutterBottom>Skeleton Loading</Typography>
                <Loading type="skeleton" lines={4} height={30} />
              </Grid>
              <Grid size={{xs:12 , md:4}}>
                <Typography variant="h6" gutterBottom>Custom Loading</Typography>
                <Loading size={60} message="Processing cultural data..." />
              </Grid>
            </Grid>
          </Paper>

          {/* Alert Variations */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Alert Components Demo
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Alert severity="success" title="Success!">
                Artifact successfully added to your collection.
              </Alert>
              <Alert severity="warning" title="Warning">
                This artifact requires special preservation conditions.
              </Alert>
              <Alert severity="error" title="Error" closable>
                Failed to load artifact details. Please try again.
              </Alert>
              <Alert severity="info">
                Did you know? Pakistan has over 5,000 years of recorded history!
              </Alert>
            </Box>
          </Paper>

          {/* Footer */}
          <Divider sx={{ my: 4 }} />
        </Container>
        <Footer/>

        {/* Modal Demo */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="About MIRAS Project"
          maxWidth="md"
          actions={
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={() => setModalOpen(false)}>
                Close
              </Button>
              <Button variant="contained">
                Get Started
              </Button>
            </Box>
          }
        >

          <Typography variant="body1" paragraph>
            MIRAS (میراث) is a comprehensive digital archiving and preservation platform 
            dedicated to safeguarding Pakistan's rich cultural heritage. Our mission is to 
            create a digital repository that makes cultural artifacts accessible to researchers, 
            students, and the general public worldwide.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Key Features:
          </Typography>
          
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body2" paragraph>
              High-resolution digital imaging of artifacts
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Comprehensive metadata and historical context
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Advanced search and filtering capabilities
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Multi-language support (Urdu, English, regional languages)
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Educational resources and virtual exhibitions
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
            <Badge label="Cultural Heritage" color="primary" />
            <Badge label="Digital Archive" color="secondary" />
            <Badge label="Pakistan" variant="gradient" />
            <Badge label="Preservation" color="success" />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default App;