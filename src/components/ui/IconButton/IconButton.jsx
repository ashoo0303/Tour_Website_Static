import styles from "./IconButton.module.css";

/**
 * Square icon-only control. `label` is required because there is no
 * visible text to name the button for screen readers.
 *
 * @param {"floating"|"plain"} variant
 */
function IconButton({
  children,
  label,
  variant = "floating",
  active = false,
  className = "",
  ...rest
}) {
  const classes = [
    styles.iconButton,
    variant === "plain" ? styles.plain : "",
    active ? styles.active : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} aria-label={label} {...rest}>
      {children}
    </button>
  );
}

export default IconButton;
