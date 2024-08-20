"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { Expand, ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { ProductType } from "@/Type/ProductType";
import IconButton from "@/components/icon-button";
import { useModalPreview } from "@/hooks/use-modal-preview";
import Link from "next/link";

interface ProductCardProps {
  product: ProductType;
}

function ProductCard({ product }: ProductCardProps) {
  const price = product.arrayPrice[0].price;
  const { onOpen } = useModalPreview();
  const { addItem, items } = useCart();
  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onOpen(product);
  };
  const handleAddtoCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    addItem({
      product,
      size: product.arrayPrice[0].size,
      color: product.arrayPrice[0].colors[0],
      amount: 2,
    });
  };
  return (
    <Link
      key={product._id}
      href={`/${product.categoryId._id}/${product._id}`}
      className="group  border rounded-lg p-2 cursor-pointer  flex flex-col select-none"
    >
      <div className="relative">
        <Image
          alt=""
          src={product.images[0]}
          width={400}
          height={400}
          className="w-full aspect-square rounded-sm object-cover select-none"
          priority
        />
        <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 gap-4 flex transition-all duration-300 w-full justify-center">
          <div>
            <IconButton onClick={onPreview}>
              <Expand className="text-gray-600" size={13} />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={handleAddtoCart}>
              <ShoppingCart className="text-gray-600" size={13} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="font-semibold mt-2 text-sm line-clamp-2"> {product.name} </div>
        <div>
          <div className="text-sm text-zinc-500 font-semibold my-1"> {product.categoryId.name} </div>
          <div className="mt-3 font-semibold">{formattedPrice(price)}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
