import { useState, useEffect } from "react";
import Modal from "../../ui/Modal";

function ProductFormModal({
  product,
  categories,
  defaultCategoryId,
  onSave,
  onClose,
}) {
  const isEditing = !!product;

  const [categoryId, setCategoryId] = useState(
    product?.categoryId ?? defaultCategoryId ?? "",
  );
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [prices, setPrices] = useState(product?.prices ?? {});
  const [saving, setSaving] = useState(false);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  // Reset prices when switching categories, since size options differ
  useEffect(() => {
    if (!isEditing) {
      setPrices({});
    }
  }, [categoryId]);

  const updatePrice = (sizeKey, value) => {
    setPrices((prev) => ({ ...prev, [sizeKey]: Number(value) || 0 }));
  };

  const handleSave = async () => {
    if (!name.trim() || !categoryId) return;

    setSaving(true);
    await onSave({
      categoryId,
      name: name.trim(),
      description: description.trim(),
      prices,
      displayOrder: product?.displayOrder ?? 99,
      active: product?.active ?? true,
    });
    setSaving(false);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold text-stone-900 mb-4">
        {isEditing ? "Edit Product" : "New Product"}
      </h2>

      <label className="block text-sm font-medium text-stone-700 mb-1">
        Category
      </label>
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        disabled={isEditing}
        className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900 disabled:bg-stone-50 disabled:text-stone-400"
      >
        <option value="">Select a category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-stone-700 mb-1">
        Product Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Choco Chip"
        className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
      />

      {selectedCategory?.hasDescription && (
        <>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Choco Chip, Double Choco, Red Velvet"
            className="w-full border border-stone-300 rounded-md px-3 py-2 mb-4 text-stone-900"
          />
        </>
      )}

      {selectedCategory && (
        <>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Prices
          </label>
          <div className="space-y-2 mb-6">
            {selectedCategory.sizeOptions.map((size) => (
              <div key={size.key} className="flex items-center gap-3">
                <span className="text-sm text-stone-600 w-20">
                  {size.label}
                </span>
                <span className="text-stone-500">₱</span>
                <input
                  type="number"
                  min="0"
                  value={prices[size.key] ?? ""}
                  onChange={(e) => updatePrice(size.key, e.target.value)}
                  className="flex-1 border border-stone-300 rounded-md px-2.5 py-1.5 text-sm text-stone-900"
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-stone-300 text-stone-700 py-2.5 rounded-md font-medium cursor-pointer hover:bg-stone-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving || !name.trim() || !categoryId}
          className="flex-1 bg-btn-primary text-white py-2.5 rounded-md font-medium cursor-pointer hover:bg-[#B99680] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Product"}
        </button>
      </div>
    </Modal>
  );
}

export default ProductFormModal;
