# GeocoderSystem
Public Safety Geocoder

Introduction:
Today, geographic information is vital for many law enforcement agencies to identify places to smartly allocating limited resources to gain optimum crime reduction and crime prevention strategies. The current application of geographic tools in public safety is usually static and requires high amount of time and personnel to geocode and analyze the data. On the other hand, closed systems such as Google Maps are great tools for real-time geocoding and analysis; however, the cost of these available closed system mapping tools is astronomic; therefore, majority of the agencies cannot afford. 

There are open-source alternatives (e.g., OSM) to Google Maps; however, these alternatives have certain weaknesses like including comprehensive POIs and intersections. Having said that, open street map is as much as accurate and current compared to Google Maps because of its strong open source community support. We created a geocoding system by borrowing the source data from openaddresses.io and enriching it with geographic level computing. In this study, we revealed that anyone can run their own system for any geographic information and enjoy real time geocoding and analysis.


How To Use
- Downlaod the repository
- type npm install to command prompt to install dependencies
- Install MySQL Server
- create a schema named as geoda
- unzip and run the the sql file under sql_data/safety_geocoder.sql
- make sure you updte your connection credentials under app/connection.js
- npm run serve to run the app
- your app is running at localhost:3000
- Happy geocoding
