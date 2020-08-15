import Link from 'next/link'
import Layout from "../../../Component/Layout"
import Error from "../../Component/Layout"


// time of comment 
const timeFormat = ( currentTime, commentTime)=> {
    commentTime = new Date(commentTime * 1000);
    // new post time conversion for the comment 
    let newYear = currentTime.getFullYear();
    let newMonth = currentTime.getMonth();
    let newDay = currentTime.getDate();
    let newHour = currentTime.getHours();
    let newMin = currentTime.getMinutes();
    let newSec = currentTime.getSeconds();
    // console.log(currentTime.getDate())
      // time commentTime conversion for the comment 
      let commentTimeYear = commentTime.getFullYear();
      let commentTimeMonth = commentTime.getMonth();
      let commentTimeDay = commentTime.getDate();
      let commentTimeHour = commentTime.getHours();
      let commentTimeMin = commentTime.getMinutes();
      let commentTimeSec = commentTime.getSeconds();
      if(newYear > commentTimeYear){
        return (`${newYear - commentTimeYear} Year(s) ago`);
      }else if(newMonth > commentTimeMonth && commentTimeYear === newYear){
        return (`${newMonth - commentTimeMonth} Month(s) ago`);
      }else if((newDay > commentTimeDay) && (commentTimeMonth === newMonth) && (commentTimeYear === newYear)){
        return (`${newDay - commentTimeDay} Day(s) ago`);
      }else if((newHour > commentTimeHour) && (newDay === commentTimeDay) && (commentTimeMonth === newMonth) && (commentTimeYear === newYear)){
        return (`${newHour - commentTimeHour} Hour(s) ago`);
      }else if((newMin > commentTimeMin) && (commentTimeHour === newHour) && (newDay === commentTimeDay) && (commentTimeMonth === newMonth) && (commentTimeYear === newYear)  ){
        return (`${newMin - commentTimeMin} Minute(s) ago`);
      }else{
        return (`${newSec - commentTimeSec || 1} Second(s) ago`);
      }
  }
function Comment({ comment }) {
    const nestedComments = (comment.children || []).map(data => {
      return <div  key={data.id} className="reply_">
                <Link  href="/user/[id]" as={`/user/${data.author}`} >
                  <a className="author">{data.author}</a>
                </Link>
                <Link href="/story/comment/[id]" as={`/story/comment/${comment.id}`}>
                    <a className="author time">{timeFormat(new Date() , comment.created_at_i)}</a>
                  </Link>
                <Comment comment={comment} type="child" />
              </div>
    })
    return (
        <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
          {/* outputs the comment text in the HTML format in which it was saved. this is the currentTime comment */}
          <div className="comment_div" dangerouslySetInnerHTML={{ __html: comment.text }}/>
          {/* <div>{comment.text}</div> */}
          <Link href="/">
            <a className="commentTime"> {comment.text ? "Reply": ""}</a>
          </Link>
          {nestedComments}
        </div>
      )
    }
const Comments = ({data})=>{
    console.log(data)
    if (!data){
      return <Error statusCode={404}/>
    }
    return(
        <Layout title="Comment M-News " description="efdchg fdjhx" >
            <div>
                <div className="comment_" dangerouslySetInnerHTML={{ __html: data.text }}/>
                <div className="comment_author" > <span>By</span>
                    <Link href="/user/[id]" as={`/user/${data.author}`}>
                        <a className="author first_">{data.author}</a>
                    </Link>
                </div>
                {
              data.children.map((comment) => {
                return (
                    <div key={comment.id} className="main_comment" >
                        <Link href="/user/[id]" as={`/user/${comment.author}`}>
                            <a className="author first_">{comment.author}</a>
                        </Link>
                        <Link href="/story/comment/[id]" as={`/story/comment/${comment.id}`}>
                            <a className="author time">{timeFormat(new Date() , comment.created_at_i)}</a>
                        </Link>
                        <Comment comment={comment} />
                    </div>
                )
              })
            }
            </div>
        </Layout>
    )
}
export async function getServerSideProps({ query}){
    // Fetch data from external API
    // console.log(query)
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${query.id}`)
  const data = await res.json()
    return{props:{data}}
}


export default Comments;