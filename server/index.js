//Module import for Cloud
import {
  StartInstancesCommand,
  StopInstancesCommand,
  EC2Client,
} from "@aws-sdk/client-ec2";
import { fromIni } from "@aws-sdk/credential-provider-ini";
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { createRequire } from "module";
// import path from "path";
// import fs from "fs";
const require = createRequire(import.meta.url);
const express = require("express");
const upload = require("express-fileupload");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const AWS = require("aws-sdk");
let ec2 = new AWS.EC2({ region: "us-east-1" });

//Setting up vars for cloud
const REGION = "us-east-1";
const ec2Client = new EC2Client({
  region: REGION,
  credentials: fromIni({ profile: "232771627109_ACSDevelopment" }),
});
const params = { InstanceIds: ["i-01fd8a62c489ad2ed"] }; // Array of INSTANCE_IDs

// const s3Client = new S3Client({
//   region: REGION,
//   credentials: fromIni({ profile: "232771627109_ACSDevelopment" }),
// });

const startInstance = async () => {
  try {
    const data = await ec2Client.send(new StartInstancesCommand(params));
    console.log("Success", data.StartingInstances);
    return data;
  } catch (err) {
    console.log("Error2", err);
  }
};

const stopInstance = async () => {
  try {
    const data = await ec2Client.send(new StopInstancesCommand(params));
    console.log("Success", data.StoppingInstances);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
const app = express();

app.use(upload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    name: "ADI",
  });
});

app.get("/download", (req, res) => {
  //res.send("<a href='./downloads/merged.h5' download>Click to Download </a>");
  res.download("./downloads/merged.h5");
});
// app.post("/home", upload1.single("file"), async (req, res) => {
app.post("/home", async (req, res) => {
  if (req.files) {
    // console.log(req.files);
    var file = req.files.file;
    file.path = "uploads/" + file.name;
    console.log(file);
    var filename = file.name;

    console.log(filename);
    console.log();
    console.log("Started the instance");
    file.mv("./uploads/" + filename, function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send(
          'Sending file to server. <br>The weights file will be downloaded on completion of training.<meta http-equiv = "refresh" content = "270; url = http://localhost:5000/download" />' // Configure time(in seconds) to redirect after training complete
        );
      }
    });
    console.log("Sending file to cloud");
    console.log();

    startInstance(); // Starting instances

    //upload file to cloud after ec2 instance started (2mins)
    setTimeout(() => {
      exec(
        `scp -i "cloud-train-deploy.pem" uploads\\${filename} ubuntu@52.87.24.98:/home/ubuntu/volume/feature_training/video`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          // console.log(`stdout: ${stdout}`);
          console.log("File sent to cloud. Training has started.");
          // res.send(`stdout: ${stdout}`);
        }
      );
    }, 100000); //120000);

    setTimeout(() => {
      exec(
        `scp -i "cloud-train-deploy.pem" ubuntu@52.87.24.98:/home/ubuntu/volume/feature_training/trained_weights/merged.h5 downloads`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          // console.log(`stdout: ${stdout}`);
          console.log("Weights received from cloud. Training has completed.");
          // res.send(`stdout: ${stdout}`);
        }
      );
    }, 300000); //1999999);

    //STOP INSTANCE AFTER 5mins #### FOR THE DEMO
    setTimeout(() => {
      stopInstance();
    }, 390000);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

//npm run devStart
