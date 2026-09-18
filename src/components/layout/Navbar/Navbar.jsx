import { useEffect, useState } from "react";
import Button from "../../ui/Button/Button";
import IconButton from "../../ui/IconButton/IconButton";
import MobileDrawer from "./MobileDrawer";
import { GlobeIcon, HeartIcon, MenuIcon } from "../../icons";
import styles from "./Navbar.module.css";

/**
 * Sticky site header.
 *
 * Receives everything it renders from App: `links`, `brandName` and the
 * live `wishlistCount`. Only transient UI state (drawer open, scrolled)
 * is kept locally.
 */
function Navbar({ brandName, links, wishlistCount = 0, onWishlistClick }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[styles.header, isScrolled ? styles.scrolled : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <GlobeIcon size={19} />
          </span>
          {brandName}
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <IconButton
            label={`Saved trips: ${wishlistCount}`}
            variant="plain"
            className={styles.wishlist}
            active={wishlistCount > 0}
            onClick={onWishlistClick}
          >
            <HeartIcon filled={wishlistCount > 0} />
            {wishlistCount > 0 && (
              <span className={styles.count}>{wishlistCount}</span>
            )}
          </IconButton>

          <span className={styles.desktopCta}>
            <Button href="#contact" size="sm">
              Plan my trip
            </Button>
          </span>

          <IconButton
            label="Open menu"
            variant="plain"
            className={styles.menuToggle}
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {isDrawerOpen && (
        <MobileDrawer
          links={links}
          brandName={brandName}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;
