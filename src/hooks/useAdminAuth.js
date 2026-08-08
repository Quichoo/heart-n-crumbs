import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";

export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const changePassword = async (currentPassword, newPassword) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return { success: false, error: "Not logged in." };

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword,
      );
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      return { success: true };
    } catch (error) {
      console.error("Password change failed:", error);
      return {
        success: false,
        error: "Current password is incorrect, or something went wrong.",
      };
    }
  };

  const login = async (email, password) => {
    setLoginError("");
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid email or password.");
      return false;
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => signOut(auth);

  return { user, authLoading, loginError, login, logout, changePassword };
}
