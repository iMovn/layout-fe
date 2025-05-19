"use client";
import { Item, useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "../../common/Breadcrumb";
import Container from "../../common/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  TriangleAlert,
  X,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Province = { name: string; code: number };
type District = { name: string; code: number };
type Ward = { name: string };

// Validation functions
const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone);
};

const validateEmail = (email: string): boolean => {
  if (!email) return true; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function CartPage() {
  const {
    items,
    updateItemQuantity,
    removeItem,
    totalItems,
    cartTotal,
    emptyCart,
  } = useCart();

  // Add client-side rendering guard
  const [isClient, setIsClient] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isEmptyingCart, setIsEmptyingCart] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const confirmRemove = () => {
    if (deleteItemId) {
      removeItem(deleteItemId);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng của bạn!");
    }
    setDeleteItemId(null);
  };

  const handleEmptyCart = () => {
    setIsEmptyingCart(true);
    setTimeout(() => {
      emptyCart();
      setIsEmptyingCart(false);
      toast.success("Đã xóa toàn bộ giỏ hàng!");
    }, 500);
  };

  // Loading state
  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-primary-600">Giỏ hàng</h1>
        <div className="text-center py-16 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary-500 mb-4" />
          <p className="text-gray-500">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pages={["Giỏ hàng"]} />

      <Container className="my-10">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {items.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-gray-400 mb-6">
                Hãy thêm sản phẩm vào giỏ để tiến hành mua sắm
              </p>
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white"
                onClick={() => (window.location.href = "/san-pham")}
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <>
              <div className="group_cart_checkout grid lg:grid-cols-[58%,40%] md:grid-cols-1 grid-cols-1 gap-6">
                <div className="group_cart p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-2xl uppercase font-bold text-danger-600">
                      Giỏ hàng của bạn ({totalItems} sản phẩm)
                    </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEmptyCart}
                      disabled={isEmptyingCart}
                      className="text-sm border-danger-500 text-danger-500 hover:bg-danger-50"
                    >
                      {isEmptyingCart ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <X className="h-4 w-4 mr-2" />
                      )}
                      Xóa tất cả
                    </Button>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {items.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="group border-gray-300 border-dashed border-b-[1px] pb-4 gap-3 hover:bg-gray-50/50 p-2 rounded-lg transition-colors"
                        >
                          <div className="group_up flex justify-between">
                            <div className="group_img_title flex gap-3">
                              <div className="img_product relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name || "Sản phẩm"}
                                  fill
                                  sizes="100%"
                                  className="object-cover rounded"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute -top-2 -right-2 text-danger-500 bg-white shadow-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => setDeleteItemId(item.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>

                              <div className="title_price">
                                <h3 className="md:text-body-md-500 text-body-sm-500 text-gray-800 group-hover:text-warning-700 line-clamp-2">
                                  {item.name}
                                </h3>
                                <p className="text-label3 text-gray-500 font-normal mt-1">
                                  {formatCurrency(item.price || 0)}
                                </p>
                              </div>
                            </div>
                            <div className="update_price w-36 justify-end font-medium space-y-2">
                              <div className="auto_update text-right md:text-body-md-500 text-body-sm-500 text-warning-600">
                                {formatCurrency(
                                  (item.price || 0) * (item.quantity || 1)
                                )}
                              </div>

                              <div className="qty_btn_minmax flex items-center justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="min_qty h-6 w-6 p-0"
                                  onClick={() => {
                                    if ((item.quantity || 1) > 1) {
                                      updateItemQuantity(
                                        item.id,
                                        (item.quantity || 1) - 1
                                      );
                                      toast.success("Đã cập nhật số lượng!");
                                    }
                                  }}
                                  disabled={(item.quantity || 1) <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="qty w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="max_qty h-6 w-6 p-0"
                                  onClick={() => {
                                    updateItemQuantity(
                                      item.id,
                                      (item.quantity || 1) + 1
                                    );
                                    toast.success("Đã cập nhật số lượng!");
                                  }}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-xl flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Tổng tiền:
                    </h2>
                    <span className="text-xl font-bold text-danger-500">
                      {formatCurrency(cartTotal)}
                    </span>
                  </div>
                </div>

                <div className="group_checkout p-6">
                  <CheckoutForm
                    cartTotal={cartTotal}
                    emptyCart={emptyCart}
                    items={items}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </Container>

      {/* ========== Confirm Delete Dialog ========== */}
      <AlertDialog
        open={!!deleteItemId}
        onOpenChange={(open) => !open && setDeleteItemId(null)}
      >
        <AlertDialogContent className="bg-white border-t-4 border-warning-600 max-w-sm rounded-lg mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="uppercase flex items-center gap-2 text-warning-600 font-bold">
              <TriangleAlert className="w-5 h-5" /> Xác nhận xoá
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-danger-500 hover:bg-red-600 text-white"
            >
              Xoá
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// =================== COMPONENT: Checkout Form ===================
function CheckoutForm({
  cartTotal,
  emptyCart,
  items,
}: {
  cartTotal: number;
  emptyCart: () => void;
  items: Item[];
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    address: "",
    note: "",
    payment: "cod",
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [locationLoading, setLocationLoading] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      setLocationLoading((prev) => ({ ...prev, provinces: true }));
      try {
        const res = await axios.get("https://provinces.open-api.vn/api/p/");
        setProvinces(res.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
        toast.error("Không thể tải danh sách tỉnh/thành");
      } finally {
        setLocationLoading((prev) => ({ ...prev, provinces: false }));
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!form.province) return;

    const selected = provinces.find((p) => p.name === form.province);
    if (selected) {
      const fetchDistricts = async () => {
        setLocationLoading((prev) => ({ ...prev, districts: true }));
        try {
          const res = await axios.get(
            `https://provinces.open-api.vn/api/p/${selected.code}?depth=2`
          );
          setDistricts(res.data.districts);
          setWards([]);
          setForm((prev) => ({ ...prev, district: "", ward: "" }));
        } catch (error) {
          console.error("Failed to fetch districts:", error);
          toast.error("Không thể tải danh sách quận/huyện");
        } finally {
          setLocationLoading((prev) => ({ ...prev, districts: false }));
        }
      };

      fetchDistricts();
    }
  }, [form.province, provinces]);

  useEffect(() => {
    if (!form.district) return;

    const selected = districts.find((d) => d.name === form.district);
    if (selected) {
      const fetchWards = async () => {
        setLocationLoading((prev) => ({ ...prev, wards: true }));
        try {
          const res = await axios.get(
            `https://provinces.open-api.vn/api/d/${selected.code}?depth=2`
          );
          setWards(res.data.wards);
          setForm((prev) => ({ ...prev, ward: "" }));
        } catch (error) {
          console.error("Failed to fetch wards:", error);
          toast.error("Không thể tải danh sách phường/xã");
        } finally {
          setLocationLoading((prev) => ({ ...prev, wards: false }));
        }
      };

      fetchWards();
    }
  }, [form.district, districts]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!validatePhone(form.phone))
      newErrors.phone = "Số điện thoại không hợp lệ";

    if (form.email && !validateEmail(form.email))
      newErrors.email = "Email không hợp lệ";

    if (!form.province) newErrors.province = "Chọn tỉnh/thành phố";
    if (!form.district) newErrors.district = "Chọn quận/huyện";
    if (!form.ward) newErrors.ward = "Chọn phường/xã";
    if (!form.address.trim()) newErrors.address = "Nhập địa chỉ chi tiết";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đặt hàng");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with your actual order submission API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderData = {
        ...form,
        items: items.map((item) => ({
          id: Number(item.id),
          price: item.price,
          quantity: item.quantity ?? 1,
          image: item.image ?? "", // fallback nếu không có image
          name: item.name ?? "", // thêm name nếu cần
          totalPrice: item.price * (item.quantity ?? 1),
        })),
        total: cartTotal,
        date: new Date().toISOString(),
        orderCode: `DH${Date.now().toString().substring(5)}`,
      };

      console.log("Order data:", orderData);
      toast.success("Đặt hàng thành công! Cảm ơn bạn đã mua sắm", {
        duration: 5000,
      });

      // Clear cart after successful order
      emptyCart();

      // Reset form
      setForm({
        name: "",
        phone: "",
        email: "",
        province: "",
        district: "",
        ward: "",
        address: "",
        note: "",
        payment: "cod",
      });

      // Redirect to success page (optional)
      // window.location.href = `/order-success?code=${orderData.orderCode}`;
    } catch (error) {
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau");
      console.error("Order submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLoadingSelect = (placeholder: string) => (
    <div className="relative w-full">
      <select
        disabled
        className="w-full border p-2 rounded bg-gray-50 text-gray-400"
      >
        <option>{placeholder}</option>
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
      </div>
    </div>
  );

  // Define payment methods outside of JSX for better readability
  const paymentMethods = [
    { id: "cod", label: "Thanh toán khi nhận hàng (COD)" },
    { id: "bank", label: "Chuyển khoản ngân hàng" },
  ];

  // Show bank transfer details conditionally
  const showBankDetails = form.payment === "bank";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6 border rounded space-y-4 bg-white shadow"
    >
      <h2 className="text-xl md:text-2xl uppercase font-bold mb-6 text-danger-600">
        Thông tin thanh toán
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ tên
          </label>
          <input
            type="text"
            name="name"
            placeholder="Nhập họ tên người nhận"
            value={form.name}
            onChange={handleChange}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại liên hệ"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (tuỳ chọn)
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email nhận thông báo đơn hàng"
              value={form.email}
              onChange={handleChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tỉnh/Thành phố
          </label>
          {locationLoading.provinces ? (
            renderLoadingSelect("Đang tải danh sách tỉnh/thành...")
          ) : (
            <>
              <select
                name="province"
                value={form.province}
                onChange={handleChange}
                className={`w-full border ${
                  errors.province ? "border-red-500" : "border-gray-300"
                } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
              >
                <option value="">Chọn tỉnh / thành</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p className="text-red-500 text-xs mt-1">{errors.province}</p>
              )}
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quận/Huyện
          </label>
          {locationLoading.districts ? (
            renderLoadingSelect("Đang tải danh sách quận/huyện...")
          ) : (
            <>
              <select
                name="district"
                value={form.district}
                onChange={handleChange}
                className={`w-full border ${
                  errors.district ? "border-red-500" : "border-gray-300"
                } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
                disabled={!districts.length}
              >
                <option value="">Chọn quận / huyện</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-500 text-xs mt-1">{errors.district}</p>
              )}
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phường/Xã
          </label>
          {locationLoading.wards ? (
            renderLoadingSelect("Đang tải danh sách phường/xã...")
          ) : (
            <>
              <select
                name="ward"
                value={form.ward}
                onChange={handleChange}
                className={`w-full border ${
                  errors.ward ? "border-red-500" : "border-gray-300"
                } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
                disabled={!wards.length}
              >
                <option value="">Chọn phường / xã</option>
                {wards.map((w, i) => (
                  <option key={i} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>
              {errors.ward && (
                <p className="text-red-500 text-xs mt-1">{errors.ward}</p>
              )}
            </>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ chi tiết
          </label>
          <input
            type="text"
            name="address"
            placeholder="Số nhà, tên đường..."
            value={form.address}
            onChange={handleChange}
            className={`w-full border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ghi chú (tuỳ chọn)
          </label>
          <textarea
            name="note"
            placeholder="Ghi chú đơn hàng (thời gian nhận hàng, hướng dẫn giao hàng...)"
            value={form.note}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          />
        </div>
      </div>

      <div className="pt-4 border-t mt-6">
        <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={form.payment === method.id}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>

        {showBankDetails && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">
              Thông tin chuyển khoản:
            </h4>
            <ul className="text-sm space-y-1 text-blue-700">
              <li>• Ngân hàng: Vietcombank</li>
              <li>• Số tài khoản: 0123456789</li>
              <li>• Chủ tài khoản: CÔNG TY TNHH XYZ</li>
              <li>• Nội dung: [Họ tên] thanh toán đơn hàng</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2">
              Vui lòng chuyển khoản trước khi đơn hàng được xử lý
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Tổng tiền hàng:</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span>{formatCurrency(30000)}</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
          <span>Tổng thanh toán:</span>
          <span className="text-xl text-danger-600">
            {formatCurrency(cartTotal + 30000)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className={`bg-primary-600 text-white px-6 py-3 rounded hover:bg-primary-500 w-full font-medium ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        } transition-colors`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Đang xử lý...
          </span>
        ) : (
          "Đặt hàng ngay"
        )}
      </button>
    </form>
  );
}
