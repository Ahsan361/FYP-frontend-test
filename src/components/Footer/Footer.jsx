import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

import FooterLink from './FooterLink';
import StyledFooter from './FooterStyles';
import SocialIconButton from './FooterIconButtons';

const Footer = ({
  title = 'MIRAS',
  subtitle = 'Cultural Heritage Archive',
  description = 'Preserving and digitizing Pakistan\'s rich cultural heritage for future generations.',
  quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Artifacts', href: '/artifacts' },
    { label: 'Collections', href: '/collections' },
    { label: 'Research', href: '/research' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ],
  resources = [
    { label: 'Digital Archive', href: '/archive' },
    { label: 'Educational Resources', href: '/education' },
    { label: 'Virtual Tours', href: '/tours' },
    { label: 'API Documentation', href: '/api' },
    { label: 'Download Center', href: '/downloads' },
    { label: 'Support', href: '/support' }
  ],
  legal = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Copyright Notice', href: '/copyright' },
    { label: 'Cookie Policy', href: '/cookies' }
  ],
  contact = {
    address: 'National Museum, Karachi, Pakistan',
    phone: '+92 21 99213128',
    email: 'info@miras.gov.pk'
  },
  socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <YouTube />, href: '#', label: 'YouTube' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' }
  ],
  newsletter = true,
  showLanguageSelector = true,
  customContent,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledFooter component="footer" {...props}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          {/* Box 1: Logo and Social Links (Left) */}
          <Box sx={{ flex: isMobile ? '1 1 100%' : '0 0 30%', maxWidth: isMobile ? '100%' : '650px' }}>
            <Typography 
              variant="h2" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                mb: 1.5,
                letterSpacing: '-0.02em'
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="subtitle1"
              sx={{ 
                color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary',
                mb: 2,
                fontWeight: 500,
                fontSize: {xs: "1rem", md:"1.4rem" }
              }}
            >
              {subtitle}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'light' ? 'grey.400' : 'text.secondary',
                lineHeight: 1.7,
                mb: 3,
                fontSize: {xs: "0.9rem", md:"1.1rem" }
              }}
            >
              {description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {socialLinks.map((social, index) => (
                <SocialIconButton
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  size="medium"
                  sx={{
                    bgcolor: theme.palette.mode === 'light' ? 'grey.800' : theme.palette.background,
                    '&:hover': { bgcolor: 'primary.main' }
                  }}
                >
                  {social.icon}
                </SocialIconButton>
              ))}
            </Box>
          </Box>

          {/* Box 2: Quick Links, Resources, Contact, Legal (Right) */}
          <Box sx={{ flex: isMobile ? '1 1 100%' : '0 0 65%' }}>
            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="flex-end">
              {/* Quick Links */}
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2.5,
                    color: theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
                    fontSize: {xs: "0.9rem", md:"1.4rem" }
                  }}
                >
                  Quick Links
                </Typography>
                <Stack spacing={1.5}>
                  {quickLinks.map((link, index) => (
                    <FooterLink 
                      key={index} 
                      href={link.href}
                      underline="none"
                      sx={{
                        color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary',
                        '&:hover': { color: 'primary.main' },
                        fontSize: {xs: "0.9rem", md:"1.1rem" }
                      }}
                    >
                      {link.label}
                    </FooterLink>
                  ))}
                </Stack>
              </Grid>

              {/* Resources */}
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2.5,
                    color: theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
                    fontSize: {xs: "0.9rem", md:"1.4rem" }
                  }}
                >
                  Resources
                </Typography>
                <Stack spacing={1.5}>
                  {resources.map((resource, index) => (
                    <FooterLink 
                      key={index} 
                      href={resource.href}
                      underline="none"
                      sx={{
                        color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary',
                        '&:hover': { color: 'primary.main' },
                        fontSize: {xs: "0.9rem", md:"1.1rem" }
                      }}
                    >
                      {resource.label}
                    </FooterLink>
                  ))}
                </Stack>
              </Grid>

              {/* Contact Information */}
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2.5,
                    color: theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
                    fontSize: {xs: "0.9rem", md:"1.4rem" }
                  }}
                >
                  Contact Us
                </Typography>
                <Stack spacing={2}>
                  <FooterLink>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <LocationOn sx={{ color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary' , fontSize: {xs: "0.9rem", md:"1.1rem" } }}>
                        {contact.address}
                      </Typography>
                    </Box>
                  </FooterLink>
                  <FooterLink>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Phone sx={{ color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary', fontSize: {xs: "0.9rem", md:"1.1rem" } }}>
                        {contact.phone}
                      </Typography>
                    </Box>
                  </FooterLink>
                  <FooterLink>
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <Email sx={{ color: 'primary.main' }} />
                      <Typography variant="body2" sx={{ color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary', fontSize: {xs: "0.9rem", md:"1.1rem" } }}>
                        {contact.email}
                      </Typography>
                    </Box>
                  </FooterLink>
                </Stack>
              </Grid>

              {/* Legal Links */}
              <Grid size={{ xs: 6, md: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2.5,
                    color: theme.palette.mode === 'light' ? 'common.white' : 'text.primary',
                    fontSize: {xs: "0.9rem", md:"1.4rem" }
                  }}
                >
                  Legal
                </Typography>
                <Stack spacing={1.5}>
                  {legal.map((item, index) => (
                    <FooterLink 
                      key={index} 
                      href={item.href}
                      underline="none"
                      sx={{
                        color: theme.palette.mode === 'light' ? 'grey.300' : 'text.secondary',
                        '&:hover': { color: 'primary.main' },
                        fontSize: {xs: "0.9rem", md:"1.1rem" }
                      }}
                    >
                      {item.label}
                    </FooterLink>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Custom Content */}
        {customContent && (
          <Box sx={{ mt: 5, mb: 3 }}>
            {customContent}
          </Box>
        )}

        {/* Divider */}
        <Divider 
          sx={{ 
            my: 4,
            borderColor: theme.palette.mode === 'light' ? 'grey.700' : 'divider',
            borderWidth: '1px'
          }} 
        />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 2,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.mode === 'light' ? 'grey.400' : 'text.secondary',
              fontSize: '0.875rem'
            }}
          >
            © {new Date().getFullYear()} {title}. All rights reserved. | 
            Powered by Digital Heritage Initiative
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'light' ? 'grey.400' : 'text.secondary',
                fontSize: '0.875rem'
              }}
            >
              Made with ❤️ for Pakistan's Heritage
            </Typography>
          </Box>
        </Box>
    </StyledFooter>
  );
};

export default Footer;