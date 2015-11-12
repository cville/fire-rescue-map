var fs = require('fs-extra');
var _ = require('underscore');
var util = require('util');
var async = require('async');
var moment = require('moment');
var mongodb = require('mongodb');
var request = require('request');
var cheerio = require('cheerio');

var argv = require('yargs')
    .usage('Usage: $0 [--backfill] [--forever]')
    .argv;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/rids';

var earliest = moment('2011-09-01');
var days_ago = moment().diff(earliest,'days');

var dates = _.range(0,days_ago+1).map(function(i){
  return moment().subtract(i,'days').format("YYYY-MM-DD");
});

function fixDate(first, d){
  if(!d.isValid()) return d;
  if(first.isAfter(d)) d.add('1','days');
  return d;
}

var systemName = "rids";
var correctRowLength = 13;

MongoClient.connect(url, function(err, db) {
  var incidents = db.collection('incidents');

  async.eachLimit(dates,5,function(date,cb){
    var url = "http://warhammer.mcc.virginia.edu/"+systemName+"/"+systemName+".php?flag=prev&fdate="+date;
    request(url, function(err, resp, body){
      if(err) console.error(err);
      console.log("request",url);
      $ = cheerio.load(body);

      // hack to filter out bogus rows
      var rows = $("tr").filter(function(i,tr){
        return ($(this).children().length === correctRowLength);
      });
      
      async.each(rows,function(row,row_cb){
        var cells = $(row).children();
        var data = _.map(cells,function(cell){
          return $(cell).text().trim();
        });
        
        var call_received = moment(data[0]+data[5],"MM/DD/YYYYHH:mm:ss",true);
        if(!call_received.isValid()) { // not a valid event (header of table)
          row_cb(); return;
        }

        incident = {
          incident_id: data[1],
          unit: data[2],
          address: data[3],
          call_type: data[4],
          call_received: call_received.format()
        };

        // Site only provides times and the date of the call.
        // set other dates, making sure to roll them over if they go to the next day
        var d = null;
        d = fixDate(call_received, moment(data[0]+data[6],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.call_dispatched = d.format();

        d = fixDate(call_received, moment(data[0]+data[7],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.unit_enroute = d.format();

        d = fixDate(call_received, moment(data[0]+data[8],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.staged_near_scene = d.format();

        d = fixDate(call_received, moment(data[0]+data[9],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.arrived_on_scene = d.format();

        d = fixDate(call_received, moment(data[0]+data[10],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.left_scene = d.format();

        d = fixDate(call_received, moment(data[0]+data[11],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.arrived_hospital = d.format();

        d = fixDate(call_received, moment(data[0]+data[12],"MM/DD/YYYYHH:mm:ss",true));
        if(d.isValid())
          incident.in_service = d.format();

        incidents.update({incident_id:incident.incident_id, unit:incident.unit_id},incident,{upsert:true},row_cb);
      },cb);
    });
  },function(err){
    console.log("Done!");
    db.close();
  });

}); //mongo connect


