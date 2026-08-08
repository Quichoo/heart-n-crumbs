import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const DEFAULT_SETTINGS = {
  contactNumber: "",
  email: "",
  deliveryFee: 10,
  storeOpen: true,
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "settings", "general"), (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...snap.data() });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateSettings = async (updates) => {
    await setDoc(doc(db, "settings", "general"), updates, { merge: true });
  };

  return { settings, updateSettings, loading };
}
