GitHub Repo: https://github.com/Greg01001000/satellites-api

Published: https://aesthetic-twilight-fedcbf.netlify.app/

## CS 81 Final Project - When to see satellites, by Greg H, 8/5/25

### NOTE:
Before I tried to publish the project as a working website, it worked on my local computer. To get it to work when published, I had to change configuration files, add a docs folder, and change the API call in SatellitesForm.jsx to a relative path through a proxy. So now it doesn't work on my local server (my computer), but it works on netlify URL shown above.

### Project summary
This project uses JavaScript with React and Vite to provide a web app to allow users to find out when and where they can see certain famous satellites with the unaided eye.

### Key features and functionality
The web app is publicly available at https://greg01001000.github.io/satellites-api/ . It allows the user to select a satellite and a viewing location. It then displays all dates and times within the next 10 days that satellite can be visible (weather and pollution permitting) from that location. The times are given in local time for the selected location, or if no sightings of that satellite are possible from that location in the next 10 days, a message saying that is displayed. The web page does not reload, even when the user repeatedly submits different selections.

### Technologies used
HTML, CSS, React, and Vite

Core JavaScript concepts: Functions, objects, arrays, DOM manipulation

Fetch using an API key

A higher order function: .map() produces a visibility message for each pass (set of visibility data) returned by the remote API 

Event handling: Clicking the submit button doesn't submit the form to the server. JSX submits the selection to the remote API and formats and displays the returned data.

Form validation: If the user clicks the submit button without selecting both a satellite and location, the form displays a red message asking for the missing info

Other dynamic behavior: Hovering the mouse over the submit button changes its color

DOM manipulation: All elements displayed on the web page are defined by JSX code

Component-based design: The form is a component called by App.jsx and uses state and props (UseState())

Deployed to the web: Netlify

### Instructions for use
The app is published at https://aesthetic-twilight-fedcbf.netlify.app/

Click to select a satellite and a viewing location, and click the "Query" button. Message(s) will appear telling you when that satellite can be visible in the next 10 days, using local time and date for the selected location. Repeat as desired.