import { useState, useEffect } from "react";
import { componentData } from "../data/components";
import "./ComponentsPage.css";

export const ComponentsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("cpu");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentCategory = componentData.find(
    (cat) => cat.key === selectedCategory,
  );

  // Filter components based on search term
  const filteredComponents =
    currentCategory?.components.filter((component) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        component.name.toLowerCase().includes(searchLower) ||
        component.brand.toLowerCase().includes(searchLower) ||
        (component.specs &&
          component.specs.toLowerCase().includes(searchLower)) ||
        component.price.toString().includes(searchLower)
      );
    }) || [];

  return (
    <div className="components-page">
      <div className="page-header">
        <h1>KOMPONEN PC</h1>
        <p>Lihat spesifikasi dan harga setiap komponen</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          className="search-bar"
          placeholder="Cari komponen berdasarkan nama, brand, atau spesifikasi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => setSearchTerm("")}>
            ✕
          </button>
        )}
      </div>

      <div className="category-tabs">
        {componentData.map((category) => (
          <button
            key={category.key}
            className={`category-tab ${
              selectedCategory === category.key ? "active" : ""
            }`}
            onClick={() => {
              setSelectedCategory(category.key);
              setSearchTerm(""); // Clear search when changing category
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {searchTerm && (
        <div className="search-info">
          Menampilkan {filteredComponents.length} hasil untuk "{searchTerm}"
        </div>
      )}

      <div className="components-grid">
        {filteredComponents.length > 0 ? (
          filteredComponents.map((component) => (
            <div key={component.id} className="component-card">
              <div className="component-image">
                {component.image ? (
                  <img
                    src={component.image}
                    alt={`${component.brand} ${component.name}`}
                  />
                ) : (
                  <div className="placeholder-image">
                    <span>📦</span>
                  </div>
                )}
              </div>
              <div className="component-details">
                <h3 className="component-brand">{component.brand}</h3>
                <h2 className="component-title">{component.name}</h2>
                {component.specs && (
                  <p className="component-specs">{component.specs}</p>
                )}
                <div className="component-price">
                  Rp {component.price.toLocaleString("id-ID")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>Tidak ada komponen ditemukan</h3>
            <p>Coba kata kunci lain atau pilih kategori berbeda</p>
          </div>
        )}
      </div>
    </div>
  );
};
