import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  IconButton,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: theme.palette.mode === 'light' 
      ? '0 20px 60px rgba(0, 0, 0, 0.2)'
      : '0 20px 60px rgba(0, 0, 0, 0.5)',
    overflow: 'visible',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
}));

const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseButton = true,
  ...props 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={isMobile}
      TransitionComponent={Transition}
      keepMounted
      {...props}
    >
      {title && (
        <StyledDialogTitle>
          {title}
          {showCloseButton && (
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.2s ease',
                },
              }}
            >
              <Close />
            </IconButton>
          )}
        </StyledDialogTitle>
      )}
      
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
      
      {actions && (
        <DialogActions sx={{ p: 3, pt: 0 }}>
          {actions}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default Modal;