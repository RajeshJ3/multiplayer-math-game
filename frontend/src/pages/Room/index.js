import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Stack, Typography } from "@mui/material";

import OngoingGame from "./OngoingGame";
import axios from "axios";
import { DOMAIN } from "../../utils/helpers";

export default function Lobby() {
  const [uid] = useState(localStorage.getItem("uid"));

  const [game, setGame] = useState({});
  const [loading, setLoading] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/v1/games/${id}`,
    }).then((res) => {
      setGame(res.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <Container maxWidth="xs">
      <Stack
        style={{
          minHeight: "90vh",
          height: "100%",
        }}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        <Typography variant="h3" align="center" fontWeight={900} pt={7}>
          Multiplayer Math Game
        </Typography>
        {loading ? (
          <Typography variant="caption" align="center">
            loading..
          </Typography>
        ) : (
          <OngoingGame game={game} id={id} uid={uid} />
        )}
        <div></div>
      </Stack>
    </Container>
  );
}
