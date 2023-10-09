# BlazeNotify
This project sends wildfire notifications/voicemails to users using NASA FIRMS data in Node.js

Project LoLa-LoLa addresses NASA’s Wildfire Management Challenge to provide Hazard warnings at the ‘Edge’ where communications networks are sparse or non-existent. 

Team ‘Stemmies++’ consists of Michael Patrick  (Concept and Design), Akash Savitala (Computation), and Vignesh Srinivasan (Code and Voice) 

Driving forces consist of that the ‘World is on Fire’ from climate change, the ‘Globe is getting Older’ as age demographics create large numbers of senior citizens, the aspect that “High Tech caters to Profit” so that ‘Rural Communities are Ignored’. 
The name LoLa-LoLa comes the primary constraints near the ‘The Edge’, i.e. Low Ability and Low Availability, to start. And there are other constraints like Low Bandwidth because of no broadband, Low Ability caused by elderly disabilities like coordination, vision, and cognition, Low Tech hardware like ‘Feature Phones’ with a text screen and buttons, Low Availability or intermittent power for recharging with lack of tower coverage, and of course Low Funding because rural areas have the most poverty. 

In fact, … Low everything!

We created a Pipeline from NASA’s FIRMS (Fire Information for Resource Management System) datasets to derive the position of the fire relative to the user, and created a sound file of directional indicators that could be sent to any Voicemail system. This enables asynchronous and intermittent communications transmissions of warnings to the user. 

Open Source Projects we used were QGIS, PROJ4JS, GeoJSON, Turf, Node, Fs, Say.js and there was a serious learning curve and technical challenges including resolving and calculating Coordinate Reference Systems & Reprojection, integrating Voicemail, SMS, and Notification Systems, and especially selecting appropriate APIs from hundreds of candidates and integrating them. We also spent considerable time setting up the AWS Admin and Sandbox features. 

So, going forward, the business plan is to use income from Revenue Markets such as Outdoor Recreation (Hunters, Fisherman, Cross Country Skiers, Backpackers, etc.), rural workers (Ranchers, Farmers, Loggers, etc.), and Remote Property Owners who need to monitor their vacation homes – these all represent easily identifiable channels and market targets.

These income streams can then subsidize deployment for Non-Profit Markets like Emergency Services (Volunteer Fire Departments, traveling Health/Social Workers, Low-income residents, etc.), and Rural Governments.
We believe this will extend NASA’s science into these ignored rural areas and allow us to work beyond the Edge to support rural ignored rural communities.
