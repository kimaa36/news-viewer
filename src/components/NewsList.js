import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from 'components/NewsItem';
import axios from 'axios';

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f34737c157f04020b28f9deba9877cf5`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  // 대기 중일때 로딩창 로직
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  // 아티클이 없을 때
  // 밑에 코드는 맵함수 사용시에 null값인지 아닌지 먼저 조회를 하는 과정이 필요
  // 이게 없으면 null에는 map이 없기 때문에 에러
  if (!articles) {
    return null;
  }
  //아티클이 유효할 때
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default NewsList;