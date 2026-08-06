import Card from "../ui/Card";
import QuantityStepper from "../ui/QuantityStepper";

function CategorySection({ category, products, quantities, updateQuantity }) {
  return (
    <Card title={category.name} icon={category.icon ?? "🍪"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {products.map((product) => (
          <div key={product.id}>
            <p className="font-bold text-stone-900">{product.name}</p>
            {category.hasDescription && product.description && (
              <p className="text-xs text-stone-700 mb-1">
                ({product.description})
              </p>
            )}
            {category.sizeOptions.map((size) => (
              <QuantityStepper
                key={size.key}
                label={size.label}
                price={product.prices[size.key]}
                quantity={quantities[product.id]?.[size.key] ?? 0}
                onIncrement={() => updateQuantity(product.id, size.key, 1)}
                onDecrement={() => updateQuantity(product.id, size.key, -1)}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default CategorySection;
