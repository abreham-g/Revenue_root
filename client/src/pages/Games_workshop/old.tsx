import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productData } from './old_data';
import { FaAmazon, FaCartPlus, FaFilter, FaSearch } from 'react-icons/fa'; // Import FaSearch
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-responsive';

const Table = () => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [quickFilterActive, setQuickFilterActive] = useState(false);
    const [columns, setColumns] = useState([
        'ID', 'ASIN', 'Title', 'Amazon Image', 'Supplier Image' , 'Keepa Chart', 'Amazon', 'Supplier','Weight(grams)', 'Amazon Buy Box Price ($)', 'Sales Rank Drops', 'Historic FBA Sellers',
        'Referral fee %', 'Supplier cost ($)', 'profit ($)', 'ROI (%)', '#FBA Sellers Live', 'Saturation Score', 'FBA fees ($)', 'TOTAL STOCK'
    ]);
    const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(columns.length).fill(true));

    
    useEffect(() => {
        const table = $('#gamesWorkshopTable').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            responsive: true,
            // enable horizontal scrolling
            scrollX: true,
            columnDefs: [
                { orderable: false, targets: [3, 4, 5, 8, 9] }
            ]
        });

       

        // Hide/Show Columns based on checkbox state
        columns.forEach((_, index) => {
            table.column(index).visible(true);
        });

        return () => {
            table.destroy();
        };
    }, [columns]);

    const toggleColumnVisibility = (columnIndex: number) => {
        const table = $('#gamesWorkshopTable').DataTable();
        const column = table.column(columnIndex);
        column.visible(!column.visible());
        // Update state to reflect the change
        setColumnVisibility((prev) =>
            prev.map((isVisible, idx) => (idx === columnIndex ? !isVisible : isVisible))
        );
    };
    const applyQuickFilters = () => {
        const table = $('#gamesWorkshopTable').DataTable();
        const visibleColumns = [1, 2, 3, 6, 7, 9, 10,13, 14, 15, 19];

        if (!quickFilterActive) {
            columns.forEach((_, index) => {
                table.column(index).visible(visibleColumns.includes(index));
            });
        } else {
            columns.forEach((_, index) => {
                table.column(index).visible(true);
            });
        }
        setQuickFilterActive(!quickFilterActive);
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
             <div className="flex justify-between items-center mb-4">
             <h2 className="text-3xl font-bold text-gray-800">
                    GamesWorkshop Data Table
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
                <table id="gamesWorkshopTable" className="w-full table-auto border-separate border-spacing-x-0">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-left">
                            {columns.map((col) => (
                                <th className="p-4" key={col}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product) => (

                            
                            <tr key={product.ID} className="relative">
                                <td className="p-4 border-r border-dashed">{product.ID}</td>
                                <td className="p-4 border-r border-dashed">{product.ASIN}</td>
                                <td className="p-4 border-r border-dashed bg-gray-100">{product.Title}</td>

                                {/* Amazon Image with Enhanced Hover Effect */}
                                <td className="p-4 border-r border-dashed relative group">
                                    <img
                                        src={product.AmazonImage}
                                        alt="Amazon"
                                        className="w-16 h-18 rounded-md cursor-pointer"
                                    />
                                    <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-10 w-64 top-[-40px] left-10">
                                        <img src={product.AmazonImage} alt="Amazon Enlarged" className="rounded-md"/>
                                    </div>
                                </td>

                                {/* Supplier Image with Enhanced Hover Effect */}
                                <td className="p-4 border-r border-dashed relative group">
                                    <img
                                        src={product.SupplierImage}
                                        alt="Supplier"
                                        className="w-16 h-18 rounded-md cursor-pointer"
                                    />
                                    <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-10 w-64 top-[-40px] left-10">
                                        <img src={product.KeepaChart} alt="Supplier Enlarged" className="rounded-md"/>
                                    </div>
                                </td>

                                {/* Keepa Image with Enhanced Hover Effect */}
                                <td className="p-4 border-r border-dashed relative group">
                                    <img
                                        src={product.KeepaChart}
                                        alt="Supplier"
                                        className="w-16 h-18 rounded-md cursor-pointer"
                                    />
                                    <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-10 w-64 top-[-40px] left-10">
                                        <img src={product.KeepaChart} alt="Supplier Enlarged" className="rounded-md"/>
                                    </div>
                                </td>

                                <td className="p-4 border-r border-dashed">
                                    <Link to={product.Amazon} target="_blank">
                                        <FaAmazon className="text-orange-500 text-xl cursor-pointer" />
                                    </Link>
                                </td>

                                <td className="p-4 border-r border-dashed">
                                    <Link to={product.Supplier} target="_blank">
                                        <FaCartPlus className="text-green-500 text-xl cursor-pointer" />
                                    </Link>
                                </td>
                                {/* Weight */}
                                <td className="p-4 border-r border-dashed">{product.Weight}</td>
                                {/* Buy Box Price */}
                                <td className="p-4 border-r border-dashed">
                                    <span className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md flex-wrap">
                                        <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="w-5 h-5 rounded-full" />
                                        ${product.BuyBoxPrice}
                                    </span>
                                </td>
                                {/* Sales Rank Drops */}
                                <td className="p-4 border-r border-dashed">{product.SalesRankDrops}</td>
                                {/* Historic FBA Sellers */}
                                <td className="p-4 border-r border-dashed">{product.HistoricFBASellers}</td>
                                {/* Referral Fee Percent */}
                                <td className="p-4 border-r border-dashed">{product.ReferralFeePercent}</td>
                                {/* Cost */}
                                <td className="p-4 border-r border-dashed">
                                    <span className="flex items-center gap-2 bg-purple-100 text-purple-600 px-3 py-1 rounded-md flex-wrap">
                                        <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="w-5 h-5 rounded-full" />
                                        ${product.Cost === 0 ? 'N/A' : product.Cost}
                                    </span>
                                </td>
                                {/* Profit */}
                                <td className={`p-4 border-r border-dashed ${product.Profit >= 2 
                                    ? 'text-green-500' 
                                    : 'text-orange-500'}`}>
                                    ${product.Profit}
                                </td>
                                {/* ROI */}
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
                                {/* FBA Sellers Live */}
                                <td className="p-4 border-r border-dashed">{product.FBASellersLive}</td>
                                {/* Saturation Score */}
                                <td className="p-4 border-r border-dashed">{product.SaturationScore}</td>
                                {/* FBA Fees */}
                                <td className="p-4 border-r border-dashed">{product.FBAFees}</td>
                                {/* Total Stock */}
                                <td className="p-4">{product.TotalStock}</td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
