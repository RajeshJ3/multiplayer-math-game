import { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DOMAIN } from "../../utils/helpers";
import { setGame } from "../../redux/game/gameSlice";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Join() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    setLoading(true);
    axios({
      method: "POST",
      url: `${DOMAIN}/v1/games/${id}/join`,
      data: {
        name: name,
        ready: 0,
        score: 0,
        last_active: null,
      },
    })
      .then((res) => {
        dispatch(setGame(res.data));
        const uid = res.data.players.filter((i) => i.name === name)[0]._id;
        localStorage.setItem("uid", uid);
        navigate(`/lobby/${res.data._id}`);
      })
      .catch((err) => {
        err = JSON.parse(err.request.response);
        setError(err.details);
        setLoading(false);
      });
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
        <form
          style={{
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <Stack
            direction="column"
            style={{
              width: "100%",
            }}
            spacing={3}
          >
            <Typography variant="caption" align="center">
              Join the room and play together.
            </Typography>
            <TextField
              fullWidth
              error={Boolean(error)}
              helperText={error}
              size="small"
              label="Your Name"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setError(null);
                setName(e.target.value);
              }}
            />
            <Button
              disableElevation
              disabled={loading ? true : !Boolean(name.length)}
              fullWidth
              size="small"
              type="submit"
              color="success"
              variant="contained"
            >
              {loading ? "Joining Room" : "Join Room"}
            </Button>
            <Divider />
            <Button
              disableElevation
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              onClick={() => window.location.replace("/")}
            >
              Create a Room
            </Button>
          </Stack>
        </form>
        <div></div>
      </Stack>
    </Container>
  );
}
