import Badge from "../../ui/Badge/Badge";
import Button from "../../ui/Button/Button";
import Card from "../../ui/Card/Card";
import { CheckIcon } from "../../icons";
import styles from "./PackageCard.module.css";

/**
 * Pricing tier card. `isSelected` and `onSelect` come from App via
 * PackagesSection, so the chosen tier stays in sync with the contact form.
 */
function PackageCard({ tourPackage, isSelected, onSelect }) {
  const { id, name, price, cadence, blurb, perks, featured } = tourPackage;

  return (
    <Card
      className={[styles.card, featured ? styles.featured : ""]
        .filter(Boolean)
        .join(" ")}
      interactive
    >
      <div className={styles.head}>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.blurb}>{blurb}</p>
        </div>
        {featured && <Badge tone="accent">Most booked</Badge>}
      </div>

      <p className={styles.price}>
        <span className={styles.amount}>${price.toLocaleString("en-US")}</span>
        <span className={styles.cadence}>{cadence}</span>
      </p>

      <ul className={styles.perks}>
        {perks.map((perk) => (
          <li className={styles.perk} key={perk}>
            <span className={styles.tick} aria-hidden="true">
              <CheckIcon size={13} />
            </span>
            {perk}
          </li>
        ))}
      </ul>

      <div className={styles.action}>
        <Button
          variant={isSelected ? "primary" : "outline"}
          fullWidth
          onClick={() => onSelect(id)}
          aria-pressed={isSelected}
        >
          {isSelected ? "Selected" : `Choose ${name}`}
        </Button>
      </div>
    </Card>
  );
}

export default PackageCard;
