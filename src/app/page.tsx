export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0b] text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hero.jpg')", // Replace with your hero image
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/70">
          Raksha & Ridge
        </p>

        <h1 className="font-serif text-5xl font-light leading-tight md:text-7xl">
          A New Chapter of
          <br />
          <span className="text-white">
            Authentic Sri Lankan Hospitality
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80">
          We are crafting a premium digital experience that reflects our
          collection of thoughtfully curated hotels, villas, and resorts.
          Discover exceptional stays where genuine hospitality transforms every
          journey into an unforgettable memory.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* <a
            href="mailto:info@rakshaandridge.com"
            className="rounded-md bg-[#0C2B48] px-8 py-4 text-sm font-medium tracking-wide transition hover:bg-[#133d64]"
          >
            Contact Us
          </a> */}

          <a
            href="https://wa.me/94770000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/30 px-8 py-4 text-sm font-medium tracking-wide bg-black  transition hover:border-white hover:bg-white/10"
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/50">
          © {new Date().getFullYear()} Raksha & Ridge. All rights reserved.
        </div>
      </div>
    </main>
  );
}