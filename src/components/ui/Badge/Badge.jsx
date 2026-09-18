import styles from "./Badge.module.css";

/**
 * Small pill label used for tags, categories and image overlays.
 *
 * @param {"neutral"|"brand"|"accent"|"solid"} tone
 */
function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span className={[styles.badge, styles[tone], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}

export default Badge;
