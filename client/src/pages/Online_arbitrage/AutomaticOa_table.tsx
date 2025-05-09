import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { productData } from './data';
import { FaAmazon, FaCartPlus, FaFilter, FaBox, FaChartLine, FaDollarSign } from 'react-icons/fa'; // Import FaSearch
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-responsive';

const Table = () => {
    const [data, setData] = useState<MappedData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state for animation
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [quickFilterActive, setQuickFilterActive] = useState(false);
    const [columns, setColumns] = useState([
        'ID', 'ASIN', 'Title', 'Image', 'Keepa',
        'AMZ Price', 'Store Price', 'Links',
        'BSR', 'ROI', 'Profit'
    ]);
    const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(columns.length).fill(true));
    const [originalColumnVisibility, setOriginalColumnVisibility] = useState<boolean[]>([...columnVisibility]);
     
    interface MappedData {
        id: number;
        asin: string;
        title: string;
        amazonImage: string;
        keepaChart: string;
        amzPrice: string;
        storePrice: string;
        amazonLink: string;
        storeLink: string;
        salesRankDrops: number;
        roi: number;
        profit: string;
    }
    
    
    // Fetch data from backend
    interface ReportItem {
        id: number;
        asin: string;
        title: string;
        buy_box_price: number;
        store_price: number;
        store_link: string;
        sales_rank_drops_30: number;
        store_roi: number;
        store_profit: number;
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Start loading
            try {
                const response = await fetch('https://revenue-roots.onrender.com/api/reports');
                const result = await response.json();
                if (result.success) {
                    const mappedData = result.data.map((item: ReportItem) => ({
                        id: item.id,
                        asin: item.asin,
                        title: item.title,
                        amazonImage: `https://m.media-amazon.com/images/I/71e3jwUefGL._SX466_.jpg`,
                        // supplierImage: "https://via.placeholder.com/100",  // Placeholder for supplier image
                        keepaChart: `https://graph.keepa.com/pricehistory.png?asin=${item.asin}`,
                        amzPrice: `$${item.buy_box_price}`,
                        storePrice: `$${item.store_price}`,
                        amazonLink: `https://www.amazon.com/dp/${item.asin}`,
                        storeLink: item.store_link,
                        salesRankDrops: item.sales_rank_drops_30,
                        roi: item.store_roi,
                        profit: `$${item.store_profit}`
                    }));
                    setData(mappedData);
                } else {
                    console.error('Failed to fetch data from backend:', result.error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);  // Stop loading
            }
        };

        fetchData();
    }, []);

    const totalProducts = data.length;

    const averageRoi = totalProducts 
        ? (data.reduce((sum, product) => sum + product.roi, 0) / totalProducts).toFixed(2) 
        : 0;

    const averageProfit = totalProducts 
        ? (data.reduce((sum, product) => sum + Number(product.profit.replace('$', '')), 0) / totalProducts).toFixed(2) 
        : 0;

    const stats = [
        { label: 'Total Products', value: totalProducts, icon: <FaBox className="text-green-500 text-4xl" /> },
        { label: 'Average ROI', value: `${averageRoi}%`, icon: <FaChartLine className="text-blue-500 text-4xl" /> },
        { label: 'Average Profit', value: `$${averageProfit}`, icon: <FaDollarSign className="text-yellow-500 text-4xl" /> }
    ];

    useEffect(() => {
        if (!loading) {
            $('#automaticOaTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                responsive: true,
                scrollX: true,
                columnDefs: [{ orderable: false, targets: [3, 4, 7] }]
            });
        }
    }, [data, loading]);

    useEffect(() => {
        if (!loading) {
            const table = $('#automaticOaTable').DataTable();
            columnVisibility.forEach((isVisible, index) => {
                table.column(index).visible(isVisible);
            });
        }
    }, [columnVisibility]);

    const toggleColumnVisibility = (columnIndex: number) => {
        setColumnVisibility((prev) =>
            prev.map((isVisible, idx) => (idx === columnIndex ? !isVisible : isVisible))
        );
    };
    const applyQuickFilters = () => {
        if (!quickFilterActive) {
            const visibleColumns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            setOriginalColumnVisibility([...columnVisibility]);
            setColumnVisibility(columns.map((_, index) => visibleColumns.includes(index)));
        } else {
            setColumnVisibility([...originalColumnVisibility]);
        }
        setQuickFilterActive(!quickFilterActive);
    };

    return (
        

        
        <div style={{ width: '85%', margin: '0 auto' }}>
            <div className="bg-gray-100 py-10 rounded-lg mb-6 text-center">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Online Arbitrage Data Page!</h1>
            <p className="text-gray-500 mt-2">Here you can find products sourced from other storefronts.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex justify-center gap-6 mb-12"> {/* Increased bottom margin for vertical gap */}
            
            {stats.map((stat, index) => (
            <div
            key={index}
            className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer w-1/5"
            >
            {stat.icon}
            <div>
                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
            </div>
            ))}
            </div>
             <div className="flex justify-between items-center mb-4">
             <h2 className="text-3xl font-bold text-gray-800">
                Online Arbitrage Data Table
            </h2>
            

            <div className="flex gap-4">
                
                <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${quickFilterActive ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-blue-500 border border-blue-500'}`}
                onClick={applyQuickFilters}
                >
                <FaFilter />
                Apply Quick Filters
                </button>
                <button
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md cursor-pointer"
                onClick={() => setShowFilterModal(true)}
                >
                <FaFilter className="text-gray-700" />
                Filters
                </button>
            </div>
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-bold mb-4">Column Filters</h3>
                {columns.map((col, index) => (
                    <div key={col} className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        id={`col-${index}`}
                        checked={columnVisibility[index]}
                        onChange={() => toggleColumnVisibility(index)}
                    />
                    <label htmlFor={`col-${index}`} className="cursor-pointer">{col}</label>
                    </div>
                ))}
                <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                    onClick={() => setShowFilterModal(false)}
                >
                    Apply filters!
                </button>
                </div>
            </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
            <table id="automaticOaTable" className="w-full table-auto border-separate border-spacing-x-0">
                <thead>
                <tr className="bg-gray-100 text-gray-800 text-left">
                    {columns.map((col) => (
                    <th
                        className={`p-4 ${
                        col === 'Title'
                            ? 'w-[20%]'
                            : col === 'AMZ Img' || col === 'Keepa Chart'
                            ? 'w-[10%]'
                            : ''
                        }`}
                        key={col}
                    >
                        {col}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    [...Array(10)].map((_, index) => (
                    <tr key={`loading-${index}`} className="animate-pulse bg-gray-200">
                        <td colSpan={13} className="p-4 text-center">
                        <div className="h-6 w-3/4 mx-auto bg-gray-300 rounded-md"></div>
                        </td>
                    </tr>
                    ))
                ) : (
                    data.map((product, index) => (
                    <tr key={`${product.id}-${index}`} className="relative">
                        <td className="p-4 border-r border-dashed">{product.id}</td>
                        <td className="p-4 border-r border-dashed">{product.asin}</td>
                        <td className="p-4 border-r border-dashed bg-gray-100 w-[20%]">{product.title}</td>

                        {/* Amazon Image with Enhanced Hover Effect */}
                        <td className="p-4 border-r border-dashed bg-white relative group ">
                        <img
                            src={product.amazonImage}
                            alt={product.title}
                            className="w-16 h-12 rounded-md cursor-pointer"
                        />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-[9999] w-64 top-14 left-0">
                            <img src={product.amazonImage} alt={`${product.title} Enlarged`} className="rounded-md" />
                        </div>
                        </td>

                        {/* Keepa Image with Enhanced Hover Effect */}
                        <td className="p-4 border-r border-dashed bg-white relative group w-[10%]">
                        <img
                            src={product.keepaChart}
                            alt="Keepa Chart"
                            className="w-24 h-12 rounded-md cursor-pointer"
                        />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-[9999] w-64 top-14 left-0">
                            <img src={product.keepaChart} alt="Keepa Chart Enlarged" className="rounded-md" />
                        </div>
                        </td>
                        
                        <td className="p-4 border-r border-dashed">
                        <span className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md flex-wrap">
                            <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="w-5 h-5 rounded-full" />
                            {product.amzPrice}
                        </span>
                        </td>

                        <td className="p-4 border-r border-dashed">
                        <span className="flex items-center gap-2 bg-purple-100 text-purple-600 px-3 py-1 rounded-md flex-wrap">
                            <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="w-5 h-5 rounded-full" />
                            {parseFloat(product.storePrice) === 0 ? 'N/A' : product.storePrice}
                        </span>
                        </td>

                        <td className="p-4 border-r border-dashed">
                        <div className="flex items-center justify-center gap-4">
                            <Link to={product.amazonLink} target="_blank">
                            <FaAmazon className="text-orange-500 text-xl cursor-pointer" />
                            </Link>
                            <Link to={product.storeLink} target="_blank" title={product.storeLink}>
                            <FaCartPlus className="text-green-500 text-xl cursor-pointer" />
                            </Link>
                        </div>
                        </td>

                        <td className="p-4 border-r border-dashed">{product.salesRankDrops}</td>

                        <td className="p-4 border-r border-dashed">
                        <span className={`
                            px-3 py-1 rounded-md
                            ${+product.roi < 20 
                            ? 'bg-red-100 text-red-600' 
                            : +product.roi < 30 
                            ? 'bg-yellow-100 text-yellow-600' 
                            : 'bg-green-100 text-green-600'}
                        `}>
                            {product.roi}%
                        </span>
                        </td>

                        <td className="p-4 border-r border-dashed">
                        <span className={`
                            px-3 py-1 rounded-md
                            ${+product.profit.replace('$', '') < 2 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-green-100 text-green-600'}
                        `}>
                            {product.profit}
                        </span>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Table;
