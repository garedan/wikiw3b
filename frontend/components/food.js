import React from 'react'
import Link from 'next/link'
import { convertToPath } from "../lib/items";

export default function Food ({ item, showAs }) {
    //console.log(item);
    if (showAs === "Page") {
        return (
           
            <div key={item.pais} className="border shadow rounded-xl overflow-hidden" >
                <img style={{ height: "20rem", margin: 'auto' }} src={item.image} />
                <div className="p-4" >
                    <span
                    style={{ height: "64px", margin: '45%' }}
                    className="text-2xl font-semibold"
                    >
                    {item.title}
                    </span>
                    <div style={{ height: "70px", overflow: "hidden" }}>
                    {/* <p>{dishes.name}</p> */}
                    <p className="text-gray-400">{item.pais}</p>
                    </div>
                </div>
            </div>

        )
    }
    if (showAs === "LisItem") {
        return (
            
            <div key={item.pais} className="border shadow rounded-xl overflow-hidden">
                <img style={{ height: "20rem" }} src={item.image} />
                <div className="p-4">
                    <p
                    style={{ height: "64px" }}
                    className="text-2xl font-semibold"
                    >
                    {item.title}
                    </p>
                    <div style={{ height: "70px", overflow: "hidden" }}>
                    {/* <p>{dishes.name}</p> */}
                    <p className="text-gray-400">{item.pais}</p>
                    </div>
                </div>
            </div>
        )
    }

     return (
        <div>
          <div>
            <Link href={`/posts/${convertToPath(item.title)}`}>
              <a>
              <div key={item.pais} className="border shadow rounded-xl overflow-hidden">
                <img style={{ height: "20rem" }} src={item.image} />
                <div className="p-4">
                    <p
                    style={{ height: "64px" }}
                    className="text-2xl font-semibold"
                    >
                    {item.title}
                    </p>
                    <div style={{ height: "70px", overflow: "hidden" }}>
                    {/* <p>{dishes.name}</p> */}
                    <p className="text-gray-400">{item.pais}</p>
                    </div>
                </div>
            </div>
              </a>
            </Link>
          </div>
          {/* <div>${nombre}</div> */}
        </div>
      ); 
}

