import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';
import Error from 'next/error';
import StoryList from '../Component/storyList';
import Layout from '../Component/Layout';
import Link from 'next/link'
import {useState} from 'react';


export default function Home({stories, page, url}) {
  // console.log(page)
if (stories.length === 0){
  return(<Error statusCode = {503} />)
}
console.log(url)

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

          <StoryList stories={stories} page={page}/>
        </main>
        <div className="nav">
                <Link href="/">
                    <a>Prev</a>
                </Link>
                <p>Page {page}</p>
                <Link href={`/?page=${page + 1}`}>
                    <a>Next</a>
                </Link>
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
  let stories;
  let url
  try{
    console.log(query)
    page = Number(query.page) || 1;
   url = `https://node-hnapi.herokuapp.com/news?page=${page}`;
  // Call an external API endpoint to get posts.
  const response = await axios.get(url);
   stories = await response.data;
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
      page,
      url
    },
  }
}
