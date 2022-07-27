import Cupcake from "@components/Cupcake";
import axios from "axios";
import {useState, useEffect} from "react";

function CupcakeList() {
  const [cupcake, setCupcake] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [accessoryFilter, setAccessoryFilter] = useState("");
  const handleAccessoryFilter = () => {
    setAccessoryFilter(!accessoryFilter);
  };

// Step 1: get all cupcakes
  useEffect(()=> {
    axios.get("http://localhost:4000/cupcakes")
        .then(response => response.data)
        .then(data => setCupcake(data))
}, []);

  // Step 3: get all accessories

  useEffect(()=> {
    axios.get("http://localhost:4000/accessories")
    .then(response => response.data)
    .then(data => setAccessory(data))
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          {/* Step 4: add an option for each accessory */}
          <select id="cupcake-select" onChange={(e)=> setAccessoryFilter(e.target.value)}>
            <option value="">---</option>
            <option value="1">Cherry</option>
            <option value="2">Donut</option>
            <option value="3">Chocolate</option>
            <option value="4">Wild</option>
            <option value="5">Christmas Candy</option>
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcake && cupcake
        .filter((cupcake)=> !accessoryFilter || cupcake.accessory_id === accessoryFilter)
        .map(cupcake => (
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake key={cupcake.id} cupcake = {cupcake} />
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;