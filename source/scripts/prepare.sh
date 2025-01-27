#!/bin/bash

node create-pdf.js
cp -r ./assets/* ../assets/ && cp ./index.html ../