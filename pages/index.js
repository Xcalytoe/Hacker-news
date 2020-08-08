import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Error from 'next/error';
import StoryList from '../Component/storyList';
import Layout from '../Component/Layout';
import Link from 'next/link'
import {useState} from 'react';


export default function Home({stories, page, url}) {
  // console.log(stories)
// if (stories.length === 0){
//   return(<Error statusCode = {503} />)
// }
// console.log(url)

  return (
    <Layout title="M-News" description ="A learning project for cosmas meche on next js">
      <div className={styles.container}>
        <Head>
          {/* <title>M-news</title> */}
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h4 className="head_title">
            Welcome to M-News highlights
          </h4>

          <StoryList stories={stories}/>
        </main>
        <div className="nav">
                <Link href="/">
                    <a>Prev</a>
                </Link>
                {/* <p>Page {page}</p>
                <Link href={`/?page=${page + 1}`}>
                    <a>Next</a>
                </Link> */}
            </div>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
      <style jsx>
        {
          `
          main{
            padding-top:0;
          }
          `
        }
      </style>
    </Layout>
  )
}
export async function getStaticProps(query) {
  let page;
  let stories = [];
  let url
  try{
    // console.log(query)
    // page = Number(query.page) || 1;
   url = `https://hacker-news.firebaseio.com/v0/topstories.json`;
  // Call an external API endpoint to get posts.
  const response = await axios.get(url);
  //  let storiesId = await response.data.slice(0, 10);
  let storiesId  = await response.data.slice(0, 20);
   for (let story of storiesId){
    // try{
      // console.log(story);
     url = `https://hacker-news.firebaseio.com/v0/item/${story}.json`;
    // Call an external API endpoint to get posts.
    let response2 = await axios.get(url);
     let returnedStories = await response2.data;
      stories.push(returnedStories)
    //  console.log(stories);
  
    // }catch(err){
    //   console.log(err);
    //   stories =[];
    // }
   }
  //  console.log(stories);

  }catch(err){
    console.log(err);
    stories =[];
  }
  // You can use any data fetching library


  // By returning { props: posts }, the Blog component
  // will receive `stories` as a prop at build time
  return {
    props: {
      stories,
      // page,
      // url
    },
  }
}
