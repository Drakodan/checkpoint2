import Cupcake from "../components/Cupcake";
import axios from "axios";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function CupcakeList() {
  const [cupcake, setCupcake] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [accessoryFilter, setAccessoryFilter] = useState("");

// Step 1: get all cupcakes
  useEffect(() => {
    axios
      .get("http://localhost:4000/cupcakes")
      .then((response => response.data))
      .then((data) => setCupcake(data));
}, []);

  // Step 3: get all accessories

  useEffect(() => {
    axios
      .get("http://localhost:4000/accessories")
      .then((response => response.data))
      .then((data) => setAccessory(data));
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by
          {/* Step 4: add an option for each accessory */}
          <select 
            id="cupcake-select"
            onChange={(e) => setAccessoryFilter(e.target.value)}
            >
            <option value="">---</option>
            {accessory.map((cake) => (
              <option value={cake.id}>{cake.name}</option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcake &&
           cupcake
        .filter(
          (item)=>
           !accessoryFilter || item.accessory_id === accessoryFilter)
        .map((item) => (
          <li className="cupcake-item" key={item.id}>
            <Link to={`/cupcake/${item.id}`} >
              <Cupcake key={item.id} cupcake = {item} />
            </Link>
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;