import Link from 'next/link';
// import {useState} from 'react';

const StoryList = ({stories, page})=>{
    // console.log(page);
    return(
        <div className="stories">
            <div>
                {stories.map((data, index) =>(
                    <div className="story_container" key={data.id}>
                        <div className="header_title">
                            <span className="index">{index + 1}.</span>
                            <a href={data.url} className="title" target="_blank">{data.title}</a>
                            <a href={`https://${data.domain}`} className="domain" target="_blank">({data.domain})</a>
                        </div>
                    <div>
                            <span className="points">{data.points || 0} points</span>
                            <Link href="/story/[id]" as={`/story/${data.id}`}>
                                <a className="comments">{data.comments_count || 0} comments</a>
                            </Link>
                    </div>
                        <p className="user">By {data.user}</p>
                        <p className="time">{data.time_ago}</p>
                    </div>
                ))}
            </div>
        
        <style jsx>
           { `
           .nav{
               display:-webkit-flex;
               display:flex;
               justify-content:space-between;
               align-items:center;
               padding:30px 20px;
               border:1px solid;
           }
           .nav a{
               display:inline-block;
           }
           .header_title{
                margin-bottom:10px;
           }
           a:hover{
               text-decoration:underline;
           }
           .domain{
                color:hsl(185, 12%, 60%);
                font-size:14px;
           }
            .stories{
                max-width:800px;
             
                margin:80px auto;
            }
            .story_container{
                margin:25px 0;
                margin-left:18px;
            }
            .points{
                font-size:14px;
            }
            .index{
                // font-size:14px;
                margin-left:-15px;
                left:-8px;
                position:relative;
                display:inline-block;
            }
            .title{
                color:#279ba5;
                font-size:22px;
                display:inline-block;
                margin-right:8px;
            }
            p.user{
                color:hsl(185, 22%, 40%);
                font-size:14px;
                margin:5px 0 8px 0;
            }
            .comments{
                color:hsl(245, 100%, 25%);
                font-size:14px;
                display:inline-block;
                margin-left:10px;
            }
            p.time{
                color:hsl(185, 15%, 70%);
                font-size:12px;
                margin:5px 0 8px 0;
            }
            `}
        </style>
        </div>
    )
}
export default StoryList;