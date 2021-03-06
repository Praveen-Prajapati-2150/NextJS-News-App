import React from "react";
import styles from "../../styles/Feed.module.css"

export default function Feed({ pageNumber, articles }) {
    // console.log( articles, pageNumber);
  return <div className={styles.main}>
      {articles.map((article, index) => {
          <div key={index} className={styles.post} >
              <h1>{article.title}</h1>
              </div>
      })}
  </div>;
}

export const getServerSideProps = async (pageContext) => {
    const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );

  const apiJson = await apiResponse.json();

  console.log(apiJson);

  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};
