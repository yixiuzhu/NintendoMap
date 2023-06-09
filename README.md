# Nintendo World Map (SupplyFrame Intern Challenge)

## Introduction

This project is a aims to find the company SupplyFrame in the nintendo world map. User can click the map icons to guess the places, or uses some advanced technologies such as searching routes on the map. The app It allows users to enter a start location and an end location, and it will display the shortest route between those two locations.

The application uses Google Maps API to plot routes, and includes a backend server that interacts with the frontend to process route requests. The backend receives start and end locations from the frontend, processes them, and returns the locations back to the frontend. The frontend then uses this data to request route plotting from Google Maps API. (For demo purposes, the frontend is currently set up to directly communicate with google map api, while the backend side is still functional).

## Tryout the project

1. Just Navigate to [https://yixiuzhu.github.io/NintendoMap/](https://yixiuzhu.github.io/NintendoMap/) to try the frontend application. (This is a website built with frontend only due to github.io publish rules, so in this case, the frontend is directly communicating with google map API.)

## Backend Setup

To setup the environment, test and run the backend, follow these steps: (The backend now is just able to take the addresses from frontend and return route for frontend to plot, more features expected in future ~)

1. Make sure you have [Node.js](https://nodejs.org/en/download/) installed.

2. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/yixiuzhu/NintendoMap.git
    ```

3. Navigate to the project directory.

    ```bash
    cd NintendoMap
    ```

4. Install the necessary dependencies.

    ```bash
    npm install
    ```

5. Start the server test.

    ```bash
    npm test 
    ```
    
6. Terminate the test.
 
    ```bash
    ctrl-c (then select yes)
    ```

7. Start the backend server. 

    ```bash
    npm start
    ```

## GIF Demo

![Demo](demo/Animation.gif)

## Lastly 

Thanks for checking out my project and have fun!
