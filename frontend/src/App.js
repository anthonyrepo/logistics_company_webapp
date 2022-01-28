import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddInventory from './components/add-inventory.js'
import InventoryList from './components/inventory-list.js'
import Inventory from './components/inventory.js';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/inventory" classname="navbar-brand">
          Inventory
        </a>
        {/* <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to={"/inventory"} className="nav-link">
              Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/inventory"} className="nav-link">
              Inventory
            </Link>
          </li>
        </div> */}
      </nav>
    </div>
  );
}

export default App;
