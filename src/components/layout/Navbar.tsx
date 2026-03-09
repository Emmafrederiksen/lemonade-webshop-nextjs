"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Container from "./Container"

export default function Navbar() {

  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  

  const navRef = useRef<HTMLDivElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {

    const activeLink = navRef.current?.querySelector(
      `[data-path="${pathname}"]`
    ) as HTMLElement

    if (activeLink && underlineRef.current) {

      const { offsetLeft, offsetWidth } = activeLink

      underlineRef.current.style.width = `${offsetWidth}px`
      underlineRef.current.style.transform = `translateX(${offsetLeft}px)`

    }

  }, [pathname])

  
  useEffect(() => {

    const handleScroll = () => {
        setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])


  return (

    <nav
        className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300
        ${scrolled ? "bg-surface-navbar/95 shadow-md" : "bg-surface-navbar/80"}
        `}
        >

      <Container>

        <div
            className={`flex items-center justify-between transition-all duration-300 ${
                scrolled ? "h-16" : "h-20"
            }`}
            >

          {/* Logo */}
          <Link href="/" className={`flex items-center transition-all duration-300 ${scrolled ? "gap-2" : "gap-3"}`}>

            <Image
                src="/lemonade_navbar.webp"
                alt="Lemonade Stand"
                width={40}
                height={40}
                className={`transition-all duration-300 ${
                    scrolled ? "w-8 h-8" : "w-10 h-10"
                }`}
            />

            <span className="font-heading text-heading-md text-brand-textDark">
              Lemonade Stand
            </span>

          </Link>


          {/* Right side */}
          <div className="flex items-center gap-6">


            {/* Desktop navigation */}
            <div
              ref={navRef}
              className="relative hidden md:flex items-center gap-8"
            >

              <Link
                href="/"
                data-path="/"
                className={`pb-1 font-body text-body text-brand-textDark relative transition-all
                hover:font-bold hover:after:scale-x-100
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                after:bg-brand-primary after:scale-x-0 after:origin-left after:transition-transform
                ${pathname === "/" ? "font-bold" : "font-medium"}
                `}
                >
                Home
                </Link>

              <Link
                href="/shop"
                data-path="/shop"
                className={`pb-1 font-body text-body text-brand-textDark relative transition-all
                hover:font-bold hover:after:scale-x-100
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full
                after:bg-brand-primary after:scale-x-0 after:origin-left after:transition-transform
                ${pathname === "/shop" ? "font-bold" : "font-medium"}
                `}
                >
                Shop
                </Link>


              {/* Sliding underline */}
              <span
                ref={underlineRef}
                className="absolute bottom-0 h-[2px] bg-brand-primary transition-all duration-300 ease-in-out"
              />

            </div>


            {/* Burger button */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
                >

                <span
                    className={`absolute h-[2px] w-6 bg-brand-textDark transition-all duration-300 
                    ${menuOpen ? "rotate-45" : "-translate-y-2"}`}
                />

                <span
                    className={`absolute h-[2px] w-6 bg-brand-textDark transition-all duration-300 
                    ${menuOpen ? "opacity-0" : "opacity-100"}`}
                />

                <span
                    className={`absolute h-[2px] w-6 bg-brand-textDark transition-all duration-300 
                    ${menuOpen ? "-rotate-45" : "translate-y-2"}`}
                />

            </button>


            {/* Cart */}
            <div className="relative">

              <button className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white">
                🛒
              </button>

              <span className="absolute -top-2 -right-2 bg-warning text-white text-small w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>

            </div>

          </div>

        </div>

      </Container>


      {/* Mobile menu */}
      {menuOpen && (

        <div
            className={`
                md:hidden overflow-hidden border-t border-border bg-surface-navbar
                transition-all duration-300 ease-in-out
                ${menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
            `}
            >
            <Container>

                <div className="flex flex-col py-6 gap-6">

                <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="font-body font-medium text-body text-brand-textDark"
                >
                    Home
                </Link>

                <Link
                    href="/shop"
                    onClick={() => setMenuOpen(false)}
                    className="font-body font-medium text-body text-brand-textDark"
                >
                    Shop
                </Link>

                </div>

            </Container>

        </div>

      )}

    </nav>

  )
}