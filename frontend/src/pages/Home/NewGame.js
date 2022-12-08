import { useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DOMAIN } from "../../utils/helpers";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [level, setLevel] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    setLoading(true);
    axios({
      method: "POST",
      url: `${DOMAIN}/v1/games/`,
      data: {
        level: level,
        players: [
          {
            name: name,
            ready: 0,
            score: 0,
          },
        ],
        status: 0,
        question: {},
        start_time: null,
        created_time: null,
      },
    })
      .then((res) => {
        localStorage.setItem("uid", res.data.players[0]._id);
        navigate(`/lobby/${res.data._id}`);
      })
      .catch((err) => console.log(err.request));
  };

  return (
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
          Create a room, invite friend and play together.
        </Typography>
        <TextField
          fullWidth
          size="small"
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth size="small">
          <Select value={level} onChange={(e) => setLevel(e.target.value)}>
            <MenuItem value={0} disabled>
              Select Level
            </MenuItem>
            <MenuItem value={1}>Noob</MenuItem>
            <MenuItem value={2}>Pro</MenuItem>
            <MenuItem value={3}>God</MenuItem>
          </Select>
        </FormControl>
        <Button
          disableElevation
          disabled={loading ? true : !Boolean(name.length && level)}
          fullWidth
          size="small"
          type="submit"
          variant="contained"
        >
          {loading ? "Creating Room" : "Create a Room"}
        </Button>
      </Stack>
    </form>
  );
}
