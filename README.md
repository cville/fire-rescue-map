# fire-rescue-map
Data visualization project using cville Fire/EMS data. Demo is available at [meekohi.com/rids](http://meekohi.com/rids).

## Getting Started

If you don't want to scrape the data yourself, you can download the resulting files from http://meekohi.com/rids/data/calltimes.json and http://meekohi.com/rids/data/rids.json

#### Scraping Data

! As of Nov 2022 the FIDS service has been shut down, and it is not possible to scrape new data using this method. The "Replacement" https://web.pulsepoint.org/ does not have sufficient information to be useful unfortunately.

* You will need [nodejs](http://nodejs.com) and [mongodb](http://mongodb.com) installed.
* To geolocate addresses, you will need a [Developer Key for the Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/get-api-key).
  * _note: the geolocation calls will probably cost you $20 or so. There might be a better free alternative._
* `cd getData; npm install` - to get setup.
* `node downloadEvents.js` -  scrapes data from the RIDS system and puts it in MongoDB.
* `node geolocateEvents.js` - uses Google's Geolocation API to add latitude/longtitude to each incident.
* `node outputData.js` - outputs incidents in a JSON format in `/data/` that is more compact and useful for the front-end.

#### Visualization
* Fire up a web server and go to `fire-rescue-map/index.html`.
