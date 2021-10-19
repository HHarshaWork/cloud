import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 10,
    margin: "0px 15px 50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#59D7EE",
  },
  heading: {
    color: "#ffffff",
    fontSize: "55px",
    fontWeight: "bold",
    textShadow: "2px 2px 5px #1e4056",
  },
  image: {
    marginLeft: "15px",
    marginRight: "15px",
  },
  app: {
    textAlign: "center",
  },
  bkg: {
    height: "97vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: "#dff3f7", //"#D5F5FF"
  },
}));
