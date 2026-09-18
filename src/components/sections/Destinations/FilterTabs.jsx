import styles from "./FilterTabs.module.css";

/**
 * Region filter. Stateless: the selected region lives in App and travels
 * down through DestinationsSection, while clicks travel back up through
 * `onRegionChange`.
 */
function FilterTabs({ regions, activeRegion, onRegionChange }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Filter by region">
      {regions.map((region) => {
        const isActive = region.id === activeRegion;

        return (
          <button
            key={region.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[styles.tab, isActive ? styles.active : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onRegionChange(region.id)}
          >
            {region.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
