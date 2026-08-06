export function buildLineItems(quantities, products, categories) {
  const items = [];

  products.forEach((product) => {
    const category = categories.find((c) => c.id === product.categoryId);

    Object.entries(quantities[product.id] ?? {}).forEach(([sizeKey, qty]) => {
      if (qty > 0) {
        const unitPrice = product.prices[sizeKey];
        const sizeOption = category?.sizeOptions.find((s) => s.key === sizeKey);

        items.push({
          key: `${product.id}-${sizeKey}`,
          name: product.name,
          size: sizeOption?.label ?? sizeKey,
          quantity: qty,
          unitPrice,
          lineTotal: qty * unitPrice,
        });
      }
    });
  });

  return items;
}
