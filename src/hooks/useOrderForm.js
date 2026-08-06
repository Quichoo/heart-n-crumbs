import { useState } from "react";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCatalog } from "./useCatalog";
import { buildLineItems } from "../utils/orderUtils";

const deliveryFee = 10; // TODO: move to Settings later

export function useOrderForm() {
  const { categories, products, loading: catalogLoading } = useCatalog();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    contactNumber: "",
    address: "",
  });
  const [quantities, setQuantities] = useState({});
  const [errors, setErrors] = useState({});
  const [orderStage, setOrderStage] = useState("idle");

  const updateCustomerInfo = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuantity = (productId, sizeKey, delta) => {
    setQuantities((prev) => {
      const current = prev[productId]?.[sizeKey] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [productId]: { ...prev[productId], [sizeKey]: next } };
    });
  };

  const hasAnyQuantity = () => {
    for (const productId in quantities) {
      for (const sizeKey in quantities[productId]) {
        if (quantities[productId][sizeKey] > 0) return true;
      }
    }
    return false;
  };

  const validate = () => {
    const newErrors = {};
    if (!customerInfo.name.trim()) newErrors.name = "Name is required";
    if (!customerInfo.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!customerInfo.address.trim()) newErrors.address = "Address is required";
    if (!hasAnyQuantity()) newErrors.items = "Please select at least one item";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildOrder = () => {
    const items = buildLineItems(quantities, products, categories);
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    return {
      customerName: customerInfo.name.trim(),
      contactNumber: customerInfo.contactNumber.trim(),
      deliveryAddress: customerInfo.address.trim(),
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: "pending",
    };
  };

  const handlePlaceOrderClick = () => {
    if (!validate()) return;
    setOrderStage("confirming");
  };

  const cancelConfirmModal = () => setOrderStage("idle");

  const confirmPlaceOrder = async () => {
    setOrderStage("submitting");

    try {
      const order = buildOrder();
      const counterRef = doc(db, "counters", "orders");

      await runTransaction(db, async (transaction) => {
        const counterSnap = await transaction.get(counterRef);
        const lastNumber = counterSnap.exists()
          ? counterSnap.data().lastOrderNumber
          : 1000;
        const newNumber = lastNumber + 1;

        const newOrderRef = doc(collection(db, "orders"));
        transaction.set(newOrderRef, {
          ...order,
          orderNumber: newNumber,
          createdAt: serverTimestamp(),
        });

        transaction.set(counterRef, { lastOrderNumber: newNumber });
      });

      setOrderStage("placed");
    } catch (error) {
      console.error("Failed to place order:", error);
      setErrors({
        submit: "Something went wrong placing your order. Please try again.",
      });
      setOrderStage("idle");
    }
  };

  return {
    categories,
    products,
    catalogLoading,
    customerInfo,
    updateCustomerInfo,
    quantities,
    updateQuantity,
    errors,
    orderStage,
    handlePlaceOrderClick,
    confirmPlaceOrder,
    cancelConfirmModal,
    buildOrder,
  };
}
