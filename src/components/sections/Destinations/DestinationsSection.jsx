import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import FilterTabs from "./FilterTabs";
import DestinationGrid from "./DestinationGrid";
import styles from "./DestinationsSection.module.css";

/**
 * Top of the destinations branch. Owns no state — it receives the filtered
 * list and every handler from App and splits them between the filter row
 * and the grid below it.
 */
function DestinationsSection({
  destinations,
  regions,
  activeRegion,
  onRegionChange,
  savedIds,
  onToggleSave,
  onClearFilters,
}) {
  return (
    <section className="section section--alt" id="destinations">
      <div className="container">
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Where to next"
            title="Destinations our travellers keep coming back to"
            subtitle="Every trip below runs with a maximum of 12 guests and a guide who lives there."
          />
        </div>

        <FilterTabs
          regions={regions}
          activeRegion={activeRegion}
          onRegionChange={onRegionChange}
        />

        <p className={styles.resultCount} aria-live="polite">
          Showing <span className={styles.strong}>{destinations.length}</span>{" "}
          {destinations.length === 1 ? "trip" : "trips"}
        </p>

        <DestinationGrid
          destinations={destinations}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
          onClearFilters={onClearFilters}
        />
      </div>
    </section>
  );
}

export default DestinationsSection;
