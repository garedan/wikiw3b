import "../styles/globals.css";
import styles from '../styles/Home.module.css';
import Link from "next/link";
import Image from 'next/image'
import { useEffect, useState } from "react";
import { ethers } from "ethers";
/* import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";  */

function MyApp({ Component, pageProps })
{
  const [walletAccount, setWalletAccount] = useState("");
  const [isConnectedToSepolia, setIsConnectedToSepolia] = useState(true);

  const checkIfMetamaskIsConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.log("Check if Metamask is installed");
    } else {
      console.log("Metamask is installed");

      ethereum.on("chainChanged", function(networkId) {
        if(parseInt(networkId) !== 0xaa36a7) {
          setIsConnectedToSepolia(false);
        }else {
          setIsConnectedToSepolia(true);
        }
      });
    }
    
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    if(accounts.length != 0) {
      setWalletAccount(accounts[0]);
    }else {
      console.log("No authorized account");
    }
      
    
  }

  useEffect(() => {
    checkIfMetamaskIsConnected();
    //connectMetamask();
  }, []);


  const connectMetamask = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) {
        alert("Get Metamask");
        return;
      } 

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      {!isConnectedToSepolia && (
        <div className={styles.container}>
          <div className={styles.wrongNetwork}>
            <h1>Red Equivocada</h1>
            <p>
              &nbsp; Por favor conectarse a la red Goerli en su Metamask. Gracias.
            </p>
          </div>
        </div>
      )}
      {(!walletAccount) && (
        <div className={styles.container}>
          <button className={styles.eth_connect_wallet_button} onClick={connectMetamask} >
            Log In
          </button>
        </div>
      )}

      {(walletAccount && isConnectedToSepolia) && (
        <div>
          <main>
            <nav className="border-b border-black pt-4 pb-2 pl-10">
              <p className="text-4xl font-bold pb-0">
                    <Image
                  src="/logoww.png"
                  fill
                  width={200}
                  height={75}
                />
                </p>
                {/* <p className="text-3xl font-bold pb-6 pl-0 pt-0">Enciclopedia web3</p> */}
              <div className="flex">
                <Link href="/">
                  <a className="mr-4 text-blue-800">Inicio</a>
                </Link>
                <Link href="/add-article">
                  <a className="mr-6 text-blue-800">Agregar articulos</a>
                </Link>
                <Link href="/my-dishes">
                  <a className="mr-6 text-blue-800">Mis articulos</a>
                </Link>
              </div>
            </nav>
          </main>
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
}

export default MyApp;
