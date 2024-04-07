import React, { useEffect, useState } from 'react';
import { IoFilterSharp } from "react-icons/io5";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import saveIcon from '../../Assets/saveicon.png';
import savedIcon from '../../Assets/savedicon.png';

function DiscoverProducts() {
  const [discoverProducts, setDiscoverProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);

  const getDiscoverProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setDiscoverProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDiscoverProducts();
  }, []);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleMouseEnter = (productId) => {
    setIsHovered(true);
    setHoveredImage(productId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredImage(null);
  };

  const toggleSaved = (productId) => {
    if (savedProducts.includes(productId)) {
      setSavedProducts(savedProducts.filter((id) => id !== productId));
    } else {
      setSavedProducts([...savedProducts, productId]);
    }
  };

  const isSaved = (productId) => savedProducts.includes(productId);

  const lineStyle = {
    width: isHovered ? '35%' : '0%',
    height: '2px',
    backgroundColor: 'rgb(11, 11, 63)',
    display: 'block',
    margin: '8px auto',
    transition: 'width 0.7s',
  };
  const saveIconStyle = {
    display: isHovered ? 'block' : 'none',
    position: 'absolute',
    top: '8px',
    right: '8px',
    backgroundColor: 'white' ,
    borderRadius: '50%',
    padding: '5px',
    cursor: 'pointer',
    transition: 'opacity 0.3s',
  };
  

  // Calculate the index of the first and last item to display
  const indexOfLastItem = currentPage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentProducts = discoverProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-8  relative">
      <div className="text-center font-bold text-3xl my-8 relative">
  <p 
  className="inline-block relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
  >
    <span className="font-light text-lg">Shop by category</span><br />
    Shop by category
  </p>
  <span style={lineStyle}></span>
</div>

      <div className="flex justify-end mr-20 mb-4 relative">
        <button onClick={toggleCategories} className="flex items-center font-bold py-2 px-4 rounded-full border border-green-600 ">
           <IoFilterSharp className="mr-2" />
              Filters
        </button>
      </div>
       {showCategories && (
  <ul className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md py-2 px-4 z-10">
    <li className="cursor-pointer py-1 px-2 hover:bg-[#77D0B0]">Stationery Supplies</li>
    <li className="cursor-pointer py-1 px-2 hover:bg-[#77D0B0]">Electronics and Gadgets</li>
    <li className="cursor-pointer py-1 px-2 hover:bg-[#77D0B0]">Food and Snacks</li>
    <li className="cursor-pointer py-1 px-2 hover:bg-[#77D0B0]">Personal Care Items</li>
  </ul>
)}

      <div className="flex flex-wrap justify-center gap-4">
        {currentProducts.map((product) => (
          <div 
              key={product.id} 
              className="w-64 border border-gray-300 rounded-lg p-2 mb-4 relative"
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col items-center relative">
                <div className="w-64 h-64 overflow-hidden mb-2 relative">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                 <img src={isSaved(product.id) ? savedIcon : saveIcon} alt="Save" style={saveIconStyle} onClick={() => toggleSaved(product.id)}/>
                 
                </div>
                <p className="text-center mt-2 max-h-16 overflow-hidden whitespace-normal font-bold">{product.title}</p>
                <p className="text-gray-600">{product.rating.rate} stars</p>
                <p className="text-gray-600 text-center">Price: ${product.price}</p>
              </div>
            </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg focus:outline-none bg-slate-200 mr-4"
        >
          <FaCaretLeft /> {/* Left Icon */}
        </button>
        <p>{currentPage}</p>
        <button
          onClick={handleNextPage}
          disabled={currentProducts.length < 8}
          className="px-4 py-2 border rounded-lg focus:outline-none bg-slate-200 ml-4"
        >
          <FaCaretRight /> {/* Right Icon */}
        </button>
      </div>
    </div>
  );
}

export default DiscoverProducts;
