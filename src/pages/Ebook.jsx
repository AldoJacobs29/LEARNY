import { useEffect, useState } from "react";
// import { ebooklist } from "../config/dataebook";
import EbookList from "../components/EbookList";
import HeaderEbook from "../components/HeaderEbook";
// import SearchBar from "../components/Home/SearchBar";
import EmptyList from "../components/common/EmptyList";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";

function Ebook() {
  const [ebooks, setEbooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   handleSearchResults();
  // };

  // const handleSearchResults = () => {
  //   const allEbooks = ebooklist;
  //   const filteredEbooks = allEbooks.filter((ebook) =>
  //     ebook.category.toLowerCase().includes(searchKey.toLowerCase().trim())
  //   );

  //   setEbooks(filteredEbooks);
  // };

  // const handleClearSearch = () => {
  //   setEbooks(ebooklist);
  //   setSearchKey("");
  // };

  useEffect(() => {
    const getAPI = async () => {
      try {
        const response = await axios.get(
          "https://6489db485fa58521cab0607f.mockapi.io/ebook"
        );
        setEbooks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getAPI();
  }, []);

  let listBooks = ebooks;

  if (searchBooks.length > 0) {
    listBooks = listBooks.filter((i) =>{
      return i.title.toLowerCase().match(searchBooks.toLowerCase())
    })
  }

  return (
    <div>
      <HeaderEbook />
      <div className="ebook-container">
        {/* <SearchBar
          value={searchKey}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchSubmit}
          handleSearchKey={(e) => setSearchKey(e.target.value)}
        /> */}

        <InputGroup className="mb-3 w-25 mx-auto my-5">
          <Form.Control
            placeholder="Search"
            type="text"
            value={searchBooks}
            onChange={(e) => setSearchBooks(e.target.value)}
          />
          <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
        </InputGroup>

        {isLoading ? (
          <p>Loading...</p>
        ) : ebooks.length ? (
          <EbookList ebooks={listBooks} />
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
}

export default Ebook;
