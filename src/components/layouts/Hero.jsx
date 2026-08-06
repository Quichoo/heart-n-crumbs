function Hero() {
  return (
    <div className="relative bg-hero-bg/25 px-4 sm:px-8 py-6 sm:py-8">
      <div className="max-w-4xl pr-24 sm:pr-32">
        <h2 className="font-heading italic text-2xl sm:text-3xl text-stone-900 mb-1">
          Place Your Order
        </h2>
        <p className="font-body text-sm text-stone-600">
          Fill in the details below and we'll take care of the rest.
        </p>
      </div>

      <img
        src="/cookie.png"
        alt="Cookie"
        className="absolute right-3 sm:right-10 top-1/2 -translate-y-1/2 w-16 h-16 sm:w-32 sm:h-32 object-contain drop-shadow-lg"
      />
    </div>
  );
}

export default Hero;
