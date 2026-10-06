export function AuthCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-[819px]">
      <h1 className="mb-8 text-center text-4xl font-bold leading-[60px] text-white sm:mb-14 sm:text-5xl">
        {title}
      </h1>
      <section className="rounded-[45px] border border-brand-navy bg-white px-6 pb-10 pt-10 sm:px-16 sm:pb-[72px] sm:pt-20">
        {children}
      </section>
    </div>
  )
}