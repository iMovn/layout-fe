"use client";
import { useCart } from "react-use-cart";

export default function CartPage() {
  const { items, updateItemQuantity, removeItem, totalUniqueItems, cartTotal } =
    useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Giỏ hàng ({totalUniqueItems} sản phẩm)
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng trống</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => {
            // Kiểm tra quantity tồn tại
            const quantity = item.quantity || 1;

            return (
              <li key={item.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price}₫</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateItemQuantity(item.id, quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                      disabled={quantity <= 1}
                    >
                      ➖
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      ➕
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-2 py-1 bg-red-100 text-red-600 rounded"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold">
            Tổng tiền: {cartTotal.toLocaleString()}₫
          </h2>
        </div>
      )}
    </div>
  );
}
