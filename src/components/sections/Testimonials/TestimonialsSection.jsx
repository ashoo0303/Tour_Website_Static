import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialsSection.module.css";

function TestimonialsSection({ testimonials }) {
  return (
    <section className="section section--alt" id="reviews">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Trip reports"
          title="18,000 travellers, 4.8 average"
          subtitle="Reviews are collected after every departure and published unedited."
        />

        <ul className={styles.grid}>
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TestimonialsSection;
