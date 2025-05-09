import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productData } from './old_data';

const GwOverviewTable = () => {
    const [showAll, setShowAll] = useState(false);

    // Display first 5 rows unless 'showAll' is true
    const displayedData = showAll ? productData : productData.slice(0, 5);

    return (
        <section className="relative overflow-hidden">
            <div className="container">
                <div className="flex items-center justify-between my-6">
                    <div>
                        <h4 className="text-base text-gray-800">Overview Table - GamesWorkshop</h4>
                    </div>
                    <div className="text-end">
                        <Link
                            to="/games-workshop"
                            className="font-semibold text-primary text-sm"
                        >
                            View All <i className="fa-solid fa-arrow-right text-base"></i>
                        </Link>
                    </div>
                </div>

                {/* Table Display */}
                <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                    <table className="w-full table-auto border-separate border-spacing-x-0">
                        <thead>
                            <tr className="bg-gray-100 text-gray-800 text-left">
                                <th className="p-4">ID</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">ASIN</th>
                                <th className="p-4">AMZ Img</th>
                                <th className="p-4">AMZ Price</th>
                                <th className="p-4">Store Price</th>
                                <th className="p-4">ROI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((product) => (
                                <tr key={product.ID} className="relative">
                                    <td className="p-4 border-r border-dashed">{product.ID}</td>
                                    <td className="p-4 border-r border-dashed">{product.Title}</td>
                                    <td className="p-4 border-r border-dashed">{product.ASIN}</td>

                                    {/* Amazon Image Column */}
                                    <td className="p-4 border-r border-dashed">
                                        <img
                                            src={product.AmazonImage}
                                            alt="Amazon"
                                            className="w-10 rounded-md"
                                        />
                                    </td>

                                    <td className="p-4 border-r border-dashed">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                                            ${product.BuyBoxPrice}
                                        </span>
                                    </td>

                                    <td className="p-4 border-r border-dashed">
                                        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md">
                                            ${product.Cost}
                                        </span>
                                    </td>

                                    <td className="p-4 border-r border-dashed">
                                        <span className={`
                                            px-3 py-1 rounded-md
                                            ${product.ROI < 20 
                                                ? 'bg-red-100 text-red-600' 
                                                : product.ROI < 30 
                                                ? 'bg-yellow-100 text-yellow-600' 
                                                : 'bg-green-100 text-green-600'}
                                        `}>
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
