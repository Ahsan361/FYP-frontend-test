import React , {forwardRef } from 'react';
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
import AnimatedIconButton from '../ui/AnimatedIconButton';


const Footer = ( {
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
}) =>{
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledFooter component="footer" {...props}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid size={{xs:12, md:3}}>
            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 0.5
                }}
              >
                {title}
              </Typography>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: theme.palette.mode === 'light' 
                    ? 'grey.400' 
                    : 'text.secondary',
                  mb: 2
                }}
              >
                {subtitle}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.mode === 'light' 
                    ? 'grey.300' 
                    : 'text.secondary',
                  lineHeight: 1.6,
                  mb: 2
                }}
              >
                {description}
              </Typography>
              
              {/* Social Links */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                {socialLinks.map((social, index) => (
                  <SocialIconButton
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    size="small"
                  >
                    {social.icon}
                  </SocialIconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs:12 ,sm:6, md:2}}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.mode === 'light' 
                  ? 'common.white' 
                  : 'text.primary'
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link, index) => (
                <FooterLink 
                  key={index} 
                  href={link.href}
                  underline="none"
                >
                  {link.label}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          {/* Resources */}
          <Grid size={{xs:12, sm:6, md:2}}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.mode === 'light' 
                  ? 'common.white' 
                  : 'text.primary'
              }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              {resources.map((resource, index) => (
                <FooterLink 
                  key={index} 
                  href={resource.href}
                  underline="none"
                >
                  {resource.label}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Information */}
          <Grid size ={{xs:12, sm:6, md:3}}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.mode === 'light' 
                  ? 'common.white' 
                  : 'text.primary'
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <FooterLink>
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOn />
                  <Typography variant="body2">
                    {contact.address}
                  </Typography>
                </Box>
              </FooterLink>
              <FooterLink>
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone />
                  <Typography variant="body2">
                    {contact.phone}
                  </Typography>
                 </Box>
              </FooterLink>
              <FooterLink>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Email />
                  <Typography variant="body2">
                    {contact.email}
                  </Typography>
                </Box>
              </FooterLink>
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid size = {{xs:12, sm:6, md:2}}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: theme.palette.mode === 'light' 
                  ? 'common.white' 
                  : 'text.primary'
              }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              {legal.map((item, index) => (
                <FooterLink 
                  key={index} 
                  href={item.href}
                  underline="none"
                >
                  {item.label}
                </FooterLink>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Custom Content */}
        {customContent && (
          <Box sx={{ mt: 4, mb: 2 }}>
            {customContent}
          </Box>
        )}

        {/* Divider */}
        <Divider 
          sx={{ 
            my: 3,
            borderColor: theme.palette.mode === 'light' 
              ? 'grey.700' 
              : 'divider'
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
              color: theme.palette.mode === 'light' 
                ? 'grey.400' 
                : 'text.secondary'
            }}
          >
            © {new Date().getFullYear()} {title}. All rights reserved. | 
            Powered by Digital Heritage Initiative
          </Typography>

          {/* Language Selector & Additional Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>           
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.mode === 'light' 
                  ? 'grey.400' 
                  : 'text.secondary'
              }}
            >
              Made with ❤️ for Pakistan's Heritage
            </Typography>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;