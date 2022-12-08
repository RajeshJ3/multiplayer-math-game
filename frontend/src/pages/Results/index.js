import { Typography, Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

export default function Results() {
  const gameStore = useSelector((store) => store.game);
  const game = gameStore.game;

  const getScoreColor = (index) => {
    switch (index) {
      case 0:
        return "#00802b";
      case 1:
        return "#999900";
      case 2:
        return "orange";
      default:
        return "#ff3300";
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
          <Stack direction="column" spacing={1} style={{ width: "90%" }}>
            <Typography variant="h5" align="center" fontWeight={700}>
              Results
            </Typography>
            <Box sx={{ width: "100%", bgcolor: "#e9e9e9" }}>
              <List component="nav">
                {game.players
                  .filter((i) => i.score !== 0)
                  .sort((a, b) => a.score - b.score)
                  .map((player, index) => (
                    <ListItemButton key={index}>
                      <Stack
                        style={{
                          width: "100%",
                        }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <>
                          <Typography fontWeight={700}>
                            {index + 1}. &nbsp;
                          </Typography>
                          <ListItemText primary={player.name} />
                        </>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color={getScoreColor(index)}
                        >
                          {player.score
                            ? `${player.score} seconds`
                            : "still playing.."}
                        </Typography>
                      </Stack>
                    </ListItemButton>
                  ))}
                {game.players
                  .filter((i) => i.score === 0)
                  .map((player, index) => (
                    <ListItemButton key={index * 1000}>
                      <Stack
                        style={{
                          width: "100%",
                        }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <>
                          <Typography fontWeight={700}>? &nbsp;</Typography>
                          <ListItemText primary={player.name} />
                        </>
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          color={"#000"}
                        >
                          still playing..
                        </Typography>
                      </Stack>
                    </ListItemButton>
                  ))}
              </List>
            </Box>
            <br />
            <Button
              disableElevation
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              onClick={() => window.location.replace("/")}
            >
              Create new Room
            </Button>
          </Stack>
        )}
        <div></div>
      </Stack>
    </Container>
  );
}
