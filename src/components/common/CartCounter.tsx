import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext.tsx";

const CartCounter = () => {
  const { getItemCount, getCartTotal } = useCart();
  const itemCount = getItemCount();
  const total = getCartTotal();

  return (
    <div className="flex items-center gap-4">
      {/* Cart Icon with Counter */}
      <div className="relative">
        <FaShoppingCart className="text-xl text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
      
      {/* Cart Total */}
      {total > 0 && (
        <div className="text-sm text-gray-700">
          ₹{total.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default CartCounter;