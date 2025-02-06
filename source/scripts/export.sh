THEME="elegant"

if [ -n "$npm_config_argv" ]; then
    ARGS=$(node -pe 'JSON.parse(process.env.npm_config_argv).original.slice(1).join(" ")')
    set -- $ARGS
fi

if [ -n "$1" ]; then
    THEME="$1"
fi

resume export index.html --theme "$THEME"