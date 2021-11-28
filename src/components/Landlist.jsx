import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import funcM from "./MoralisFunctions";
import Landcard from "./Landcard";

function Landlist() {
  const { user } = useMoralis();
  const [userdata, setUserdata] = useState({});
  const [buylist, setBuylist] = useState([]);

  useEffect(() => {
    if (user) {
      funcM.getBuyList().then(function (result) {
        setBuylist(result);
      });

      funcM.getUserData(user.id).then(function (result) {
        setUserdata(result);
      });
    }
  }, [user]);

  const getuser = () => {
    if (user) {
      return user.attributes.username;
    }
    return "";
  };

  return (
    <div class="flex-1 flex flex-col  h-full bg-black p-5 overflow-auto">
      <h1 class="text-white text-2xl md:text-3xl font-bold text-left mb-4">
        Land Owned{" "}
        <span className="text-white text-opacity-50">#{getuser()}</span>
      </h1>

      {userdata ? (
        userdata.property_owned ? (
          userdata.property_owned.map((property) => {
            return (
              <Link to={`/dashboard/landdetes?landid=${property}&who=seller`}>
                <Landcard land_id={property} />{" "}
              </Link>
            );
          })
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )}

      <div class="flex justify-center items-center relative my-5 ">
        <span class="h-px bg-gray-300 absolute inset-x-0"></span>
      </div>
      <h1 class="text-white text-2xl md:text-3xl font-bold text-left mb-4">
        Buy Land
      </h1>
      {buylist ? (
        buylist.map((property) => {
          const who =
            user.attributes.username === property.current_owner
              ? "delete"
              : "buyer";

          return (
            <Link
              to={`/dashboard/landdetes?landid=${property.land_id}&who=${who}`}
            >
              <Landcard land_id={property.land_id} />{" "}
            </Link>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Landlist;
