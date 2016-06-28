module.exports = function(app, passport, mongoose){

    //HOME
    app.get('/', function(req, res){
        res.render('index', {
            user: req.user
        });
    });

    //STEAM LOGIN
    app.get('/auth/steam', passport.authenticate('steam'));
    app.get('/auth/steam/callback', passport.authenticate('steam', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    //Profile
    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile', {
            user: req.user
        });
    });

    //LOGOUT
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //FORUM
    app.get('/forum', function(req, res){
        res.render('forum', {
            user: req.user
        });
    });

    //FORUM
    app.get('/servers', function(req, res){
        res.render('servers', {
            user: req.user
        });
    });

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated())
            return next();

        res.redirect('/');
    }

    function notLoggedIn(req, res, next){
        if(!req.isAuthenticated())
            return next();

        res.redirect('/profile');
    }
};
