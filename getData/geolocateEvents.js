var fs = require('fs-extra');
var _ = require('underscore');
var util = require('util');
var async = require('async');
var moment = require('moment');
var mongodb = require('mongodb');
var request = require('request');
var cheerio = require('cheerio');
var bottleneck = require('bottleneck');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/rids';

var secrets = require('./secrets.json');

// Get a key from https://console.developers.google.com/project
var geocoder = require('node-geocoder')('google','https',{apiKey:secrets.google_apikey});
var geocoderBottleneck = new bottleneck(0,200);

MongoClient.connect(url, function(err, db) {
  var incidentsCollection = db.collection('incidents');

  incidentsCollection.find({location:{"$exists":false}}).toArray(function(err, incidents){

    async.eachLimit(incidents,5,function(incident,cb){ // try to keep under the rate limit...
      geocoder.geocode(incident.address+" Charlottesville, VA", function(err, location){
        process.stdout.write(".");
        if(err) {
          console.log(err);
          cb(err);
        } else {
          incidentsCollection.update({_id:incident._id},{"$set":{location:location}},geocoderBottleneck.submit(cb,null,null));
        }
      });
    },function(err){
      console.log("Done!");
      db.close();
    });
  });

}); //mongo connect