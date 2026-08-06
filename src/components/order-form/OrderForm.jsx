import { useOrderForm } from "../../hooks/useOrderForm";
import Header from "../layouts/Header";
import Hero from "../layouts/Hero";
import CustomerInfoSection from "./CustomerInfoSection";
import DeliveryInfoSection from "./DeliveryInfoSection";
import CategorySection from "./CategorySection";
import OrderSummary from "./OrderSummary";
import OrderConfirmModal from "./OrderConfirmModal";

function OrderForm() {
  const {
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
  } = useOrderForm();

  if (orderStage === "placed") {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <div className="max-w-md text-center bg-card-bg border border-border/10 rounded-md shadow-md p-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="font-body text-xl font-semibold text-stone-800 mb-2">
            Order Placed!
          </h2>
          <p className="font-body text-stone-600 mb-6">
            Thank you, {customerInfo.name}! We've received your order and will
            get started on it soon.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-btn-primary text-white px-6 py-2.5 rounded-md font-body font-medium hover:opacity-90"
          >
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  if (catalogLoading) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <p className="text-stone-600">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg">
      <Header />
      <Hero />

      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="space-y-6 relative fade-in-up"
          style={{ animationDelay: "0ms" }}
        >
          <CustomerInfoSection
            customerInfo={customerInfo}
            updateCustomerInfo={updateCustomerInfo}
            errors={errors}
          />
          <DeliveryInfoSection
            customerInfo={customerInfo}
            updateCustomerInfo={updateCustomerInfo}
            errors={errors}
          />
          <img
            src="/gingerbread.png"
            alt=""
            className="hidden lg:block absolute -bottom-6 -left-6 w-48 opacity-20 -rotate-30 -z-10 pointer-events-none"
          />
        </div>

        {categories.map((category, index) => (
          <div
            key={category.id}
            className="fade-in-up"
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <CategorySection
              category={category}
              products={products.filter((p) => p.categoryId === category.id)}
              quantities={quantities}
              updateQuantity={updateQuantity}
            />
          </div>
        ))}

        <div
          className="lg:col-start-2 lg:col-span-2 fade-in-up"
          style={{ animationDelay: `${(categories.length + 1) * 100}ms` }}
        >
          <OrderSummary
            quantities={quantities}
            products={products}
            categories={categories}
            onPlaceOrder={handlePlaceOrderClick}
            isSubmitting={orderStage === "submitting"}
            submitError={errors.submit}
          />
        </div>
      </div>

      {orderStage === "confirming" && (
        <OrderConfirmModal
          order={buildOrder()}
          onConfirm={confirmPlaceOrder}
          onCancel={cancelConfirmModal}
          isSubmitting={orderStage === "submitting"}
        />
      )}
    </div>
  );
}

export default OrderForm;
