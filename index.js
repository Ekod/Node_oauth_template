const express = require("express");
const coockieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));
const app = express();

app.use(
  coockieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.coockieKey]
  })
);

app.use(passport.initialize())
app.use(passport.session())

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, _ => console.log(`Listening on port ${PORT}`));
