import Button from "../../ui/Button/Button";
import { MapPinIcon, SearchIcon } from "../../icons";
import styles from "./Hero.module.css";

/**
 * Landing banner. The search field is fully controlled by App:
 * `searchQuery` comes down, `onSearchChange` sends every keystroke back up,
 * and the same query filters the destination grid further down the page.
 */
function Hero({ searchQuery, onSearchChange, stats }) {
  function handleSubmit(event) {
    event.preventDefault();
    document
      .getElementById("destinations")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <span className={styles.eyebrow}>
          <MapPinIcon size={16} />
          42 countries · 300+ departures a year
        </span>

        <h1 className={styles.title}>
          Go further with trips that are{" "}
          <span className={styles.accent}>actually planned well</span>
        </h1>

        <p className={styles.lead}>
          Small groups, local guides and itineraries with breathing room. Tell us
          where you are headed and we will handle the rest.
        </p>

        <form className={styles.search} onSubmit={handleSubmit} role="search">
          <label className={styles.field}>
            <span className="sr-only">Search destinations</span>
            <SearchIcon size={18} />
            <input
              className={styles.input}
              type="search"
              name="destination"
              placeholder="Try “Kyoto”, “Greece” or “safari”"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>
          <Button type="submit" variant="accent" size="md">
            Find trips
          </Button>
        </form>

        <ul className={styles.stats}>
          {stats.map((stat) => (
            <li className={styles.stat} key={stat.id}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
