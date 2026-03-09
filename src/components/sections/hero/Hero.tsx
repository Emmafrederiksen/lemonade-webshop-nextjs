import Container from "@/components/layout/Container"
import Image from "next/image"

type HeroProps = {
  title: string
  description: string
  image: string
  showButtons?: boolean
}

export default function Hero({
  title,
  description,
  image,
  showButtons = true
}: HeroProps) {

  return (

    <section className="bg-heroGradient py-16 sm:py-16 lg:py-12">

      <Container>

        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* Text content */}
          <div className="space-y-6">

            <h1 className="font-heading text-heading-xl text-brand-textDark">
              {title}
            </h1>

            <div className="w-20 h-[2px] bg-brand-primary mt-4 rounded-full"></div>

            <p className="font-body text-body text-brand-textMuted max-w-md">
              {description}
            </p>

            {showButtons && (

              <div className="flex gap-4">

                <button className="px-5 py-3 md:px-6 md:py-3 bg-brand-primary text-white rounded-full font-body font-medium
                shadow-md hover:shadow-lg hover:brightness-105
                transition-all duration-200">
                  Order Now
                </button>

                <button className="px-5 py-3 md:px-6 md:py-3 border border-border text-brand-textDark bg-surface-secondarybtn
                rounded-full font-body font-medium
                hover:border-brand-primary hover:text-brand-primary
                transition-all duration-200">
                  View Menu
                </button>

              </div>

            )}

          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">

            <Image
              src={image}
              alt="Hero image"
              width={520}
              height={520}
              className="w-full max-w-md md:max-w-xl lg:max-w-2xl"
            />

          </div>

        </div>

      </Container>

    </section>

  )
}