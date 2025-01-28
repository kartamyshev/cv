## Description

This project uses the `resume-cli` to serve and export resume in JSON format.

## Installation

First, install the dependencies:
```sh
npm install
```

## Serve
To serve the resume on a local server
```sh
npm run serve
```
This will start a local server on port 8082 and serve the resume using the elegant theme.

## Export
To export the resume to an HTML file:
```sh
npm run export
```
This will export the resume to index.html using the elegant theme.

## Prepare
To export the resume and run the prepare script:
```sh
npm run prepare
```
This will first export the resume to index.html and then run the prepare.sh script.

## Prepare with Publish
```sh
npm run prepare -- -p "Your commit message here"
```
This will first export the resume to index.html, run the prepare.sh script, and then publish the changes with the provided commit message.