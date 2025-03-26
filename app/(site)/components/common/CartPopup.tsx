// common/CartPopup.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { useCart } from "react-use-cart";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  X,
  Plus,
  Minus,
  Store,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function CartPopup({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, updateItemQuantity, removeItem, cartTotal, totalItems } =
    useCart();

  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setDeleteItemId(id);
  };

  const confirmRemove = () => {
    if (deleteItemId) {
      removeItem(deleteItemId);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng của bạn!");
    }
    setDeleteItemId(null);
  };

  return (
    <>
      {/* Main Cart Dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-gray-50 w-[calc(100vw-30px)] mx-auto rounded-lg">
          <DialogHeader className="relative border-b-[1px] pb-4 border-gray-300">
            <DialogTitle className="flex items-center !text-[16px] !font-bold text-primary-600 gap-2 uppercase">
              <ShoppingCart className="text-warning-600" /> Giỏ hàng của tôi
              <span className="text-body-sm-500 font-normal text-gray-500 normal-case">
                ({totalItems} sản phẩm)
              </span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Mô tả trợ năng
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p>Giỏ hàng trống</p>
                <Button
                  className="bg-primary_custom hover:bg-primary-400"
                  onClick={() => onOpenChange(false)}
                >
                  Tiếp tục mua hàng
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group border-gray-300 border-dashed border-b-[1px] pb-4 gap-3"
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
                            className="absolute text-danger-500 bg-gray-300/60 rounded-full p-2 group-hover:bg-danger-50/80"
                            onClick={() => handleRemove(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="title_price">
                          <h3 className="ms:text-body-md-500 text-body-sm-500 text-gray-800 group-hover:text-warning-700 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-label3 text-gray-500 font-normal mt-1">
                            {formatCurrency(item.price || 0)}
                          </p>
                        </div>
                      </div>
                      <div className="update_price w-36 justify-end font-medium space-y-2">
                        <div className="auto_update text-right ms:text-body-md-500 text-body-sm-500 text-warning-600">
                          {formatCurrency(
                            (item.price || 0) * (item.quantity || 1)
                          )}
                        </div>

                        <div className="qty_btn_minmax flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="min_qty h-6 w-6 p-0"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) - 1
                              )
                            }
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="qty w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="max_qty h-6 w-6 p-0"
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                (item.quantity || 1) + 1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <DialogFooter className="flex flex-col gap-4">
              <div className="flex items-center ms:justify-start justify-end w-full font-bold gap-2">
                <span className="font-medium text-body-md-500">Tạm tính:</span>
                <span className="text-danger-500 text-body-l-500">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="group flex-1 text-body-sm-500"
                  onClick={() => onOpenChange(false)}
                >
                  <Store className="text-secondary-700 group-hover:text-secondary-500" />{" "}
                  Tiếp tục mua hàng
                </Button>
                <Button
                  asChild
                  className="group flex-1 bg-primary_custom hover:bg-primary-400 text-body-sm-500"
                >
                  <Link
                    href="/thanh-toan"
                    className="text-gray-800 hover:text-secondary-900"
                  >
                    Thanh toán
                  </Link>
                </Button>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteItemId}
        onOpenChange={(open) => !open && setDeleteItemId(null)}
      >
        <AlertDialogContent className="bg-white border-t-4 border-warning-600 w-[calc(100vw-30px)] mx-auto rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="uppercase flex items-center gap-2 text-warning-600 font-bold">
              <TriangleAlert /> Thông báo
            </AlertDialogTitle>
            <AlertDialogDescription className="text-body-md-500 font-normal">
              Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng của bạn?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-body-sm-500">
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-danger-500 hover:bg-red-700 !text-white text-body-sm-500"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
