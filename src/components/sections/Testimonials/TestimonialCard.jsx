import Card from "../../ui/Card/Card";
import Rating from "../../ui/Rating/Rating";
import { QuoteIcon } from "../../icons";
import styles from "./TestimonialCard.module.css";

function TestimonialCard({ testimonial }) {
  const { name, trip, rating, avatar, quote } = testimonial;

  return (
    <Card as="figure" className={styles.card} elevation="flat">
      <span className={styles.quoteMark}>
        <QuoteIcon size={30} />
      </span>

      <Rating value={rating} showValue={false} size={16} />

      <blockquote className={styles.quote}>“{quote}”</blockquote>

      <figcaption className={styles.person}>
        <img
          className={styles.avatar}
          src={avatar}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className={styles.meta}>
          <span className={styles.name}>{name}</span>
          <span className={styles.trip}>{trip}</span>
        </span>
      </figcaption>
    </Card>
  );
}

export default TestimonialCard;
