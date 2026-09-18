import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import Card from "../../ui/Card/Card";
import IconButton from "../../ui/IconButton/IconButton";
import Rating from "../../ui/Rating/Rating";
import { HeartIcon, MapPinIcon, MoonIcon } from "../../icons";
import styles from "./DestinationCard.module.css";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/**
 * Leaf of the destinations branch — four levels below App.
 *
 * App → DestinationsSection → DestinationGrid → DestinationCard
 *
 * It holds no state of its own: `isSaved` is derived from App's wishlist
 * and `onToggleSave` is the same handler App defined.
 */
function DestinationCard({ destination, isSaved, onToggleSave }) {
  const { id, name, country, image, price, nights, rating, reviews, tag, summary, highlights } =
    destination;

  return (
    <Card interactive className={styles.card}>
      <div className={styles.media}>
        <img
          className={styles.image}
          src={image}
          alt={`${name}, ${country}`}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.tag}>
          <Badge tone="solid">{tag}</Badge>
        </span>
        <IconButton
          className={styles.save}
          label={isSaved ? `Remove ${name} from saved trips` : `Save ${name} to your trips`}
          aria-pressed={isSaved}
          active={isSaved}
          onClick={() => onToggleSave(id)}
        >
          <HeartIcon filled={isSaved} size={19} />
        </IconButton>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{name}</h3>
          <Rating value={rating} count={reviews} />
        </div>

        <p className={styles.country}>
          <MapPinIcon size={15} />
          {country}
        </p>

        <p className={styles.summary}>{summary}</p>

        <ul className={styles.highlights}>
          {highlights.map((highlight) => (
            <li key={highlight}>
              <Badge tone="brand">{highlight}</Badge>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceValue}>
              {priceFormatter.format(price)}
            </span>
            <span className={styles.priceMeta}>
              <MoonIcon size={12} /> {nights} nights · per person
            </span>
          </div>
          <Button href="#contact" variant="outline" size="sm">
            View trip
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default DestinationCard;
