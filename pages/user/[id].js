const { default: Layout } = require("../../Component/Layout")

const User =({data})=>{
    console.log(data)
    return(
        <Layout title="User M-News " description="efdchg fdjhx" >
            <div>
                <p>Username:<span> {data.username}</span></p>
                <p>karma: <span>{data.karma}</span></p>
                <p>User Id: <span>{data.id}</span></p>
                <p>Number of comments: <span>{data.comment_count}</span></p>
                <p>Number of submission: <span>{data.submission_count}</span></p>

            </div>
        </Layout>
    )
}

// export async function getStaticPaths(){
//     const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
//     let users = await res.json();
//     // limit to only 20 
//     let usersMax = await users.slice(0, 20);
//     // find author for each story 
//     let storyApi = [];
//     for (let author of usersMax){
//         const fetchUId = await fetch(`https://hn.algolia.com/api/v1/items/${author}`);
//          let story = await fetchUId.json();
//          storyApi.push({"id" : story.author})
//     }
//     let usersId = [];
//     // loop through the users and store in "usersId" array 
//     // for(let user of storyApi){
//     //     usersId.push({"id" : user.author})
//     // }
//     console.log(storyApi)

//     const paths = storyApi.map((post)=>({
//         params: { id: post.id } 
//     }))
//     // console.log(paths)

//       // { fallback: false } means other routes should 404.
//     return { paths, fallback: true }
// }

// export async function getStaticProps({params}){
//     const res = await fetch(`https://hn.algolia.com/api/v1/users/${params.id}`);
//     const pathId = await res.json();

//     return {props: { pathId }}
// }
export async function getServerSideProps({ query}){
    // Fetch data from external API
  const res = await fetch(`https://hn.algolia.com/api/v1/users/${query.id}`)
  const data = await res.json()
    return{props:{data}}
}
export default User;