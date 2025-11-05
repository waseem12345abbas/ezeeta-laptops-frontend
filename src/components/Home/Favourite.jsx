import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../state_manage/features/products/productsSlice";
import { FaBars, FaCross, FaCut, FaTimes } from "react-icons/fa";

export default function LaptopSearchFilter({
  products: externalProducts = null,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products: reduxProducts,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (reduxProducts.length === 0 && status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, reduxProducts.length, status]);

  const products = externalProducts || reduxProducts;
  const [query, setQuery] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState(null);
  const [activeFilterCategory, setActiveFilterCategory] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});

  const priceRanges = [
    { id: "p1", label: "Under 50,000", min: 0, max: 50000 },
    { id: "p2", label: "50,000 - 150,000", min: 50000, max: 150000 },
    { id: "p3", label: "150,000 - 300,000", min: 150000, max: 300000 },
    { id: "p4", label: "300,000+", min: 300000, max: Infinity },
  ];

  const valuesFor = (field, list) => {
    const set = new Set();
    if (!Array.isArray(list)) return [];
    list.forEach((p) => {
      const v = p[field];
      if (!v) return;
      Array.isArray(v)
        ? v.forEach((x) => set.add(String(x)))
        : set.add(String(v));
    });
    return Array.from(set);
  };

  const productsByGeneral = useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!selectedGeneral) return products;
    if (selectedGeneral === "Apple")
      return products.filter((p) => p.brand === "Apple");
    if (selectedGeneral === "Tablets")
      return products.filter((p) => p.category === "Tablets");
    return products.filter((p) => p.category === selectedGeneral);
  }, [products, selectedGeneral]);

  const filterCategories = useMemo(() => {
    return {
      Color: valuesFor("color", productsByGeneral),
      Storage: valuesFor("ssd", productsByGeneral),
      RAM: valuesFor("installedRAM", productsByGeneral),
      Brand: valuesFor("brand", productsByGeneral),
      Generation: valuesFor("generation", productsByGeneral),
      Processor: valuesFor("processorType", productsByGeneral),
      "Graphics Series": valuesFor("graphicsProcessor", productsByGeneral),
      "Screen Size": valuesFor("screenSize", productsByGeneral),
      Warranty: valuesFor("warranty", productsByGeneral),
      Condition: valuesFor("condition", productsByGeneral),
      Price: priceRanges.map((r) => r.label),
    };
  }, [productsByGeneral]);

  const filteredProducts = useMemo(() => {
    return productsByGeneral.filter((p) => {
      const text = `${p.name} ${p.brand} ${p.description || ""}`.toLowerCase();
      if (query && !text.includes(query.toLowerCase())) return false;

      for (const [cat, values] of Object.entries(activeFilters)) {
        if (!values?.length) continue;
        if (cat === "Price") {
          const match = values.some((label) => {
            const pr = priceRanges.find((r) => r.label === label);
            return pr && p.price >= pr.min && p.price <= pr.max;
          });
          if (!match) return false;
        } else {
          const fieldMap = {
            Color: "color",
            Storage: "ssd",
            RAM: "installedRAM",
            Brand: "brand",
            Generation: "generation",
            Processor: "processorType",
            "Graphics Series": "graphicsProcessor",
            "Screen Size": "screenSize",
            Warranty: "warranty",
            Condition: "condition",
          };
          const field = fieldMap[cat];
          const val = p[field];
          if (!val) return false;
          const vals = Array.isArray(val)
            ? val
            : String(val)
                .split(",")
                .map((x) => x.trim());
          if (!values.some((v) => vals.includes(v))) return false;
        }
      }
      return true;
    });
  }, [productsByGeneral, query, activeFilters]);

  const toggleFilterValue = (category, value) => {
    setActiveFilters((prev) => {
      const existing = prev[category] || [];
      const next = existing.includes(value)
        ? existing.filter((x) => x !== value)
        : [...existing, value];
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    setActiveFilterCategory(null);
  };

  useEffect(() => {
    setActiveFilters({});
    setActiveFilterCategory(null);
  }, [selectedGeneral]);

  if (status === "loading")
    return (
      <div className="p-10 text-center text-gray-600">Loading products...</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search laptops, brands, processors..."
          className="w-full md:flex-1 bg-neutral-300 border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setQuery("");
              clearFilters();
              setSelectedGeneral(null);
            }}
            className="px-4 py-2 bg-neutral-300 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
          >
            Reset
          </button>
          <span className="text-sm text-gray-600 bg-neutral-300 px-2 py-2 rounded-lg">
            Showing <strong className="px-1">{filteredProducts.length}</strong>{" "}
            results
          </span>
        </div>
      </div>

      {/* ✅ Categories Row (Scrollable on small screens) */}
      <div className="flex gap-3 overflow-x-auto pb-3 mb-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {["New Laptop", "Used Laptop", "Apple", "Tablets"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedGeneral(cat)}
            className={`flex-shrink-0 px-5 py-2 rounded-lg text-sm md:text-base font-medium transition-all shadow-md ${
              selectedGeneral === cat
                ? "bg-blue-600 text-white"
                : "bg-gradient-to-r from-neutral-100 to-neutral-400 text-gray-700 hover:bg-gray-100 border"
            }`}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedGeneral(null);
            clearFilters();
          }}
          className="flex-shrink-0 px-5 py-2 rounded-lg text-sm md:text-base font-medium bg-white border border-dashed hover:bg-gray-50"
        >
          Show All
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
        {/* Filters (Left) */}
        {/* Filters */}
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg shadow-sm ">
          <h3 className="text-lg font-semibold text-black mb-4">Filters</h3>
          {Object.keys(filterCategories).map((fc) => (
            <div key={fc} className="mb-4 rounded-lg">
              <button
                onClick={() =>
                  setActiveFilterCategory(
                    activeFilterCategory === fc ? null : fc
                  )
                }
                className="bg-gradient-to-r from-neutral-300 to-neutral-500 shadow-lg hover:to-neutral-600 shadow-neutral-700 px-2 py-2 w-full sm:w-40 text-left flex justify-between items-center font-medium text-black rounded-md"
              >
                {fc}
                <span className="text-xs text-black">
                  {filterCategories[fc]?.length || 0}
                </span>
              </button>

              {activeFilterCategory === fc && (
                <div className="mt-2 flex flex-col gap-2 p-2">
                  {filterCategories[fc].map((val) => {
                    const selected = (activeFilters[fc] || []).includes(val);
                    return (
                      <button
                        key={val}
                        onClick={() => toggleFilterValue(fc, val)}
                        className={`w-full sm:w-40 px-3 py-1 rounded-lg text-sm border transition shadow-lg shadow-neutral-700 ${
                          selected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gradient-to-l from-neutral-200 via-neutral-300 to-blue-500 text-black hover:bg-gradient-to-r hover:from-neutral-300 hover:via-neutral-100 hover:to-black border-gray-300"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).flatMap(([cat, vals]) =>
                vals.map((v) => (
                  <div
                    key={`${cat}-${v}`}
                    className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {cat}: {v}
                    <button
                      onClick={() => toggleFilterValue(cat, v)}
                      className="ml-1 text-black font-bold"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                ))
              )}
              {Object.keys(activeFilters).length === 0 && (
                <p className="text-gray-400 text-sm">No active filters</p>
              )}
            </div>
          </div>
        </div>
        {/* Products Grid */}
        <div className="md:col-span-8 sm:ml-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 12).map((p) => (
              <div
                key={p._id}
                className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl border border-gray-300 shadow-lg shadow-neutral-500 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden "
              >
                {/* Image Section */}
                <div className="relative w-full h-56 bg-white flex items-center justify-center border-b border-gray-300 overflow-hidden">
                  {/* Always render the fallback circle, hidden initially */}
                  <div
                    className="fallback-circle flex items-center justify-center w-34 h-34 rounded-full text-white text-3xl font-semibold bg-gradient-to-br from-neutral-300 via-black to-blue-500 shadow-md"
                    style={{ display: "none" }}
                  >
                    {p.brand}
                  </div>
                  {p.images?.[0] || p.image ? (
                    <img
                      src={p.images?.[0] || p.image}
                      alt={p.name}
                      className="h-full w-full max-w-40 max-h-40 p-4 transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = "none"; // hide broken image
                        e.target.parentNode.querySelector(
                          ".fallback-circle"
                        ).style.display = "flex";
                      }}
                      style={{ mixBlendMode: "multiply" }}
                    />
                  ) : null}

                  {/* brand tag */}
                  <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-md shadow">
                    {p.brand}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {p.installedRAM} • {p.ssd}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 items-center justify-between">
                    <div className="text-xl font-bold text-blue-600">
                      Rs {p.price.toLocaleString()}
                    </div>
                    <button
                      onClick={() => navigate(`/product/${p._id}`)}
                      className="bg-gradient-to-r  from-black to-blue-400 text-white px-4 py-1.5 rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full bg-white p-10 text-center text-gray-500 rounded-2xl shadow-sm">
                No laptops match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
