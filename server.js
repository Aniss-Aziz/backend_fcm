const express = require("express");
const { GoogleAuth } = require("google-auth-library");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*", // Autoriser toutes les origines
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

const keyFile = path.join(__dirname, "pwa-test-a706a-a5bc77c95ff1.json");

app.post("/getAccessToken", async (req, res) => {
  try {
    const auth = new GoogleAuth({
      keyFilename: keyFile,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    if (!accessToken) {
      return res.status(500).send("Failed to retrieve access token");
    }

    res.json({ accessToken: accessToken.token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
