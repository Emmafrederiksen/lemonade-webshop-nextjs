"use client"

import { useState, useRef, useEffect } from "react"

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
| Option beskriver én valgmulighed i dropdown listen.
| Props beskriver hvad Dropdown komponenten modtager.
|
*/

type Option = {
  value: string
  label: string
}

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
}


export default function Dropdown(props: Props) {

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  | isOpen styrer om dropdown listen er synlig eller ej.
  |
  */

  const [isOpen, setIsOpen] = useState(false)

  /*
  |--------------------------------------------------------------------------
  | REF
  |--------------------------------------------------------------------------
  | Vi bruger en ref til at registrere klik udenfor dropdown.
  | Så lukker den automatisk når brugeren klikker et andet sted.
  |
  */

  const ref = useRef<HTMLDivElement>(null)

  /*
  |--------------------------------------------------------------------------
  | FIND NUVÆRENDE LABEL
  |--------------------------------------------------------------------------
  | Vi finder den option der matcher den nuværende value
  | så vi kan vise dens label i knappen.
  |
  */

  const current = props.options.find(o => o.value === props.value)


  /*
  |--------------------------------------------------------------------------
  | LUK VED KLIK UDENFOR
  |--------------------------------------------------------------------------
  | useEffect lytter efter klik på hele dokumentet.
  | Hvis klikket er udenfor vores ref, lukkes dropdown.
  |
  */

  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)

  }, [])


  return (

    <div ref={ref} className="relative">

      {/*
      |--------------------------------------------------------------------------
      | TRIGGER KNAP
      |--------------------------------------------------------------------------
      | Viser den nuværende valgte option og en pil.
      | Klik åbner/lukker dropdown listen.
      |
      */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2
          border border-border
          rounded-full
          px-4 py-2
          bg-white
          text-small text-brand-textDark
          cursor-pointer
          hover:border-brand-primary
          transition
          focus:outline-none
          focus:ring-2 focus:ring-brand-primary/30
          min-w-[160px]
          justify-between
        "
      >
        <span>{current?.label}</span>

        {/* Pil roterer når dropdown er åben */}
        <span className={`text-brand-textMuted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>

      </button>


      {/*
      |--------------------------------------------------------------------------
      | DROPDOWN LISTE
      |--------------------------------------------------------------------------
      | Vises kun når isOpen er true.
      | Hver option kalder onChange med sin value og lukker dropdown.
      |
      */}

      {isOpen && (

        <div className="
          absolute top-full left-0 mt-2 z-10
          bg-white
          border border-border
          rounded-2xl
          shadow-card
          overflow-hidden
          min-w-full
        ">

          {props.options.map(option => (

            <button
              key={option.value}
              onClick={() => {
                props.onChange(option.value)
                setIsOpen(false)
              }}
              className={`
                w-full text-left
                px-4 py-2
                text-small
                transition
                hover:bg-brand-primary/10
                hover:text-brand-primary
                ${props.value === option.value
                  ? "text-brand-primary font-semibold bg-brand-primary/5"
                  : "text-brand-textDark"
                }
              `}
            >
              {option.label}
            </button>

          ))}

        </div>

      )}

    </div>
  )
}