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
//test
//import { abiPlatziFoodAddress } from "../config.js";

//import PlatziFood from "../utils/abi/PlatziFood.json";

export default function Home({ items }) {
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
          {items &&
          items.map((item, i) => (
            //<Product key={item.id} item={item} showAs="item" />
            <Food key={item.id} item={item} showAs="item" />
            
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await getLatestItems();

  return {
    props: {
      items: res,
    },
  };
}
