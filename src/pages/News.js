import React, { useEffect, useState } from 'react';
import apiClient from '../services/ApiClient';
import '../css/News.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient('articles')
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="news-container">
      {articles.map((article, index) => (
        <div key={index} className="article">
          <img src={article.image} alt={article.title} className="article-image" />
          <h2 className="article-title">{article.title}</h2>
          <p className="article-description">{article.description}</p>
          <button onClick={() => window.open(article.link, '_blank')} className="read-more-button">Read more</button>
        </div>
      ))}
    </div>
  );
}

export default News;