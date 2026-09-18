import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import PackageCard from "./PackageCard";
import styles from "./PackagesSection.module.css";

function PackagesSection({ packages, selectedPackageId, onSelectPackage }) {
  return (
    <section className="section" id="packages">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Ways to travel"
          title="Pick the style, we build the itinerary"
          subtitle="All three include accommodation, guided days and on-trip support. Flights are quoted separately."
        />

        <ul className={styles.grid}>
          {packages.map((tourPackage) => (
            <li key={tourPackage.id}>
              <PackageCard
                tourPackage={tourPackage}
                isSelected={tourPackage.id === selectedPackageId}
                onSelect={onSelectPackage}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PackagesSection;
