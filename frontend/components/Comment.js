import {DiscussionEmbed} from "disqus-react"
  
const Comments = ({slug, id, title}) => {
  const disqusShortname = "wikiw3b"
  
  const disqusConfig = {
    url: slug,
    identifier: id, 
    title: title 
  }
  
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}
  
export default Comments;