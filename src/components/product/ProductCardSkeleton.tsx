export default function ProductCardSkeleton() {
  return (
    <div className="bg-surface-slidecart rounded-card shadow-card p-4 flex flex-col h-full animate-pulse">

      {/* Billede placeholder */}
      <div className="bg-gray-200 rounded-xl h-[250px]" />

      {/* Navn og pris */}
      <div className="mt-5 flex justify-between items-center">
        <div className="bg-gray-200 rounded-full h-5 w-32" />
        <div className="bg-gray-200 rounded-full h-5 w-12" />
      </div>

      {/* Beskrivelse */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="bg-gray-200 rounded-full h-4 w-full" />
        <div className="bg-gray-200 rounded-full h-4 w-3/4" />
      </div>

      {/* Knap */}
      <div className="bg-gray-200 rounded-full h-10 w-full mt-6" />

    </div>
  )
}