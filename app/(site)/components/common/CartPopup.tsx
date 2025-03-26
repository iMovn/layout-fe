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
import { Trash2, Plus, Minus } from "lucide-react";
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-gray-50">
          <DialogHeader className="relative">
            <DialogTitle className="flex items-center !text-heading4 !font-bold text-primary-700 gap-2 uppercase">
              Giỏ hàng của tôi
              <span className="text-sm font-normal text-gray-500 normal-case">
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
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Tiếp tục mua sắm
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-4"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name || "Sản phẩm"}
                        fill
                        sizes="100%"
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-clamp-2">{item.name}</h3>
                      <p className="text-sm font-medium mt-1">
                        {formatCurrency(item.price || 0)}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
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
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0"
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

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemove(item.id)}
                        >
                          Xoá <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="w-20 text-right font-medium">
                      {formatCurrency((item.price || 0) * (item.quantity || 1))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col gap-4">
            <div className="flex justify-between w-full font-bold text-lg">
              <span>Tạm tính:</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Tiếp tục mua hàng
              </Button>
              <Button asChild className="flex-1">
                <Link href="/thanh-toan">Thanh toán</Link>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteItemId}
        onOpenChange={(open) => !open && setDeleteItemId(null)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng của bạn?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemove}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
