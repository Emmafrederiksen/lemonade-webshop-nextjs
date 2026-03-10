import Image from "next/image";

type Product = {
    id: number
    name: string
    description: string
    price: number
    image: string
    flavor: string
}

type Props = {
    product: Product
}

export default function ProductCard(props: Props) {
    return (

        <div className="bg-light rounded-card shadow-card p-4 flex flex-col h-full transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="bg-cardGradient rounded-xl flex justify-center">
                <Image
                    src={`/${props.product.image}`}
                    alt={props.product.name}
                    width={250}
                    height={250}
                />
            </div>

            <div className="mt-5 flex justify-between items-center">

                <h3 className="font-heading text-heading-md text-brand-textDark">
                    {props.product.name}
                </h3>

                <span className="font-heading text-heading-md text-brand-textDark">
                    ${Number(props.product.price).toFixed(2)}
                </span>

            </div>

            <p className="text-body text-brand-textDark mt-4 mb-6">
                {props.product.description}
            </p>    

            <button className="mt-auto bg-brand-primary text-brand-textLight py-2 rounded-full hover:brightness-105 transition">
                Add to Cart
            </button>

        </div>
        
    )
}