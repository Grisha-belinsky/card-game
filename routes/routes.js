var express = require('express');
var pmCore=require('./pmcore').getPMCore();
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtSecret = 'adsfjkdlsajfoew239053/3ukrt';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('game', 'root', '');
var users = sequelize.define('users', {
    userId: {
        type: Sequelize.UUID,
        primaryKey: true
    },
    userName: Sequelize.STRING,
    userEmail: Sequelize.STRING,
    userPass: Sequelize.STRING,
    orgName: Sequelize.STRING,
});


/*


/* GET home page. */


router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/register', function(req, res, next) {
    console.log(req);
    users.create({ userId: req.body.name, userName: req.body.name, userEmail: req.body.email, userPass: req.body.password }).then(function(user) {
        // let's assume the default of isAdmin is false:
        console.log(user.get({
            plain: true
        }));
        res.render('login');
        // => { username: 'barfooz', isAdmin: false }
    })
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/home', function(req, res, next) {
    var users = pmCore.getUsers();
    //if(req.session.username == undefined)
    //    res.redirect('/');
    var username = req.session;
    console.log('current user');
    console.log(username);

    res.render('index' , { username: username, users: users });
});

router.post('/login', function (req, res) {

    //userObj =  pmCore.login(req.body.username,req.body.password);
    users.sync().then(function () {
        var history = sequelize.define('histories', {userName: {
            type: Sequelize.STRING,
            primaryKey: true
        },
            history: Sequelize.STRING});
        users.hasMany(history, {foreignKey: 'userName'});
        users.sync().then(function () {
            users.findAndCountAll({
                include: [{
                    model: history,
                    attributes: {include:['history']}
                }]
            ,
            where: {
                userName: req.body.username,
                userPass: req.body.password
            },
                raw: true,
        }).then(function (users) {
            //console.log(users);
            if (users) {
                //req.session.push(users);
                var token = jwt.sign({
                    username: req.session.userID
                }, jwtSecret);
                console.log('all users are ')
                console.log(users);

                if(users.rows.length == 0)
                    res.redirect('/');

                if(users.history == null)
                    users.history = {history: 'no history found'};

                var user = [];
                var obj= {
                    count: 1,
                    rows: [{
                        userName: "computer"
                    }]

                }
                user.push(obj);
                user.push(users);
                console.log("pushed one");
                console.log(user);

                res.render('index' , { users: user });
            }
            else {
                res.send("invalid");
            }
        });
    });
    });

});
/*
router.get('/destroy', function (req, res) {
    console.log("destroy");
    req.session.destroy;
});
router.get('/user', function (req, res) {
    console.log("insssssssssssss /user");
    if(req.session)
        res.send({
            username: req.session.username,
            uid: req.session.uid
        });
    else
        res.send("expired");
});
router.get('/index', function(req, res){
    res.render('index');
    if(req.session.username)
        res.render('index',{ username: req.session.username, layout: null });
    else
        res.render('login',{ msg: "incorrect username or password" });
});
router.get('/create', function(req,res){

    // Generate unique id for the room
    var id = Math.round((Math.random() * 1000000));

    // Redirect to the random room
    res.redirect('/chat/'+id);
});
*/




module.exports = router;






