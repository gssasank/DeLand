import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import AdminDashboard from "./components/AdminDashboard";
import AdminTransactions from "./components/AdminTransactions";
import RegistrationPage from "./components/RegistrationPage";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";
import funcM from "./components/MoralisFunctions";
import defaultlanddata from "./geoData";

function App() {
  const { isAuthenticated } = useMoralis();
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const updateAdminTrue = () => {
    setIsAdminLogin(true);
  };
  const updateAdminFalse = () => {
    setIsAdminLogin(false);
  };

  useEffect(() => {
    funcM.defineNewLand(defaultlanddata.land1);
    funcM.defineNewLand(defaultlanddata.land2);
    funcM.defineNewLand(defaultlanddata.land3);
    funcM.defineNewLand(defaultlanddata.land4);
    funcM.defineNewLand(defaultlanddata.land5);
    funcM.defineNewLand(defaultlanddata.land6);
    funcM.defineNewLand(defaultlanddata.land7);
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register">
            {isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <RegistrationPage />
            )}
          </Route>
          <Route path="/adminlogin" exact>
            {isAdminLogin ? (
              <Redirect to="/admindashboard" />
            ) : (
              <AdminLogin setadmin={updateAdminTrue} />
            )}
          </Route>
          <Route path="/" exact>
            {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
          </Route>
          <Route path="/dashboard">
            {isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/admindashboard">
            {isAdminLogin ? (
              <AdminDashboard setadmin={updateAdminFalse} />
            ) : (
              <Redirect to="/adminlogin" />
            )}
          </Route>
          <Route path="/transactions">
            {isAuthenticated ? <Transactions /> : <Redirect to="/" />}
          </Route>
          <Route path="/admintransactions">
            {isAdminLogin ? (
              <AdminTransactions setadmin={updateAdminFalse} />
            ) : (
              <Redirect to="/adminlogin" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
