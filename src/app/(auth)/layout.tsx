import Image from "next/image"
import authBg from "@/assets/images/auth-bg.jpg"
import authOverlay from "@/assets/images/auth-overlay.png"
import vestaLogo from "@/assets/images/logo.svg"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-svh w-full overflow-x-hidden bg-white md:min-h-[1024px]">
      {/* Layer 1: fixed, stays still while the page scrolls */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${authBg.src})` }}
      />

      {/* Layer 2: same photo, transparent, scrolls with the page above layer 1 */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${authOverlay.src})` }}
      />

      <Image
        src={vestaLogo}
        alt="Vesta"
        priority
        className="absolute left-0 top-0 z-10 h-auto w-32 sm:w-[218px]"
      />

      <div className="relative z-10 flex w-full justify-center px-4 pb-16 pt-28 sm:pt-[152px] md:pb-[207px]">
        {children}
      </div>
    </main>
  )
}