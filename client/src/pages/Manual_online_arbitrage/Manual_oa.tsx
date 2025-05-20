import { useEffect, useState } from 'react';
import {
  FaAmazon, FaCartPlus, FaFilter, FaBox,
  FaChartLine, FaDollarSign
} from 'react-icons/fa';
import $ from 'jquery';
import DataTable from 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-responsive';

interface GoogleLink {
  url: string;
  price: string;
  Profit: number | string;
  ROI: number | string;
}

interface APIItem {
  ASIN: string;
  TITLE: string;
  "Buy Box Current": string;
  "Sales Rank: 30 days drop %": number;
  top_google_links: GoogleLink[];
}

interface DisplayRow {
  asin: string;
  title: string;
  buyBox: string;
  salesRank: number;
  storePrice: string;
  storeProfit: string;
  storeROI: string;
  storeLink: string;
}

const Table = () => {
  const [data, setData] = useState<DisplayRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [quickFilterActive, setQuickFilterActive] = useState(false);
  const [columns, setColumns] = useState([
    'ASIN', 'Title', 'KeepaPrice', 'Store Price', 'Store Links', 'ROI', 'Profit'
  ]);
  const [columnVisibility, setColumnVisibility] = useState<boolean[]>(Array(columns.length).fill(true));
  const [originalColumnVisibility, setOriginalColumnVisibility] = useState<boolean[]>([...columnVisibility]);
  const [asinInput, setAsinInput] = useState("");
  const [keepaMarketplace, setKeepaMarketplace] = useState("");
  const [googleMarketplace, setGoogleMarketplace] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmitAsins = async () => {
    if (!asinInput.trim()) return alert("Please enter some ASINs");
    if (!keepaMarketplace || !googleMarketplace) return alert("Please select both marketplaces");
    if (!currency) return alert("Please enter the recent currency factor");

    const asinList = asinInput.split("\n").map(asin => asin.trim()).filter(Boolean);
    const payload = {
      asins: asinList,
      keepa_marketplace: keepaMarketplace,
      google_marketplace: googleMarketplace,
      currency_factor: parseFloat(currency),
    };

    try {
      setLoading(true);
      // const response = await fetch('http://localhost:5000/api/submit-asins',
        const response = await fetch('https://revenue-root-1.onrender.com/api/submit-asins',
         {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!result.success) return alert("Failed to submit ASINs: " + result.message);

      const filteredRows: DisplayRow[] = [];

      result.data.forEach((item: APIItem) => {
        item.top_google_links.forEach((link: GoogleLink) => {
          const roi = parseFloat(link.ROI as string);
          if (!isNaN(roi) && roi > 12) {
            filteredRows.push({
              asin: item.ASIN,
              title: item.TITLE,
              buyBox: `$${item["Buy Box Current"]}`,
              salesRank: item["Sales Rank: 30 days drop %"],
              storePrice: link.price,
              storeProfit: typeof link.Profit === 'number' ? `$${link.Profit.toFixed(2)}` : link.Profit,
              storeROI: `${roi.toFixed(2)}%`,
              storeLink: link.url
            });
          }
        });
      });

      setData(filteredRows);
      alert("ASINs submitted successfully!");
      setAsinInput("");

    } catch (error) {
      console.error('❌ Error submitting ASINs:', error);
      alert("Error submitting ASINs");
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = data.length;

  const averageRoi = totalProducts
    ? (
      data.reduce((sum, product) => {
        const roi = parseFloat(product.storeROI.replace('%', ''));
        return sum + (isNaN(roi) ? 0 : roi);
      }, 0) / totalProducts
    ).toFixed(2)
    : "0.00";

  const averageProfit = totalProducts
    ? (
      data.reduce((sum, product) => {
        const profit = parseFloat(product.storeProfit.replace('$', ''));
        return sum + (isNaN(profit) ? 0 : profit);
      }, 0) / totalProducts
    ).toFixed(2)
    : "0.00";

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: <FaBox className="text-green-500 text-4xl" /> },
    { label: 'Average ROI', value: `${averageRoi}%`, icon: <FaChartLine className="text-blue-500 text-4xl" /> },
    { label: 'Average Profit', value: `$${averageProfit}`, icon: <FaDollarSign className="text-yellow-500 text-4xl" /> }
  ];

  useEffect(() => {
    if (!loading && data.length > 0) {
      const $table = $('#automaticOaTable');
      if ($.fn.dataTable.isDataTable($table)) {
        $table.DataTable().destroy();
      }
      $table.DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        scrollX: true,
        columnDefs: [{ orderable: false, targets: [3, 4] }]
      });
    }
  }, [data, loading]);

  const toggleColumnVisibility = (columnIndex: number) => {
    setColumnVisibility((prev) =>
      prev.map((isVisible, idx) => (idx === columnIndex ? !isVisible : isVisible))
    );
  };

  const applyQuickFilters = () => {
    if (!quickFilterActive) {
      const visibleColumns = [1, 2, 3, 4, 5, 6];
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
        <h1 className="text-4xl font-bold text-gray-800">Manual Online Arbitrage Data Page!</h1>

        <div className="mt-6 text-left">
            <textarea
            value={asinInput}
            onChange={(e) => setAsinInput(e.target.value)}
            placeholder="Enter Your ASINs here..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
            />

            {/* Currency Input Field */}    
            <div className="mt-4">
                <label htmlFor="currency" className="text-gray-700 font-medium mb-1 block">
                    Currency
                </label>
                <input
                    type="number" // ✅ change here
                    id="currency"
                    step="0.01"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder="e.g. 1.23"
                    className="w-1/4 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Keepa Marketplace</label>
                <select
                value={keepaMarketplace}
                onChange={(e) => setKeepaMarketplace(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Select a marketplace</option>
                <option value="1-com">1-com</option>
                <option value="2-co.uk">2-co.uk</option>
                <option value="3-de">3-de</option>
                <option value="4-fr">4-fr</option>
                <option value="5-co.jp">5-co.jp</option>
                <option value="6-ca">6-ca</option>
                <option value="8-it">8-it</option>
                <option value="9-es">9-es</option>
                <option value="10-in">10-in</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Google Marketplace</label>
                <select
                value={googleMarketplace}
                onChange={(e) => setGoogleMarketplace(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">Select a marketplace</option>
                <option value="com">com</option>
                <option value="co.uk">co.uk</option>
                <option value="de">de</option>
                <option value="fr">fr</option>
                <option value="co.jp">co.jp</option>
                <option value="ca">ca</option>
                <option value="it">it</option>
                <option value="es">es</option>
                <option value="in">in</option>
                </select>
            </div>
            </div>

            <div className="mt-4">
            <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleSubmitAsins}
            >
                Submit ASINs
            </button>
            </div>
        </div>
        </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 mb-12">
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
        <h2 className="text-3xl font-bold text-gray-800">Online Arbitrage Data Table</h2>
        <div className="flex gap-4">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition ${quickFilterActive ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-blue-500 border border-blue-500'}`}
            onClick={applyQuickFilters}
          >
            <FaFilter />
            Apply Quick Filters
          </button>
          <button
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="text-gray-700" />
            Filters
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table id="automaticOaTable" className="stripe hover" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>ASIN</th>
              <th>Title</th>
              <th>Keepa Price</th>
              <th>Store Price</th>
              <th>Store Link</th>
              <th>ROI</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.asin}</td>
                <td>{row.title}</td>
                <td>{row.buyBox}</td>
                <td>{row.storePrice}</td>
                <td><a href={row.storeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Link</a></td>
                <td>{row.storeROI}</td>
                <td>{row.storeProfit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
