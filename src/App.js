import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import Tracks from "./Tracks";

const App = () => {
  const CLIENT_ID = "CLIENT ID";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const BASE_URL = "https://api.spotify.com/v1/";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [playlistData, setPlaylistData] = useState({
    selectedPlaylist: "",
    availablePlaylist: [],
  });
  const [playlistTracks, setPlaylistTracks] = useState({
    selectedPlaylist: "",
    selectedTracks: [],
  });

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
    }
    setToken(token);
  });
  const showMyPlaylist = async (e) => {
    const { data } = await axios.get(`${BASE_URL}me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    setPlaylistData({
      selectedPlaylist: "",
      availablePlaylist: data.items.map((item) => item.name),
    });
    console.log(playlistData);
  };

  const changePlaylist = (val) => {
    setPlaylistData({
      selectedPlaylist: val,
      availablePlaylist: playlistData.availablePlaylist,
    });
  };

  const logout = () => {
    setToken("");
  };

  return (
    <div className="App">
      <h1>Spotify playlist sorter</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to spotify
        </a>
      ) : (
        <form onSubmit={showMyPlaylist}>
          <Dropdown
            options={playlistData.availablePlaylist}
            selectedValue={playlistData.selectedPlaylist}
            changed={changePlaylist}
          />
          <input
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          ></input>
          <button type="submit">Search</button>
          <button type="button" onClick={showMyPlaylist}>
            Show playlist
          </button>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
          <div>{}</div>
        </form>
      )}
    </div>
  );
};

export default App;
