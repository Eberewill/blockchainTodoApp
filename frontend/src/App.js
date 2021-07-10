import React, { useEffect, useState } from "react";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");

  const [loading, setloading] = useState(false);

  const loadBlockchainData = async () => {
    setloading(true);
    const web3 = new Web3("http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setloading(false);
    setAccount(accounts[0]);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <div className="container">
      {account && console.log(account)}
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {" "}
          <h1>Hello, World! </h1>
          <p>Your account: {account} </p>
        </>
      )}
    </div>
  );
}

export default App;
