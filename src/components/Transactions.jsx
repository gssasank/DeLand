/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import funcM from "./MoralisFunctions";
import { useHistory } from "react-router-dom";

function TransactionCards(props) {
  const [userdata, setUserdata] = useState({});
  const [land, setland] = useState({});
  let history = useHistory();

  useEffect(() => {
    if (props.transactionDetails) {
      funcM
        .getUserData(props.transactionDetails.receiver)
        .then(function (result) {
          setUserdata(result);
        });

      funcM
        .getLandData(props.transactionDetails.land_id)
        .then(function (result) {
          setland(result);
        });
    }
  }, [props.transactionDetails]);

  const handleAccept = async () => {
    if (props.transactionDetails) {
      console.log(props.transactionDetails);
      await funcM.userApproveTransaction(props.transactionDetails.objectid);
      console.log("konichiwa mina san");
      history.push("/dashboard");
    }
  };
  const handleWithdrawAndDecline = async () => {
    if (props.transactionDetails) {
      console.log(props.transactionDetails);
      await funcM.userDeclineTransaction(props.transactionDetails.objectid);
      console.log("konichiwa mina san");
      history.push("/dashboard");
    }
  };

  return (
    <div class="flex flex-row  w-full bg-back-med shadow-xl rounded-lg p-2 px-6 mb-4 justify-between">
      <div class="flex  flex-col overflow-hidden text-white">
        <h3 class="text-lg  font-semibold mb-1 text-left">
          {userdata.username}
        </h3>
        <h3 class="text-base  font-semibold mb-1 text-left">
          {land.land_description}
        </h3>
        <h3 class="text-base  font-semibold mb-1 text-left">
          {props.transactionDetails.amount}
        </h3>
      </div>
      <div class="flex  flex-col overflow-hidden ">
        {props.transactionDetails.status === "pending" ? (
          props.transactionDetails.is_buyer ? (
            <div class="flex items-center justify-end gap-4 w-full mt-5 px-3">
              <button
                onClick={handleWithdrawAndDecline}
                type="button"
                class="py-2 px-4  bg-red-600 border-2 border-red-600 hover:bg-primary-med hover:border-primary-med  text-white w-full  text-center text-base font-semibold  focus:outline-none  rounded-lg "
              >
                Withdraw
              </button>
            </div>
          ) : (
            <div class="flex items-center justify-end gap-4 w-full mt-5 px-3">
              <button
                onClick={handleAccept}
                type="button"
                class="py-2 px-4   hover:bg-gray-50 text-gray-50 hover:text-black border-2  w-full  text-center text-base font-semibold focus:outline-none rounded-lg "
              >
                Accept
              </button>
              <button
                onClick={handleWithdrawAndDecline}
                type="button"
                class="py-2 px-4  bg-red-600 border-2 border-red-600 hover:bg-primary-med hover:border-primary-med  text-white w-full  text-center text-base font-semibold  focus:outline-none  rounded-lg "
              >
                decline
              </button>
            </div>
          )
        ) : props.transactionDetails.status === "Approval Pending" ? (
          <div class="flex items-center justify-end gap-4 w-full mt-5 px-3">
            <button
              type="button"
              class="py-2 px-4  bg-red-600 border-2 border-red-600 hover:bg-primary-med hover:border-primary-med  text-white w-full  text-center text-base font-semibold  focus:outline-none  rounded-lg "
            >
              Approval pending
            </button>
          </div>
        ) : (
          <div class="flex items-center justify-end gap-4 w-full mt-5 px-3"></div>
        )}
      </div>
    </div>
  );
}

function Transactions() {
  const { logout, user } = useMoralis();
  const [translist, setTranslist] = useState();
  const [refresh, setRefresh] = useState();

  const reload = () => {
    setRefresh(translist);
  };
  useEffect(() => {
    if (user) {
      funcM.getUserTransactionList(user.id).then(function (result) {
        setTranslist(result);
        console.log(result);
      });
    }
  }, [user, refresh]);
  return (
    <div class="bg-back-light  flex h-screen">
      <div class="w-full flex flex-col pb-1 md:pb-2 ">
        <header class=" flex justify-between items-center py-4 px-5 bg-black">
          <a
            href="/"
            class="inline-flex items-center text-white text-2xl md:text-3xl font-bold gap-2.5"
            aria-label="logo"
          >
            <svg
              width="95"
              height="94"
              viewBox="0 0 95 94"
              class="w-6 h-auto text-primary-light"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96 0V47L48 94H0V47L48 0H96Z" />
            </svg>
            DeLand
          </a>

          <nav class=" flex gap-12">
            <Link to={`/dashboard`}>
              <a
                href="#"
                class="text-gray-400 hover:text-primary-med active:text-red-700 text-lg font-semibold transition duration-100"
              >
                Home
              </a>
            </Link>
            <Link to={`/transactions`}>
              <a
                href="#"
                class="text-gray-400 hover:text-primary-med active:text-red-700 text-lg font-semibold transition duration-100"
              >
                Transactions
              </a>
            </Link>
            <a
              href="#"
              class="text-gray-400 hover:text-primary-med active:text-red-700 text-lg font-semibold transition duration-100"
            >
              About
            </a>
          </nav>

          <div>
            <a
              onClick={() => logout()}
              href="#"
              class="inline-block bg-primary-dark hover:bg-primary-med active:bg-red-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Sign Out
            </a>
          </div>
        </header>

        <div class="flex flex-col items-center bg-back-dark h-full p-10 ">
          {translist ? (
            translist.map((transproperty) => (
              <TransactionCards
                transactionDetails={transproperty}
                reload={reload}
              />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
