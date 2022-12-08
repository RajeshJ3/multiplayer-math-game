import { Container, Box, Stack, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";

import NewGame from "./NewGame";
import WorldGames from "./WorldGames";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{
        width: "100%",
      }}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          style={{
            width: "100%",
          }}
        >
          <Typography variant="h3" align="center" fontWeight={900} pt={7}>
            Multiplayer Math Game
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Create Room" {...a11yProps(0)} />
              <Tab label="Join a Game" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <NewGame />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WorldGames />
          </TabPanel>
        </Stack>
      </Stack>
    </Container>
  );
}
