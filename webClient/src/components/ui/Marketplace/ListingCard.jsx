// src/components/marketplace/ListingCard.jsx
import React from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';

function ListingCard({ listing }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/marketplace/listing/${listing._id}`);
  };

  return (
    <Card
      image={listing.image}
      onClick={handleViewDetails}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
            {listing.title}
          </Typography>
          <Chip
            label={listing.status}
            color={listing.status === 'active' ? 'success' : 'default'}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {listing.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {listing.price} PKR
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Token ID: {listing.tokenId}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary">
          Seller: {listing.seller?.username || 'Unknown'}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        startIcon={<ShoppingCart size={18} />}
        onClick={(e) => {
          e.stopPropagation();
          handleViewDetails();
        }}
        sx={{ mt: 2 }}
      >
        View Details
      </Button>
    </Card>
  );
}

export default ListingCard;