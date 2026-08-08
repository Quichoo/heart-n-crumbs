import { useState, useEffect } from "react";
import { useSettings } from "../../hooks/useSettings";
import { useAuth } from "../../context/AuthContext";
import { useCatalogAdmin } from "../../hooks/useCatalogAdmin";

function AdminSettings() {
  const { settings, updateSettings, loading } = useSettings();
  const { changePassword } = useAuth();
  const { resetOrderCounter } = useCatalogAdmin();

  const [form, setForm] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const [resetNumber, setResetNumber] = useState(1000);
  const [resetMessage, setResetMessage] = useState("");

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings(form);
    setSaving(false);
    setSaved(true);
  };

  const handlePasswordChange = async () => {
    setChangingPassword(true);
    setPasswordMessage("");
    const result = await changePassword(currentPassword, newPassword);
    setChangingPassword(false);
    if (result.success) {
      setPasswordMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setPasswordMessage(result.error);
    }
  };

  const handleResetCounter = async () => {
    if (
      !confirm(
        `Reset order numbering to start at #${resetNumber + 1}? This cannot be undone.`,
      )
    )
      return;
    await resetOrderCounter(resetNumber);
    setResetMessage(
      `Order counter reset. Next order will be #${resetNumber + 1}.`,
    );
  };

  if (loading) {
    return <p className="text-stone-600">Loading settings...</p>;
  }

  return (
    <div>
      <h1 className="font-body text-2xl font-semibold text-stone-900 mb-6">
        Settings
      </h1>

      <div className="columns-1 lg:columns-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-md p-6 mb-6 break-inside-avoid">
          <h2 className="font-semibold text-stone-900 mb-4">Store Info</h2>

          <label className="block text-sm font-medium text-stone-700 mb-1">
            Contact Number
          </label>
          <input
            type="text"
            value={form.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            placeholder="0912 345 6789"
            className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
          />

          <label className="block text-sm font-medium text-stone-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="hello@heartincrumbles.com"
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900"
          />
        </div>

        <div className="bg-white border border-stone-200 rounded-md p-6 mb-6 break-inside-avoid">
          <h2 className="font-semibold text-stone-900 mb-4">Delivery</h2>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Delivery Fee (₱)
          </label>
          <input
            type="number"
            min="0"
            value={form.deliveryFee}
            onChange={(e) =>
              handleChange("deliveryFee", Number(e.target.value) || 0)
            }
            className="w-full border border-stone-300 rounded-md px-3 py-2 text-stone-900"
          />
        </div>

        <div className="bg-white border border-stone-200 rounded-md p-6 mb-6 break-inside-avoid">
          <h2 className="font-semibold text-stone-900 mb-4">Store Status</h2>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-stone-900">
                Accepting Orders
              </p>
              <p className="text-xs text-stone-500">
                Turn off to temporarily pause new orders
              </p>
            </div>
            <input
              type="checkbox"
              checked={form.storeOpen}
              onChange={(e) => handleChange("storeOpen", e.target.checked)}
              className="w-5 h-5 cursor-pointer accent-btn-primary"
            />
          </label>
        </div>

        <div className="bg-white border border-stone-200 rounded-md p-6 mb-6 break-inside-avoid">
          <h2 className="font-semibold text-stone-900 mb-4">Change Password</h2>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
          />
          <label className="block text-sm font-medium text-stone-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
          />
          <button
            onClick={handlePasswordChange}
            disabled={changingPassword || !currentPassword || !newPassword}
            className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-[#B99680] disabled:opacity-50"
          >
            {changingPassword ? "Updating..." : "Update Password"}
          </button>
          {passwordMessage && (
            <p
              className={`text-sm mt-2 ${passwordMessage.includes("success") ? "text-green-600" : "text-red-600"}`}
            >
              {passwordMessage}
            </p>
          )}
        </div>

        <div className="bg-white border border-red-200 rounded-md p-6 mb-6 break-inside-avoid">
          <h2 className="font-semibold text-stone-900 mb-1">
            Reset Order Numbering
          </h2>
          <p className="text-xs text-stone-500 mb-4">
            Sets the next order number. Use with caution — typically only for
            starting fresh.
          </p>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Next order will be #
          </label>
          <input
            type="number"
            value={resetNumber + 1}
            onChange={(e) => setResetNumber((Number(e.target.value) || 1) - 1)}
            className="w-full max-w-xs border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
          />
          <button
            onClick={handleResetCounter}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-red-600"
          >
            Reset Counter
          </button>
          {resetMessage && (
            <p className="text-sm text-green-600 mt-2">{resetMessage}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-[#B99680] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}

export default AdminSettings;
