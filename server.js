const express = require("express");
const { GoogleAuth } = require("google-auth-library");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const fs = require("fs");

dotenv.config();
app.use(
  cors({
    origin: "*", // Autoriser toutes les origines
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

// const keyFile = path.join(__dirname, "pwa-test-a706a-a5bc77c95ff1.json");
const credentials = {
  type: (string = "service_account"),
  project_id: (string = "pwa-test-a706a"),
  private_key_id: (string = "a5bc77c95ff18b120215e272b0a34214af261465"),
  private_key: (string =
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOS/E9nHhJMLyY\n6U/USX7Zoy5njZBMk+iBPvdH82HHa+NnFD9sYVv1FX8WT9A77nNkqxi/fJyToM2S\nsgQ/Rl+BJQW4iUoavux/I1N4LXw3SP+D+G9f1P6JOsfF1dIb/oBg0/EQtDn+REQ1\nUYRbhQDjXnRqjGwqMvO76s9YWRpnj4YvapVpwYFX0BjLvZT5nW/ePw7mJrBYcac0\nMOHEWNPJUppVBs8CxLCIrDsoclza+nXyDFrdcTmiCWyPz2xLqaPhq4fNe6CP7LcF\nyUhf7U5aRe8W32WTeLPX1o7ewQVZa4Fvw1tIk/fKRvw/C9Y4r8U5efCJdspqjPgE\nGq0oHSpfAgMBAAECggEAAJ6/0eSXg/jOiFMjN0slQ3g3Gn6VcXV8XG8ZBTFZGOVd\nIKEx85xzT1BKOoHw6U01MZdGEsVIHzV7iLZaRupqPRQkaUKYY24xfcxYYuMYHX5t\nrjLf+tTEExuHIDQdVpI0RpY8gkVYa0g/QD3HfRLwRr6w8OUNKi9PBkCVcPmLl8YY\nSnjYVecGnn27Na4tHtk2YSu/GaH7HzlBBtjA2XKt00OLc0+Utl9sIIRncfA/CHGD\n9IfJwIraw1bfB6o7Vh3Ih/0g3oVuXoASVFxG2KLjGiKNmEkeV53QuyNhcwbxCsuT\nRQp70g1GnFkLI/SFoNyS06VT4fzqiLzhdO5wYK47WQKBgQDmx+ZAOmFbHubSMeb+\nShlO3YwutAW5IqTp3IjV+11mFCtxSr9326TRAQlSWxxxlB88SS99sAosloteXrZA\ncn1SntQ0dNfldadUOEvaq5z3Ln0/H0RItXB+2XaDCfpUudgxt/JlAD0hdkqB8me7\nL2tUyOH5etS9yK2C7gx/G2M0bQKBgQDk1xi5kveDHSqjoSI3yl9yX2XagUreQQGx\nhB/+h1Ijtfi/+AuImAFV3LZzZxOumpxU46xqZH4LflKxOyd2xDnFNkndjDqdTa2R\nBeE4icbvLtS730m6c0TU5D1+9MFm5PIXCgE5KQa1B8P3DWeSF0ykImxlGpb5lvAZ\nEP4vMZ6iewKBgHwHt1GRjr1AMGGLfE/yVwOxwiNfkSvc2LDvW4NVYu73rBlpSNoL\n69qAKhhe6zyHlPn7g1CTigRIrIJ9eInOflgnEHlYyqeBwfpbfzj4vpWCIMIJ9dL1\n4I3sJetrM2TRtMWTzOxHYpNXVdfdBa7uX0rj478HKssMzWPuuDyf5YNJAoGBAIyD\nKtJf1Iz0bscUXL9nCt5eh1r4wrDft5t5Zm/SRXRZ+whc1TAlLcS8Bmer5iDzHITf\nW3HkjKSgB0R97wh1Cof2grp/rUoDdUy0EIu3xaf92HAXddz/hEc4ci4vOUXl1GSj\nJwcjEtQ7lW9wEqVYmx25aVdXUVamAH1Tus/dputbAoGBAJV7ewN5o7uBL/MB53LH\nxcAWdc0ozRcKz1kvgTKUEmGNk19A5PcKTDREvXsMRezjvqXuVzLXnA5Ypo5qj5YV\n99smYNDgCHsaBp7luJjcw8jcrRBbKmkmN80Kd4zueSbnK/cQU5wpZFGONT0HeGvd\nla9rypiLeTvKDkfuUuDLcR5B\n-----END PRIVATE KEY-----\n"),
  client_email: (string = "test-289@pwa-test-a706a.iam.gserviceaccount.com"),
  client_id: (string = "117420743291151318027"),
  auth_uri: (string = "https://accounts.google.com/o/oauth2/auth"),
  token_uri: (string = "https://oauth2.googleapis.com/token"),
  auth_provider_x509_cert_url: (string =
    "https://www.googleapis.com/oauth2/v1/certs"),
  client_x509_cert_url: (string =
    "https://www.googleapis.com/robot/v1/metadata/x509/test-289%40pwa-test-a706a.iam.gserviceaccount.com"),
  universe_domain: (string = "googleapis.com"),
};

app.post("/getAccessToken", async (req, res) => {
  try {
    const auth = new GoogleAuth({
      credentials: credentials,
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
