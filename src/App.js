import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { Alert } from 'react-bootstrap';
// import MyAlert from "./components/Alertoast.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [med, setMed] = useState([]);
  const [show, setShow] = useState(true);
  const [err,seterr] = useState(false);

  const fetchmedical = async () => {

    try{
      const { data } = await axios.get("https://dev.dashmed.in/sample-data");
      console.log(data);
      setMed(data.data);
    }
    catch(e){
      console.log(e);
      seterr(true);
    }

    
  };

  useEffect(() => {
    fetchmedical();

    const timer = setTimeout(() => {
      // console.log('This will run after 1 second!')
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  },[]);

  function showToast() {
    setShow(true);
  }


  return (
    <div className="App">
      <h1 className="text-4xl bg-purple-300 pb-10 pt-4">Devsi's Dispensary</h1>

<div className="-mt-2 -mb-4">
      {show && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>List item clicked!</Alert.Heading>
          {/* <p>
          List item clicked.
          </p> */}
        </Alert>
      )}
      </div>

<div className="text-left w-full">
		<div className="bg-black flex text-white w-full px-10">
			<div className="flex w-full">
				<div className="text-lg p-4 w-1/3">Medicine Name</div>
				<div className="text-lg p-4 w-1/3">Salt Name</div>


				{/* <div className="text-lg p-4 w-1/3">Manufacturer</div> */}
        <div className="text-lg p-4 w-1/3">Others</div>
			</div>
		</div>
		<div className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{height:590}}>

      {
        err && (
          <div>Request failed with status code 404</div>
        )
      }
{med.map((info,ind) => {
  return (
    <div
      key={ind}
      className="bg-grey-light flex flex-col items-center justify-between w-full px-10 hover:bg-green-100 cursor-pointer bg-purple-100 border-b"
    > 

			<div className="flex w-full" onClick={showToast}>
				<div className="p-4 w-1/3 text-purple-900 font-bold">{info.medName}</div>
				<div className="p-4 w-1/3 text-purple-900">{info.saltName}</div>
				{/* <div className="p-4 w-1/3 text-purple-900">{info.manufacturer}</div> */}
        {
        Object.keys(info).map(function(key) {
    // console.log(key, info[key]);
       return (
         key!="medName" && key!="saltName" && (
          <div className="p-4 w-1/3 text-purple-900">{key}:{info[key]}</div>))
})
}
			</div>
      

      </div>
  )
})}
</div>
      </div>
    </div>
  );
}

export default App;
