// src/hooks/useCart.js
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../features/cart/cartSlice";
import useNotifications from "./useNotifications";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const notify = useNotifications();
  const { t } = useTranslation()
  const handleAddToCart = (product, options = {}) => {
    const { quantity = 1, selectedSize, selectedColor } = options;
    dispatch(addToCart({ product, quantity, selectedSize, selectedColor }));
    notify("success", t("common.notification.productAdded"));
  };

  const handleRemoveFromCart = (product, options = {}) => {
    const { selectedSize, selectedColor } = options;
    dispatch(removeFromCart({ 
      id: product.id, 
      selectedSize, 
      selectedColor 
    }));
    notify("info", t("common.notification.productRemoved"), {
      icon: <FaTrashAlt />,
    });
  };

  const isInCart = (product, options = {}) => {
    const { selectedSize, selectedColor } = options;
    return cartItems.some((item) => 
      item.id === product.id && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );
  };

  return { cartItems, handleAddToCart, handleRemoveFromCart, isInCart };
};
