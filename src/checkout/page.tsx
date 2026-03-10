{/* Checkout header */}

export default function checkout() {
    return (

        <main>
            {/* Checkout header */}
            <div className="bg-heroGradient py-12 flex flex-col items-center gap-6">

                <h1 className="font-heading text-heading-xl text-brand-textDark">
                    Checkout
                </h1>

                {/* Toggle knapper */}
                <div className="flex rounded-full border border-border overflow-hidden">

                    <button
                    onClick={() => setView("customer")}
                    className={`px-6 py-2 text-small font-semibold transition
                        ${view === "customer"
                        ? "bg-brand-primary text-white"
                        : "bg-white text-brand-textMuted"
                        }
                    `}
                    >
                    Customer
                    </button>

                    <button
                    onClick={() => setView("owner")}
                    className={`px-6 py-2 text-small font-semibold transition
                        ${view === "owner"
                        ? "bg-brand-primary text-white"
                        : "bg-white text-brand-textMuted"
                        }
                    `}
                    >
                    Owner
                    </button>

                </div>

            </div>

        </main>
        
    )
}