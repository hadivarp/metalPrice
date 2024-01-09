import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [priceList, setPriceList] = useState([]);
  const [multipliedRates, setMultipliedRates] = useState([]);

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
            price: rate.toFixed(2), // Adjust the precision as needed
          })
        );

        // Set the priceList state with the extracted data
        setPriceList(extractedPrices);

        // Extract data from multipliedRates object
        const multipliedRatesData = Object.entries(data.multipliedRates).map(
          ([currency, rate]) => ({
            name: currency,
            price: rate.toFixed(2)
          })
        );

        // Set the multipliedRates state with the extracted data
        setMultipliedRates(multipliedRatesData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

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
              <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
            </form>

          </div>
        </div>
      </header>

      <body>
      <div className="container">
        <h2>Price List</h2>
        <p>Price list in global market:</p>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {priceList.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
          </tbody>
        </table>


        <p>persian markets:</p>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {multipliedRates.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      </body>
    </>
  );
}

export default App;
