import { CheckCircle, Cancel } from "@mui/icons-material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function Players({ players }) {
  return (
    <Box sx={{ width: "100%", bgcolor: "#e9e9e9" }}>
      <List component="nav" aria-label="main mailbox folders">
        {players.map((player, index) => (
          <ListItemButton key={index}>
            <ListItemIcon>
              {player.ready ? (
                <CheckCircle color="success" />
              ) : (
                <Cancel color="error" />
              )}
            </ListItemIcon>
            <ListItemText primary={player.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
