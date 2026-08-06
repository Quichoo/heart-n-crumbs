import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export function useCatalog({ includeInactive = false } = {}) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const catQuery = includeInactive
      ? query(collection(db, "categories"), orderBy("displayOrder"))
      : query(
          collection(db, "categories"),
          where("active", "==", true),
          orderBy("displayOrder"),
        );

    const unsubCat = onSnapshot(catQuery, (snapshot) => {
      setCategories(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const prodQuery = includeInactive
      ? query(collection(db, "products"), orderBy("displayOrder"))
      : query(
          collection(db, "products"),
          where("active", "==", true),
          orderBy("displayOrder"),
        );

    const unsubProd = onSnapshot(prodQuery, (snapshot) => {
      setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => {
      unsubCat();
      unsubProd();
    };
  }, [includeInactive]);

  const productsByCategory = (categoryId) =>
    products.filter((p) => p.categoryId === categoryId);

  return { categories, products, productsByCategory, loading };
}
