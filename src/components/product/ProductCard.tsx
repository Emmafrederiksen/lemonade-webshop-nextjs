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

        <div className="bg-slidecart rounded-card shadow-card p-4 flex flex-col h-full transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="bg-cardGradient rounded-xl flex justify-center">
                <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    width={250}
                    height={250}
                />
            </div>

            <div className="mt-5 flex justify-between items-center">

                <h3 className="font-heading text-heading-md text-brand-textDark">
                    {product.name}
                </h3>

                <span className="font-heading text-heading-md text-brand-textDark">
                    ${Number(product.price).toFixed(2)}
                </span>

            </div>

            <p className="text-body text-brand-textDark mt-4 mb-6">
                {product.description}
            </p>    

            <button className="mt-auto bg-brand-primary text-brand-textLight py-2 rounded-full hover:brightness-105 transition">
                Add to Cart
            </button>

        </div>
        
    )
}