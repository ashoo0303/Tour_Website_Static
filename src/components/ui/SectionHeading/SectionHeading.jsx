import styles from "./SectionHeading.module.css";

/**
 * Eyebrow + title + subtitle block reused at the top of every section.
 *
 * @param {"left"|"center"} align
 * @param {"h1"|"h2"|"h3"} as  heading level, so section order stays valid
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Tag = "h2",
  id,
}) {
  return (
    <header
      className={[styles.heading, align === "center" ? styles.center : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Tag className={styles.title} id={id}>
        {title}
      </Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}

export default SectionHeading;
