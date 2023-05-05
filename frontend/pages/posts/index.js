import React from 'react'
import Food from '../../components/food';
import { getItems } from "../../services/storeService";

export default function Index({ items }) {
  return (
    <div className={styleProduct.items}>
        {items &&
          items.map((item) => (
            <Food key={item.id} imagen={item.image} pais={item.price} nombre={item.title} showAs="item" />
          ))}
      </div>
  )
}


export async function getStaticProps() {
  const res = await getItems();

  return {
    props: {
      items: res,
    },
  };
}
