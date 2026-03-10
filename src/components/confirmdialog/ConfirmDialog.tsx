"use client"

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
| isOpen   → om dialogen er synlig
| message  → teksten der vises
| onConfirm → kaldes når brugeren bekræfter
| onCancel  → kaldes når brugeren annullerer
|
*/

type Props = {
  isOpen: boolean
  productName: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog(props: Props) {

  if (!props.isOpen) return null

  return (

    <>

      {/* Overlay */}
      <div
        onClick={props.onCancel}
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
      />

      {/* Dialog boks */}
      <div className="
        fixed top-1/2 left-1/2 z-[70]
        -translate-x-1/2 -translate-y-1/2
        bg-surface-slidecart
        rounded-2xl shadow-2xl
        p-6 w-80
        flex flex-col gap-4
      ">

        {/* Ikon */}
        <div className="flex justify-center">
          <span className="text-4xl">🗑️</span>
        </div>

        {/* Tekst */}
        <div className="text-center">
          <h3 className="font-heading text-heading-md text-brand-textDark mb-1">
            Remove item?
          </h3>
          <p className="text-small text-brand-textMuted">
            Are you sure you want to remove <span className="font-semibold text-brand-textDark">{props.productName}</span> from your cart?
          </p>
        </div>

        {/* Knapper */}
        <div className="flex gap-3">

          {/* Annuller */}
          <button
            onClick={props.onCancel}
            className="
              flex-1 py-2 rounded-full
              border border-border
              text-small text-brand-textMuted
              hover:border-brand-primary hover:text-brand-primary
              transition
            "
          >
            Cancel
          </button>

          {/* Bekræft */}
          <button
            onClick={props.onConfirm}
            className="
              flex-1 py-2 rounded-full
              bg-danger-bg text-white
              text-small font-semibold
              hover:brightness-90
              transition
            "
          >
            Remove
          </button>

        </div>

      </div>

    </>
  )
}