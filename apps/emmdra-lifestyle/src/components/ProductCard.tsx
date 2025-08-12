import Image from 'next/image'
import { clsx } from 'clsx'

export type ProductCardProps = {
  id: string
  title: string
  price: number
  image: string
  className?: string
}

export default function ProductCard({ id, title, price, image, className }: ProductCardProps) {
  return (
    <div className={clsx('border rounded-lg overflow-hidden bg-white', className)}>
      <div className="relative aspect-[4/3]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <div className="font-medium">{title}</div>
        <div className="text-emerald-700 font-semibold">₦{price.toLocaleString('en-NG')}</div>
        <button
          className="snipcart-add-item mt-2 w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
          data-item-id={id}
          data-item-price={price.toFixed(2)}
          data-item-url={`/product/${id}`}
          data-item-description={title}
          data-item-image={image}
          data-item-name={title}
          data-item-currency="NGN"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
