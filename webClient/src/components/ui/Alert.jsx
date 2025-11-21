import React, { useState } from 'react';
import { Alert as MuiAlert, AlertTitle, Collapse, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.palette.mode === 'light' 
    ? '0 2px 8px rgba(0, 0, 0, 0.1)'
    : '0 2px 8px rgba(0, 0, 0, 0.3)',
  '& .MuiAlert-icon': {
    fontSize: '1.5rem',
  },
  '& .MuiAlert-message': {
    padding: '2px 0',
  },
}));

const Alert = ({ 
  severity = 'info',
  title,
  children,
  onClose,
  closable = false,
  autoHideDuration,
  sx = {},
  ...props 
}) => {
  const [open, setOpen] = useState(true);

  React.useEffect(() => {
    if (autoHideDuration) {
      const timer = setTimeout(() => {
        setOpen(false);
        if (onClose) onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onClose]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Collapse in={open}>
      <StyledAlert
        severity={severity}
        action={
          closable && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          )
        }
        sx={sx}
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </StyledAlert>
    </Collapse>
  );
};

export default Alert;