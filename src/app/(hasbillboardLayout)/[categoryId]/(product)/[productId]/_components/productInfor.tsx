"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { formattedPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/Type/ProductType";
import { useFavourite } from "@/hooks/useFavourite";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, StarIcon } from "../../../../../../../public/icons";
import Sizes from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/sizes";
import Colors from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/colors";
import Amount from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/amount";
import CodeStar from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/code-star";
import ChinhSach from "@/app/(hasbillboardLayout)/[categoryId]/(product)/[productId]/_components/chinh-sach";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductInforProps {
  product: ProductType;
  isShowChinhSach?: boolean;
}
export interface currentSizeProps {
  size: string;
  price: number;
  colors: Array<string>;
  colorUserSelect: string;
  imagesUserSelect?: string;
  currentAmount?: number;
  maxAmount?: number;
}
function ProductInfor({ product, isShowChinhSach = true }: ProductInforProps) {
  const objectPriceNotEmptyAmount =
    product.arrayPrice.find((objectPrice) => objectPrice.amount !== 0) || product.arrayPrice[0];

  // currentSize là giữ sự thay đổi của user chọn cái nào
  const [currentSize, setCurrentSize] = useState<currentSizeProps>({
    size: objectPriceNotEmptyAmount.size,
    price: objectPriceNotEmptyAmount.price,
    colors: objectPriceNotEmptyAmount.colors,
    colorUserSelect: objectPriceNotEmptyAmount.colors[0],
    imagesUserSelect: product.images[0],
    currentAmount: 1,
    maxAmount: objectPriceNotEmptyAmount.amount,
  });

  const { addItem } = useCart();
  const { addItemFavourite } = useFavourite();

  const handleAddtoCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    addItem({
      product,
      size: currentSize.size,
      color: currentSize.colorUserSelect,
      amount: currentSize.currentAmount!,
    });
  };
  const handleAddtoFavourite = () => {
    addItemFavourite(product);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-x-9 ">
      <div className="lg:col-span-3">
        <div className="relative">
          <Image
            alt=""
            src={currentSize.imagesUserSelect!}
            width={1000}
            height={1000}
            className="w-full aspect-square object-cover rounded-lg select-none"
          />
          <div className="absolute left-6 top-6 flex items-center bg-white px-4 py-2 text-[#111111] font-medium rounded-full">
            <StarIcon />
            <div className="ml-1">High Rated</div>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="mt-4">
            {product.images.map((image) => (
              <CarouselItem key={image} className=" basis-1/4 pl-2">
                <div
                  onMouseEnter={() => setCurrentSize({ ...currentSize, imagesUserSelect: image })}
                  key={image}
                  className={` rounded-sm p-1`}
                >
                  <Image
                    alt=""
                    src={image}
                    width={500}
                    height={500}
                    className="aspect-square object-cover rounded-sm select-none"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white -translate-y-1/2 z-[999]" />
          <CarouselNext className="right-2 bg-white -translate-y-1/2" />
        </Carousel>
      </div>

      <div className="lg:col-span-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <div className=" text-[#28a745] font-light mt-4">{objectPriceNotEmptyAmount.amount > 0 && "(còn hàng)"}</div>
        <Separator className="mt-1 mb-5" />
        <CodeStar maxAmount={currentSize.maxAmount!} />
        {/* <div className="mb-3 font-semibold">{formattedPrice(currentSize.price)}</div> */}
        <div className="mb-3 font-semibold">
          <span className="text-[#b1b1b3] text-sm line-through mr-4"> {formattedPrice(currentSize.price)} </span>
          {product.sale && formattedPrice((currentSize.price * (100 - product.sale)) / 100)}
        </div>
        <Sizes setCurrentSize={setCurrentSize} currentSize={currentSize} arrayPrice={product.arrayPrice} />
        <Amount currentSize={currentSize} setCurrentSize={setCurrentSize} />

        <Colors currentSize={currentSize} setCurrentSize={setCurrentSize} />
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            className=" rounded-tl-3xl rounded-br-3xl transition-all duration-300 border hover:bg-white hover:text-black border-black "
            onClick={handleAddtoCart}
            disabled={currentSize.maxAmount === 0}
            size={"lg"}
          >
            Add to cart <ShoppingCart className="ml-2" size={20} />
          </Button>

          <Button
            className="group border-none hover:bg-transparent font-normal  rounded-tl-3xl rounded-br-3xl transition-all duration-300 border  border-black "
            onClick={handleAddtoFavourite}
            size={"lg"}
            variant={"outline"}
          >
            Add to Favourite <HeartIcon className="ml-2 *:group-hover:stroke-yellow-400" width={20} height={20} />
          </Button>
        </div>
        {/* read more */}
        <Separator className="mt-8 mb-4" />
        <div>
          <span className="opacity-50 font-light ">Category:</span>{" "}
          <span className="font-normal">{product.categoryId.name}</span>
        </div>
        {isShowChinhSach && <ChinhSach />}
      </div>
    </div>
  );
}

export default ProductInfor;
