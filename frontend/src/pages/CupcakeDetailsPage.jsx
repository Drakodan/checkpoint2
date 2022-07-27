import { useParams } from "react-router";
import React, { useState, useEffect} from "react";
import axios from "axios";
import Cupcake from "@components/Cupcake";


function CupcakeDetails() {
    const {id} = useParams();
    const [cupcakeDetails, setCupcakeDetails] = useState([]);

    useEffect(()=> {
        axios
        .get(`http://localhost:4000/cupcakes/${id}`)
        .then((cupcake)=> setCupcakeDetails(cupcake.data));
    }, []);

    return <Cupcake cupcake={cupcakeDetails} />;
}

export default CupcakeDetails;