import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAmazon, FaCartPlus, FaFilter, FaLink } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-responsive';
import traveling_man from '@/assets/images/retailers/traveling_man.webp';
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

interface Store {
    name: string;
    stock: number;
    price: number;
    link: string;
    image?: string;
}

const storeDisplayNames: Record<string, string> = {
    FIRESTORM_GAMES: "Firestorm Games",
    WAYLAND_GAMES: "Wayland Games",
    ELEMENT_GAMES: "Element Games",
    GOBLIN_GAMES: "Goblin Games",
    WARLORD_WORKSHOP: "Warlord Workshop",
    MARIONVILLE_GAMES: "Marionville Games",
    "4tk_links": "4tk Links",
    HOBBY_WORKSHOP: "Hobby Workshop",
    MAGIC_MADHOUSE: "Magic Madhouse",
    MIGHTY_MEELE: "Mighty Meele",
    TRAVELLING_MAN: "Travelling Man",
    BEANIE_GAMES: "Beanie Games",
    GAMES_WORKSHOP: "Games Workshop",
};

const Table = () => {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [storeFilter, setStoreFilter] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [quickFilterActive, setQuickFilterActive] = useState(false);
    const [columns] = useState([
        'ID', 'ASIN', 'Title', 'Image', 'Amazon Link', 'ROI %', 
        'Buybox(Current)', 'Product Cost', 'Best Price ($)', 
        'Profit', 'Timestamp', 'Stores'
    ]);
    const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(12).fill(true));
    const [productData, setProductData] = useState<any[]>([]);

    const toggleRowExpansion = (id: number) => {
        if ($.fn.dataTable && $.fn.dataTable.isDataTable('#gamesWorkshopTable')) {
            $('#gamesWorkshopTable').DataTable().destroy(true);
        }

        setExpandedRows(prev => 
            prev.includes(id) 
                ? prev.filter(rowId => rowId !== id) 
                : [...prev, id]
        );

        setTimeout(() => {
            if ($('#gamesWorkshopTable').length) {
                $('#gamesWorkshopTable').DataTable({
                    paging: true,
                    searching: true,
                    ordering: true,
                    info: true,
                    columnDefs: [
                        { orderable: false, targets: [3, 4, 11] } // Keep Stores column (11) visible
                    ],
                    scrollX: true,
                    destroy: true,
                    responsive: true,
                    initComplete: function() {
                        // Ensure Stores column is always visible
                        this.api().column(11).visible(true);
                    }
                });
            }
        }, 50);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('http://localhost:5000/gws/fetch');
                const response = await fetch('https://gws-table.onrender.com/gws/fetch')
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Backend error (${response.status}): ${errorText}`);
                }
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error("❌ Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (productData.length === 0) return;

        if ($.fn.dataTable && $.fn.dataTable.isDataTable('#gamesWorkshopTable')) {
            $('#gamesWorkshopTable').DataTable().destroy(true);
        }

        const table = $('#gamesWorkshopTable').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            columnDefs: [
                { orderable: false, targets: [3, 4, 11] }
            ],
            scrollX: true,
            destroy: true,
            responsive: true,
            initComplete: function() {
                this.api().column(11).visible(true); // Force Stores column to be visible
            }
        });

        return () => {
            if ($.fn.dataTable && $.fn.dataTable.isDataTable('#gamesWorkshopTable')) {
                table.destroy(true);
            }
        };
    }, [productData]);

    const toggleColumnVisibility = (columnIndex: number) => {
        if (columnIndex === 11) return; // Prevent hiding Stores column
        
        const table = $('#gamesWorkshopTable').DataTable();
        const column = table.column(columnIndex);
        column.visible(!column.visible());
        
        setColumnVisibility(prev => 
            prev.map((isVisible, idx) => (idx === columnIndex ? !isVisible : isVisible))
        );
    };

    const applyQuickFilters = () => {
        const table = $('#gamesWorkshopTable').DataTable();
        const visibleColumns = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11]; // Always include Stores column (11)
        
        if (!quickFilterActive) {
            columns.forEach((_, index) => {
                if (index !== 11) { // Skip Stores column
                    table.column(index).visible(visibleColumns.includes(index));
                }
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
                            value={storeFilter}
                        >
                            <option value="">All Stores</option>
                            {Object.values(storeDisplayNames).map(store => (
                                <option key={store} value={store}>{store}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {showFilterModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Column Filters</h3>
                        {columns.map((col, index) => (
                            <div key={`${col}-${index}`} className="flex items-center gap-2 mb-2">
                                <input
                                    type="checkbox"
                                    id={`col-${index}`}
                                    checked={columnVisibility[index]}
                                    onChange={() => toggleColumnVisibility(index)}
                                    disabled={index === 11} // Disable toggle for Stores column
                                />
                                <label htmlFor={`col-${index}`} className="cursor-pointer">{col}</label>
                            </div>
                        ))}
                        <button
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                            onClick={() => setShowFilterModal(false)}
                        >
                            Apply filters
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
                <table id="gamesWorkshopTable" className="w-full table-auto border-separate border-spacing-x-0">
                    <thead>
                        <tr className="bg-gray-100 text-gray-800 text-left">
                            {columns.map((col, index) => (
                                <th 
                                    className="p-4" 
                                    key={`${col}-${index}`}
                                    data-column-index={index}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="overflow-visible">
                        {productData.map((product) => (
                            <>
                                <tr key={product.ID} className="relative">
                                    <td className="p-4 border-r border-dashed bg-gray-50 rounded-l-lg">{product.ID}</td>
                                    <td className="p-4 border-r border-dashed bg-white">{product.ASIN}</td>
                                    <td className="p-4 border-r border-dashed bg-white relative group min-w-[160px]">{product.Title}</td>
                                    <td className="p-4 border-r border-dashed bg-white relative group min-w-[160px]">
                                        <img
                                            src={product.Image}
                                            alt={product.Title}
                                            className="w-32 h-24 rounded-md cursor-pointer"
                                        />
                                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-[9999] w-64 top-14 left-0">
                                            <img src={product.Image} alt={`${product.Title} Enlarged`} className="rounded-md" />
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-white relative group min-w-[200px] text-center align-middle">
                                        <a
                                            href={product.Link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block"
                                        >
                                            <FaAmazon className="text-4xl text-blue-600 mx-auto" />
                                        </a>
                                    </td>
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
                                            ${product.Buybox}
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-gray-50 text-center">
                                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-md">
                                            <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="w-5 h-5 rounded-full" />
                                            ${product.Cost}
                                        </div>
                                    </td>
                                    <td className="p-4 border-r border-dashed bg-white whitespace-nowrap">
                                        {(() => {
                                            const sortedStores = product.Stores
                                                .filter((store: Store) => store.stock !== 0)
                                                .sort((a: Store, b: Store) => a.price - b.price);

                                            let bestStore = sortedStores.find((store: Store) => store.stock > 1) || sortedStores[0];

                                            return bestStore ? (
                                                <span className="flex flex-col items-start gap-1">
                                                    <span>${bestStore.price}</span>
                                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
                                                        {storeDisplayNames[bestStore.name] || bestStore.name} ({bestStore.stock})
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
                                    <td className="p-4 border-r border-dashed bg-white">{product.Timestamp}</td>
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
                                
                                {expandedRows.includes(product.ID) && (   
                                    <tr className="bg-gray-100">
                                        <td colSpan={columns.length}>
                                            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-6 bg-white rounded-lg shadow-md relative z-50">
                                                {product.Stores
                                                    .filter((store: Store) => storeFilter === '' || storeDisplayNames[store.name] === storeFilter)
                                                    .map((store: Store, index: number) => (
                                                        <div key={index} className="relative w-full h-12 rounded-lg overflow-visible shadow-md border border-gray-300 hover:border-blue-500 hover:scale-105 transition-transform duration-200">
                                                            <a
                                                                href={store.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block w-full h-full group"
                                                            >
                                                                {store.name === "TRAVELLING_MAN" ? (
                                                                    <img src={traveling_man} alt="Travelling Man Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "FIRESTORM_GAMES" ? (
                                                                    <img src={firestorm} alt="Firestorm Games Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "WAYLAND_GAMES" ? (
                                                                    <img src={wayland} alt="Wayland Games Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "ELEMENT_GAMES" ? (
                                                                    <img src={element_games} alt="Element Games Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "GOBLIN_GAMES" ? (
                                                                    <img src={goblin_games} alt="Goblin Games Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "WARLORD_WORKSHOP" ? (
                                                                    <img src={warlord_workshop} alt="Warlord Workshop Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "MARIONVILLE_GAMES" ? (
                                                                    <img src={marionville_games} alt="Marionville Games Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "4tk_links" ? (
                                                                    <img src={fourtk_links} alt="4tk Links Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "HOBBY_WORKSHOP" ? (
                                                                    <img src={hobby_workshop} alt="Hobby Workshop Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "MAGIC_MADHOUSE" ? (
                                                                    <img src={magic_madhouse} alt="Magic Madhouse Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "MIGHTY_MEELE" ? (
                                                                    <img src={mighty_meele} alt="Mighty Meele Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "BEANIE_GAMES" ? (
                                                                    <img src={beanie_games} alt="Beanie Games Logo" className="w-full h-full object-contain" />
                                                                ) : store.name === "GAMES_WORKSHOP" ? (
                                                                    <img src={games_workshop} alt="Games Workshop Logo" className="w-full h-full object-contain" />
                                                                ) : (
                                                                    <FaLink className="text-xl text-blue-500 w-full h-full flex items-center justify-center" />
                                                                )}

                                                                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg p-4 border border-blue-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-[9999]">
                                                                    <p className="text-lg font-semibold">{storeDisplayNames[store.name] || store.name}</p>
                                                                    {store.image && <img src={store.image} alt="Product Image" className="w-40 h-60 object-cover mx-auto my-2 rounded-md border" />}
                                                                    <p className="text-sm text-gray-600">Price: ${store.price}</p>
                                                                    <p className={`text-sm ${store.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                                        Stock: {store.stock > 0 ? `${store.stock} available` : 'Out of stock'}
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    ))}
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