import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Comments from '../components/Comment'

export default function Food ({ item, showAs }) {

    if (showAs === "Page") {
        return (
           
          <div key={item.id} className="border shadow overflow-hidden bg-white" style={{ height: '7%', display: 'flex', flexDirection: 'column', width: '70%', margin: 'auto'}}>
            <div style={{ width: '60%', margin: 'auto', position: 'relative', padding: '10px', float: 'right'}}>
              <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Nisi est sit amet facilisis magna. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Nunc mattis enim ut tellus elementum. Elementum sagittis vitae et leo duis ut. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Orci ac auctor augue mauris augue neque gravida in fermentum. Urna molestie at elementum eu facilisis sed odio morbi. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. Nunc mattis enim ut tellus elementum.
                        <p>
                         
                        <b style={{ fontSize: '25px'}}>Amet risus nullam!</b>
                        </p>
                  </span>
                </div>
                <div style={{ padding: '5px', width: '20%', position: 'relative', margin: 'auto%'}}>
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
                  </div>
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
                <div id="disqus_thread" style={{ width: '50%', color: 'red', margin: 'auto'}}>Disqus
                  <h1>Comments - GeeksforGeeks</h1>
                  <Comments slug={`http://localhost:3001/posts/${item.id}`} id={`http://localhost:3001/posts/${item.id}`} title={item.topic}/>
                </div>
            </div>

        )
    }

     return (
        <div>
          <div>
            <Link href={`/posts/${item.id}`}>
              <a>
                
              <div key={item.id} className="border shadow  overflow-hidden bg-white" style={{ height: '7%'}}>
                    <span style={{ maxWidth: '50%', float: 'right', marginTop: '2%', marginRight: '5%'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet risus nullam eget felis eget nunc. 
                        <p>
                         
                        <b style={{ fontSize: '25px'}}>Amet risus nullam!</b>
                        </p>
                    </span>
                <div>
                  <div style={{ padding: '5px' }}>
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
                  </div>
                <div className="p-4 bg-white" style={{ height: '5%', marginTop: '5px' }}>
                    <span
                    style={{ overflow: "hidden", margin: "0", padding: '5px' }}
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

