import React, { useState, useEffect } from "react";
import {
  FaLaptop,
  FaTags,
  FaImage,
  FaDollarSign,
  FaMicrochip,
  FaMemory,
  FaDesktop,
  FaClock,
  FaTimesCircle,
  FaCheckCircle,
  FaEye,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

const UpdateMenuItem = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
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
  });

  const [viewImage, setViewImage] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        brand: item.brand || "",
        category: item.category || "",
        generation: item.generation || "",
        processorType: item.processorType || "",
        processorSpeed: item.processorSpeed || "",
        installedRAM: item.installedRAM || "",
        hardDriveSize: item.hardDriveSize || "",
        ssd: item.ssd || "",
        graphicSeries: item.graphicSeries || "",
        dedicatedGraphics: item.dedicatedGraphics || "",
        graphicsMemory: item.graphicsMemory || "",
        screenSize: item.screenSize || "",
        color: item.color || "",
        operatingSystem: item.operatingSystem || "",
        warranty: item.warranty || "",
        price: item.price || "",
        images: item.images || [""],
        condition: item.condition || "",
        description: item.description || "",
        isSpecialDeal: item.isSpecialDeal || false,
        quantity: item.quantity || 1,
      });
    }
  }, [item]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  })

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center overflow-auto items-start z-50 py-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl relative border border-yellow-100 animate-fadeIn mt-1 ">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
            <FaLaptop className="text-blue-600" /> Update Laptop Item
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaLaptop className="text-blue-600" /> Basic Information
              </h3>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Laptop Name (e.g., HP Pavilion 15)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand (e.g., HP)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
              <input
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="Condition (e.g., Used)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            {/* Processor */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaMicrochip className="text-purple-600" /> Processor
              </h3>
              <input
                name="generation"
                value={formData.generation}
                onChange={handleChange}
                placeholder="Generation (e.g., 9th Generation)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <input
                name="processorType"
                value={formData.processorType}
                onChange={handleChange}
                placeholder="Processor Type (e.g., Intel® Core™ i5-9300H)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
              <input
                name="processorSpeed"
                value={formData.processorSpeed}
                onChange={handleChange}
                placeholder="Processor Speed (e.g., 2.4 GHz Base, up to 4.1 GHz Turbo)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </div>

            {/* Memory */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaMemory className="text-green-600" /> Memory
              </h3>
              <input
                name="installedRAM"
                value={formData.installedRAM}
                onChange={handleChange}
                placeholder="Installed RAM (e.g., 8 GB)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
              <input
                name="hardDriveSize"
                value={formData.hardDriveSize}
                onChange={handleChange}
                placeholder="Hard Drive Size (e.g., 512 GB)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
              <input
                name="ssd"
                value={formData.ssd}
                onChange={handleChange}
                placeholder="SSD (e.g., 512 GB SSD)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
            </div>

            {/* Graphics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaDesktop className="text-red-600" /> Graphics
              </h3>
              <input
                name="graphicSeries"
                value={formData.graphicSeries}
                onChange={handleChange}
                placeholder="Graphic Series (e.g., NVIDIA GTX 1050)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              />
              <input
                name="dedicatedGraphics"
                value={formData.dedicatedGraphics}
                onChange={handleChange}
                placeholder="Dedicated Graphics (e.g., Yes)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              />
              <input
                name="graphicsMemory"
                value={formData.graphicsMemory}
                onChange={handleChange}
                placeholder="Graphics Memory (e.g., 4 GB GDDR5)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              />
            </div>

            {/* Display & Design */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaTags className="text-indigo-600" /> Display & Design
              </h3>
              <input
                name="screenSize"
                value={formData.screenSize}
                onChange={handleChange}
                placeholder="Screen Size (e.g., 15.6)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
              <input
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color (e.g., Silver)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
              <input
                name="operatingSystem"
                value={formData.operatingSystem}
                onChange={handleChange}
                placeholder="Operating System (e.g., Windows 10 Home)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              />
            </div>

            {/* Warranty & Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaDollarSign className="text-teal-600" /> Warranty & Pricing
              </h3>
              <input
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="Warranty (e.g., 3 Months)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price (e.g., 590)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                required
              />
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity (e.g., 1)"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
              />
            </div>

            {/* Images */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaImage className="text-orange-600" /> Images
              </h3>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
                    className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
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
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FaPlusCircle /> Add Another Image
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
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                <FaClock className="text-pink-600" /> Special Deal
              </h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSpecialDeal"
                  checked={formData.isSpecialDeal}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                Is Special Deal
              </label>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-300 hover:bg-gray-200 transition-all shadow-sm"
              >
                <FaTimesCircle /> Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-white rounded-full border border-yellow-600 hover:bg-yellow-600 transition-all shadow-md"
              >
                <FaCheckCircle /> Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full Image Modal */}
      {viewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setViewImage(false)}
        >
          <img
            src={formData.image}
            alt="Full View"
            className="max-w-3xl max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white animate-zoomIn"
          />
        </div>
      )}
    </>
  );
};

export default UpdateMenuItem;
