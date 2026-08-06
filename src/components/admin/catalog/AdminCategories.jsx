import { useState } from "react";
import { useCatalog } from "../../../hooks/useCatalog";
import { useCatalogAdmin } from "../../../hooks/useCatalogAdmin";
import CategoryFormModal from "./CategoryFormModal";

function AdminCategories() {
  const { categories, products, loading } = useCatalog({
    includeInactive: true,
  });
  const { addCategory, updateCategory, deleteCategory } = useCatalogAdmin();
  const [editingCategory, setEditingCategory] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleSave = async (data) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, data);
      setEditingCategory(null);
    } else {
      await addCategory(data);
      setShowNewModal(false);
    }
  };

  const handleToggleActive = async (category) => {
    await updateCategory(category.id, { active: !category.active });
  };

  const handleDelete = async (category) => {
    const productCount = products.filter(
      (p) => p.categoryId === category.id,
    ).length;

    if (productCount > 0) {
      alert(
        `Can't delete "${category.name}" — it still has ${productCount} product${productCount === 1 ? "" : "s"} in it. Delete or reassign those products first.`,
      );
      return;
    }

    if (confirm(`Delete "${category.name}"? This cannot be undone.`)) {
      await deleteCategory(category.id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-body text-2xl font-semibold text-stone-900">
          Categories
        </h1>
        <button
          onClick={() => setShowNewModal(true)}
          className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-[#B99680]"
        >
          + New Category
        </button>
      </div>

      {loading ? (
        <p className="text-stone-600">Loading...</p>
      ) : (
        <div className="bg-white border border-stone-200 rounded-md divide-y divide-stone-100">
          {categories.map((category) => {
            const productCount = products.filter(
              (p) => p.categoryId === category.id,
            ).length;
            return (
              <div
                key={category.id}
                className="flex justify-between items-center p-4"
              >
                <div>
                  <p className="font-medium text-stone-900">{category.name}</p>
                  <p className="text-xs text-stone-500">
                    {category.sizeOptions.map((s) => s.label).join(", ")} ·{" "}
                    {productCount} product{productCount === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(category)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer ${
                      category.active
                        ? "bg-green-100 text-green-800"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {category.active ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-sm text-stone-500 hover:text-stone-800 cursor-pointer px-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="text-sm text-red-500 hover:text-red-700 cursor-pointer px-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(showNewModal || editingCategory) && (
        <CategoryFormModal
          category={editingCategory}
          onSave={handleSave}
          onClose={() => {
            setShowNewModal(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminCategories;
