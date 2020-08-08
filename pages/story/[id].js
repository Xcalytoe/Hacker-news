import axios from 'axios';
import Error from 'next/error';
import Link from 'next/link';
import Layout from '../../Component/Layout';

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
      return (`${newDay - commentTimeDay} Days(s) ago`);
    }else if((newHour > commentTimeHour) && (newDay === commentTimeDay) && (commentTimeMonth === newMonth) && (commentTimeYear === newYear)){
      return (`${newHour - commentTimeHour} Hour(s) ago`);
    }else if((newMin > commentTimeMin) && (commentTimeHour === newHour) && (newDay === commentTimeDay) && (commentTimeMonth === newMonth) && (commentTimeYear === newYear)  ){
      return (`${newMin - commentTimeMin} Minute(s) ago`);
    }else{
      return (`${newSec - commentTimeSec || 1} Second(s) ago`);
    }
}
function Comment({ comment }) {
  const nestedComments = (comment.children || []).map(comment => {
    return <div  key={comment.id} className="reply_">
              <Link href="/">
                <a className="author">{comment.author}</a>
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

const Story = ({post})=>{
  // console.log(post)
    return(
      <div>
        <Layout title="Story M-News " description ={post.title}>
          <div className="story_container">
            <a href={post.url} className="title" target="_blank">{post.title}</a>
            <div>
              <span className="author_">Posted by 
                <Link href="/user/[id]" as={`/user/${post.author}`}>
                  <a>{post.author}</a>
                </Link>
              </span>
              <Link href="/user/[id]" as={`/user/${post.author}`}>
                  <a className="duration_">{timeFormat(new Date() , post.created_at_i)}</a>
                </Link>
            </div>
            {
              post.children.map((comment) => {
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
      <style jsx global >
        {
          `
          .story_container .title{
            font-size: 26px;
            font-weight:bold;
            color: hsl(210,25%,40%);
            display:inline-block;
            margin-bottom:0.6rem;
          }
          .story_container span.author_{
            color: hsl(185,12%,40%);
            font-size: 14px;
            display:inline-block;
            margin-bottom:1rem;
          }
          .story_container span.author_ a, .story_container a.duration_{
            margin-left:5px;
            color: hsl(185,12%,40%);
            display:inline-block;
          }
          .story_container a.duration_{
            font-size:14px;
            position:relative;
            margin-left:25px;
          }
          .story_container a.duration_:before{
            content:"";
            position:absolute;
            left:-10px;
            height:20px;
            border-left:1px solid hsl(185, 12%, 30%);
          }
          .story_container span.author_ a:hover, .story_container a.duration_:hover{
            text-decoration:none;
          }
          .reply_ {
            position:relative;
          }
          .reply_:before{
            position:absolute;
            content:"";
            left:-5px;
            top:40px;
            height:calc(100% - 40px);
            border-left:0.5px dashed hsl(185, 12%, 80%);
          }
          .main_comment a.first_:first-of-type{
            position:relative;
          }
          .main_comment a.first_:first-of-type:before{
            position:absolute;
            content:"";
            left: -15px;
            top: 9px;
            width: 15px;
            height: auto;
            border-bottom: 1px solid hsl(185,12%,40%);
          }
          .story_container{
            max-width:800px;
            margin:0 auto; 
            padding:20px;
            background:hsl(210, 40%, 98%);
          }
          .story_container .author{
              color:hsl(185, 12%, 60%);
              color:hsl(185, 12%, 40%);
              font-size:13px;
              display:inline-block;
              margin-top:20px;
          }
          .story_container .author.time{
            margin-left:10px;
          }
          .story_container .author:hover{
            text-decoration:underline;
          }
          .story_container p{
            font-size:14px;
            margin-bottom:0.5rem;

          }
          .story_container .commentTime{
            font-size:12px;
            text-decoration:underline;
            display:inline-block;
            margin-bottom:10px;
          }
          .story_container .commentTime:hover{
            text-decoration:none;
          }
          .story_container p:first-of-type{
            margin-top:0.5rem;
          }
          .story_container .comment_div{
            margin-bottom:0.3rem;
          }
          `
        }
      </style>
    </div>
 
    )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get postshttp://hn.algolia.com/api/v1/search?tags=front_page

  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  const posts = await res.json();
  let storiesId  = await posts.slice(0, 20);
  let postId = [];
  for (let storyId of storiesId){
    postId.push({"id":storyId.toString()})
  }

  console.log(postId)
  // console.log(posts)

  // Get the paths we want to pre-render based on posts
  const paths = postId.map((post) => ({
    params: { id: post.id },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://hn.algolia.com/api/v1/items/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

export default Story;