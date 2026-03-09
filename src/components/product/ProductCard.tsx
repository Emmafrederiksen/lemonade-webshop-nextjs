import Image from "next/image";

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
}

export default function ProductCard({ product }: { product: Product }) {
    return (

        <div className="bg-white rounded-card shadow-card p-4 flex flex-col">

            <div className="bg-pink-200 rounded-xl p-6 flex justify-center">
                <Image 
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                />
            </div>

            <div className="mt-4 flex justify-between items-center">

                <h3 className="font-heading text-heading-sm text-brand-textDark">
                    ${product.name}
                </h3>

                <span className="font-heading text-brand-textDark">
                    ${product.price.toFixed(2)}
                </span>

            </div>

            <p className="text-small text-brand-textMuted mt-2">
                {product.description}
            </p>    

            <button className="mt-4 bg-brand-primary text-brand-textLight py-2 rounded-full hover:brightness-105 transition">
                Add to Cart
            </button>
            
        </div>
        
    )
}