// Unfortunately, I had to produce this by hand with some help from local EMTs.
//   There is a pattern but a few exceptions mess it up and I don't have
//   codes for all the vehicles... might be shorter to figure that out and just special-case the exceptions.

var stations = [
  {
    "name":"Charlottesville-Albemarle Rescue Squad",
    "station":"Rescue 1",
    "vehicles": [
      {
        "name": "Car 130",
        "codes": ["C130","C130T","C130S","C130M"]
      },
      {
        "name": "Car 131",
        "codes": ["C131","C131T","C131M"]
      },
      {
        "name": "Car 132",
        "codes": ["C132","C132T","C132M"]
      },
      {
        "name": "Squad 133",
        "codes": ["SQ133"]
      },
      {
        "name": "Squad 134",
        "codes": ["SQ134"]
      },
      {
        "name": "Squad 135",
        "codes": ["SQ135"]
      },
      {
        "name": "Water 136",
        "codes": ["WR136"]
      },
      {
        "name": "Logistics 137"
      },
      {
        "name": "Support 138"
      },
      {
        "name": "Car 139",
        "codes": ["C139","C139M"]
      },
      {
        "name": "Medic 140",
        "codes": ["AM140","MD140","MED140","TR140"]
      },
      {
        "name": "Medic 141",
        "codes": ["AM141","MD141","MED141","TR141"]
      },
      {
        "name": "Medic 142",
        "codes": ["AM142","MD142","MED142","TR142","AM142  \u0000"]
      },
      {
        "name": "Medic 143",
        "codes": ["AM143","MD143","MED143","TR143"]
      },
      {
        "name": "Medic 144",
        "codes": ["AM144","MD144","MED144","TR144"]
      },
      {
        "name": "Medic 145",
        "codes": ["AM145","MD145","MED145","TR145"]
      },
      {
        "name": "Medic 146",
        "codes": ["AM146","MD146","MED146","TR146"]
      },
      {
        "name": "Medic 147",
        "codes": ["AM147","MD147","MED147","TR147"]
      },
      {
        "name": "Car 148",
        "codes": ["C148"]
      },
      {
        "name": "Car 149",
        "codes": ["C149"]
      },
      {
        "name": "Duty 1",
        "codes": ["DUTY1","DUTY1A"]
      },
    ]
  },
  {
    "name":"East Rivanna Volunteer Fire Company",
    "station":"Station 2",
    "disabled":true,
    "vehicles": [
      {
        "name": "Engine 21"
      },
      {
        "name": "Engine 24"
      },
      {
        "name": "Car 21"
      },
      {
        "name": "Car 22"
      },
      {
        "name": "Car 23"
      },
      {
        "name": "Tanker 26"
      },
      {
        "name": "Tanker 28"
      },
      {
        "name": "Car 20"
      },
      {
        "name": "Attack 22"
      },
      {
        "name": "Brush 25"
      },
    ]
  },
  {
    "name":"North Garden Volunteer Fire Company",
    "station":"Station 3",
    "vehicles": [
      {
        "name": "Engine 34"
      },
      {
        "name": "Engine 32"
      },
      {
        "name": "Tanker 39"
      },
      {
        "name": "Brush 36"
      },
      {
        "name": "Brush 31"
      },
      {
        "name": "Utility 35"
      },
      {
        "name": "Utility 38"
      },
      {
        "name": "Car 30",
        "codes": ["MED3"]
      },
      {
        "name": "Tanker 37"
      },
    ]
  },
  {
    "name":"Earlysville Volunteer Fire Company",
    disabled:true,
    "station":"Station 4",
    "vehicles": [
      {
        "name":"Brush 43"
      },
      {
        "name":"Brush 46"
      },
      {
        "name":"Car 40",
        "codes": ["MED 4"]
      },
      {
        "name":"Car 42"
      },
      {
        "name":"Car 48"
      },
      {
        "name":"Engine 41"
      },
      {
        "name":"Engine 45"
      },
      {
        "name":"Haz-Mat 47"
      },
      {
        "name":"Tanker 49"
      }
    ]
  },
  {
    "name":"Crozet Volunteer Fire Department",
    disabled:true,
    "station":"Station 5",
    "vehicles": [
      {
        "name":"Engine 52"
      },
      {
        "name":"Engine 58"
      },
      {
        "name":"Engine 56"
      },
      {
        "name":"Truck 54"
      },
      {
        "name":"Tanker 59"
      },
      {
        "name":"Brush 55"
      },
      {
        "name":"Brush 53"
      },
      {
        "name":"Utility 59"
      },
      {
        "name":"Command 50"
      },
      {
        "name":"Car 51"
      },
      {
        "name":"Car 52"
      }
    ]
  },
  {
    "name":"Western Albemarle Rescue Squad",
    "station":"Rescue 5",
    "vehicles": [
      {
        "name":"Medic 501",
        "codes":["MED5","AM501","MD501","MED501","TR501"]
      },
      {
        "name":"Medic 502",
        "codes":["AM502","MD502","MED502","TR502"]
      },
      {
        "name":"Medic 503",
        "codes":["AM503","MD503","MED503","TR503"]
      },
      {
        "name":"Squad 505",
        "codes":["SQ505"]
      },
      {
        "name":"Car 506",
        "codes":["DUTY5","C506","C506M","C506T","AM506","TR506","MD506"]
      },
      {
        "name":"Car 507",
        "codes":["C507","C507M","C507T"]
      },
      {
        "name":"Car 508",
        "codes":["C508","C508M","C508T"]
      },
      {
        "name":"Car 509",
        "codes":["C509","C509M","C509T"]
      }
    ]
  },
  {
    "name":"Stony Point Volunteer Fire Company",
    disabled:true,
    "station":"Station 6",
    "vehicles": [
      {
        "name":"Engine 61"
      },
      {
        "name":"Engine 62"
      },
      {
        "name":"Tanker 69"
      },
      {
        "name":"Brush 63"
      },
      {
        "name":"Brush 64"
      },
      {
        "name":"Car 61",
        "codes":["MED6"]
      }
    ]
  },
  {
    "name":"Scottsville Volunteer Fire Department",
    disabled:true,
    "station":"Station 7",
    "vehicles": [
      {
        "name":"Car 70"
      },
      {
        "name":"Car 71"
      },
      {
        "name":"Engine 72"
      },
      {
        "name":"Engine 73"
      },
      {
        "name":"Brush 75"
      },
      {
        "name":"Utility 76"
      },
      {
        "name":"Tanker 77"
      },
      {
        "name":"Tanker 79"
      }
    ]
  },
  {
    "name":"Scottsville Volunteer Rescue Squad",
    "station":"Rescue 7",
    "vehicles": [
      {
        "name":"Car 700",
        "codes":["DUTY7","C700","C700M","C700T"]
      },
      {
        "name":"Car 701",
        "codes":["DUTY7A","C701","C701M","C701T"]
      },
      {
        "name":"Car 702",
        "codes":["C702","C702M","C702T"]
      },
      {
        "name":"Medic 703",
        "codes":["AM703","MD703","MED703","TR703"]
      },
      {
        "name":"Medic 705",
        "codes":["AM705","MD705","MED705","TR705"]
      },
      {
        "name":"Medic 706",
        "codes":["AM706","MD706","MED706","TR706"]
      },
      {
        "name":"Medic 707",
        "codes":["AM707","MD707","MED707","TR707","MED7\u00107"]
      },
      {
        "name":"Car 708",
        "codes":["C708","C708M","C708T","MD708"]
      },
      {
        "name":"Squad 709",
        "codes":["SQ709","AM707","MD707","MED707","TR707"]
      },
    ]
  },
  {
    "name":"Seminole Trail Volunteer Fire Department",
    "station":"Station 8",
    "vehicles": [
      {
        "name":"Engine 81"
      },
      {
        "name":"Engine 82"
      },
      {
        "name":"Engine 85"
      },
      {
        "name":"Tower 88"
      },
      {
        "name":"Utility 86"
      },
      {
        "name":"Car 80",
        "codes": ["MED8"]
      },
      {
        "name":"Car 82"
      },
      {
        "name":"Car 89"
      },
      {
        "name":"Car 83"
      }
    ]
  },
  {
    "name":"Berkmar Substation of the Charlottesville-Albemarle Rescue Squad",
    "station":"Rescue 8",
    "vehicles": [
      {
        "name":"Medic 842",
        "codes":["MED842"]
      },
      {
        "name":"Medic 844",  
        "codes":["AM844","MD844","MED844","TR844",]
      },
      {
        "name":"Medic 845",  
        "codes":["AM845","MD845","MED845","TR845",]
      },
      {
        "name":"Medic 846",  
        "codes":["AM846","MD846","MED846","TR846",]
      }
    ]
  },
  {
    "name":"Monticello Fire Rescue",
    "station":"Station 11",
    "vehicles": [
      {
        "name": "Car 111",
        "codes": ["DUTY11","MD111", "C111M"]
      },
      {
        "name": "Car 112",
        "codes": ["MD112", "C112M"]
      }
    ]
  },
  {
    "name":"Hollymead Fire Rescue",
    "station":"Station 12",
    "vehicles": [
      {
        "name":"Car 121",
        "codes": ["MED12","DUTY12","MD121","C121","C121M"]
      }
    ]
  },
  {
    "name":"Ivy Fire Rescue",
    "station":"Station 15",
    "vehicles": [
      {
        "name":"Car 151",
        "codes": ["MED15","DUTY15","C151M","C151"]
      }
    ]
  }
];

// Create the radio buttons for each station and code for highlighting incidents with trucks that responsded form that station
$(function(){

  stations.forEach(function(station){
    if(station.disabled) return;
    $("#station_list").append("<div><label><input name='station' type='radio' data-station='"+station.station+"'> "+station.name+"</label></div>");    
  });

  $("#station_list input").click(function(){
    var stationNumber = $(this).data("station");
    var station = _.find(stations,function(station){
      return station.station === stationNumber;
    });
    var allCodes = _.compact(_.flatten(_.map(station.vehicles,function(v){ return v.codes; })));

    d3.selectAll('#mapID circle').attr("opacity",function(d){
      var allUnits = d.vehicles;
      var match = _.intersection(allUnits,allCodes);
      if(match.length) return 1.0;
      else return 0.1;
    });
  });

});