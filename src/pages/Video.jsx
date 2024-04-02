/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import EmptyList from "../components/common/EmptyList";
import VideoList from "../components/Home/VideoList";
import Header from "../components/Home/HeaderVideo";
// import SearchBar from '../components/Home/SearchBar';
import {videoList} from "../config/datavideo";
import {Form, InputGroup} from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState("");

  useEffect(() => {
    navigate("/video");
    setVideos(videoList);
  }, []);

  // Search submit
  // const handleSearchBar = (e) => {
  //   e.preventDefault();
  //   handleSearchResults();
  // };

  // Search for video by category
  // const handleSearchResults = () => {
  //   const allVideos = videoList;
  //   const filteredVideos = allVideos.filter((video) =>
  //   video.category.toLowerCase().includes(searchKey.toLowerCase().trim())
  //   );
  //   setVideos(filteredVideos);
  // };

  // Clear search and show all videos
  // const handleClearSearch = () => {
  //   setVideos(videoList);
  //   setSearchKey('');
  // };

  let listVideos = videos;

  if (searchVideos.length > 0) {
    listVideos = listVideos.filter((i) =>{
      return i.title.toLowerCase().match(searchVideos.toLowerCase())
    })
  }

  return (
    <div>
      {/* Page Header */}
      <Header title="All Videos" description="Watch videos that can help you and improve your programming skills" />

      <div id="sectionvid">
        {/* Search Bar */}
        {/* <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      /> */}

        <InputGroup className="mb-3 w-25 mx-auto my-5">
          <Form.Control placeholder="Search" type="text" value={searchVideos} onChange={(e) => setSearchVideos(e.target.value)} />
          <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
        </InputGroup>

        {/* Video List & Empty View */}
        {!videos.length ? <EmptyList /> : <VideoList videos={listVideos} />}
      </div>
    </div>
  );
};

export default Home;
