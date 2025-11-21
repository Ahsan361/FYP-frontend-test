import React from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function CustomAlert({ alert, onClose }) {
  return (
    <Collapse in={alert.show}>
      <Alert
        severity={alert.severity}
        sx={{ mb: 3, borderRadius: 2 }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        {alert.message}
      </Alert>
    </Collapse>
  );
}

export default CustomAlert;