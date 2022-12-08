import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setGame, setLoading } from "../redux/game/gameSlice";

import axios from "axios";
import { DOMAIN } from "../utils/helpers";

export default function GameWrapper({ children }) {
  const { id } = useParams();
  const uid = localStorage.getItem("uid") ? localStorage.getItem("uid") : null;
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/v1/games/${id}`,
      params: {
        player_id: uid,
      }
    }).then((res) => {
      dispatch(setLoading(false));
      dispatch(setGame(res.data));
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      axios({
        method: "GET",
        url: `${DOMAIN}/v1/games/${id}`,
        params: {
          player_id: uid,
        },
      }).then((res) => {
        dispatch(setLoading(false));
        dispatch(setGame(res.data));
      });
    }, 1500); // TODO: change the interval

    return () => clearInterval(interval);
  });

  return children;
}
