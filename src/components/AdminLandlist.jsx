import React, { useState, useEffect } from "react";
import funcM from "./MoralisFunctions";
import { Link } from "react-router-dom";
import Landcard from "./Landcard";

function AdminLandlist() {
  const [landlist, setLandlist] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API

    // setUserdata(funcM.getUserData(user.id).then((value) => value));
    // const temp = userdata.user_id;
    funcM.getAllLandId().then(function (result) {
      setLandlist(result);
    });
  }, []);

  return (
    <div class="flex-1 flex flex-col  h-full bg-black p-5 overflow-auto">
      <h1 class="text-white text-2xl md:text-3xl font-bold text-left mb-10">
        Lands <span className="text-white text-opacity-50">#admin</span>
      </h1>

      {landlist ? (
        landlist.map((id) => (
          <Link to={`/admindashboard/landdetes?landid=${id}&who=admin`}>
            <Landcard land_id={id} />{" "}
          </Link>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default AdminLandlist;
