import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import posts from "./posts";
import Food from "../components/food";
import { getLatestItems } from "../services/storeService";
import { abiAddPostAddress } from "../utils/config.js";
import AddPost from "../utils/abi/AddPost.json"
import { ethers } from "ethers";
import addressesEqual from "../lib/items";
import {UserCircleIcon} from '@heroicons/react/20/solid';
import TipButton from "../components/tip-button";

export default function Home({ items }) {

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
  
  const [articles, setArticles] = useState([]);

  const getAllArticles = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/B54X_xFsbfi5cwsmQ-42FPPGzmIGzotb"
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
 
 
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {articles &&
          articles.map((item, i) => (
            //<Product key={item.id} item={item} showAs="item" />
            <div>
              <Food key={item.id} item={item} showAs="item" /> 
              {
              addressesEqual(item.creator_address, walletAccount) ?  
                <UserCircleIcon className="h-5 w-5 text-indigo-100" /> :
                <TipButton ethereum={ethereum} index={i} />
              }
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

/* export async function getStaticProps() {
  const res = await getLatestItems();

  return {
    props: {
      items: res,
    },
  };
} */
