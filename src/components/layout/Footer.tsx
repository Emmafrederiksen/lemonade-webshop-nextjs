import Container from "@/components/layout/Container"
import Link from "next/link"

export default function Footer() {
  return (

    <footer className="bg-surface-footer mt-24 shadow-[0_-4px_20px_rgba(0,0,0,0.01)]">

      <Container>

        <div className="py-12 grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div className="md:pr-8 md:border-r md:border-border">

            <h3 className="font-heading text-heading-md text-brand-textDark mb-3">
              Lemonade Stand
            </h3>

            <p className="text-small text-brand-textMuted max-w-xs">
              Fresh handmade lemonade crafted with real lemons
              and natural ingredients.
            </p>

          </div>

          {/* Navigation */}
          <div className="md:px-8 md:border-r md:border-border">

            <h4 className="font-heading text-heading-sm text-brand-textDark mb-4">
              Navigation
            </h4>

            <div className="flex flex-col gap-2 text-body text-brand-textMuted">

              <Link href="/" className="hover:text-brand-primary transition">
                Home
              </Link>

              <Link href="/shop" className="hover:text-brand-primary transition">
                Shop
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div className="md:pl-8">

            <h4 className="font-heading text-heading-sm text-brand-textDark mb-4">
              Contact
            </h4>

            <div className="flex flex-col gap-2 text-body text-brand-textMuted">

              <p>hello@lemonade.com</p>
              <p>Denmark</p>

            </div>

          </div>

        </div>

        {/* bottom bar */}

        <div className="border-t border-border py-6 text-center text-small text-brand-textMuted">
          © {new Date().getFullYear()} Lemonade Stand
        </div>

      </Container>

    </footer>
  )
}