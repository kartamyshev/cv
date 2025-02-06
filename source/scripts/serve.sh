#!/bin/bash

THEME="elegant"

if [ -n "$npm_config_argv" ]; then
    ARGS=$(node -pe 'JSON.parse(process.env.npm_config_argv).original.slice(1).join(" ")')
    set -- $ARGS
fi

if [ -n "$1" ]; then
    THEME="$1"
fi

resume serve --port 8082 --theme "$THEME"