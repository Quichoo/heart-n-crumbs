import { useState } from "react";
import { useCatalog } from "../../../hooks/useCatalog";
import { useCatalogAdmin } from "../../../hooks/useCatalogAdmin";
import ProductFormModal from "./ProductFormModal";

function AdminProducts() {
  const { categories, products, loading } = useCatalog({
    includeInactive: true,
  });
  const { addProduct, updateProduct, deleteProduct } = useCatalogAdmin();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleSave = async (data) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      await addProduct(data);
      setShowNewModal(false);
    }
  };

  const handleToggleActive = async (product) => {
    await updateProduct(product.id, { active: !product.active });
  };

  const handleDelete = async (product) => {
    if (confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      await deleteProduct(product.id);
    }
  };

  const categoryName = (categoryId) =>
    categories.find((c) => c.id === categoryId)?.name ?? "Unknown";

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-body text-2xl font-semibold text-stone-900">
          Products
        </h1>
        <button
          onClick={() => setShowNewModal(true)}
          disabled={categories.length === 0}
          className="bg-btn-primary text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-[#B99680] disabled:opacity-50"
        >
          + New Product
        </button>
      </div>

      {loading ? (
        <p className="text-stone-600">Loading...</p>
      ) : (
        <div className="bg-white border border-stone-200 rounded-md divide-y divide-stone-100">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4"
            >
              <div>
                <p className="font-medium text-stone-900">{product.name}</p>
                <p className="text-xs text-stone-500">
                  {categoryName(product.categoryId)} ·{" "}
                  {Object.entries(product.prices)
                    .map(([k, v]) => `₱${v}`)
                    .join(" / ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleActive(product)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer ${
                    product.active
                      ? "bg-green-100 text-green-800"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {product.active ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-sm text-stone-500 hover:text-stone-800 cursor-pointer px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="text-sm text-red-500 hover:text-red-700 cursor-pointer px-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showNewModal || editingProduct) && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onSave={handleSave}
          onClose={() => {
            setShowNewModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminProducts;
