#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No commit message provided."
    echo "Usage: ./prepare.sh \"Your commit message\""
    exit 1
fi

commit_message="$1"
echo "$commit_message"

git add -A
git commit -m "$commit_message"
git push origin master