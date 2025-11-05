import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../state_manage/features/cart/Cart';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const product = products.find((item) => String(item._id) === String(id));

  const allItemsInCart = useSelector((state) => state.cart.cart);
  const isItemInCart = (id) => allItemsInCart.some((item) => String(item._id) === String(id));

  // Handle main image change
  const [mainImage, setMainImage] = useState(
    product?.images?.[0] || product?.image?.[0] || product?.image || ''
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product not found</h1>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ---------- Left Side: Images ---------- */}
        <div className="flex flex-col items-center justify-center">
          {/* Main Image */}
          <div className="w-full flex justify-center mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-[90%] max-w-md h-auto object-contain rounded-lg shadow-xl transition-all duration-300"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex flex-wrap justify-center gap-3">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-contain rounded-md cursor-pointer border-2 transition-all duration-200 ${
                  mainImage === img ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ---------- Right Side: Product Details ---------- */}
        <div className="flex flex-col justify-center bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">RS {product.price}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          {/* Specifications */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Specifications</h2>
            <ul className="text-gray-700 space-y-1">
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Generation:</strong> {product.generation}</li>
              <li><strong>Processor:</strong> {product.processorType}</li>
              <li><strong>RAM:</strong> {product.installedRAM}</li>
              <li><strong>Storage:</strong> {product.hardDriveSize} ({product.hardDriveType})</li>
              <li><strong>Graphics:</strong> {product.graphicsProcessor}</li>
              <li><strong>Screen:</strong> {product.screenSize} ({product.screenResolution})</li>
              <li><strong>Operating System:</strong> {product.operatingSystem}</li>
              <li><strong>Weight:</strong> {product.weight}</li>
              <li><strong>Warranty:</strong> {product.warranty}</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isItemInCart(product._id)
                  ? 'bg-gray-900 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isItemInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
