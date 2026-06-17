'use client'

import Image from 'next/image'

/**
 * Floating + orbiting diamond accents for dark hero backgrounds.
 * Mirrors the homepage hero so secondary landing pages (e.g. Oakville)
 * share the same signature animated backdrop.
 */
const FloatingDiamonds = () => {
  return (
    <>
      {/* Orbiting diamond */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
        <div style={{ animation: 'orbit 20s linear infinite' }} className="hidden md:block">
          <Image src="/images/icon-white.png" alt="" width={48} height={48} className="opacity-70" />
        </div>
        <div style={{ animation: 'orbit-mobile 20s linear infinite' }} className="block md:hidden">
          <Image src="/images/icon-white.png" alt="" width={32} height={32} className="opacity-70" />
        </div>
      </div>

      {/* Large accent diamonds */}
      <div className="absolute top-[6%] right-[8%] pointer-events-none z-[5]" style={{ animation: 'float 6s ease-in-out infinite' }}>
        <Image src="/images/icon-white.png" alt="" width={96} height={96} className="opacity-15" />
      </div>
      <div className="absolute bottom-[18%] left-[4%] pointer-events-none z-[5]" style={{ animation: 'float-slow 9s ease-in-out infinite 1s' }}>
        <Image src="/images/icon-white.png" alt="" width={110} height={110} className="opacity-10" />
      </div>
      <div className="absolute top-[25%] right-[3%] pointer-events-none z-[5]" style={{ animation: 'float-slow 14s ease-in-out infinite 2s' }}>
        <Image src="/images/icon-white.png" alt="" width={88} height={88} className="opacity-12" />
      </div>

      {/* Medium diamonds */}
      <div className="absolute top-[45%] right-[20%] pointer-events-none z-[5]" style={{ animation: 'float 10s ease-in-out infinite 2s' }}>
        <Image src="/images/icon-white.png" alt="" width={60} height={60} className="opacity-20" />
      </div>
      <div className="absolute top-[15%] left-[22%] pointer-events-none z-[5]" style={{ animation: 'float-slow 12s ease-in-out infinite 1s' }}>
        <Image src="/images/icon-white.png" alt="" width={72} height={72} className="opacity-15" />
      </div>
      <div className="absolute bottom-[35%] right-[12%] pointer-events-none z-[5]" style={{ animation: 'float 11s ease-in-out infinite 4s' }}>
        <Image src="/images/icon-white.png" alt="" width={52} height={52} className="opacity-18" />
      </div>
      <div className="absolute top-[65%] left-[15%] pointer-events-none z-[5]" style={{ animation: 'float-slow 8s ease-in-out infinite' }}>
        <Image src="/images/icon-white.png" alt="" width={56} height={56} className="opacity-15" />
      </div>
      <div className="absolute top-[10%] left-[45%] pointer-events-none z-[5]" style={{ animation: 'float 7s ease-in-out infinite 0.5s' }}>
        <Image src="/images/icon-white.png" alt="" width={48} height={48} className="opacity-20" />
      </div>
      <div className="absolute bottom-[10%] right-[28%] pointer-events-none z-[5]" style={{ animation: 'float-slow 13s ease-in-out infinite 3s' }}>
        <Image src="/images/icon-white.png" alt="" width={64} height={64} className="opacity-12" />
      </div>

      {/* Small diamonds */}
      <div className="absolute bottom-[12%] left-[35%] pointer-events-none z-[5]" style={{ animation: 'float 7s ease-in-out infinite 3s' }}>
        <Image src="/images/icon-white.png" alt="" width={28} height={28} className="opacity-30" />
      </div>
      <div className="absolute top-[38%] left-[8%] pointer-events-none z-[5]" style={{ animation: 'float-slow 10s ease-in-out infinite 2s' }}>
        <Image src="/images/icon-white.png" alt="" width={32} height={32} className="opacity-25" />
      </div>
      <div className="absolute top-[5%] left-[60%] pointer-events-none z-[5]" style={{ animation: 'float 8s ease-in-out infinite 1.5s' }}>
        <Image src="/images/icon-white.png" alt="" width={24} height={24} className="opacity-25" />
      </div>
      <div className="absolute bottom-[6%] left-[55%] pointer-events-none z-[5]" style={{ animation: 'float-slow 10s ease-in-out infinite 3.5s' }}>
        <Image src="/images/icon-white.png" alt="" width={36} height={36} className="opacity-20" />
      </div>
      <div className="absolute top-[75%] right-[40%] pointer-events-none z-[5]" style={{ animation: 'float 9s ease-in-out infinite 5s' }}>
        <Image src="/images/icon-white.png" alt="" width={20} height={20} className="opacity-30" />
      </div>
      <div className="absolute top-[55%] left-[40%] pointer-events-none z-[5]" style={{ animation: 'float-slow 15s ease-in-out infinite 1s' }}>
        <Image src="/images/icon-white.png" alt="" width={40} height={40} className="opacity-10" />
      </div>
      <div className="absolute bottom-[45%] left-[50%] pointer-events-none z-[5]" style={{ animation: 'float 6s ease-in-out infinite 2.5s' }}>
        <Image src="/images/icon-white.png" alt="" width={22} height={22} className="opacity-22" />
      </div>
    </>
  )
}

export default FloatingDiamonds
