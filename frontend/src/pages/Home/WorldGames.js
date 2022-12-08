import { People, Cached } from "@mui/icons-material";
import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../utils/helpers";

export default function WorldGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "GET",
      url: `${DOMAIN}/v1/games/`,
    }).then((res) => {
      setLoading(false);
      setGames(res.data.payload);
    });
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${DOMAIN}/v1/games/`,
    }).then((res) => {
      setLoading(false);
      setGames(res.data.payload);
    });
  };

  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="flex-end">
        <IconButton disabled={loading} onClick={handleRefresh}>
          <Cached />
        </IconButton>
      </Stack>
      <List
        style={{
          width: "100%",
        }}
      >
        {loading ? (
          <center>Loading..</center>
        ) : games.length ? (
          games.map((game, index) => (
            <ListItem
              key={index}
              style={{
                width: "100%",
                borderBottom: "1px solid #999",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{
                  width: "100%",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <People fontSize="small" />
                  <Typography variant="body1" fontWeight={700}>
                    {game.players.length}
                  </Typography>
                </Stack>
                <Button
                  // endIcon={<ArrowRight />}
                  onClick={() => navigate(`/join/${game._id}`)}
                >
                  Join '{game.players[0].name}'
                </Button>
              </Stack>
            </ListItem>
          ))
        ) : (
          <>
            <center>Oops! no live games</center>
          </>
        )}
      </List>
    </Stack>
  );
}
