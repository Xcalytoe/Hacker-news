import axios from 'axios';
import Error from 'next/error';


const Story = ({post})=>{
  console.log(post)
    return(
        <div>
            Story
        </div>
    )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }))
  console.log(paths)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  console.log(params)
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=1/story/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
}

// export async function getStaticPaths() {
//   let stories;
//   let url
//   try{
//       console.log(query)
//       // page = Number(query.page) || 1;
//       url = `https://node-hnapi.herokuapp.com/news?page=1`;
//       // Call an external API endpoint to get posts.
//       const response = await axios.get(url);
//       stories = await response.data;
//   }catch(err){
//       console.log(err);
//       stories = null;
//   }
//   const storyId = stories.map((storyid) => ({
//     params: { id: storyid.id }
//   }))
//   console.log(storyId)


//   // fallback: false means pages that don’t have the
//   // correct id will 404.
//   return { storyId, fallback: false }
// }
// params will contain the id for each generated page.
// export async function getStaticProps({ params }) {
//   return {
//     props: {
//       storyId: await getProductFromDatabase(params.id)
//     }
//   }
// }

export default Story;