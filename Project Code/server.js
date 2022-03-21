/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'food_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory



// home page
app.get('/', function(req, res) {
	res.render('pages/homepage',{
		local_css:"site_style.css",
		my_title:"Home Page"
	});
});

app.get('/homepage', function(req, res) {
	res.render('pages/homepage',{
		local_css:"site_style.css",
		my_title:"Home Page"
	});
});

app.get('/discover', function(req, res) {
	var query = "select * from food_recipes";
	db.task('get-everything', task => {
        	return task.batch([
            		task.any(query)
        	]);
   	})
    	.then(info => {
    		res.render('pages/discover',{
				my_title: "Discover Page",
				data: info[0],
			})
    	})
    	.catch(err => {
            console.log('error', err);
            res.render('pages/discover', {
                my_title: 'Discover Page',
                data: ''
            })
    	});
});

app.get('/matchmaking', function(req, res) {
	res.render('pages/matchmaking',{
		local_css:"site_style.css",
		my_title:"Matchmaking Page"
	});
});

app.get('/profile', function(req, res) {
	res.render('pages/profile',{
		local_css:"site_style.css",
		my_title:"Proflie Page"
	});
});

app.get('/register', function(req, res) {
	res.render('pages/register',{
		local_css:"site_style.css",
		my_title:"Registration Page"
	});
});


app.listen(3000);
console.log('3000 is the magic port');
