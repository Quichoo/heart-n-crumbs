import { useSettings } from "../../hooks/useSettings";

function Header() {
  const { settings } = useSettings();

  return (
    <header className="bg-topbar-bg border-b border-border/10 px-4 sm:px-8 py-4 sm:py-5 mb-2 flex items-center justify-between">
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

      <div className="font-heading text-xs sm:text-sm text-text-muted text-right leading-snug hidden sm:block">
        <p>CONTACT: {settings.contactNumber}</p>
        <p>EMAIL: {settings.email}</p>
      </div>
    </header>
  );
}

export default Header;
