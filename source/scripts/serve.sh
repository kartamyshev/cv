#!/bin/bash

THEME="kartamyshev"

if [ -n "$npm_config_argv" ]; then
    ARGS=$(node -pe 'JSON.parse(process.env.npm_config_argv).original.slice(1).join(" ")')
    set -- $ARGS
fi

resume serve --port 8082 --theme "$THEME"