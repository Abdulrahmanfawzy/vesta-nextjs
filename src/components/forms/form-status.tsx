export function FormStatus({
  error,
  success,
}: {
  error?: string | null
  success?: string | null
}) {
  if (!error && !success) return null
  return (
    <p
      role={error ? "alert" : "status"}
      className={
        error
          ? "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
          : "rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600"
      }
    >
      {error ?? success}
    </p>
  )
}