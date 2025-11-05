import React, { useState } from "react";
import api from "../../api";
import {
  FaLaptop,
  FaTags,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaImage,
  FaDollarSign,
  FaDesktop,
  FaPalette,
  FaShieldAlt,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

const AddNewItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    generation: "",
    processorType: "",
    processorSpeed: "",
    installedRAM: "",
    hardDriveSize: "",
    ssd: "",
    graphicSeries: "",
    dedicatedGraphics: "",
    graphicsMemory: "",
    screenSize: "",
    color: "",
    operatingSystem: "",
    warranty: "",
    price: "",
    images: [""],
    condition: "",
    description: "",
    isSpecialDeal: false,
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (name === "quantity" ? parseInt(value) || 1 : value),
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/addItem", formData);
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Item added successfully!");
        setError(false);
        setFormData({
          name: "",
          brand: "",
          generation: "",
          processorType: "",
          processorSpeed: "",
          installedRAM: "",
          hardDriveSize: "",
          ssd: "",
          graphicSeries: "",
          dedicatedGraphics: "",
          graphicsMemory: "",
          screenSize: "",
          color: "",
          operatingSystem: "",
          warranty: "",
          price: "",
          images: [""],
          condition: "",
          description: "",
          isSpecialDeal: false,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (err) {
      console.error("Error adding item:", err);
      setMessage("❌ Failed to add item.");
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-black mb-2 text-center tracking-wide">
          Add New Laptop
        </h2>
        <p className="text-black text-center mb-8">
          Fill in the details below to add a new laptop to the inventory.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaLaptop className="text-blue-600 text-2xl" /> Basic Information
            </h3>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Laptop Name (e.g., HP Pavilion 15)"
              className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              required
            />
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand (e.g., HP)"
              className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              required
            />
            <input
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="Condition (e.g., Used)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              required
            />
          </div>

          {/* Processor */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaMicrochip className="text-purple-600 text-2xl" /> Processor
            </h3>
            <input
              name="generation"
              value={formData.generation}
              onChange={handleChange}
              placeholder="Generation (e.g., 9th Generation)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="processorType"
              value={formData.processorType}
              onChange={handleChange}
              placeholder="Processor Type (e.g., Intel® Core™ i5-9300H)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="processorSpeed"
              value={formData.processorSpeed}
              onChange={handleChange}
              placeholder="Processor Speed (e.g., 2.4 GHz Base, up to 4.1 GHz Turbo)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
          </div>

          {/* Memory */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaMemory className="text-green-600 text-2xl" /> Memory
            </h3>
            <input
              name="installedRAM"
              value={formData.installedRAM}
              onChange={handleChange}
              placeholder="Installed RAM (e.g., 8 GB)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="hardDriveSize"
              value={formData.hardDriveSize}
              onChange={handleChange}
              placeholder="Hard Drive Size (e.g., 512 GB)"
              className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="ssd"
              value={formData.ssd}
              onChange={handleChange}
              placeholder="SSD (e.g., 512 GB SSD)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
          </div>

          {/* Graphics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaDesktop className="text-red-600 text-2xl" /> Graphics
            </h3>
            <input
              name="graphicSeries"
              value={formData.graphicSeries}
              onChange={handleChange}
              placeholder="Graphic Series (e.g., NVIDIA GTX 1050)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="dedicatedGraphics"
              value={formData.dedicatedGraphics}
              onChange={handleChange}
              placeholder="Dedicated Graphics (e.g., Yes)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="graphicsMemory"
              value={formData.graphicsMemory}
              onChange={handleChange}
              placeholder="Graphics Memory (e.g., 4 GB GDDR5)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
          </div>

          {/* Display & Design */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaPalette className="text-indigo-600 text-2xl" /> Display & Design
            </h3>
            <input
              name="screenSize"
              value={formData.screenSize}
              onChange={handleChange}
              placeholder="Screen Size (e.g., 15.6” FHD)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color (e.g., Silver)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="operatingSystem"
              value={formData.operatingSystem}
              onChange={handleChange}
              placeholder="Operating System (e.g., Windows 10 Home)"
              className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
          </div>

          {/* Warranty & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaShieldAlt className="text-teal-600 text-2xl" /> Warranty & Pricing
            </h3>
            <input
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              placeholder="Warranty (e.g., 3 Months)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (e.g., 590)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
              required
            />
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity (e.g., 1)"
               className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
            />
          </div>

          {/* Images */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaImage className="text-orange-600 text-2xl" /> Images
            </h3>
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                   className="w-full placeholder:text-black  bg-neutral-400 shadow-neutral-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black shadow-xs"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaMinusCircle />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="flex items-center gap-2 text-black hover:text-blue-800 text-xl"
            >
              <FaPlusCircle className="text-2xl"/> Add Another Image
            </button>
            <div className="flex gap-2 flex-wrap">
              {formData.images.map((image, index) => (
                image && (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg shadow-md border border-orange-200"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )
              ))}
            </div>
          </div>

          {/* Special Deal */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-black">
              <FaTags className="text-pink-600 text-2xl" /> Special Deal
            </h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isSpecialDeal"
                checked={formData.isSpecialDeal}
                onChange={handleChange}
                className="accent-pink-600 h-5 w-5 text-black border-gray-300 focus:ring-1 focus:ring-neutral-500 rounded"
              />
              Is Special Deal
            </label>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 bg-black hover:bg-neutral-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-transform transform hover:scale-105 active:scale-95"
            >
              <FaPlusCircle /> Add Laptop
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-8 text-center px-6 py-3 rounded-lg font-medium text-lg shadow-md ${
              error
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewItem;
