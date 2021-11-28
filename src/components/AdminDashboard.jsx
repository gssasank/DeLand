/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Landdetes from "./Landdetes";
import Map from "./Map";
import AdminLandlist from "./AdminLandlist";

function AdminDashboard(props) {
  return (
    <div class="bg-white  flex h-screen ">
      <div class="w-full flex flex-col pb-0">
        <header class=" flex justify-between items-center py-4 px-5 bg-black">
          {/* <!-- logo - start --> */}
          <a
            href="#"
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
          {/* <!-- logo - end --> */}

          {/* <!-- nav - start --> */}
          <nav class=" flex gap-12">
            <Link to={`/admindashboard`}>
              <a
                href="#"
                class="text-gray-400 hover:text-primary-med active:text-red-700 text-lg font-semibold transition duration-100"
              >
                Home
              </a>
            </Link>
            <Link to={`/admintransactions`}>
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
          {/* <!-- nav - end --> */}

          {/* <!-- buttons - start --> */}
          <div>
            <a
              onClick={props.setadmin}
              href="#"
              class="inline-block bg-primary-dark hover:bg-primary-med active:bg-red-700 focus-visible:ring ring-red-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Sign Out
            </a>
          </div>

          {/* <!-- buttons - end --> */}
        </header>

        {/* <!-- article - start --> */}
        <div class=" flex flex-row items-center bg-back-light h-full overflow-hidden ">
          <div class="flex-1 flex flex-col  h-full ">
            <Map user={"admin"} />
          </div>
          {/* <Router> */}
          {/* <Switch> */}

          <Route exact path="/admindashboard" component={AdminLandlist}></Route>
          <Route path="/admindashboard/landdetes" component={Landdetes}></Route>
          {/* </Switch> */}
          {/* </Router> */}
          {/* here */}
        </div>
        {/* <!-- article - end --> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
