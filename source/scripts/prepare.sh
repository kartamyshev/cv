#!/bin/bash

node create-pdf.js
cp -r ./assets/* ../assets/ && cp ./index.html ../

if [ -n "$npm_config_argv" ]; then
    ARGS=$(node -pe 'JSON.parse(process.env.npm_config_argv).original.slice(1).join(" ")')
    set -- $ARGS
fi

if [ "$1" == '-p' ]; then
    if [ -z "$2" ]; then
        echo "Error: No commit message provided."
        echo "Usage: ./prepare.sh \"Your commit message\""
        exit 1
    fi
    version=$(node -p "require('./package.json').version")
    commit_message="$2"

    echo "[$version] - $commit_message"

    git add -A
    git commit -m "[$version] - $commit_message"
    git push origin master
fi