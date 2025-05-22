import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
// import { productData } from './data'; 
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
import { createPortal } from 'react-dom';


interface Store {
    name: string;
    stock: number;
    price: number;
    link: string;
    image?: string; // Optional if not all stores have an image
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
    const [columns, setColumns] = useState([
        'ID', 'ASIN', 'Title','Image','Amazon Link','Weight(grams)','ROI %','Buybox(Current)','Product Cost',
        'Best Price ($)','Profit','Sales Rank(Day drops)','FBA seller(LIVE)','Historic FBA sellers'
        ,'FBA fees','Referal fee %','Saturation Score','Total Stock','Stores'
    ]);
    const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(columns.length).fill(true));
    const [productData, setProductData] = useState<any[]>([]);
    const tableRef = useRef<any>(null);
    const currentPageLengthRef = useRef<number>(10);
    const currentPageRef = useRef<number>(0);
    const tableInitialized = useRef<boolean>(false);

    // Function to render expanded content
    const renderExpandedContent = useCallback((product: any, storeFilter: string) => {
        let content = '';
        
        // Filter stores based on store filter - fixing the store filter matching
        const filteredStores = product.Stores
            .filter((store: Store) => {
                // If no filter, show all stores
                if (storeFilter === '') return true;
                
                // Match store name with the filter
                const storeName = storeDisplayNames[store.name] || store.name;
                return storeName === storeFilter;
            });
            
        // Show message if no stores match the filter
        if (filteredStores.length === 0) {
            return `<div class="col-span-full p-4 text-center text-gray-500">No stores match the selected filter</div>`;
        }
        
        // Generate HTML for each store
        filteredStores.forEach((store: Store) => {
            let storeImage = '';
            if (store.name === "TRAVELLING_MAN") storeImage = traveling_man;
            else if (store.name === "FIRESTORM_GAMES") storeImage = firestorm;
            else if (store.name === "WAYLAND_GAMES") storeImage = wayland;
            else if (store.name === "ELEMENT_GAMES") storeImage = element_games;
            else if (store.name === "GOBLIN_GAMES") storeImage = goblin_games;
            else if (store.name === "WARLORD_WORKSHOP") storeImage = warlord_workshop; 
            else if (store.name === "MARIONVILLE_GAMES") storeImage = marionville_games;
            else if (store.name === "4tk_links") storeImage = fourtk_links;
            else if (store.name === "HOBBY_WORKSHOP") storeImage = hobby_workshop;
            else if (store.name === "MAGIC_MADHOUSE") storeImage = magic_madhouse;
            else if (store.name === "MIGHTY_MEELE") storeImage = mighty_meele;
            else if (store.name === "BEANIE_GAMES") storeImage = beanie_games;
            else if (store.name === "GAMES_WORKSHOP") storeImage = games_workshop;
            
            const storeHTML = `
                <div class="relative w-full h-12 rounded-lg overflow-visible shadow-md border border-gray-300 hover:border-blue-500 hover:scale-105 transition-transform duration-200">
                    <a href="${store.link}" target="_blank" rel="noopener noreferrer" class="block w-full h-full group">
                        ${storeImage ? `<img src="${storeImage}" alt="${storeDisplayNames[store.name] || store.name} Logo" class="w-full h-full object-contain" />` : 
                        `<div class="text-xl text-blue-500 w-full h-full flex items-center justify-center"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg></div>`}
                        
                        <div
                            class="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg p-4 border border-blue-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-[9999]"
                            style="box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); padding: 8px; margin-top: 5px;"
                        >
                            <p class="text-lg font-semibold">${storeDisplayNames[store.name] || store.name}</p>
                            <img src="${store.image}" alt="Product Image" class="w-40 h-60 object-cover mx-auto my-2 rounded-md border" />
                            <p class="text-sm text-gray-600">Price: $${store.price}</p>
                            <p class="text-sm ${store.stock > 0 ? 'text-green-500' : 'text-red-500'}">
                                Stock: ${store.stock > 0 ? `${store.stock} available` : 'Out of stock'}
                            </p>
                        </div>
                    </a>
                </div>
            `;
            
            content += storeHTML;
        });
        
        return content;
    }, []);

    // Handle toggle row expansion without re-initializing the table
    const toggleRowExpansion = (id: number) => {
        if (!tableRef.current) return;
        
        // Save current page settings
        if (tableRef.current) {
            currentPageLengthRef.current = tableRef.current.page.len();
            currentPageRef.current = tableRef.current.page();
        }
        
        // If row is already expanded, remove it
        if (expandedRows.includes(id)) {
            // Remove the expanded row from DOM
            $(`#expanded-row-${id}`).remove();
            
            // Update state
            setExpandedRows(prev => prev.filter(rowId => rowId !== id));
        } else {
            // Find the product
            const product = productData.find(p => p.ID === id);
            if (!product) return;
            
            // Get the current row
            const rowNode = tableRef.current.row(`#row-${id}`).node();
            if (!rowNode) return;
            
            // Create expanded row element
            const expandedContent = `
                <tr class="expanded-row" id="expanded-row-${id}">
                    <td colspan="${columns.length}">
                        <div class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-6 bg-white rounded-lg shadow-md relative z-50">
                            ${renderExpandedContent(product, storeFilter)}
                        </div>
                    </td>
                </tr>
            `;
            
            // Insert expanded row after product row
            $(rowNode).after(expandedContent);
            
            // Update state
            setExpandedRows(prev => [...prev, id]);
        }
    };
    
    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://gws-table.onrender.com/gws/fetch');
    
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
    
    // Initialize DataTables
    useEffect(() => {
        if (productData.length === 0) return;
        
        // Only initialize once
        if (tableInitialized.current && tableRef.current) {
            // If table already initialized, just redraw
            tableRef.current.draw(false);
            return;
        }
        
        // Get saved values
        let savedPageLength = currentPageLengthRef.current;
        let savedCurrentPage = currentPageRef.current;
        
        // Destroy existing table if it exists
        if ((($.fn.DataTable as any).isDataTable) && ($.fn.DataTable as any).isDataTable('#gamesWorkshopTable')) {
            const existingTable = $('#gamesWorkshopTable').DataTable();
            savedPageLength = existingTable.page.len();
            savedCurrentPage = existingTable.page();
            existingTable.destroy();
        }
        
        // Initialize DataTable
        const table = $('#gamesWorkshopTable').DataTable({
            paging: true,
            searching: true,
            ordering: true,
            info: true,
            pageLength: savedPageLength,
            columnDefs: [
                { orderable: false, targets: [3, 4, 18] }
            ],
            scrollX: true,
            stateSave: true,
            drawCallback: function() {
                // Update refs
                const api = (this as any).api();
                currentPageLengthRef.current = api.page.len();
                currentPageRef.current = api.page();
                
                // Restore expanded rows
                expandedRows.forEach(id => {
                    // Skip if already expanded
                    if ($(`#expanded-row-${id}`).length > 0) return;
                    
                    const product = productData.find(p => p.ID === id);
                    if (!product) return;
                    
                    const rowNode = api.row(`#row-${id}`).node();
                    if (!rowNode) return;
                    
                    // Create the expanded row
                    const expandedContent = `
                        <tr class="expanded-row" id="expanded-row-${id}">
                            <td colspan="${columns.length}">
                                <div class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-6 bg-white rounded-lg shadow-md relative z-50">
                                    ${renderExpandedContent(product, storeFilter)}
                                </div>
                            </td>
                        </tr>
                    `;
                    
                    // Insert after the main row
                    $(rowNode).after(expandedContent);
                });
            },
            initComplete: function() {
                // Save table reference
                tableRef.current = (this as any).api();
                tableInitialized.current = true;
                
                // Fix for page length select menu
                const lengthMenu = $('.dataTables_length select');
                lengthMenu.on('change', function() {
                    currentPageLengthRef.current = parseInt($(this).val() as string);
                });
                
                // Apply saved settings
                setTimeout(() => {
                    if (tableRef.current) {
                        tableRef.current.page.len(savedPageLength).page(savedCurrentPage).draw('page');
                    }
                }, 0);
            }
        });
        
        // Set initial column visibility
        columns.forEach((_, index) => {
            table.column(index).visible(columnVisibility[index]);
        });
        
        // Cleanup
        return () => {
            tableInitialized.current = false;
            if (tableRef.current) {
                currentPageLengthRef.current = tableRef.current.page.len();
                currentPageRef.current = tableRef.current.page();
                tableRef.current.destroy();
                tableRef.current = null;
            }
        };
    }, [productData, renderExpandedContent]);
    
    // Update expanded rows when store filter changes
    useEffect(() => {
        if (!tableRef.current || expandedRows.length === 0) return;
        
        // Re-render all expanded rows with new store filter
        expandedRows.forEach(id => {
            const product = productData.find(p => p.ID === id);
            if (!product) return;
            
            // Update content
            const contentContainer = $(`#expanded-row-${id} td > div`);
            if (contentContainer.length > 0) {
                contentContainer.html(renderExpandedContent(product, storeFilter));
            }
        });
    }, [storeFilter, expandedRows, renderExpandedContent, productData]);

    // Handle store filter change
    const handleStoreFilterChange = (filter: string) => {
        setStoreFilter(filter);
    };

    // Update column visibility
    const toggleColumnVisibility = (columnIndex: number) => {
        if (!tableRef.current) return;
        
        // Save settings
        currentPageLengthRef.current = tableRef.current.page.len();
        currentPageRef.current = tableRef.current.page();
        
        // Toggle column
        const column = tableRef.current.column(columnIndex);
        column.visible(!column.visible());
        
        // Update state
        setColumnVisibility(prev => 
            prev.map((isVisible, idx) => idx === columnIndex ? !isVisible : isVisible)
        );
    };

    // Apply quick filters
    const applyQuickFilters = () => {
        if (!tableRef.current) return;
        
        // Save settings
        currentPageLengthRef.current = tableRef.current.page.len();
        currentPageRef.current = tableRef.current.page();
        
        const visibleColumns = [1, 2, 3, 6, 7, 9, 10, 13, 14, 15, 17, 18];

        if (!quickFilterActive) {
            columns.forEach((_, index) => {
                tableRef.current.column(index).visible(visibleColumns.includes(index));
            });
        } else {
            columns.forEach((_, index) => {
                tableRef.current.column(index).visible(true);
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
                            onChange={(e) => handleStoreFilterChange(e.target.value)}
                            value={storeFilter}
                        >
                            <option value="">All Stores</option>
                            {Object.entries(storeDisplayNames).map(([key, name]) => (
                                <option key={key} value={name}>
                                    {name}
                                </option>
                            ))}
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
                            <div key={`col-filter-${index}`} className="flex items-center gap-2 mb-2">
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
                            {columns.map((col, index) => (
                                <th className="p-4" key={`header-${index}`}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="overflow-visible">
                        {productData.map((product) => (
                            <tr key={`product-row-${product.ID}`} id={`row-${product.ID}`} className="relative">
                                <td className="p-4 border-r border-dashed bg-gray-50 rounded-l-lg">{product.ID}</td>
                                <td className="p-4 border-r border-dashed bg-white">{product.ASIN}</td>
                                <td className="p-4 border-r border-dashed bg-gray-50">{product.Title}</td>
                                <td className="p-4 border-r border-dashed bg-white relative group ">
                                    <img
                                        src={product.Image}
                                        alt={product.Title}
                                        className="w-8 h-12 rounded-md cursor-pointer"
                                    />
                                    <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg p-2 rounded-lg z-[9999] w-64 top-14 left-0">
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;