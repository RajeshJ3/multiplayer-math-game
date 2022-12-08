import { useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import PreGame from "./PreGame";

export default function Lobby() {
  const [uid] = useState(localStorage.getItem("uid"));

  const gameStore = useSelector((store) => store.game);
  const game = gameStore.game;

  const { id } = useParams();

  const RenderGameState = (props) => {
    switch (game.status) {
      case 1:
        window.location.replace(`/room/${id}`);
        return <></>;
      case 2:
        window.location.replace(`/result/${id}`);
        return <></>;
      default:
        return <PreGame {...props} />;
    }
  };

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
        {gameStore.loading ? (
          <Typography variant="caption" align="center">
            loading..
          </Typography>
        ) : (
          <RenderGameState game={game} id={id} uid={uid} />
        )}
      </Stack>
    </Container>
  );
}
