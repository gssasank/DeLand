import Moralis from "moralis";

const appId = "ZDcCyqQTxy7oeLrkouowxlVgHtpTei91l3rKwwp7";
const serverUrl = "https://8t3qg3hvlnid.usemoralis.com:2053/server";

Moralis.initialize(appId);
Moralis.serverURL = serverUrl;

const defineNewUser = async (testuserObject) => {
  const Users = Moralis.Object.extend("Users");
  const user = new Users();

  const query = new Moralis.Query("Users");
  query.equalTo("username", testuserObject.username);
  const userstemp = await query.find();
  console.log(userstemp.length);
  if (userstemp.length === 0) {
    user.set("user_id", testuserObject.user_id);
    user.set("username", testuserObject.username);
    user.set("property_owned", testuserObject.property_owned);
    console.log(testuserObject);
    await user.save();

    console.log("New User Created");
  } else {
    console.log("User already exists");
  }
};

const defineNewLand = async (testlandObject) => {
  const Land = Moralis.Object.extend("Land");
  const land = new Land();

  const query = new Moralis.Query("Land");
  query.equalTo("land_id", testlandObject.land_id);
  const landtemp = await query.find();
  console.log(landtemp.length);

  if (landtemp.length === 0) {
    land.set("land_id", testlandObject.land_id);
    land.set("contour", testlandObject.contour);
    land.set("land_description", testlandObject.land_description);
    land.set("sub_division", testlandObject.sub_division);
    land.set("current_owner", testlandObject.current_owner);
    land.set("plot_size", testlandObject.plot_size);
    land.set("land_type", testlandObject.land_type);
    land.set("date_land_owned", testlandObject.date_land_owned);
    land.set("land_history", testlandObject.land_history);
    land.set("current_value", testlandObject.current_value);
    land.set("buy_status", testlandObject.buy_status);

    await land.save();
    console.log("New Land Created");
    console.log(land);
  } else {
    console.log("land already exists");
  }
};

const defineNewTransaction = async (testtransactionData) => {
  // ID is in-built property of Moralis.Object

  const Transaction = Moralis.Object.extend("Transaction");
  const transaction = new Transaction();

  transaction.set("sender", testtransactionData.sender);
  transaction.set("receiver", testtransactionData.receiver);
  transaction.set("amount", testtransactionData.amount);
  transaction.set("land_id", testtransactionData.land_id);
  transaction.set("status", testtransactionData.status);

  await transaction.save();
  console.log("added new transaction");
  alert("added new transaction");
};

const takeLandDestroyTransaction = async (landID) => {
  try {
    const query = new Moralis.Query("Transaction");
    query.equalTo("land_id", landID);
    const land = await query.find();
    const land_deets = land[0];

    const land_transaction_id = land_deets.id;
    query
      .get(land_transaction_id)
      .then((sender) => {
        sender.destroy();
        sender.save();
        console.log("Transaction Deleted");
      })
      .catch((error) => {
        console.log("There's been an error!");
        console.log(error);
      });
  } catch (error) {
    console.log("destroy transaction failed");
  }
};

const getUserData = async (ID) => {
  // const Users = Moralis.Object.extend("Users");
  const userID = [ID];

  try {
    const query = new Moralis.Query("Users");
    query.containedIn("user_id", userID);
    const users = await query.find();

    const user = users[0];
    const returnObject = {
      user_id: user.get("user_id"),
      username: user.get("username"),
      property_owned: user.get("property_owned"),
    };
    // console.log(returnObject);
    return returnObject;
  } catch (error) {
    console.log("getuser error" + error);
  }
};

const getUserId = async (name) => {
  // const Users = Moralis.Object.extend("Users");
  const username = [name];

  try {
    const query = new Moralis.Query("Users");
    query.containedIn("username", username);
    const users = await query.find();

    const user = users[0];
    const returnObject = user.get("user_id");
    // console.log(returnObject);
    return returnObject;
  } catch (error) {
    console.log("getuser error" + error);
  }
};

const getLandData = async (ID) => {
  const land_id = [ID];
  const query = new Moralis.Query("Land");

  query.containedIn("land_id", land_id);

  const lands = await query.find();

  const clap = lands[0];
  const returnObject = {
    land_id: clap.get("land_id"),
    contour: clap.get("contour"),
    land_description: clap.get("land_description"),
    sub_division: clap.get("sub_division"),
    current_owner: clap.get("current_owner"),
    plot_size: clap.get("plot_size"),
    land_type: clap.get("land_type"),
    date_land_owned: clap.get("date_land_owned"),
    land_history: clap.get("land_history"),
    current_value: clap.get("current_value"),
    buy_status: clap.get("buy_status"),
  };

  return returnObject;
};

const getSellList = async (username) => {
  const query = new Moralis.Query("Land");

  query.equalTo("current_owner", username);

  const lands = await query.find();

  const returnObject = [];

  for (let i = 0; i < lands.length; i++) {
    // returnObject.push(lands[i]);
    const clap = lands[i];
    const returnTempObject = {
      land_id: clap.get("land_id"),
      contour: clap.get("contour"),
      land_description: clap.get("land_description"),
      sub_division: clap.get("sub_division"),
      current_owner: clap.get("current_owner"),
      plot_size: clap.get("plot_size"),
      land_type: clap.get("land_type"),
      date_land_owned: clap.get("date_land_owned"),
      land_history: clap.get("land_history"),
      current_value: clap.get("current_value"),
      buy_status: clap.get("buy_status"),
    };
    returnObject.push(returnTempObject);
  }

  // console.log(returnObject);
  return returnObject;
};

const getAllLandId = async () => {
  const query = new Moralis.Query("Land");
  const lands = await query.find();
  const land_ids = [];

  for (let i = 0; i < lands.length; i++) {
    const land = lands[i];
    land_ids.push(land.get("land_id"));
  }

  return land_ids;
};

const getBuyList = async () => {
  const query = new Moralis.Query("Land");

  query.equalTo("buy_status", true);

  const lands = await query.find();

  const returnObject = [];

  for (let i = 0; i < lands.length; i++) {
    // returnObject.push(lands[i]);
    const clap = lands[i];
    const returnTempObject = {
      land_id: clap.get("land_id"),
      contour: clap.get("contour"),
      land_description: clap.get("land_description"),
      sub_division: clap.get("sub_division"),
      current_owner: clap.get("current_owner"),
      plot_size: clap.get("plot_size"),
      land_type: clap.get("land_type"),
      date_land_owned: clap.get("date_land_owned"),
      land_history: clap.get("land_history"),
      current_value: clap.get("current_value"),
      buy_status: clap.get("buy_status"),
    };
    returnObject.push(returnTempObject);
  }

  // console.log(returnObject);
  return returnObject;
};

const flipBuyStatus = async (id) => {
  const query = new Moralis.Query("Land");

  query.equalTo("land_id", id);

  const curr = await query.find();

  const land = curr[0];

  var curr_stat = land.get("buy_status");

  if (curr_stat) {
    land.set("buy_status", false);
    land.save();
    console.log("Land Removed from the market");
  } else {
    land.set("buy_status", true);
    land.save();
    console.log("Land posted on the market");
  }
};

const flipBuyStatusTrue = async (id) => {
  const query = new Moralis.Query("Land");

  query.equalTo("land_id", id);

  const curr = await query.find();

  const land = curr[0];

  var curr_stat = land.get("buy_status");

  if (curr_stat === false) {
    land.set("buy_status", true);
    land.save();
    console.log("Land added to the market");
    alert("Land added to the market");
  }
};
const flipBuyStatusFalse = async (id) => {
  const query = new Moralis.Query("Land");

  query.equalTo("land_id", id);

  const curr = await query.find();

  const land = curr[0];

  var curr_stat = land.get("buy_status");

  if (curr_stat === true) {
    land.set("buy_status", false);
    land.save();
    console.log("Land removed from the market");
    alert("Land removed from the market");
  }
};

const getAdminTransactionList = async () => {
  // return transactions data which has status as admin approval pending

  const query = new Moralis.Query("Transaction");
  query.equalTo("status", "Approval Pending");

  const transactions = await query.find();
  const returnObject = [];

  for (let i = 0; i < transactions.length; i++) {
    const clap = transactions[i];
    const returnTempObject = {
      objectid: clap.id,
      sender: clap.get("sender"),
      receiver: clap.get("receiver"),
      amount: clap.get("amount"),
      land_id: clap.get("land_id"),
      status: clap.get("status"),
    };
    returnObject.push(returnTempObject);
  }

  return returnObject;
};

const getUserTransactionList = async (userID) => {
  const query = new Moralis.Query("Transaction");
  const query2 = new Moralis.Query("Transaction");
  query.equalTo("sender", userID);
  query2.equalTo("receiver", userID);
  const transactions = await query.find();
  const transactions2 = await query2.find();

  const returnObject = [];

  for (let i = 0; i < transactions.length; i++) {
    const clap = transactions[i];
    const returnTempObject = {
      objectid: clap.id,
      sender: clap.get("sender"),
      receiver: clap.get("receiver"),
      amount: clap.get("amount"),
      land_id: clap.get("land_id"),
      status: clap.get("status"),
      is_buyer: false,
    };

    returnObject.push(returnTempObject);
  }

  for (let i = 0; i < transactions2.length; i++) {
    const clap = transactions2[i];
    const returnTempObject = {
      objectid: clap.id,
      sender: clap.get("sender"),
      receiver: clap.get("receiver"),
      amount: clap.get("amount"),
      land_id: clap.get("land_id"),
      status: clap.get("status"),
      is_buyer: true,
    };
    returnObject.push(returnTempObject);
  }

  return returnObject;
};

const adminApproveTransaction = async (id) => {
  var clap = new Date();
  var dd = clap.getDate();
  var mm = clap.getMonth() + 1;
  var yyyy = clap.getFullYear();
  var date = dd + "/" + mm + "/" + yyyy;
  var array1;
  console.log(id);
  const query = new Moralis.Query("Transaction");
  console.log(query);
  query.equalTo("objectId", id);
  console.log(query);
  const transactions = await query.find();
  const transaction = transactions[0];
  const land_id = transaction.get("land_id");
  const amount = transaction.get("amount");
  const sender = transaction.get("sender");
  const receiver = transaction.get("receiver");
  transaction.set("status", "Approved");
  transaction.save();
  const status = transaction.get("status");
  array1 = [land_id, amount, sender, receiver, status];
  console.log(array1);

  var landIDA;
  const tempQuery = new Moralis.Query("Land");
  tempQuery.equalTo("land_id", land_id);
  landIDA = await tempQuery.find();
  const landID = landIDA[0].get("land_id");
  console.log(landID);

  const buyerID = receiver;
  const sellerID = sender;

  var buyerIDA;
  const tempQuery2 = new Moralis.Query("Users");
  tempQuery2.equalTo("user_id", receiver);
  buyerIDA = await tempQuery2.find();
  const buyer_name = buyerIDA[0].get("username");
  console.log(buyer_name);

  var sellerIDA;
  const tempQuery3 = new Moralis.Query("Users");
  tempQuery3.equalTo("user_id", sender);
  sellerIDA = await tempQuery3.find();
  const seller_name = sellerIDA[0].get("username");
  console.log(seller_name);

  const query2 = new Moralis.Query("Land");
  query2.equalTo("land_id", landID);
  const landDeetsA = await query2.find();
  const landDeets = landDeetsA[0];
  console.log(landDeets);
  const history = landDeets.get("land_history");
  console.log(history);
  history.push({ owner: buyer_name, bought_for: amount, date_owned: date });
  console.log(history);
  landDeets.set("land_history", history);
  landDeets.set("current_owner", buyer_name);
  landDeets.set("buy_status", false);
  landDeets.set("current_value", amount);
  landDeets.set("date_land_owned", date);
  landDeets.save();
  console.log(landDeets);

  const query3 = new Moralis.Query("Users");
  query3.equalTo("user_id", buyerID);
  const buyerDeetsA = await query3.find();
  const buyerDeets = buyerDeetsA[0];
  console.log(buyerDeets);
  const seller_lands = buyerDeets.get("property_owned");
  seller_lands.push(land_id);
  buyerDeets.set("property_owned", seller_lands);
  buyerDeets.save();

  const query4 = new Moralis.Query("Users");
  query4.equalTo("user_id", sellerID);
  const sellerDeetsA = await query4.find();
  const sellerDeets = sellerDeetsA[0];
  console.log(sellerDeets);
  const buyer_lands = sellerDeets.get("property_owned");
  const index = buyer_lands.indexOf(land_id);
  buyer_lands.splice(index, 1);
  sellerDeets.set("property_owned", buyer_lands);
  sellerDeets.save();
};

const adminRejectTransaction = async (id) => {
  // get transaction data from admin approval pending list

  const query = new Moralis.Query("Transaction");

  query
    .get(id)
    .then((clap) => {
      clap.destroy();
      clap.save();
      console.log("Transaction Deleted");
      alert("Transaction rejected");
    })
    .catch((error) => {
      console.log(error);
    });
};

const userApproveTransaction = async (id) => {
  // change status from pending to approval pending
  const query = new Moralis.Query("Transaction");

  query
    .get(id)
    .then((sender) => {
      sender.set("status", "Approval Pending");
      sender.save();
      console.log("Pending changed to approval pending");
      alert("Transaction accepted, waiting for Admin to approve");
    })
    .catch((error) => {
      console.log("There's been an error!");
      console.log(error);
    });
};

const userDeclineTransaction = async (id) => {
  // change status from pending to approval pending
  const query = new Moralis.Query("Transaction");

  query
    .get(id)
    .then((sender) => {
      sender.destroy();
      sender.save();
      console.log("Transaction Deleted");
      alert("Transaction Deleted");
    })
    .catch((error) => {
      console.log("There's been an error!");
      console.log(error);
    });
};

const setQtPrice = async (land_id, qt_price) => {
  const QtTable = Moralis.Object.extend("QtTable");
  const qtTable = new QtTable();

  const query1 = new Moralis.Query("QtTable");

  query1.equalTo("land_id", land_id);
  const land_deets = await query1.find();

  if (land_deets.length === 0) {
    qtTable.set("land_id", land_id);
    qtTable.set("qt_price", qt_price);
    qtTable.save();
  } else {
    land_deets[0].destroy();
    qtTable.set("land_id", land_id);
    qtTable.set("qt_price", qt_price);
    qtTable.save();
  }
};

const getQtPrice = async (land_id) => {
  try {
    const query = new Moralis.Query("QtTable");
    query.equalTo("land_id", land_id);
    const land = await query.find();
    const land_deets = land[0];

    const qt_price = land_deets.get("qt_price");

    return qt_price;
  } catch (error) {
    console.log(error);
  }
};

const getAllLand = async () => {
  const query = new Moralis.Query("Land");

  var listLandIds = [
    "LID1111",
    "LID1112",
    "LID1113",
    "LID1114",
    "LID1115",
    "LID1116",
    "LID1117",
  ];
  var returnData = [];

  for (var i = 0; i < listLandIds.length; i++) {
    query.equalTo("land_id", listLandIds[i]);
    const lands = await query.find();
    const returnObject = {
      land_id: lands[0].get("land_id"),
      contour: lands[0].get("contour"),
      land_description: lands[0].get("land_description"),
      sub_division: lands[0].get("sub_division"),
      current_owner: lands[0].get("current_owner"),
      plot_size: lands[0].get("plot_size"),
      land_type: lands[0].get("land_type"),
      date_land_owned: lands[0].get("date_land_owned"),
      land_history: lands[0].get("land_history"),
      current_value: lands[0].get("current_value"),
      buy_status: lands[0].get("buy_status"),
    };
    returnData.push(returnObject);
  }

  console.log(returnData);
  return returnData;
};

const funcM = {
  userDeclineTransaction,
  userApproveTransaction,
  adminRejectTransaction,
  adminApproveTransaction,
  getUserTransactionList,
  getAdminTransactionList,
  defineNewUser,
  defineNewLand,
  defineNewTransaction,
  getUserData,
  getUserId,
  getLandData,
  getBuyList,
  getSellList,
  getAllLandId,
  getAllLand,
  flipBuyStatus,
  flipBuyStatusTrue,
  flipBuyStatusFalse,
  takeLandDestroyTransaction,
  setQtPrice,
  getQtPrice,
};

export default funcM;
