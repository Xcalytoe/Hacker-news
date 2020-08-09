const { default: Layout } = require("../../Component/Layout")

const User =({pathId})=>{
    console.log(pathId)
    return(
        <Layout title="User M-News " description="efdchg fdjhx" >
            <div>
                user
            </div>
        </Layout>
    )
}

export async function getStaticPaths(){
    const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    let users = await res.json();
    // limit to only 20 
    let usersMax = await users.slice(0, 20);
    let usersId = [];
    // loop through the users and store in "usersId" array 
    for(let user of usersMax){
        usersId.push({"id" : user.toString()})
    }
    const paths = usersId.map((post)=>({
        params: { id: post.id }
    }))
      // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export async function getStaticProps({params}){
    const res = await fetch(`https://hn.algolia.com/api/v1/users/${params.id}`);
    const pathId = await res.json();

    return {props: { pathId }}
}
export default User;