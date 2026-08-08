import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export function useCatalogAdmin() {
  const addCategory = async (categoryData) => {
    await addDoc(collection(db, "categories"), categoryData);
  };

  const updateCategory = async (categoryId, updates) => {
    await updateDoc(doc(db, "categories", categoryId), updates);
  };

  const deleteCategory = async (categoryId) => {
    await deleteDoc(doc(db, "categories", categoryId));
  };

  const addProduct = async (productData) => {
    await addDoc(collection(db, "products"), productData);
  };

  const updateProduct = async (productId, updates) => {
    await updateDoc(doc(db, "products", productId), updates);
  };

  const deleteProduct = async (productId) => {
    await deleteDoc(doc(db, "products", productId));
  };

  const resetOrderCounter = async (newStartNumber) => {
    await setDoc(doc(db, "counters", "orders"), {
      lastOrderNumber: newStartNumber,
    });
  };

  return {
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    resetOrderCounter,
  };
}
