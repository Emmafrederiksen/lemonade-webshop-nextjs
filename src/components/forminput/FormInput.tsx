/*
|--------------------------------------------------------------------------
| FormInput — genbrugelig input komponent
|--------------------------------------------------------------------------
| I stedet for at gentage den samme input kode 6 gange i CheckoutCustomer,
| har jeg samlet det i én komponent der modtager data som props.
|
*/

type Props = {
    name: string                                                            // input feltets name bruges af handleChange til at vide hvilket felt der opdateres   
    value: string                                                           // den nuværende værdi kommer fra form state i CheckoutCustomer
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void              // funktion der opdaterer form state
    placeholder: string                                                     // teksten der vises når feltet er tomt
    type?: string                                                           // "text", "email", "tel" osv. – ? betyder det er valgfrit, default er "text"
    icon: string                                                            // emoji der vises til venstre i feltet
    error?: string                                                          // fejlbesked — ? betyder det er valgfrit, vises kun hvis den er sat
    onClearError?: () => void                                               // funktion der fjerner fejlen når brugeren begynder at skrive
}

export default function FormInput(props: Props) {
  return (
    <div>

      <div className="relative">

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-textMuted">
          {props.icon}
        </span>

        <input
          name={props.name}
          value={props.value}
          onChange={(e) => {
            props.onChange(e)       // opdater form state i CheckoutCustomer
            if (props.error && props.onClearError) props.onClearError()
          }}
          placeholder={props.placeholder}
          type={props.type ?? "text"}
          className={`w-full border rounded-xl pl-10 pr-4 py-3 text-small text-brand-textDark placeholder:text-brand-textMuted focus:outline-none focus:ring-2 transition
            ${props.error
              ? "border-danger-text focus:ring-danger-text/30"
              : "border-border focus:ring-brand-primary/30"
            }
          `}
        />

      </div>

      {props.error && (
        <p className="text-small text-danger-text mt-1 ml-1">{props.error}</p>
      )}

    </div>
  )
}