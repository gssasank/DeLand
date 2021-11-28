import React from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import { PolygonLayer } from "@deck.gl/layers";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import funcM from "./MoralisFunctions";

function Map(props) {
  const { user } = useMoralis();
  const [buylist, setBuylist] = useState([]);
  const [ownedlist, setOwnedlist] = useState([]);
  const [adminlist, setAdminlist] = useState([]);

  useEffect(() => {
    console.log(props.user);
    if (user) {
      funcM.getSellList(user.attributes.username).then(function (result) {
        console.log("inbuylist");
        setOwnedlist(result);
        console.log(result);
      });
      funcM.getBuyList().then(function (result) {
        console.log("inbuylist");
        setBuylist(result);
        console.log(result);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log(props.user);
    if (props.user === "admin") {
      funcM.getAllLand().then(function (result) {
        console.log("inAdminList");
        setAdminlist(result);
        console.log(result);
      });
    }
  }, []);

  const [ishover, setIshover] = useState(0);

  const layer1 = new PolygonLayer({
    id: "polygon-layer",
    data: buylist,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,

    onHover: (info, event) => {
      try {
        if (info.object !== undefined) {
          setIshover(1);
        } else setIshover(0);
      } catch (err) {
        console.log(err);
      }
    },

    onClick: (info, event) => {
      try {
        if (info.object !== undefined) {
        }
      } catch (err) {
        console.log(err);
      }
    },
    getPolygon: (d) => d.contour,
    getElevation: 4000,
    getFillColor: [60, 140, 233, 140],
    getLineColor: [80, 80, 80],
    getLineWidth: 1,
  });
  const layer2 = new PolygonLayer({
    id: "polygon-layer",
    data: ownedlist,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,

    onHover: (info, event) => {
      try {
        if (info.object !== undefined) {
          setIshover(1);
        } else setIshover(0);
      } catch (err) {
        console.log(err);
      }
    },
    onClick: (info, event) => {
      try {
        if (info.object !== undefined) {
        }
      } catch (err) {
        console.log(err);
      }
    },

    getPolygon: (d) => d.contour,
    getElevation: 4000,
    getFillColor: [220, 20, 60, 140],
    getLineColor: [80, 80, 80],
    getLineWidth: 1,
  });
  const layer3 = new PolygonLayer({
    id: "polygon-layer",
    data: adminlist,
    pickable: true,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,

    onHover: (info, event) => {
      try {
        if (info.object !== undefined) {
          setIshover(1);
        } else setIshover(0);
      } catch (err) {
        console.log(err);
      }
    },

    onClick: (info, event) => {
      try {
        if (info.object !== undefined) {
        }
      } catch (err) {
        console.log(err);
      }
    },
    getPolygon: (d) => d.contour,
    getElevation: 4000,
    getFillColor: [50, 140, 0, 140],
    getLineColor: [80, 80, 80],
    getLineWidth: 1,
  });
  return (
    <div class="flex-1 flex flex-col  h-full  relative">
      <DeckGL
        initialViewState={{
          longitude: 75.87312698364258,
          latitude: 22.604027317886707,
          zoom: 13,
        }}
        height="100%"
        width="100%"
        layers={[layer1, layer2, layer3]}
        controller={true}
        getCursor={() => (ishover === 0 ? "grab" : "pointer")}
        getTooltip={({ object }) => {
          try {
            if (object !== undefined) {
              return {
                html: `<div class="shadow-lg rounded-xl max-w-xs p-2 px-4 bg-white  relative overflow-hidden">
                                <a href="#" class="w-full h-full block">
                                    <div class="w-full">
                                        <p class="text-gray-800 text-lg font-medium mb-1">
                                        ${object.land_description}
                                        </p>
                                        <p class="text-gray-400 text-xs font-medium mb-1">
                                        ${object.plot_size}
                                        </p>
                                        <p class="text-gray-400  text-sm ">
                                        ${object.land_type}
                                        </p>
                                        
                                    </div>
                                </a>
                            </div>`,
                style: {
                  backgroundColor: "transparent",
                  fontSize: "0.8em",
                },
              };
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        ></StaticMap>
      </DeckGL>
    </div>
  );
}

export default Map;
