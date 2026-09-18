import styles from "./Rating.module.css";

const STAR_PATH =
  "M12 2.6l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.4l-5.8 3.06 1.11-6.46-4.7-4.58 6.49-.94L12 2.6z";

function Star({ size }) {
  return (
    <svg
      className={styles.star}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

/**
 * Read-only star rating. Supports fractional scores (e.g. 4.8).
 *
 * @param {number} value   score out of `max`
 * @param {number} count   optional number of reviews to print alongside
 */
function Rating({ value, count, max = 5, size = 14, showValue = true }) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percentage = (clamped / max) * 100;
  const stars = Array.from({ length: max }, (_, i) => i);

  return (
    <span
      className={styles.rating}
      role="img"
      aria-label={`Rated ${clamped} out of ${max}${count ? ` from ${count} reviews` : ""}`}
    >
      <span className={styles.stars}>
        <span className={styles.track}>
          {stars.map((i) => (
            <Star key={i} size={size} />
          ))}
        </span>
        <span className={styles.fill} style={{ width: `${percentage}%` }}>
          {stars.map((i) => (
            <Star key={i} size={size} />
          ))}
        </span>
      </span>

      {showValue && <span className={styles.value}>{clamped.toFixed(1)}</span>}
      {typeof count === "number" && (
        <span className={styles.count}>({count})</span>
      )}
    </span>
  );
}

export default Rating;
