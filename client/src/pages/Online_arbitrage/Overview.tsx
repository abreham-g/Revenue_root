import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OverviewTable = () => {
    interface Product {
        id: string;
        asin: string;
        title: string;
        amazonImage: string;
        amzPrice: string;
        storePrice: string;
        roi: string;
    }

    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://revenue-roots.onrender.com/api/reports');
                const result = await response.json();
                if (result.success) {
                    const mappedData = result.data.map((item: any) => ({
                        id: item.id,
                        asin: item.asin,
                        title: item.title,
                        amazonImage: `https://m.media-amazon.com/images/I/71e3jwUefGL._SX466_.jpg`,
                        amzPrice: `$${item.buy_box_price}`,
                        storePrice: `$${item.store_price}`,
                        roi: item.store_roi,
                    }));
                    setData(mappedData);
                } else {
                    console.error('Failed to fetch data from backend:', result.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const displayedData = showAll ? data : data.slice(0, 5);

    return (
        <section className="relative overflow-hidden">
            <div className="container">
                <div className="flex items-center justify-between my-6">
                    <div>
                        <h4 className="text-base text-gray-800">Overview Table - Online Arbitrage</h4>
                    </div>
                    <div className="text-end">
                        <Link
                            to="/automatic_oa"
                            className="font-semibold text-primary text-sm"
                        >
                            View All <i className="fa-solid fa-arrow-right text-base"></i>
                        </Link>
                    </div>
                </div>

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
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ) : (
                                displayedData.map((product) => (
                                    <tr key={product.id} className="relative">
                                        <td className="p-4 border-r border-dashed">{product.id}</td>
                                        <td className="p-4 border-r border-dashed">{product.title}</td>
                                        <td className="p-4 border-r border-dashed">{product.asin}</td>
                                        <td className="p-4 border-r border-dashed">
                                            <img
                                                src={product.amazonImage}
                                                alt="Amazon"
                                                className="w-10 rounded-md"
                                            />
                                        </td>
                                        <td className="p-4 border-r border-dashed">
                                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                                                {product.amzPrice}
                                            </span>
                                        </td>
                                        <td className="p-4 border-r border-dashed">
                                            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md">
                                                {product.storePrice}
                                            </span>
                                        </td>
                                        <td className="p-4 border-r border-dashed">
                                            <span className={`
                                                px-3 py-1 rounded-md
                                                ${parseFloat(product.roi) < 20 
                                                    ? 'bg-red-100 text-red-600' 
                                                    : parseFloat(product.roi) < 30 
                                                    ? 'bg-yellow-100 text-yellow-600' 
                                                    : 'bg-green-100 text-green-600'}
                                            `}>
                                                {product.roi}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default OverviewTable;
