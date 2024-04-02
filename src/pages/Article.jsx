import {useEffect, useState} from "react";
// import {articlelist} from "../config/dataarticle";
import ArticleList from "../components/ArticleList";
import HeaderArticle from "../components/HeaderArticle";
// import SearchBar from "../components/Home/SearchBar";
import EmptyList from "../components/common/EmptyList";
import axios from "axios";
import "../style/Article.css";
// import ArticleItem from "../components/ArticleList/ArticleItem";
import { Form, InputGroup } from "react-bootstrap";

function Article() {
  const [articles, setArticles] = useState([]);
  const [searchArticles, setSearchArticles] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   handleSearchResults();
  // };

  // const handleSearchResults = () => {
  //   const allArticles = articlelist;
  //   const filteredArticles = allArticles.filter((article) => article.category.toLowerCase().includes(searchKey.toLowerCase().trim()));

  //   setArticles(filteredArticles);
  // };

  // const handleClearSearch = () => {
  //   setArticles(articlelist);
  //   setSearchKey("");
  // };

  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await axios.get("https://64833958f2e76ae1b95c29a5.mockapi.io/articles");
        setArticles(response.data);
        // console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getAPI();
  }, []);

  let listArticles = articles;

  if (searchArticles.length > 0) {
    listArticles = listArticles.filter((i) =>{
      return i.title.toLowerCase().match(searchArticles.toLowerCase())
    })
  }

  return (
    <div>
      <HeaderArticle />
      <div className="container article">
        {/* <SearchBar value={searchKey} clearSearch={handleClearSearch} formSubmit={handleSearchSubmit} handleSearchKey={(e) => setSearchKey(e.target.value)} /> */}

        <InputGroup className="mb-3 w-25 mx-auto my-5">
          <Form.Control
            placeholder="Search"
            type="text"
            value={searchArticles}
            onChange={(e) => setSearchArticles(e.target.value)}
          />
          <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
        </InputGroup>

        {isLoading ? <p>Loading...</p> : articles.length ? <ArticleList articles={listArticles} /> : <EmptyList />}
      </div>
    </div>
  );
}

export default Article;
