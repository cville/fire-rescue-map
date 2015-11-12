var fs = require('fs-extra');
var _ = require('underscore');
var util = require('util');
var async = require('async');
var moment = require('moment');
var mongodb = require('mongodb');
var request = require('request');
var cheerio = require('cheerio');
var bottleneck = require('bottleneck');

//var stations = require('./stations');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/rids';

var csv = require('csv');

MongoClient.connect(url, function(err, db) {
  var incidentsCollection = db.collection('incidents');

  async.parallel([
    function(cb){
      incidentsCollection.find({location:{"$exists":true}}).toArray(function(err, incidents){
        // Remove extraneous data from location
        var compactIncidents = incidents.map(function(incident){
          incident.location = _.pick(incident.location[0],"latitude","longitude");
          return incident;
        });

        // Group by address
        var incidentsByAddress = _.values(_.groupBy(compactIncidents, function(incident){
          return incident.address;
        }));

        incidentsByAddress = incidentsByAddress.map(function(incidentsAtLocation){
          var timedIncidents = _.filter(incidentsAtLocation,function(incident){
            return incident.arrived_on_scene;
          });

          var averageResponseTime = 0;
          if(timedIncidents.length > 0) {
            for(var i = 0; i < timedIncidents.length; i++) {
              averageResponseTime += moment.duration( moment(timedIncidents[i].arrived_on_scene).diff(timedIncidents[i].call_dispatched) ).asMinutes();
            }
            averageResponseTime /= timedIncidents.length;
          }

          var vehicles = _.uniq(timedIncidents.map(function(incident){
            return incident.unit;
          }));
          // var call_types = _.uniq(timedIncidents.map(function(incident){
          //   return incident.call_type;
          // }));

          return {
            incidents:incidentsAtLocation.length,
            location:incidentsAtLocation[0].location,
            vehicles: vehicles,
            //call_types: call_types,
            averageResponseTime: averageResponseTime ? averageResponseTime : null
          };
        });
        
        console.log(incidentsByAddress[0]);
        fs.writeFile("../data/rids.json",JSON.stringify(incidentsByAddress),cb);
      });
    },
    function(cb){
      incidentsCollection.find().toArray(function(err, incidents){

        var plot = incidents.map(function(incident){
          var ttd = null;
          var tta = null;
          if(incident.call_dispatched)
            ttd = moment.duration( moment(incident.call_dispatched).diff(incident.call_received) ).asMinutes();
          if(incident.call_dispatched && incident.arrived_on_scene)
            tta = moment.duration( moment(incident.arrived_on_scene).diff(incident.call_dispatched) ).asMinutes();
          return [incident.call_received, ttd, tta];
        });
        
        fs.writeFile("../data/calltimes.json",JSON.stringify(plot),cb);
      });
    }
  ], function(err) {
    db.close();
  });
  
}); //mongo connect