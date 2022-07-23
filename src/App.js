import React, { useEffect } from "react";
import Login from "./components/Login";
import Player from "./components/Player"
import { useStateProvider } from "./utils/StateProvider";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
   
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ 
          type: "SET_TOKEN", 
          token: token , 
        });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return (
    <div>{token ? <Player /> : <Login />}</div>
    );
}