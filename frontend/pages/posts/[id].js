import Food from "../../components/food"
import { getItemData, getPathsFromTitle } from "../../lib/items";

export default function ProductPage({ productInfo }) {
    //console.log(items); 
    return ( 
     // <Food item={productInfo.data} showAs="Page" />
    //<Food image={productInfo.data.image} country={productInfo.data.price} nombre={productInfo.data.title} showAs="Page" />
     <Food item={productInfo.data} showAs="Page" />
    );
  }


  export async function getStaticPaths() {
    const paths = await getPathsFromTitle();
  
    return {
      paths,
      fallback: false,
    };
  }
  
 export async function getStaticProps({ params }) {
    const id = params.id;
    const productInfo = await getItemData(id);
  
    return {
      props: {
        productInfo,
      },
    };
  } 
  
  /*  export async function getStaticProps() {
    const res = await getLatestItems();
  
    return {
      props: {
        items: res,
      },
    };
  }*/