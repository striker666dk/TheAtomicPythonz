var SteamStrategy = require('passport-steam').Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //Steam
    passport.use(new SteamStrategy({
        returnURL: configAuth.steamAuth.returnURL,
        realm: configAuth.steamAuth.realm,
        apiKey: configAuth.steamAuth.apiKey
        },
        function(identifier, profile, done) {
            process.nextTick(function () {
                profile.identifier = identifier;

                User.findOne({ 'steam.id' : profile._json.steamid }, function(err, user){
                    if(err){
                        console.log('Error: ' + err);
                        return done(err);
                    }

                    if(user){
                        if(user.steam.displayName != profile._json.personaname){
                            user.steam.displayName = profile._json.personaname;

                            user.save(function(err){
                                if(err)
                                    throw err;
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                    }else{
                        var newUser = new User();

                        newUser.steam.id = profile._json.steamid;
                        newUser.steam.displayName = profile._json.personaname;
                        newUser.steam.profileURL = profile._json.profileurl;
                        newUser.steam.avatarSmallURL = profile._json.avatar;
                        newUser.steam.avatarMediumURL = profile._json.avatarmedium;
                        newUser.steam.avatarLargeURL = profile._json.avatarfull;
                        newUser.steam.personState = profile._json.personastate;
                        newUser.rank = 0;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });

                        console.log('New user registered: ' + newUser.steam.displayName);
                    }
                });
            });
        }
    ));
}
