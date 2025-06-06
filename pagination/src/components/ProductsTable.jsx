import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsTable.css'; // Import the external CSS file

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default number of items per page
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page = 1, limit = 10) => {
    setLoading(true);
    const skip = (page - 1) * limit;
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  // Initial render fetch
  useEffect(() => {
    fetchProducts(currentPage, limit); // Uses default values for page=1 and limit=10
  }, [currentPage, limit]); // Triggers re-fetch when currentPage or limit changes

  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value)); // Update the limit dynamically
    setCurrentPage(1); // Reset to the first page when limit changes
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Products Table</h2>
      <div className="limit-select">
        <label htmlFor="limit">Items per page: </label>
        <select id="limit" value={limit} onChange={handleLimitChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
      <>
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th className="id">ID</th>
                <th className="title">Title</th>
                <th className="price">Price</th>
                <th className="category">Category</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td></td>
                  <td>
                    <p className="loading-text">Loading...</p>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <p className="total-text">Total Products: {total}</p>
    </div>
  );
};

export default ProductsTable;
