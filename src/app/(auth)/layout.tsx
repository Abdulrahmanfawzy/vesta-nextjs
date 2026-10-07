import Image from "next/image"
import authBg from "@/assets/images/auth-bg.jpg"
import authOverlay from "@/assets/images/auth-overlay.png"
import vestaLogo from "@/assets/images/logo.svg"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-svh w-full overflow-x-hidden bg-white [--u:calc(100vw/900)] md:h-svh md:overflow-hidden md:[--u:min(calc(100vw/1440),calc(100svh/1024))]">
     
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-left-top bg-no-repeat"
        style={{ backgroundImage: `url(${authBg.src})` }}
      />
      {/* 80% photo opacity from Figma */}
      <div aria-hidden className="absolute inset-0 bg-white/20" />
      
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-left-top bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${authOverlay.src})` }}
      />

      <Image
        src={vestaLogo}
        alt="Vesta"
        priority
        className="absolute left-0 top-0 z-10 h-auto w-[calc(var(--u)*218)] min-w-24"
      />

      <div className="relative z-10 flex w-full justify-center px-4 pb-10 pt-[calc(var(--u)*146)]">
        {children}
      </div>
    </main>
  )
}