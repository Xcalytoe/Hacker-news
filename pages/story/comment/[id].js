const { default: Layout } = require("../../../Component/Layout")

const Comment = ({pathId})=>{
    console.log(pathId)
    return(
        <Layout title="Comment M-News " description="efdchg fdjhx" >
            <div>
                comment
            </div>
        </Layout>
    )
}
export async function getStaticPaths(){
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    let comments = await res.json();
    // lemit to only 20 
    let commentMax = await comments.slice(0, 20);
    let commentsId = [];
    // loop through the comment and store in "commentsId" array 
    for(let comment of commentMax){
        commentsId.push({"id" : comment.toString()})
    }
    const paths = commentsId.map((post)=>({
        params: { id: post.id }
    }))
      // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({params}){
    console.log(params)

    const res = await fetch(`https://hn.algolia.com/api/v1/items/${params.id}`)
    const pathId = await res.json()

    return {props: { pathId }}
}
export default Comment;