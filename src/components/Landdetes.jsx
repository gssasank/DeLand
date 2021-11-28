import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Chart from "./Chart";
import funcM from "./MoralisFunctions";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useForm } from "./useForm";
import { useHistory } from "react-router-dom";

import queryString from "query-string";

function Landdetes({ location }) {
  const [values, handleChange] = useForm({ price: 0 });
  const [land, setland] = useState({});
  const [usertype, setUsertype] = useState("");
  const [senderId, setSenderId] = useState("");
  const [qtprice, setQtprice] = useState("");
  let history = useHistory();

  const { user } = useMoralis();
  queryString.parse(location.search);

  useEffect(() => {
    const printAddress = async () => {
      setUsertype(queryString.parse(location.search).who);
      const a = await funcM
        .getLandData(queryString.parse(location.search).landid)
        .then(function (result) {
          return result;
        });
      setland(a);
      if (land.current_owner) {
        const b = await funcM
          .getUserId(land.current_owner)
          .then(function (result) {
            return result;
          });
        setSenderId(b);
        console.log(b);
      }
      if (land.land_id) {
        const c = await funcM.getQtPrice(land.land_id).then(function (result) {
          return result;
        });
        setQtprice(c);
        console.log(c);
      }
    };
    printAddress();
  }, [land.current_owner]);

  const handleSell = () => {
    if (values) {
      funcM.flipBuyStatusTrue(queryString.parse(location.search).landid);
      funcM.setQtPrice(queryString.parse(location.search).landid, values.price);
    }
  };
  const handleWithdraw = () => {
    const ID = queryString.parse(location.search).landid;
    if (ID) {
      funcM.flipBuyStatusFalse(ID);
      funcM.takeLandDestroyTransaction(ID);
    }
  };

  const handleBuy = () => {
    if (values && user) {
      const transdetes = {
        sender: senderId,
        receiver: user.id,
        amount: Number(values.price),
        land_id: queryString.parse(location.search).landid,
        status: "pending",
      };
      funcM.defineNewTransaction(transdetes);

      history.push("/dashboard");
    }
  };

  return (
    <div class="flex-1 flex flex-col  h-full p-0  ">
      <div class="bg-black   bg-opacity-95 h-full flex-col  overflow-auto ">
        <div class="max-w-full shadow overflow-hidden px-4">
          <div class="">
            <dl>
              <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">
                  Land Description
                </dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  {land ? land.land_description : ""}
                </dd>
              </div>
              <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">Sub-division</dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  {land ? land.sub_division : ""}
                </dd>
              </div>
              <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">Owner</dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  {land ? land.current_owner : "lol"}
                </dd>
              </div>
              <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">Plot Size</dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  {land ? land.plot_size : "lol"}
                </dd>
              </div>
              <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">Land Type</dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  {land ? land.land_type : ""}
                </dd>
              </div>
              <div class="bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">Current Value</dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  ₹ {land ? land.current_value : "lol"}
                </dd>
              </div>
              <div class=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-100">
                  Date land owned
                </dt>
                <dd class="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                  {land ? land.date_land_owned : "lol"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 mt-12">
          <div className=" p-2 mx-auto bg-back-dark rounded-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-200 bg-back-dark rounded-lg hover:bg-primary-dark hover:bg-opacity-90 hover:text-primary-light focus:outline-none ">
                    <span>Land History</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 `}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2  ">
                    <table class="min-w-full divide-y divide-back-dark rounded-2xl ">
                      <thead class="bg-back-med   ">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium rounded-l-lg text-gray-200 uppercase tracking-wider"
                          >
                            Owner
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                          >
                            Date owned
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium rounded-r-lg text-gray-200 uppercase tracking-wider"
                          >
                            Bought for
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-back-dark divide-y divide-back-dark">
                        {land.land_history ? (
                          land.land_history.map((historydata) => {
                            return (
                              <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                  {historydata.owner}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                  {historydata.date_owned}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                  {historydata.bought_for}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <div></div>
                        )}
                      </tbody>
                    </table>
                    <Chart history={land ? land.land_history : []} />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>

        {usertype ? (
          usertype === "seller" ? (
            <div class="flex flex-col  gap-4 p-12">
              <div class="w-full  p-4">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="h-full flex justify-between items-center text-gray-100 gap-4"
                >
                  <span class="text-lg font-bold pr-10">Sell for :</span>
                  <div>
                    <input
                      type="number"
                      className="w-full h-9 bg-back-dark rounded border bg-opacity-40 border-back-light focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                    ></input>
                  </div>
                </form>
              </div>
              <button
                onClick={handleSell}
                class="inline-block bg-primary-med hover:bg-primary-light active:bg-indigo-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Sell
              </button>
            </div>
          ) : usertype === "buyer" ? (
            <div class="flex flex-col  gap-4 p-12">
              <div class="w-full  p-4 pb-0">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="h-full flex justify-between items-center text-gray-100 gap-4"
                >
                  <span class="text-lg font-bold pr-10">Quoted price :</span>
                  <span class="text-lg font-semibold pr-3">{qtprice}</span>
                </form>
              </div>
              <div class="w-full  p-4">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="h-full flex justify-between items-center text-gray-100 gap-4"
                >
                  <span class="text-lg font-bold pr-10">Buy for :</span>
                  <div>
                    <input
                      type="number"
                      className="w-full h-9 bg-back-dark rounded border bg-opacity-40 border-back-light focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                    ></input>
                  </div>
                </form>
              </div>
              <button
                onClick={handleBuy}
                class="inline-block bg-primary-med hover:bg-primary-light active:bg-indigo-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Buy
              </button>
            </div>
          ) : usertype === "delete" ? (
            <div class="flex flex-col  gap-4 p-12">
              <button
                onClick={handleWithdraw}
                class="inline-block bg-primary-med hover:bg-primary-light active:bg-indigo-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Withdraw
              </button>
            </div>
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Landdetes;
