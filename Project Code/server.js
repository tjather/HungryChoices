/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/

// Dependencies
const express = require("express"); //Ensure our express framework has been added
var flash = require("connect-flash");

const app = express();
app.use(flash());

const passport = require("passport");
// const request = require('request');
const { Pool, Client } = require("pg");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser"); //Ensure our body-parser tool has been added

const LocalStrategy = require("passport-local").Strategy;

//delete this later
const users = [
  { id: "2f24vvg", email_address: "tjather@gmail.com", password: "password" },
];

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('Inside local strategy callback')
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    const user = users[0] 
    if(email === user.email_address && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false; 
  done(null, user);
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


//Create Database Connection
var pgp = require("pg-promise")();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:pwd@db:5432/food_db',
  ssl: process.env.DATABASE_URL ? true : false
})

const dev_dbConfig = {
  host: "db",
  port: 5432,
  database: "food_db",
  user: "postgres",
  password: "pwd",
  // database: process.env.POSTGRES_DB,
  // user:  process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD
  // connectionString: process.env.DATABASE_URL || 'postgresql://postgres:pwd@db:5432/food_db',
};

/** If we're running in production mode (on heroku), the we use DATABASE_URL
 * to connect to Heroku Postgres.
 */
const isProduction = process.env.NODE_ENV === "production";
const dbConfig = isProduction ? process.env.DATABASE_URL : dev_dbConfig;

// Heroku Postgres patch for v10
// fixes: https://github.com/vitaly-t/pg-promise/issues/711
if (isProduction) {
  pgp.pg.defaults.ssl = { rejectUnauthorized: false };
}
var db = pgp(dbConfig);

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/")); //This line is necessary for us to use relative paths and access our resources directory

// create middleware for sesions
app.use(session({
  genid: (req) => {
    console.log('Inside session middleware genid function')
    console.log(`Request object sessionID from client: ${req.sessionID}`)
    return uuidv4()
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


// home page
app.get("/", function (req, res) {
  res.render("pages/homepage", {
    local_css: "site_style.css",
    my_title: "HungryChoices",
  });
});

app.get("/homepage", function (req, res) {
  res.render("pages/homepage", {
    local_css: "site_style.css",
    my_title: "HungryChoices",
  });
  console.log("Inside the homepage callback");
  console.log(req.sessionID);
});

//allows ajax call to food db
app.get("/db/foods", function (req, res) {
  var query = "select * from foods;";
  db.any(query)
    .then(function (rows) {
      res.json({ data: rows });
    })
    .catch(function (err) {
      res.json({ data: "epic embed fail" });
    });
});

app.post("/db/like", function (req, res) {
  var query = "UPDATE user_profiles SET likes = array_append(likes,'" + req.body.recipe_name + "');";
  db.any(query)
    .then(data => {
      console.log("Succssfully updated likes!");
    })
    .catch(err => {
      console.log('error', err);
      return;
    })
});

app.post("/db/dislike", function (req, res) {
  var query = "UPDATE user_profiles SET likes = array_remove(likes, '" + req.body.recipe_name + "');";
  db.any(query)
    .then(data => {
      console.log("Succssfully removed from likes!");
    })
    .catch(err => {
      console.log('error', err);
      return;
    })
});

app.get("/db/getlikes", function (req, res) {
  var query = "SELECT likes FROM user_profiles;";
  db.any(query)
    .then(function (rows) {
      res.json({ data: rows});
    })
    .catch(function (err) {
      res.json({ data: "epic embed fail" });
    })
})

//allows ajax call to user db
app.get("/db/users", function (req, res) {
  var query = "select * from user_profiles;";
  db.any(query)
    .then(function (rows) {
      res.json({ users: rows });
    })
    .catch(function (err) {
      res.json({ users: "epic embed fail" });
    });
});

app.get("/discover", function (req, res) {
  res.render("pages/discover", {
    local_css: "site_style.css",
    my_title: "Discover",
  });
});

app.get("/matchmaking", function (req, res) {
  res.render("pages/matchmaking", {
    local_css: "site_style.css",
    my_title: "Matchmaking Page",
  });
});

app.get("/profile", function (req, res) {
  console.log("Inside GET /authrequired callback");
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    res.render("pages/profile", {
      local_css: "site_style.css",
      my_title: "Proflie Page",
    });
  } else {
    res.redirect("/homepage");
  }
});

//registartion routes
app.get("/register", function (req, res) {
  res.render("pages/register", {
    local_css: "site_style.css",
    my_title: "Registration Page",
  });
});

app.post("/register", async function (req, res) {
  try {
    const {email_address, account_password} = req.body; 
    users.push({email_address , account_password})
    const client = await pool.connect();
    await client.query("BEGIN");
    var pwd = await bcrypt.hash(req.body.account_password, 5);
    await JSON.stringify(
      client.query(
        'SELECT id FROM "user_profiles" WHERE "email_address"=$1',
        [req.body.emailAddress],
        function (err, result) {
          if (result.rows[0]) {
            console.log(
              "warning",
              "This email address is already registered. <a href='/login'>Log in!</a>"
            );
            res.redirect("/register");
          } else {
            client.query(
              "INSERT INTO user_profiles (id, first_name, last_name, email_address, account_password) VALUES ($1, $2, $3, $4, $5)",
              [
                uuidv4(),
                req.body.first_name,
                req.body.last_name,
                req.body.email_address,
                pwd,
              ],
              function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  client.query("COMMIT");
                  console.log(result);
                  console.log("success", "User created.");
                  res.redirect("/homepage");
                  return;
                }
              }
            );
          }
        }
      )
    );
    client.release();
  } catch (e) {
    throw e;
  }
});

// login routes

// app.get("/login", function (req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect("/profile");
//   } else {
//     res.redirect("/homepage");
//   }
// });

app.post('/login', (req, res, next) => {
  console.log('Inside POST /login callback')
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      return res.render("pages/homepage", {
        local_css: "site_style.css",
        my_title: "HungryChoices",
      });
    })
  })(req, res, next);
})

// logout 

app.get("/logout", function (req, res) {
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    res.redirect("/");
});


const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});