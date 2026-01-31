import { useState, useRef, useEffect } from "react";
import type { Component } from "../types";

interface ComponentSelectorProps {
  category: string;
  components: Component[];
  selectedComponent: Component | null;
  onSelect: (component: Component) => void;
  onClear: () => void;
}

export const ComponentSelector = ({
  category,
  components,
  selectedComponent,
  onSelect,
  onClear,
}: ComponentSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredComponents = components.filter((component) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      component.name.toLowerCase().includes(searchLower) ||
      component.brand.toLowerCase().includes(searchLower) ||
      (component.specs && component.specs.toLowerCase().includes(searchLower))
    );
  });

  const handleSelect = (component: Component) => {
    onSelect(component);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleClear = () => {
    onClear();
    setSearchTerm("");
    setShowDropdown(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(document.activeElement)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    }, 100);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus when component is cleared
  useEffect(() => {
    if (!selectedComponent && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedComponent]);

  return (
    <div className="component-selector" ref={containerRef}>
      <h3>{category}</h3>
      {selectedComponent ? (
        <div className="selected-component">
          <div className="component-info">
            <strong>
              {selectedComponent.brand} {selectedComponent.name}
            </strong>
            {selectedComponent.specs && (
              <p className="specs">{selectedComponent.specs}</p>
            )}
            <p className="price">
              Rp {selectedComponent.price.toLocaleString("id-ID")}
            </p>
          </div>
          <button onClick={handleClear} className="clear-btn">
            Change
          </button>
        </div>
      ) : (
        <div className="search-container">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder={`Type to search ${category}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={handleBlur}
          />
          {showDropdown && searchTerm && (
            <div className="dropdown-list">
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <div
                    key={component.id}
                    className="dropdown-item"
                    onClick={() => handleSelect(component)}
                  >
                    <div className="dropdown-item-name">
                      {component.brand} {component.name}
                    </div>
                    <div className="dropdown-item-specs">{component.specs}</div>
                    <div className="dropdown-item-price">
                      Rp {component.price.toLocaleString("id-ID")}
                    </div>
                  </div>
                ))
              ) : (
                <div className="dropdown-item no-results">
                  No components found
                </div>
              )}
            </div>
          )}
          {showDropdown && !searchTerm && (
            <div className="dropdown-list">
              {components.map((component) => (
                <div
                  key={component.id}
                  className="dropdown-item"
                  onClick={() => handleSelect(component)}
                >
                  <div className="dropdown-item-name">
                    {component.brand} {component.name}
                  </div>
                  <div className="dropdown-item-specs">{component.specs}</div>
                  <div className="dropdown-item-price">
                    Rp {component.price.toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
