import React from 'react';
import ShippingStep from './steps/ShippingStep';
import PaymentStep from './steps/PaymentStep';
import ReviewStep from './steps/ReviewStep';


const StepContent = ({
  step,
  shippingAddress,
  onShippingSubmit,
  handleAddressChange,
  shippingMethod,
  setShippingMethod,
  paymentMethod,
  setPaymentMethod,
  cartItems,
  subtotal,
  shippingCost,
  total,
  setShippingFormSubmit,
  setPaymentFormSubmit,
  onPaymentSubmit,
  handlePlaceOrder
}) => {

  switch (step) {
    case 0:
      return (
        <ShippingStep
          shippingAddress={shippingAddress}
          onShippingSubmit={onShippingSubmit}
          handleAddressChange={handleAddressChange}
          shippingMethod={shippingMethod}
          setShippingMethod={setShippingMethod}
          cartItems={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
          setFormSubmitRef={setShippingFormSubmit} // ✅ هنا التمرير الصحيح كـ دالة
        />
      );

    case 1:
      return (
        <PaymentStep
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cartItems={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
                setFormSubmitRef={setPaymentFormSubmit} // ✅ تمرير ref
      onPaymentSubmit={onPaymentSubmit}    // ✅ تمرير دالة المعالجة
        />
      );

    case 2:
      return (
        <ReviewStep
          shippingAddress={shippingAddress}
          shippingMethod={shippingMethod}
          paymentMethod={paymentMethod}
          cartItems={cartItems}
          subtotal={subtotal}
          shippingCost={shippingCost}
          total={total}
          handlePlaceOrder={handlePlaceOrder}
        />
      );

    default:
      throw new Error('Unknown step');
  }
};

export default StepContent;
