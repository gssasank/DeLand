# **DeLand**

**DeLand** or **Decentralized Land Management System** is a program developed for creating a decentralized system which holds all the land records/data present in the country. 

---

# Group Members

| Name               | Roll Number |
| ------------------ | ----------- |
| Aryaman Singh Rana | 191010093   |
| GS Sasank          | 191010152   |
| Jaisurya R S       | 191010174   |
| Shivang Madhwal    | 191010371   |



# Table of Contents

1. [Idea](#Idea)
2. [Frontend](#Frontend)
3. [Backend](#Backend)
4. [Future Plans and Improvements](#Future-Plans-and-Improvements)

# Idea

###  Inspiration

 The inspiration behind our project was to apply the concept of data decentralization in the Indian context to augment the management of the land registery system. We hope to mitigate potential land fraud and make the process of sale and purchase of land seamless.

 **Key reasons for prevalance of land fraud -**

 * Creation of fradulent copies of records.
 * Insecure and inefficient storage and mismanagement of available data.
 * Involvement of untrustworthy third-party induviduals. 

 Moreover, buying and selling land is an overtly complicated process, where one has to deal with multiple parties.

 So we propose a program which whould not only reduce the chance of land fraud but also reduce the hassle of facilitating transactions by as much as possible.

### Why Decentralization?

 We wanted to create a system which can best be described in the following terms a "trustless and decentralized peer-to-peer immutable data storage" that is spread over a network of participants often referred to as nodes. -

 - Manipulation of data present on the blockchain is nearly impossible.
 - Accurate ownership history.
 - Enables transparent sale of land.


### How does it work?

  1. Just like any other e-commerce website, you are first greeted with a login page.
  2. There are two login pages, one for the user and one for the admin.
  3. After logging in as the user, you can view all the land records and its respective details such as - 
     * Owner name
     * Selling price
     * Plot size
     * Type of land
     * Land demarcation (stored as geo co-ordinates), etc. 
  4. Here, you can register your land , sell or buy land under the official jurisdiction of government authority.
  5. The admin is charged with governing over the transcation of land. Therefore, after the user has sent in the request to buy or sell land, the admin has to approve the transcation.
     * (This ensures that the transaction is legal and no money laundering of any sort is taking place. Admins have access to all the land data and the transactions that took place in their domain).
  6. After the transcation has been approved, then only does it store the same over all blockchain nodes. 


### Implemented Features - 

 As you would have noticed, major portion of our idea would be invisible to the naked eye, as it would be running in the background. (on a decentralized block chain system)
 What extra features we have to make our program more robust and self-sufficient are -

 - **User/Administrator Rights**
    - **Admin:** This user has the power to see all the land records. It is also resposible for verification of any transaction happening on the network. The admin can also view all the lands under his jurisidiction whearas the user can only view his lands and the lands on sale.
    - **Normal User:** This user does not have the power to make the complete transaction of the land. It can view only the land available to buy or the land it owns.

| User  | ID      | Password |
| ----- | ------- | -------- |
| Admin | admin   | admin101 |
| User1 | pimblee | 1234     |
| User2 | sasank  | 1234     |
| User3 | aryaman | 1234     |

 - **Authorized transaction between two parties**
    In the real world, a transaction concerning land exchange happens under the guidance of an official government party. Similarly, we have an admin authority who governs over a land transaction and approves if the transaction and move forward or be held back.    

 - **Land Ownership History**
    With every land, comes its history of owners and at what price it was sold to. This is something that the buyers are usually interested in as it helps them gain more knowledge and trust about it. So we also provide data on the lands history.   

 - **Land Price Graph**
    The line graph shows the change in the price of the property on sale at different point in time. This helps the buyer analyze the real value of the property.

# Frontend

For the frontend we used -

* [React](https://reactjs.org/docs/getting-started.html) 
    * We used React as its front-end JavaScript library is fast and simple and allows to create reusable UI components for building user interfaces or UI components. 

* [Tailwind CSS](https://tailwindcss.com/docs/installation)
    * We used Tailwind CSS due to its highly customizable, low-level CSS framework which gaves us the building blocks for creating designs easily.

## Login Page

![img](https://cdn.discordapp.com/attachments/914564577688158208/914564751579832330/unknown.png)

## Admin View

![img](https://cdn.discordapp.com/attachments/914564577688158208/914564597019734066/unknown.png)

## User View

![img](https://cdn.discordapp.com/attachments/914564577688158208/914565503652094023/unknown.png)

## History View

![img](https://cdn.discordapp.com/attachments/914564577688158208/914565838504329257/unknown.png)

## Transaction List View

![img](https://cdn.discordapp.com/attachments/914564577688158208/914567593564721172/unknown.png)

![img](https://cdn.discordapp.com/attachments/914564577688158208/914567735147651093/unknown.png)

# Backend

For backend, we used  [Moralis](https://docs.moralis.io/introduction/readme).  It helped us create and host our own decentralised server on the **Ethereum blockchain** (Rinkeby Testnet).

## Backend Design

We are stroing all our data on Ethereum Blockchain as a part of our effort to keep the data decentralized. We are using the Rinkeby Testnet as the gas costs on the mainnet will be a major hurdle for us to test our application.

We have three major objects which store all our data on Moralis. They are: **Users, Transactions and Lands**. All the objects get mutated with respect to the functions and operations that are called on them.

- **Users**: Stores the username, user ID, List of lands owned.
- **Transactions**: Stores the sender ID, reciever ID, transaction ID, transaction state and transaction cost.
- **Lands**: contains the co-ordinates of the boundary, the land ID, history of ownership and the current owner and price.

When a land is put up for sale, the seller quotes a desired price, which the buyer can view and quote his final price. If the seller is satisfied with the price the buyer is quoting, he can approve the transaction or he can reject it (in which case, it is removed from the transactions list). Then, the admin checks and approves or rejects the transaction based on the legality of it.

When a transaction is approved by the admin, the land history gets updated and the list of properties owned by the individuals are also updated along with the map view. 

# Future Plans and Improvements

In the future, we can implement native transactions onto our platform, which will enable our users to pay directly from the crypto wallets of their choice (eg. MetaMask) for the transaction. This will successfully remove all the human middle-men and create a system that is truly independant and decentralized. 

In order to overcome the exuberant gas prices, we can move to a layer 2 solution such as Polygon (MATIC), or to a native layer 1 solution such as Solana due to their blazing fast block time or extremely low gas cost.

We can also add additional features such as street view for viewing our property and monitoring of activity on land using satellite imagery.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
