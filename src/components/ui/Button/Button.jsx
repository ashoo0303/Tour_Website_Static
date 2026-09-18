import styles from "./Button.module.css";

/**
 * Shared action element. Renders an <a> when `href` is supplied so anchor
 * links keep native keyboard and middle-click behaviour.
 *
 * @param {"primary"|"accent"|"outline"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className = "",
  type = "button",
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
