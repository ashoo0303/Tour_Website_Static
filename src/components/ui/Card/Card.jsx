import styles from "./Card.module.css";

/**
 * Surface wrapper shared by destination, package and testimonial cards.
 * Children are composed by the caller, so this stays layout-agnostic.
 *
 * @param {"flat"|"raised"} elevation
 * @param {boolean} interactive  adds hover/focus lift
 */
function Card({
  children,
  as: Tag = "article",
  elevation = "raised",
  interactive = false,
  className = "",
  ...rest
}) {
  const classes = [
    styles.card,
    styles[elevation],
    interactive ? styles.interactive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Card;
