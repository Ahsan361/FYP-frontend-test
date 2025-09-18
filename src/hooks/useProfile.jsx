import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { updateUser, getProfile, resetPassword } from "../services/userService";

export function useProfile() {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
    role: "",
    is_active: true,
  });
  const [alert, setAlert] = useState({ show: false, message: "", severity: "info" });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const profileData = await getProfile(token);
          const userWithToken = {
            ...profileData,
            token: token // or user?.token if it exists
          };
          setFetchedUser(userWithToken);
          setFormData({
            username: profileData.username || "",
            email: profileData.email || "",
            first_name: profileData.first_name || "",
            last_name: profileData.last_name || "",
            avatar: profileData.profile_picture_url || "",
            role: profileData.role || "",
            is_active: profileData.is_active ?? true,
          });
          setUser(userWithToken);
        } catch (error) {
          setAlert({
            show: true,
            message: "Failed to load profile",
            severity: "error",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, setUser]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!user?._id) return;
    try {
      const updatedUser = await updateUser(user._id, formData, token);
      setFetchedUser(updatedUser);
      const userWithToken = {
        ...updatedUser,
        token: token // or user?.token
      };
      setFormData({
        username: updatedUser.username || "",
        email: updatedUser.email || "",
        first_name: updatedUser.first_name || "",
        last_name: updatedUser.last_name || "",
        avatar: updatedUser.profile_picture_url || "",
        role: updatedUser.role || "",
        is_active: updatedUser.is_active ?? true,
      });
      setUser(userWithToken);

      setAlert({
        show: true,
        message: "Profile updated successfully",
        severity: "success",
      });
      setEditMode(false);
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || "Failed to update profile",
        severity: "error",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({
        show: true,
        message: "New password and confirm password do not match",
        severity: "error",
      });
      return;
    }
    try {
      await resetPassword(token, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setAlert({
        show: true,
        message: "Password reset successfully",
        severity: "success",
      });
      setPasswordDialogOpen(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || "Failed to reset password",
        severity: "error",
      });
    }
  };

  return {
    user,
    setUser,
    fetchedUser,
    loading,
    editMode,
    setEditMode,
    formData,
    alert,
    setAlert,
    passwordDialogOpen,
    setPasswordDialogOpen,
    passwordData,
    setPasswordData,
    handleInputChange,
    handleUpdateProfile,
    handlePasswordChange,
  };
}