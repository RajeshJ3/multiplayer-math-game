import { useState } from "react";
import { WhatsappShareButton } from "react-share";

import { Button, Stack } from "@mui/material";

import { useDispatch } from "react-redux";
import { setGame } from "../../redux/game/gameSlice";

import axios from "axios";

import { DOMAIN } from "../../utils/helpers";

import Players from "./Players";

export default function PreGame({ game, id, uid }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const toggleReady = () => {
    setLoading(true);
    axios({
      method: "POST",
      url: `${DOMAIN}/v1/games/${id}/toggle-ready`,
      params: {
        player_id: uid,
      },
    })
      .then((res) => {
        dispatch(setGame(res.data));
        setLoading(false);
      })
      .catch((err) => console.log(err.request));
  };

  return (
    <>
      <Players players={game.players} />
      <Stack
        style={{
          width: "100%",
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          disableElevation
          variant="contained"
          color="info"
          onClick={() => window.location.replace("/")}
        >
          Back
        </Button>
        <Stack direction="row" spacing={2}>
          <WhatsappShareButton
            title={`Let's Play Multiplayer Math Game 🧠 Together, Click the *first link* to join 👇\n\n*Useful Links* 🔗\n\n*Join Match:* _${window.location.protocol}//${window.location.host}/join/${id}_\n\n*Back to Match:* ${window.location.protocol}//${window.location.host}/lobby/${id}\n\n*Results:*`}
            url={`${window.location.protocol}//${window.location.host}/result/${id}`}
          >
            Invite
          </WhatsappShareButton>
          <Button
            disableElevation
            disabled={
              loading ? true : (game.players && game.players.length) < 2
            }
            variant="contained"
            color={
              Boolean(game.players.filter((i) => i._id === uid)[0].ready)
                ? "error"
                : "success"
            }
            onClick={toggleReady}
          >
            {Boolean(game.players.filter((i) => i._id === uid)[0].ready)
              ? "Not Ready"
              : "Ready"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
