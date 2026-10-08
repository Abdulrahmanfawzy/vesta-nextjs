export function AuthCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-[calc(var(--u)*819)] max-w-full">
      <h1 className="mb-[calc(var(--u)*51)] text-center font-[family-name:var(--font-inter)] text-[length:max(calc(var(--u)*48),28px)] font-bold leading-[calc(var(--u)*72)] text-white">
        {title}
      </h1>
      <section className="rounded-[calc(var(--u)*45)] border border-brand-navy bg-white px-[calc(var(--u)*65)] pb-[calc(var(--u)*72)] pt-[calc(var(--u)*71)]">
        {children}
      </section>
    </div>
  )
}