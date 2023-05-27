import React, { useEffect, useState } from "react";
import Food from "../components/food";
import { abiAddPostAddress } from "../utils/config.js";
import AddPost from "../utils/abi/AddPost.json"
import { ethers } from "ethers";
import addressesEqual from "../lib/items";
import {UserCircleIcon} from '@heroicons/react/20/solid';
import TipButton from "../components/tip-button";
//test
import { getRandomPhoto } from "./api/hello";

export default function Home({ items, photo }) {

  const [walletAccount, setWalletAccount] = useState("");
  const [isConnectedToSepolia, setIsConnectedToSepolia] = useState(true);

  const checkIfMetamaskIsConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.log("Check if Metamask is installed");
    } else {
      console.log("Metamask is installed");

      ethereum.on("chainChanged", function(networkId) {
        if(parseInt(networkId) !== 5) {
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
  
  const [articles, setArticles] = useState([]);

  const getAllArticles = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/SShG9FTsR3tnsu_XL0RTCK2OM3LPavog"
    );
    const contract = new ethers.Contract(
      abiAddPostAddress,
      AddPost.abi,
      provider
    );

    const articles = await contract.getAllPosts();
    console.log(articles);
    setArticles(articles);
  };

  useEffect(() => {
    getAllArticles();
  }, []);
 
 //test
  

 //test

  return (
    <div className="h-screen">
      <div className="grid grid-cols-1 grid-rows-3 gap-4 h-5/6 w-4/5 mx-auto" style={{ maxWidth: '1000px'}}>
        <div className="row-span-1 col-span-1" style={{  borderRadius: '25px'}}>
          {articles &&
          articles.map((item, i) => (
            <div className="gap-2 p-10" style={{ height: '400px', borderRadius: '25px'}}>
              <Food key={item.id} item={item} showAs="item" /> 
              {
              addressesEqual(item.creator_address, walletAccount) ?  
                <UserCircleIcon className="h-5 w-5 text-indigo-200" /> :
                <TipButton ethereum={ethereum} index={i} />
              }
              
            </div>
          ))}
          <div>
      {/* <h1>{photo.title}!</h1>
      <img src={photo.url} /> */}
    </div>
        </div>
      </div>
    </div>
  );
}




/* function SSG({ photo }) {
  return (
    <div>
      <h1>{photo.title}!</h1>
      <img src={photo.url} />
    </div>
  );
}

export async function getStaticProps() {
  let photo;
  try {
    photo = await getRandomPhoto();
  } catch (e) {
    
    return {
      notFound: true,
    };
  }

  if (!photo) {
    
    return {
      notFound: true,
    };``
  }

  return {
    props: {
      photo,
    },
  };
}
 */

/* export async function getStaticProps() {
  const res = await getLatestItems();

  return {
    props: {
      items: res,
    },
  };
} */
