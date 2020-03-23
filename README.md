# Task Activity Planner Web Application

[![Build Status](https://travis-ci.com/MAstrauskas/tap-web-app.svg?token=tnxttyznrk7mkbWTqrux&branch=master)](https://travis-ci.com/MAstrauskas/tap-web-app)

## Live Website

- You can access the application through this link -> [ma738-tap.herokuapp.com](https://ma738-tap.herokuapp.com)

## File Structure

- `client/` -> Client side of the application
- `src/` -> Back-end/Server side of the application

## Prerequisites

1. Node - [Download Node.js](https://nodejs.org/en/download/)
2. Yarn - [Install Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

## How to run

1. Install all the required dependencies by typing `yarn && yarn client-install` in the terminal
2. Type `yarn dev` in the terminal to run both client and server side concurrently
   1. To run only client side, type `yarn client` in the terminal
   2. To run only server side, type `yarn server` in the terminal
3. The client will run on `localhost:3000` and server on `localhost:9000`
   1. Go to `localhost:3000` to access the full web app in your browser
