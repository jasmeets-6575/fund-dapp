import { useState, useEffect } from "react";
import Web3 from "web3";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;
      if (window.ethereum) {
        provider = window.ethereum;
        try {
          await provider.enable();
        } catch (error) {
          console.log("User is not allowed", error);
        }
      } else if (window.web3) {
        provider = window.web3.currentProvider;
      } else if (!process.env.production) {
        provider = new Web3.provider.HttpProvider("http://localhost:7545");
      }
    };
  });

  return (
    <>
      <div className="card text-center">
        <div className="card-header">Funding</div>
        <div className="card-body">
          <h5 className="card-title">Balance: {balance} ETH </h5>
          <p className="card-text">
            Account : {account ? account : "not connected"}
          </p>
          {/* <button
            type="button"
            className="btn btn-success"
            onClick={async () => {
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
              console.log(accounts);
            }}
          >
            Connect to metamask
          </button> */}
          &nbsp;
          <button
            type="button"
            className="btn btn-success "
            onClick={transferFund}
          >
            Transfer
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-primary "
            onClick={withdrawFund}
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
