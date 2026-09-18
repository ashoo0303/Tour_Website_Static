import { useCallback, useMemo, useState } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Hero from "./components/sections/Hero/Hero";
import DestinationsSection from "./components/sections/Destinations/DestinationsSection";
import PackagesSection from "./components/sections/Packages/PackagesSection";
import TestimonialsSection from "./components/sections/Testimonials/TestimonialsSection";
import ContactSection from "./components/sections/Contact/ContactSection";
import { destinations, regions } from "./data/destinations";
import { packages } from "./data/packages";
import { testimonials } from "./data/testimonials";
import { brand, footerColumns, heroStats, navLinks } from "./data/site";

/**
 * Single source of truth for the page.
 *
 * All shared state lives here and is handed down the tree as props:
 *
 *   App
 *    ├─ Navbar                ← savedIds.length
 *    ├─ Hero                  ← searchQuery, onSearchChange
 *    ├─ DestinationsSection   ← filtered list, region state, wishlist state
 *    │    ├─ FilterTabs       ← activeRegion, onRegionChange
 *    │    └─ DestinationGrid  ← destinations, savedIds, onToggleSave
 *    │         └─ DestinationCard ← destination, isSaved, onToggleSave
 *    ├─ PackagesSection       ← selectedPackageId, onSelectPackage
 *    │    └─ PackageCard      ← tourPackage, isSelected, onSelect
 *    ├─ TestimonialsSection   ← testimonials
 *    └─ ContactSection        ← destinations, selectedPackage, savedCount
 */
function App() {
  const [activeRegion, setActiveRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const visibleDestinations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesRegion =
        activeRegion === "all" || destination.region === activeRegion;

      if (!query) return matchesRegion;

      const haystack = [
        destination.name,
        destination.country,
        destination.tag,
        destination.summary,
        ...destination.highlights,
      ]
        .join(" ")
        .toLowerCase();

      return matchesRegion && haystack.includes(query);
    });
  }, [activeRegion, searchQuery]);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === selectedPackageId) ?? null,
    [selectedPackageId],
  );

  const handleToggleSave = useCallback((destinationId) => {
    setSavedIds((current) =>
      current.includes(destinationId)
        ? current.filter((id) => id !== destinationId)
        : [...current, destinationId],
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveRegion("all");
    setSearchQuery("");
  }, []);

  const handleWishlistClick = useCallback(() => {
    document
      .getElementById("destinations")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar
        brandName={brand.name}
        links={navLinks}
        wishlistCount={savedIds.length}
        onWishlistClick={handleWishlistClick}
      />

      <main id="main">
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          stats={heroStats}
        />

        <DestinationsSection
          destinations={visibleDestinations}
          regions={regions}
          activeRegion={activeRegion}
          onRegionChange={setActiveRegion}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onClearFilters={handleClearFilters}
        />

        <PackagesSection
          packages={packages}
          selectedPackageId={selectedPackageId}
          onSelectPackage={setSelectedPackageId}
        />

        <TestimonialsSection testimonials={testimonials} />

        <ContactSection
          destinations={destinations}
          selectedPackage={selectedPackage}
          savedCount={savedIds.length}
        />
      </main>

      <Footer
        brandName={brand.name}
        tagline={brand.tagline}
        columns={footerColumns}
      />
    </>
  );
}

export default App;
