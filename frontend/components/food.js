import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Food ({ item, showAs }) {

    if (showAs === "Page") {
        return (
           
            <div key={item.id} className="bg-blue-100" >
                <span style={{ maxWidth: '70%', float: 'right', marginTop: '2%', marginRight: '2%', marginBottom: '2%'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Nunc mattis enim ut tellus elementum. Elementum sagittis vitae et leo duis ut. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Orci ac auctor augue mauris augue neque gravida in fermentum. Urna molestie at elementum eu facilisis sed odio morbi. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Nunc mattis enim ut tellus elementum.
                        <p>
                         
                        <b style={{ fontSize: '25px'}}>Amet risus nullam</b>
                        </p>
                    </span>
                {(item.topic === 'Javascript' || item.topic === '') &&
                    <Image
                    src="/JavaScript-logo.png"
                    fill
                    width={200}
                    height={200}
                    margin='45%'
                    borderRadius='25px'
                  />}
                    {/* <img style={{ height: "20rem" }} src={item.image} /> */}
                {
                    (item.topic === 'React') &&
                    <Image
                    src="/react.jpg"
                    fill
                    width={200}
                    height={200}
                    margin='45%'
                    borderRadius='25px'
                  />
                }
                <div className="p-4" >
                    <span
                    style={{ height: "64px", margin: 'auto' }}
                    className="text-2xl font-semibold"
                    >
                    {item.creator_address}
                    </span>
                    <div style={{ height: "70px", overflow: "hidden" }}>
                    <p className="text-gray-800">{item.topic}</p>
                    </div>
                </div>
            </div>

        )
    }

     return (
        <div>
          <div>
            <Link href={`/posts/${item.id}`}>
              <a>
                
              <div key={item.id} className="border shadow rounded-xl overflow-hidden bg-blue-100">
                    <span style={{ maxWidth: '50%', float: 'right', marginTop: '2%', marginRight: '5%'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc. 
                        <p>
                         
                        <b style={{ fontSize: '25px'}}>Amet risus nullam</b>
                        </p>
                    </span>
                <div>
                {(item.topic === 'Javascript' || item.topic === '') &&
                    <Image
                    src="/JavaScript-logo.png"
                    fill
                    width={200}
                    height={200}
                  />}
   
                {
                    (item.topic === 'React') &&
                    <Image
                    src="/react.jpg"
                    fill
                    width={200}
                    height={200}
                  />
                }
                  
                <div className="p-4 bg-blue-200">
                    <span
                    style={{ height: "70px", overflow: "hidden", margin: "0" }}
                    className="font-semibold"
                    >
                    {item.creator_address}
                    </span>
                    <div style={{ height: "70px", overflow: "hidden" }}>
     
                    <p className="text-gray-800">{item.topic}</p>
                    </div>
                </div>
              </div>
            </div>
              </a>
            </Link>
          </div>

        </div>
      ); 
}

