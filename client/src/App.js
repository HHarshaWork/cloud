// import { useState, useEffect } from "react";
// import axios from "axios";
import { Container, AppBar, Typography } from "@material-ui/core";
// import Box from "@material-ui/core/Box";

import logo from "./logo.PNG";
import EElogo from "./eagleEyeLogo.PNG";
// import background from "./Hero_EagleEye_757x350.jpg";
import background from "./transparent.png";
import "./App.css";
import useStyles from "./styles.js";

function App() {
  const classes = useStyles();

  return (
    <div
      className={classes.bkg}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Container maxWidth="lg">
        {/* <div className="App"> */}
        <div className={classes.app}>
          <AppBar className={classes.appBar} position="sticky" color="inherit">
            <a
              href="https://www.analog.com/en/index.html"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={classes.image}
                src={logo}
                alt="logo"
                height="75"
              ></img>
            </a>
            <Typography className={classes.heading} variant="h2">
              UPLOAD VIDEO
            </Typography>

            <a
              href="https://www.analog.com/en/applications/markets/intelligent-buildings-pavilion-home/building-sustainability/people-counting-technology.html"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={classes.image}
                src={EElogo}
                alt="Eagle Eye logo"
                height="75"
              ></img>
            </a>
          </AppBar>

          <body>
            <form method="POST" action="/home" enctype="multipart/form-data">
              <input type="file" name="file" />
              <input type="submit" value="Upload" />
            </form>
          </body>
        </div>
      </Container>
    </div>
  );
}

export default App;
