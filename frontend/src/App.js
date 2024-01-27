import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [priceList, setPriceList] = useState([]);
  const [multipliedRates, setMultipliedRates] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentMarket, setCurrentMarket] = useState("en"); // Default to global market
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract currency names and prices from the rates object
        const extractedPrices = Object.entries(data.requestData.rates).map(
          ([currency, rate]) => ({
            name: currency,
            price: rate.toFixed(2),
          })
        );

        // Set the priceList state with the extracted data
        setPriceList(extractedPrices);

        // Extract data from multipliedRates object
        const multipliedRatesData = Object.entries(data.multipliedRates).map(
          ([currency, rate]) => ({
            name: currency,
            price: rate.toFixed(2),
          })
        );

        // Set the multipliedRates state with the extracted data
        setMultipliedRates(multipliedRatesData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const itemsPerPage = 10;

  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = currentMarket === "fa" ? multipliedRates : priceList;
  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentDataPage = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber * itemsPerPage >= filteredData.length) return;
    setPageNumber(pageNumber + 1);
  };

  const toggleMarket = () => {
    setCurrentMarket((prevMarket) => (prevMarket === "en" ? "fa" : "en"));
    setPageNumber(1); // Reset page number when toggling market
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(1); // Reset page number when changing search term
  };

  return (
    <>
      <header className="p-3 mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                <use href="#bootstrap"></use>
              </svg>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="http://localhost" className="nav-link px-2 link-body-emphasis">Metal Market</a></li>
            </ul>

            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <div className="input-group">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" value={searchTerm} onChange={handleSearch} />
                <button className="btn btn-primary" type="button" onClick={toggleMarket}>
                  {currentMarket === "fa" ? "فارسی" : "English"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </header>

      <body>
      <div className="container">
        <h2>{currentMarket === "fa" ? "Persian Markets" : "Price List"}</h2>
        <p>{currentMarket === "fa" ? "Price list in Persian markets:" : "Price list in global market:"}</p>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {currentDataPage.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="pagination">
          <button className="btn btn-primary" onClick={handlePrev} disabled={pageNumber === 1}>
            Prev
          </button>
          {/*<span className="mx-2">Page {pageNumber}</span>*/}
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={pageNumber * itemsPerPage >= filteredData.length}
          >
            Next
          </button>
        </div>
      </div>
      </body>
    </>
  );
}

export default App;
