import { useState } from "react";
import Button from "../../ui/Button/Button";
import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import styles from "./ContactSection.module.css";

/**
 * Enquiry form. Three pieces of App state land here as props —
 * `destinations` (to build the select), `selectedPackage` and
 * `savedCount` — which is what keeps the summary panel honest.
 */
function ContactSection({ destinations, selectedPackage, savedCount }) {
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSent(true);
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.aside}>
            <SectionHeading
              eyebrow="Start planning"
              title="Tell us roughly what you want"
              subtitle="A trip planner replies within one working day with a draft itinerary and a firm price."
            />

            <div className={styles.summary}>
              <p className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Selected package</span>
                <span className={styles.summaryValue}>
                  {selectedPackage ? selectedPackage.name : "Not chosen yet"}
                </span>
              </p>
              <p className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Indicative price</span>
                <span className={styles.summaryValue}>
                  {selectedPackage
                    ? `$${selectedPackage.price.toLocaleString("en-US")} ${selectedPackage.cadence}`
                    : "—"}
                </span>
              </p>
              <p className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Saved trips</span>
                <span className={styles.summaryValue}>{savedCount}</span>
              </p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Full name
                </label>
                <input
                  className={styles.control}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ayesha Khan"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  className={styles.control}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="destination">
                  Destination
                </label>
                <select
                  className={styles.control}
                  id="destination"
                  name="destination"
                  defaultValue=""
                >
                  <option value="">Still deciding</option>
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                      {destination.name}, {destination.country}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="travellers">
                  Travellers
                </label>
                <input
                  className={styles.control}
                  id="travellers"
                  name="travellers"
                  type="number"
                  min="1"
                  max="12"
                  defaultValue="2"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                What are you hoping for?
              </label>
              <textarea
                className={styles.control}
                id="message"
                name="message"
                placeholder="Rough dates, pace, must-sees, anything we should plan around."
              />
            </div>

            <Button type="submit" size="md">
              Request an itinerary
            </Button>

            <p className={styles.note}>
              No deposit needed to get a plan. We only take payment once you are happy.
            </p>

            {isSent && (
              <div className={styles.success} role="status">
                <span className={styles.successTitle}>Enquiry received</span>
                <span>
                  Thanks — a planner will be in touch within one working day
                  {selectedPackage ? ` about the ${selectedPackage.name} package` : ""}.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
