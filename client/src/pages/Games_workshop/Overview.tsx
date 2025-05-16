import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define the type based on your API structure
type Store = {
  name: string;
  price: number;
  stock: number;
  link: string;
  image: string;
};

type Product = {
  ID: number;
  ASIN: string;
  Title: string;
  Image: string;
  Link: string;
  Weight: number;
  ROI: number;
  Buybox: number;
  Cost: number;
  Stores: Store[];
  BestPrice: number;
  Profit: number;
  Timestamp: string;
};

const GwOverviewTable = () => {
  const [showAll, setShowAll] = useState(false);
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>('https://revenue-root-1.onrender.com/gws/fetch')
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => console.error('API fetch error:', err));
  }, []);

  const displayedData = showAll ? productData : productData.slice(0, 5);

  return (
    <section className="relative overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between my-6">
          <h4 className="text-base text-gray-800">Overview Table - GamesWorkshop</h4>
          <Link to="/games-workshop" className="font-semibold text-primary text-sm">
            View All <i className="fa-solid fa-arrow-right text-base"></i>
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="w-full table-auto border-separate border-spacing-x-0">
            <thead>
              <tr className="bg-gray-100 text-gray-800 text-left">
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">ASIN</th>
                <th className="p-4">Image</th>
                <th className="p-4">BuyBox Price</th>
                <th className="p-4">Cost</th>
                <th className="p-4">ROI</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((product) => (
                <tr key={product.ID}>
                  <td className="p-4 border-r border-dashed">{product.ID}</td>
                  <td className="p-4 border-r border-dashed">{product.Title}</td>
                  <td className="p-4 border-r border-dashed">{product.ASIN}</td>
                  <td className="p-4 border-r border-dashed">
                    <img src={product.Image} alt="Amazon" className="w-10 rounded-md" />
                  </td>
                  <td className="p-4 border-r border-dashed">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                      ${product.Buybox}
                    </span>
                  </td>
                  <td className="p-4 border-r border-dashed">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md">
                      ${product.Cost}
                    </span>
                  </td>
                  <td className="p-4 border-r border-dashed">
                    <span className={`px-3 py-1 rounded-md ${
                      product.ROI < 20
                        ? 'bg-red-100 text-red-600'
                        : product.ROI < 30
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {product.ROI}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default GwOverviewTable;
