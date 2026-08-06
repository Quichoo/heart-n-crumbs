function Header() {
  return (
    <header className="bg-topbar-bg border-b border-border/10 px-4 sm:px-8 py-4 sm:py-5 mb-2 flex items-center justify-between rounded-t-2xl">
      <p className="font-heading text-xs sm:text-sm text-text-muted leading-snug hidden sm:block">
        Freshly Baked
        <br />
        Pastries Made
        <br />
        with Love
      </p>

      <img
        src="/logo.png"
        alt="He[art] 'n Crumbs"
        className="h-14 sm:h-20 w-auto"
      />

      <p className="font-heading text-xs sm:text-sm text-text-muted text-right leading-snug hidden sm:block">
        CONTACT:
        <br />
        EMAIL:
      </p>
    </header>
  );
}

export default Header;
