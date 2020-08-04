import Link from 'next/link';
import Head from 'next/head';
// const { default: Link } = require("next/link")

const Layout = ({children, title, description})=>{
// console.log(description)
    return(
        <div className="main_container">
            <Head>
                 <link href="https://fonts.googleapis.com/css?family=Leckerli+One&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet"/>

                <title>{title}</title>
                <meta content="M-news" description={description}/>
            </Head>
            <div className="navHeader">
                <nav>
                    <Link href="/">
                    <a> <span className="logo">M</span>- News</a>
                    </Link>
                </nav>
            </div>
            <div className="body">
                {children}
            </div>

            <style global jsx>
                {
                    `
                    .head_title{
                        font-size:32px;
                        color:hsl(185, 22%, 50%);
                        color:hsl(210,25%,40%);
                        text-decoration:underline;
                    }
                    .navHeader{
                        position: sticky;
                        position: -webkit-sticky;
                        top:0;
                        z-index:1000;
                    }
                    nav{
                        background:hsl(210, 100%, 90%);
                        // max-width:800px;
                        margin:0 auto;
                        margin-bottom:40px;
                        padding:15px;
                        font-family: 'lato', sans-serif;

                    }
                    .main_container{
                        max-width:800px;
                        margin:0 auto; 
                        background:hsl(210, 40%, 98%);
                    }
                    .body{
                        padding:15px;
                    }
                    nav .logo{
                        display:inline-block;
                        padding:3px 8px;
                        padding-right:10px;
                        border-radius:4px;
                        background:hsl(210, 100%, 40%);
                        font-style:italic;
                        color:#fff;
                        font-size:22px;
                        font-weight:bold;
                        font-family: 'Leckerli One', cursive;
                    }
                    `
                }
            </style>
        </div>
    )
}
export default Layout;