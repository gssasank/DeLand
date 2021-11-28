import funcM from "./MoralisFunctions";
import React, { useState, useEffect } from "react";

function Landcard(props) {
  const [land, setland] = useState({});

  useEffect(() => {
    const printAddress = async () => {
      const a = await funcM.getLandData(props.land_id).then(function (result) {
        return result;
      });
      setland(a);
    };
    printAddress();
  }, []);

  return (
    <div class="flex flex-row overflow-hidden border border-back-dark bg-back-dark hover:bg-primary-dark shadow-xl rounded-lg p-2 px-6 mb-4 ">
      <div class="flex flex-1 flex-col overflow-hidden">
        <h3 class="text-lg  text-gray-200 font-semibold mb-2 text-left">
          {land ? land.land_description : ""}
          {/* land description */}
        </h3>
        <p class="text-gray-200 mb-1 text-left">
          {land ? land.sub_division : ""}
        </p>
        <p class="text-gray-400 mb-1 text-left">{land ? land.land_type : ""}</p>
      </div>
      <div class="flex flex-1 flex-col overflow-hidden ">
        <p class=" mb-1  text-gray-200 text-right">
          ₹ {land ? land.current_value : "lol"}
        </p>
        <p class="mb-1 text-gray-200 text-right">
          {land ? land.plot_size : "lol"}
        </p>
        <p class="text-gray-400 mb-1 text-right">
          {land ? land.current_owner : "lol"}
        </p>
      </div>
    </div>
  );
}
export default Landcard;
