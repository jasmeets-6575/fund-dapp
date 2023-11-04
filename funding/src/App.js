import { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/load-contract";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [reload, shouldReload] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Funder", provider);
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setWeb3Api({ web3: new Web3(provider), provider, contract });
      } else {
        console.error("Please install MetaMask!", error);
      }
    };
    loadProvider();
  }, []);

  const transferFund = async () => {};
  const withdrawFund = async () => {};

  useEffect(() => {
    const getAccount = async () => {
      const account = await web3Api.web3.eth.getAccounts();
      setAccount(account[0]);
    };
    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

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
