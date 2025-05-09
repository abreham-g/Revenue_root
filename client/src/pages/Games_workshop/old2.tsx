import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productData } from './data';
import { FaAmazon, FaCartPlus, FaFilter, FaLink } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-responsive';
import traveling_man from '@/assets/images/retailers/traveling man.webp';
import wayland from '@/assets/images/retailers/wayland.png';
import firestorm from '@/assets/images/retailers/Firestorm.png';
import element_games from '@/assets/images/retailers/element-games.png';
import goblin_games from '@/assets/images/retailers/goblin.avif';
import games_workshop from '@/assets/images/retailers/gamesworkshop.webp';
import warlord_workshop from '@/assets/images/retailers/warloard.png';
import marionville_games from '@/assets/images/retailers/marionville.webp';
import fourtk_links from '@/assets/images/retailers/4tk.ico';
import hobby_workshop from '@/assets/images/retailers/hobby.webp';
import magic_madhouse from '@/assets/images/retailers/magic.webp';
import mighty_meele from '@/assets/images/retailers/mighty.webp';
import beanie_games from '@/assets/images/retailers/beanie.jpg';


const Table = () => {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [storeFilter, setStoreFilter] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [quickFilterActive, setQuickFilterActive] = useState(false);
    const [columns, setColumns] = useState([
        'ID', 'ASIN', 'Title','Image','Amazon Link','Weight(grams)','ROI %','Buybox(Current)','Cost',
        'Best Price ($)','Profit','Sales Rank(Day drops)','FBA seller(LIVE)','Historic FBA sellers'
        ,'FBA fees','Referal fee %','Saturation Score','Total Stock','Stores'
    ]);
    const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(columns.length).fill(true));


    const toggleRowExpansion = (id: number) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter(rowId => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    useEffect(() => {
        const table = $('#gamesWorkshopTable').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            columnDefs: [
                { orderable: false, targets: [3, 4, 17] }
            ],
            scrollX: true
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
        const visibleColumns = [1, 2, 3, 6, 7, 9, 10,13, 14, 15, 17,18];

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
                <div className="flex gap-4 ml-auto">
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

                    <div className="flex gap-4">
                        <select
                            className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md border border-gray-300"
                            onChange={(e) => setStoreFilter(e.target.value)}
                        >
                            <option value="">All Stores</option>
                            <option value="Firestorm Games">Firestorm Games</option>
                            <option value="Wayland Games">Wayland Games</option>
                            <option value="Element Games">Element Games</option>
                            <option value="Goblin Games">Goblin Games</option>
                            <option value="Games Workshop">Games Workshop</option>
                            <option value="Warlord Workshop">Warlord Workshop</option>
                            <option value="Marionville Games">Marionville Games</option>
                            <option value="4tk links">4tk links</option>
                            <option value="Hobby Workshop">Hobby Workshop</option>
                            <option value="Magic Madhouse">Magic Madhouse</option>
                            <option value="Mighty Meele">Mighty Meele</option>
                            <option value="Travelling Man">Travelling Man</option>
                            <option value="Beanie Games">Beanie Games</option>
                        </select>
                    </div>
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
                            <>
                                <tr key={product.ID} className="relative">
                                    <td className="p-4 border-r border-dashed bg-gray-50 rounded-l-lg">{product.ID}</td>
                                    <td className="p-4 border-r border-dashed bg-white">{product.ASIN}</td>
                                    <td className="p-4 border-r border-dashed bg-gray-50">{product.Title}</td>
                                    <td className="p-4 border-r border-dashed bg-white relative group">
                                        <img
                                            src={product.Image}
                                            alt={product.Title}
                                            className="w-12 h-12 rounded-md cursor-pointer"
                                        />
                                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-10 w-64 top-14 left-0">
                                            <img src={product.Image} alt={`${product.Title} Enlarged`} className="rounded-md" />
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-gray-50 text-center flex justify-center items-center">
                                        <a
                                            href={product.Link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500"
                                        >
                                            <FaAmazon className="text-xl" />
                                        </a>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-white">{product.Weight}g</td>
                                    <td className="p-4 border-r border-dashed bg-gray-50">
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
                                    <td className="p-4 border-r border-dashed bg-white text-center">
                                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                                            <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="w-5 h-5 rounded-full" />
                                            {product.Buybox}
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-gray-50 text-center">
                                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                                            <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="w-5 h-5 rounded-full" />
                                            {product.Cost}
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-white whitespace-nowrap">
                                        {(() => {
                                            const sortedStores = product.Stores
                                                .filter(store => store.stock !== 0)
                                                .sort((a, b) => a.price - b.price);

                                            let bestStore = sortedStores.find(store => store.stock > 1) || sortedStores[0];

                                            return bestStore ? (
                                                <span className="flex flex-col items-start gap-1">
                                                    <span>${bestStore.price}</span>
                                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
                                                        {bestStore.name} ({bestStore.stock})
                                                    </span>
                                                </span>
                                            ) : 'N/A';
                                        })()}
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-gray-50">
                                        <span className={`
                                            px-3 py-1 rounded-md
                                            ${product.Profit >= 2 
                                                ? 'bg-green-100 text-green-600' 
                                                : 'bg-orange-100 text-orange-600'}
                                        `}>
                                            ${product.Profit}
                                        </span>
                                    </td>
                                    <td className={`p-4 border-r border-dashed bg-white ${product.SalesRank >= 20 ? 'text-green-500' : 'text-orange-500'}`}>
                                        {product.SalesRank}
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-gray-50">{product.FBA_seller}</td>
                                    <td className="p-4 border-r border-dashed bg-white">{product.Historic_FBA_sellers}</td>
                                    <td className="p-4 border-r border-dashed bg-gray-50">${product.FBA_fees}</td>
                                    <td className="p-4 border-r border-dashed bg-white">{product.Referal_fee}%</td>
                                    <td className="p-4 border-r border-dashed bg-gray-50">{product.Saturation_Score}</td>
                                    <td className="p-4 border-r border-dashed bg-white text-center">
                                        <div className="whitespace-nowrap">
                                            {product.Total_Stock > 5 ? (
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md">
                                                    {product.Total_Stock}
                                                </span>
                                            ) : product.Total_Stock > 0 ? (
                                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-md">
                                                    {product.Total_Stock}
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    
                                    
                                    {/* Toggle Button for Expand/Collapse */}
                                    <td
                                        className="p-4 text-center cursor-pointer bg-gray-50 rounded-r-lg"
                                        onClick={() => toggleRowExpansion(product.ID)}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                                                expandedRows.includes(product.ID)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white text-blue-500 border border-blue-500'
                                            }`}
                                        >
                                            {expandedRows.includes(product.ID) ? (
                                                <IoIosArrowUp className="text-lg" />
                                            ) : (
                                                <IoIosArrowDown className="text-lg" />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                {/* Expanded Row - Appears Below */}
                                {expandedRows.includes(product.ID) && (
                                                                    <tr className="bg-gray-100">
                                                                        <td colSpan={columns.length}>
                                                                            <div className="p-4 bg-white rounded-lg shadow-lg mx-auto" style={{ width: '40%' , height: '50'}}>
                                                                                <table className="w-full table-auto border-separate border-spacing-x-0">
                                                                                    <thead>
                                                                                        <tr className="text-gray-700 bg-gray-200">
                                                                                            <th className="p-3 rounded-l-lg">Image</th>
                                                                                            <th className="p-3">Store</th>
                                                                                            <th className="p-3">Price</th>
                                                                                            <th className="p-3">Stock Level</th>
                                                                                            <th className="p-3 rounded-r-lg">Retailer Link</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {product.Stores
                                                                                            .filter(store =>
                                                                                                storeFilter === '' ||
                                                                                                store.name === storeFilter
                                                                                            )
                                                                                            .map((store, index) => (
                                                                                                <tr key={index} className="border-t">
                                                                                                    <td className="p-4 border-r border-dashed relative group rounded-l-lg bg-gray-50">
                                                                                                        <img
                                                                                                            src={product.Image}
                                                                                                            alt={product.Title}
                                                                                                            className="w-12 h-12 rounded-md cursor-pointer"
                                                                                                        />
                                                                                                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-10 w-64 top-14 left-0">
                                                                                                            <img src={product.Image} alt={`${product.Title} Enlarged`} className="rounded-md" />
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td className="p-3 bg-white">{store.name}</td>
                                                                                                    <td className="p-3 text-center bg-white">
                                                                                                        <div className="flex justify-start items-center gap-2">
                                                                                                            {store.price === 0 ? (
                                                                                                                <span className="bg-red-100 text-red-600 px</span>-3 py-1 rounded-md text-left">
                                                                                                                    Out of Stock
                                                                                                                </span>
                                                                                                            ) : (
                                                                                                                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md flex items-center gap-2">
                                                                                                                    <img src="https://flagcdn.com/gb.svg" alt="UK Flag" className="w-5 h-5 rounded-full" />
                                                                                                                    {store.price}
                                                                                                                </span>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td className="p-3 text-center bg-white">
                                                                                                        <div className="whitespace-nowrap">
                                                                                                            {store.stock > 5 ? (
                                                                                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md">
                                                                                                                    {store.stock}
                                                                                                                </span>
                                                                                                            ) : store.stock > 0 ? (
                                                                                                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-md">
                                                                                                                    {store.stock}
                                                                                                                </span>
                                                                                                            ) : (
                                                                                                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md">
                                                                                                                    Out of Stock
                                                                                                                </span>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </td>
                                                                                                    <td className="p-3 bg-gray-50 w-28">
                                                                                                        <a
                                                                                                            href={store.link}
                                                                                                            target="_blank"
                                                                                                            rel="noopener noreferrer"
                                                                                                            className="group block relative w-28 h-12 rounded-lg overflow-hidden shadow-md border border-gray-300 hover:border-blue-500 hover:scale-105 transition-transform duration-200"
                                                                                                        >
                                                                                                            {store.name === "Travelling Man" ? (
                                                                                                                <img
                                                                                                                    src={traveling_man}
                                                                                                                    alt="Travelling Man Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Firestorm Games" ? (
                                                                                                                <img
                                                                                                                    src= {firestorm}
                                                                                                                    alt="Firestorm Games Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Wayland Games" ? (
                                                                                                                <img
                                                                                                                    src= {wayland}
                                                                                                                    alt="Wayland Games Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Element Games" ? (
                                                                                                                <img
                                                                                                                    src={element_games}
                                                                                                                    alt="Element Games Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Goblin Games" ? (
                                                                                                                <img
                                                                                                                    src={goblin_games}
                                                                                                                    alt="Goblin Games Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Games Workshop" ? (
                                                                                                                <img
                                                                                                                    src={games_workshop}
                                                                                                                    alt="Games Workshop Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Warlord Workshop" ? (
                                                                                                                <img
                                                                                                                    src={warlord_workshop}
                                                                                                                    alt="Warlord Workshop Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Marionville Games" ? (
                                                                                                                <img
                                                                                                                    src={marionville_games}
                                                                                                                    alt="Marionville Games Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "4tk links" ? (
                                                                                                                <img
                                                                                                                    src={fourtk_links}
                                                                                                                    alt="4tk Links Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Hobby Workshop" ? (
                                                                                                                <img
                                                                                                                    src={hobby_workshop}
                                                                                                                    alt="Hobby Workshop Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Magic Madhouse" ? (
                                                                                                                <img
                                                                                                                    src={magic_madhouse}
                                                                                                                    alt="Magic Madhouse Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Mighty Meele" ? (
                                                                                                                <img
                                                                                                                    src={mighty_meele}
                                                                                                                    alt="Mighty Meele Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : store.name === "Beanie Games" ? (
                                                                                                                <img
                                                                                                                    src={beanie_games}
                                                                                                                    alt="Beanie Games Logo"
                                                                                                                    className="w-full h-full object-contain"
                                                                                                                />
                                                                                                            ) : (
                                                                                                                <FaLink className="text-xl text-blue-500 w-full h-full flex items-center justify-center" />
                                                                                                            )}

                                                                                                            {/* Tooltip for clarity */}
                                                                                                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                                                                {store.name}
                                                                                                            </div>
                                                                                                        </a>
                                                                                                    </td>

                                                                                                </tr>
                                                                                            ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                
                                
                            </>
                       ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;