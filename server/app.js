var express = require('express');
var app = express();
var path = require('path');

// base url
app.get( '/', function( req, res ){
  console.log( 'in base url' );
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.set("port", (process.env.PORT || 5000));

app.listen( app.get("port"), function(){
    console.log("listening on port", app.get("port"));
});

app.use( express.static( 'public' ) );
