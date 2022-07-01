import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {

    const[articles , setArticles] = useState([]);
    const[loading , setLoading] = useState(true);
    const[page , setPage] = useState(1);
    const[totalResults , setTotalResults] = useState(0);

    const captaliseFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
     
    const  updateNews = async() =>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
        setLoading({loading:true});
        let data = await fetch(url);
        props.setProgress(40);
        let parseData = await data.json();
        console.log(parseData);
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);

    }

    useEffect(()=>{
        updateNews();
        document.title = `NewsMonkey - ${captaliseFirstLetter(props.category)}`;
    });
    
    const fetchMoreData = async() => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pagesize}`;
        setPage( page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
       };


  return (
    <>
       <h1 className='text-center '>NewsMonkey- Top Headling on {captaliseFirstLetter(props.category)} </h1>
          {loading && <Spinner/>} 
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            <div className="container">

            
          <div className='row'>
          {articles.map((element)=>{
             return  <div className='col-md-4' key={element.url}>
              <NewsItem  title={element.title?element.title.slice(0, 45):" "} description={element.description?element.description.slice(0, 88):" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
              })}   
          </div>
          </div>
          </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
    country: "in",
    pagesize: 9,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
 }


export default News
