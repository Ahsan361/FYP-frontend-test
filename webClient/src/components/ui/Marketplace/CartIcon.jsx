// src/components/ui/CartIcon.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, IconButton } from '@mui/material';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../../contexts/CartContext';

function CartIcon() {
  const navigate = useNavigate();
  const { getCartCount } = useContext(CartContext);

  return (
    <IconButton
      onClick={() => navigate('/cart')}
      sx={{
        color: 'inherit',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <Badge badgeContent={getCartCount()} color="error">
        <ShoppingCart size={24} />
      </Badge>
    </IconButton>
  );
}

export default CartIcon;