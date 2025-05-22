import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAmazon, FaCartPlus, FaFilter, FaBox, FaChartLine, FaDollarSign } from 'react-icons/fa';
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-responsive';

interface ProductData {
    ASIN: string;
    TITLE: string;
    "BUY BOX PRICE": number;
    "SALES RANK DROPS 30": string;
    "STORE PRICE": number;
    "STORE PROFIT": number;
    "STORE ROI": number;
    "STORE LINK": string;
}

const Table = () => {
    const [data, setData] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [quickFilterActive, setQuickFilterActive] = useState(false);
    
    const columns = [
        'ASIN', 'TITLE', 'BUY BOX PRICE',
        'SALES RANK DROPS 30', 'STORE PRICE', 'STORE PROFIT', 'STORE ROI',
        'STORE LINK'
    ];
    
    const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(columns.length).fill(true));
    const [originalColumnVisibility, setOriginalColumnVisibility] = useState<boolean[]>([...columnVisibility]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // const response = await fetch('http://localhost:5000/data/automatic_oa');
                const response = await fetch('https://revenue-root-1.onrender.com/data/automatic_oa')
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (!Array.isArray(result)) {
                    throw new Error('Invalid data format: expected an array');
                }
                
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            const table = $('#automaticOaTable').DataTable();
            if (table) {
                table.destroy();
            }
        };
    }, []);

    // Initialize DataTable
    useEffect(() => {
        if (!loading && data.length > 0 && !error) {
            const table = $('#automaticOaTable').DataTable({
                paging: true,
                pageLength: 25,
                searching: true,
                ordering: true,
                info: true,
                responsive: true,
                scrollX: true,
                columnDefs: [
                    { orderable: false, targets: [7] }, // Make STORE LINK column non-orderable
                    { type: 'currency', targets: [2, 4, 5] }, // Apply currency formatting
                    { type: 'numeric', targets: [3, 6] } // Apply numeric formatting
                ],
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search products...",
                }
            });

            return () => {
                table.destroy();
            };
        }
    }, [loading, data, error]);

    // Apply column visibility changes
    useEffect(() => {
        if (!loading && data.length > 0 && !error) {
            const table = $('#automaticOaTable').DataTable();
            columnVisibility.forEach((isVisible, index) => {
                table.column(index).visible(isVisible);
            });
        }
    }, [columnVisibility, loading, data, error]);

    const toggleColumnVisibility = (columnIndex: number) => {
        setColumnVisibility(prev => 
            prev.map((isVisible, idx) => (idx === columnIndex ? !isVisible : isVisible))
        );
    };

    const applyQuickFilters = () => {
        if (!quickFilterActive) {
            // Show only essential columns
            setOriginalColumnVisibility([...columnVisibility]);
            setColumnVisibility(columns.map((_, index) => [0, 1, 2, 4, 5, 6, 7].includes(index)));
        } else {
            // Restore original visibility
            setColumnVisibility([...originalColumnVisibility]);
        }
        setQuickFilterActive(!quickFilterActive);
    };

    // Calculate statistics
    const totalProducts = data.length;
    const averageRoi = totalProducts 
        ? (data.reduce((sum, product) => sum + product["STORE ROI"], 0) / totalProducts).toFixed(2)
        : '0';
    const averageProfit = totalProducts
        ? (data.reduce((sum, product) => sum + product["STORE PROFIT"], 0) / totalProducts).toFixed(2)
        : '0';

    const stats = [
        { label: 'Total Products', value: totalProducts, icon: <FaBox className="text-green-500 text-4xl" /> },
        { label: 'Average ROI', value: `${averageRoi}%`, icon: <FaChartLine className="text-blue-500 text-4xl" /> },
        { label: 'Average Profit', value: `$${averageProfit}`, icon: <FaDollarSign className="text-yellow-500 text-4xl" /> }
    ];

    if (error) {
        return (
            <div className="w-11/12 mx-auto py-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error loading data: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button 
                        className="absolute top-0 right-0 px-4 py-3"
                        onClick={() => setError(null)}
                    >
                        ×
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto py-6">
            <div className="bg-gray-100 py-10 rounded-lg mb-6 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to the Online Arbitrage Data Page!</h1>
                <p className="text-gray-500 mt-2">Here you can find products sourced from other storefronts.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex justify-center gap-6 mb-12">
                {stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer w-1/5">
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
                        {quickFilterActive ? 'Reset Filters' : 'Apply Quick Filters'}
                    </button>
                    <button
                        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition"
                        onClick={() => setShowFilterModal(true)}
                    >
                        <FaFilter className="text-gray-700" />
                        Custom Filters
                    </button>
                </div>
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Column Filters</h3>
                        {columns.map((col, index) => (
                            <div key={col} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    id={`col-${index}`}
                                    checked={columnVisibility[index]}
                                    onChange={() => toggleColumnVisibility(index)}
                                    className="cursor-pointer"
                                />
                                <label htmlFor={`col-${index}`} className="cursor-pointer">{col}</label>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-4">
                            <button
                                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => setShowFilterModal(false)}
                            >
                                Apply
                            </button>
                            <button
                                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => {
                                    setColumnVisibility(Array(columns.length).fill(true));
                                    setShowFilterModal(false);
                                }}
                            >
                                Show All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                <table id="automaticOaTable" className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-left">
                            {columns.map((col, index) => (
                                <th 
                                    key={col}
                                    className={`p-4 ${!columnVisibility[index] ? 'hidden' : ''}`}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(10)].map((_, index) => (
                                <tr key={`loading-${index}`} className="animate-pulse">
                                    {columns.map((_, colIndex) => (
                                        <td key={`loading-${index}-${colIndex}`} className="p-4">
                                            <div className="h-6 bg-gray-200 rounded"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            data.map((product, index) => (
                                <tr key={`${product.ASIN}-${index}`} className="hover:bg-gray-50 transition">
                                    {columnVisibility[0] && (
                                        <td className="p-4 border-t border-gray-200">{product.ASIN}</td>
                                    )}
                                    {columnVisibility[1] && (
                                        <td className="p-4 border-t border-gray-200 max-w-xs truncate" title={product.TITLE}>
                                            {product.TITLE}
                                        </td>
                                    )}
                                    {columnVisibility[2] && (
                                        <td className="p-4 border-t border-gray-200">
                                            <span className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                                                <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="w-5 h-5 rounded-full" />
                                                ${product["BUY BOX PRICE"].toFixed(2)}
                                            </span>
                                        </td>
                                    )}
                                    {columnVisibility[3] && (
                                        <td className="p-4 border-t border-gray-200">
                                            {product["SALES RANK DROPS 30"]}
                                        </td>
                                    )}
                                    {columnVisibility[4] && (
                                        <td className="p-4 border-t border-gray-200">
                                            ${product["STORE PRICE"].toFixed(2)}
                                        </td>
                                    )}
                                    {columnVisibility[5] && (
                                        <td className="p-4 border-t border-gray-200">
                                            <span className={`
                                                px-3 py-1 rounded-md inline-block
                                                ${product["STORE PROFIT"] < 2 ? 'bg-orange-100 text-orange-600' : 
                                                  product["STORE PROFIT"] < 5 ? 'bg-yellow-100 text-yellow-600' : 
                                                  'bg-green-100 text-green-600'}
                                            `}>
                                                ${product["STORE PROFIT"].toFixed(2)}
                                            </span>
                                        </td>
                                    )}
                                    {columnVisibility[6] && (
                                        <td className="p-4 border-t border-gray-200">
                                            <span className={`
                                                px-3 py-1 rounded-md inline-block
                                                ${product["STORE ROI"] < 20 ? 'bg-red-100 text-red-600' : 
                                                  product["STORE ROI"] < 30 ? 'bg-yellow-100 text-yellow-600' : 
                                                  'bg-green-100 text-green-600'}
                                            `}>
                                                {product["STORE ROI"].toFixed(2)}%
                                            </span>
                                        </td>
                                    )}
                                    {columnVisibility[7] && (
                                        <td className="p-4 border-t border-gray-200">
                                            <div className="flex items-center justify-center">
                                                <a 
                                                    href={product["STORE LINK"]} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:text-blue-700 hover:underline transition"
                                                >
                                                    View Store
                                                </a>
                                            </div>
                                        </td>
                                    )}
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