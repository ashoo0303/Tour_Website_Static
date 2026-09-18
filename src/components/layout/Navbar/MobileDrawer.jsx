import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../../ui/Button/Button";
import IconButton from "../../ui/IconButton/IconButton";
import { CloseIcon } from "../../icons";
import styles from "./Navbar.module.css";

/**
 * Slide-in navigation for narrow viewports. Purely presentational —
 * open/close state is owned by Navbar and passed down as props.
 */
function MobileDrawer({ links, brandName, onClose, onNavigate }) {
  const panelRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("is-locked");
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("is-locked");
    };
  }, [onClose]);

  function handleLinkClick(link) {
    onNavigate?.(link);
    onClose();
  }

  // Portalled to <body>: the header's backdrop-filter makes it a containing
  // block, which would otherwise clip these fixed-position elements to it.
  return createPortal(
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        tabIndex={-1}
      >
        <div className={styles.drawerHead}>
          <span className={styles.brand}>{brandName}</span>
          <IconButton label="Close menu" variant="plain" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <nav aria-label="Mobile">
          <ul className={styles.drawerList}>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={styles.drawerLink}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.drawerFoot}>
          <p className={styles.drawerNote}>
            Trip planners available 7 days a week.
          </p>
          <Button href="#contact" size="md" fullWidth onClick={onClose}>
            Plan my trip
          </Button>
        </div>
      </div>
    </>,
    document.body,
  );
}

export default MobileDrawer;
