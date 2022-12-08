import { Container } from "@mui/material";

import Game from "../../components/Game";

export default function OngoingGame({ game, id, uid }) {
  return (
    <Container maxWidth="xs">
      <Game game={game} id={id} uid={uid} />
    </Container>
  );
}
