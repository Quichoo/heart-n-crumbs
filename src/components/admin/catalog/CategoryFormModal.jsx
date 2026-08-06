import { useState } from "react";
import Modal from "../../ui/Modal";

function slugify(text) {
  return text.toLowerCase().trim().replace(/\s+/g, "-");
}

function CategoryFormModal({ category, onSave, onClose }) {
  const isEditing = !!category;

  const [name, setName] = useState(category?.name ?? "");
  const [hasDescription, setHasDescription] = useState(
    category?.hasDescription ?? false,
  );
  const [sizeOptions, setSizeOptions] = useState(
    category?.sizeOptions ?? [{ key: "", label: "" }],
  );
  const [saving, setSaving] = useState(false);

  const updateSizeOption = (index, field, value) => {
    setSizeOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, [field]: value } : opt)),
    );
  };

  const addSizeOption = () => {
    setSizeOptions((prev) => [...prev, { key: "", label: "" }]);
  };

  const removeSizeOption = (index) => {
    setSizeOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    setSaving(true);
    const cleanedSizeOptions = sizeOptions
      .filter((opt) => opt.label.trim())
      .map((opt) => ({
        key: opt.key.trim() || slugify(opt.label),
        label: opt.label.trim(),
      }));

    await onSave({
      name: name.trim(),
      slug: category?.slug ?? slugify(name),
      hasDescription,
      sizeOptions: cleanedSizeOptions,
      displayOrder: category?.displayOrder ?? 99,
      active: category?.active ?? true,
    });
    setSaving(false);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold text-stone-900 mb-4">
        {isEditing ? "Edit Category" : "New Category"}
      </h2>

      <label className="block text-sm font-medium text-stone-700 mb-1">
        Category Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Cinnamon Rolls"
        className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
      />

      <label className="flex items-center gap-2 mb-4 text-sm text-stone-700">
        <input
          type="checkbox"
          checked={hasDescription}
          onChange={(e) => setHasDescription(e.target.checked)}
        />
        Products in this category have a description line (e.g. for bundles)
      </label>

      <label className="block text-sm font-medium text-stone-700 mb-2">
        Size Options
      </label>
      <div className="space-y-2 mb-2">
        {sizeOptions.map((opt, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={opt.label}
              onChange={(e) => updateSizeOption(index, "label", e.target.value)}
              placeholder="Label (e.g. Regular)"
              className="flex-1 border border-stone-300 rounded-md px-2.5 py-1.5 text-sm text-stone-900"
            />
            <button
              onClick={() => removeSizeOption(index)}
              className="text-red-500 hover:text-red-700 cursor-pointer px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addSizeOption}
        className="text-sm text-btn-primary font-medium cursor-pointer mb-6"
      >
        + Add size option
      </button>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-stone-300 text-stone-700 py-2.5 rounded-md font-medium cursor-pointer hover:bg-stone-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="flex-1 bg-btn-primary text-white py-2.5 rounded-md font-medium cursor-pointer hover:bg-[#B99680] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Category"}
        </button>
      </div>
    </Modal>
  );
}

export default CategoryFormModal;
