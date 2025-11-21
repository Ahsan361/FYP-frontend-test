import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { CheckCircle, AlertCircle, Info, Eye, EyeOff } from "lucide-react";

function PasswordDialog({
  open,
  onClose,
  passwordData,
  setPasswordData,
  handlePasswordChange,
}) {
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Update password validation whenever newPassword changes
  useEffect(() => {
    setPasswordValidation({
      minLength: passwordData.newPassword.length >= 8,
      hasLower: /(?=.*[a-z])/.test(passwordData.newPassword),
      hasUpper: /(?=.*[A-Z])/.test(passwordData.newPassword),
      hasNumber: /(?=.*\d)/.test(passwordData.newPassword),
      hasSpecial: /(?=.*[@$!%*?&])/.test(passwordData.newPassword),
    });
  }, [passwordData.newPassword]);

  const passwordsDoNotMatch =
    passwordData.newPassword &&
    passwordData.confirmPassword &&
    passwordData.newPassword !== passwordData.confirmPassword;

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // Determine if the Reset Password button should be disabled
  const isButtonDisabled =
    passwordsDoNotMatch ||
    !isPasswordValid ||
    !passwordData.newPassword ||
    !passwordData.currentPassword;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="password-dialog-title"
    >
      <style>{`
        .password-requirement {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.7);
          transition: color 0.3s ease;
        }
        .password-requirement.valid {
          color: #4caf50;
        }
        .password-requirement.invalid {
          color: rgba(0, 0, 0, 0.5);
        }
        .requirements-container {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          padding: 12px;
          margin-top: 8px;
          border-left: 3px solid rgba(0, 0, 0, 0.3);
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: ${passwordData.newPassword ? 1 : 0};
          transform: ${passwordData.newPassword ? 'translateY(0)' : 'translateY(-10px)'};
          pointer-events: ${passwordData.newPassword ? 'auto' : 'none'};
        }
        .password-field-container {
          position: relative;
        }
        .toggle-password-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          min-width: 0;
          padding: 4px;
        }
      `}</style>
      <DialogTitle id="password-dialog-title">Reset Password</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Current Password"
              type="text" // Always visible
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box className="password-field-container">
              <TextField
                fullWidth
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                variant="outlined"
                size="small"
              />
              <Button
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="toggle-password-button"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </Box>
            {passwordData.newPassword && (
              <Box className="requirements-container" aria-live="polite">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    mb: "8px",
                    fontSize: "13px",
                    color: "rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <Info size={14} />
                  <Typography variant="body2">Password Requirements:</Typography>
                </Box>
                <Box
                  className={`password-requirement ${
                    passwordValidation.minLength ? "valid" : "invalid"
                  }`}
                >
                  {passwordValidation.minLength ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertCircle size={12} />
                  )}
                  <Typography variant="caption">At least 8 characters</Typography>
                </Box>
                <Box
                  className={`password-requirement ${
                    passwordValidation.hasLower ? "valid" : "invalid"
                  }`}
                >
                  {passwordValidation.hasLower ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertCircle size={12} />
                  )}
                  <Typography variant="caption">One lowercase letter</Typography>
                </Box>
                <Box
                  className={`password-requirement ${
                    passwordValidation.hasUpper ? "valid" : "invalid"
                  }`}
                >
                  {passwordValidation.hasUpper ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertCircle size={12} />
                  )}
                  <Typography variant="caption">One uppercase letter</Typography>
                </Box>
                <Box
                  className={`password-requirement ${
                    passwordValidation.hasNumber ? "valid" : "invalid"
                  }`}
                >
                  {passwordValidation.hasNumber ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertCircle size={12} />
                  )}
                  <Typography variant="caption">One number</Typography>
                </Box>
                <Box
                  className={`password-requirement ${
                    passwordValidation.hasSpecial ? "valid" : "invalid"
                  }`}
                >
                  {passwordValidation.hasSpecial ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertCircle size={12} />
                  )}
                  <Typography variant="caption">
                    One special character (@$!%*?&)
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box className="password-field-container">
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                variant="outlined"
                size="small"
                error={passwordsDoNotMatch}
                helperText={passwordsDoNotMatch ? "Passwords do not match" : ""}
              />
              <Button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-password-button"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handlePasswordChange}
          variant="contained"
          color="success"
          disabled={isButtonDisabled}
          sx={{
            opacity: isButtonDisabled ? 0.6 : 1,
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          Reset Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PasswordDialog;