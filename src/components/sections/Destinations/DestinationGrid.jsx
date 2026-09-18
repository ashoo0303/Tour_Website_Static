import Button from "../../ui/Button/Button";
import DestinationCard from "./DestinationCard";
import styles from "./DestinationGrid.module.css";

/**
 * Middle link in the chain: takes the already-filtered list plus the
 * wishlist state and forwards the slice each card needs.
 */
function DestinationGrid({ destinations, savedIds, onToggleSave, onClearFilters }) {
  if (destinations.length === 0) {
    return (
      <div className={styles.empty}>
        <h3 className={styles.emptyTitle}>No trips match that search</h3>
        <p className={styles.emptyText}>
          Try a different region, or clear the filters to see all 8 destinations.
        </p>
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {destinations.map((destination) => (
        <li key={destination.id}>
          <DestinationCard
            destination={destination}
            isSaved={savedIds.includes(destination.id)}
            onToggleSave={onToggleSave}
          />
        </li>
      ))}
    </ul>
  );
}

export default DestinationGrid;
