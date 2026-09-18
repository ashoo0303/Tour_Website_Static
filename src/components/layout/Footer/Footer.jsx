import { GlobeIcon } from "../../icons";
import styles from "./Footer.module.css";

function Footer({ brandName, tagline, columns }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.about}>
            <span className={styles.brand}>
              <span className={styles.brandMark} aria-hidden="true">
                <GlobeIcon size={18} />
              </span>
              {brandName}
            </span>
            <p className={styles.tagline}>{tagline}</p>
            <p className={styles.tagline}>
              Licensed tour operator · ATOL 11482 · Member of ABTA
            </p>
          </div>

          <div className={styles.columns}>
            {columns.map((column) => (
              <nav key={column.id} aria-label={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.list}>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a className={styles.link} href="#top">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <ul className={styles.legal}>
            <li>
              <a className={styles.link} href="#top">
                Privacy
              </a>
            </li>
            <li>
              <a className={styles.link} href="#top">
                Terms
              </a>
            </li>
            <li>
              <a className={styles.link} href="#top">
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
