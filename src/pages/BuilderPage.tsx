import { useState, useEffect, useRef } from "react";
import type { PCBuild, Component } from "../types";
import { componentData } from "../data/components";
import { ComponentSelector } from "../components/ComponentSelector";
import TextType from "../components/TextType";
import ScrollVelocity from "../components/ScrollVelocity";

export const BuilderPage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [build, setBuild] = useState<PCBuild>({
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooling: null,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectComponent = (key: keyof PCBuild, component: Component) => {
    setBuild((prev) => ({ ...prev, [key]: component }));
  };

  const handleClearComponent = (key: keyof PCBuild) => {
    setBuild((prev) => ({ ...prev, [key]: null }));
  };

  const calculateTotal = () => {
    return Object.values(build).reduce((total, component) => {
      return total + (component?.price || 0);
    }, 0);
  };

  const handleClearAll = () => {
    setBuild({
      cpu: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      psu: null,
      case: null,
      cooling: null,
    });
  };

  const totalPrice = calculateTotal();

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            <TextType
              text={[
                "Build Your Dream PC",
                "Customize Your PC",
                "Create the Ultimate Setup",
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </h1>
          <p>
            Choose your components, customize your build, and see the total cost
            instantly
          </p>
          <button
            className="cta-button"
            onClick={() =>
              document
                .querySelector(".builder-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            START NOW
          </button>
        </div>
        <div className="hero-badge">
          <div className="step">1. CHOOSE COMPONENTS</div>
          <div className="step">2. SELECT YOUR SPECS</div>
          <div className="step">3. GET YOUR PC BUILD</div>
        </div>
      </section>

      <section className="brands-section">
        <ScrollVelocity
          velocity={50}
          className="brand-scroll"
          scrollContainerRef={scrollContainerRef}
          parallaxStyle={{}}
          scrollerStyle={{}}
        >
          {[
            { src: "/images/brands/intel-logo.png", alt: "Intel" },
            { src: "/images/brands/amd-logo.png", alt: "AMD" },
            { src: "/images/brands/nvidia-logo.png", alt: "NVIDIA" },
            { src: "/images/brands/rog-logo.png", alt: "ASUS ROG" },
            { src: "/images/brands/msi-logo.png", alt: "MSI" },
            { src: "/images/brands/asrock-logo.png", alt: "ASRock" },
            { src: "/images/brands/gigabyte-logo.png", alt: "Gigabyte" },
            { src: "/images/brands/zotac-logo.svg", alt: "Zotac" },
          ].map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="brand-logo-img"
            />
          ))}
        </ScrollVelocity>
      </section>

      <div className="builder-section">
        <div className="container">
          <div className="components-section">
            <h2>BUILD YOUR CUSTOM PC</h2>
            <p className="section-subtitle">
              Select each component to customize your build
            </p>

            {componentData.map((category) => (
              <ComponentSelector
                key={category.key}
                category={category.name}
                components={category.components}
                selectedComponent={build[category.key]}
                onSelect={(component) =>
                  handleSelectComponent(category.key, component)
                }
                onClear={() => handleClearComponent(category.key)}
              />
            ))}
          </div>

          <div className="summary-section">
            <div className="summary-card">
              <h2>YOUR BUILD</h2>

              <div className="build-list">
                {componentData.map((category) => {
                  const component = build[category.key];
                  return (
                    <div key={category.key} className="build-item">
                      <span className="category-label">{category.name}</span>
                      {component ? (
                        <>
                          <span className="component-name">
                            {component.brand} {component.name}
                          </span>
                          <span className="item-price">
                            Rp {component.price.toLocaleString("id-ID")}
                          </span>
                        </>
                      ) : (
                        <span className="not-selected">Not selected</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="total-section">
                <div className="total-row">
                  <span className="total-label">TOTAL PRICE</span>
                  <span className="total-price">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                {totalPrice > 0 && (
                  <div className="total-usd">
                    ≈ ${(totalPrice / 15000).toFixed(2)} USD
                  </div>
                )}
              </div>

              {totalPrice > 0 && (
                <button onClick={handleClearAll} className="clear-all-btn">
                  CLEAR BUILD
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-logo">PC BUILD SIMULATOR</h3>
              <p className="footer-desc">
                Your ultimate destination for building the perfect PC with
                accurate IDR pricing
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="/">Builder</a>
                </li>
                <li>
                  <a href="/components">Components</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  GitHub
                </a>
                <a href="#" className="social-link">
                  Twitter
                </a>
                <a href="#" className="social-link">
                  Discord
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 PC Build Simulator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
