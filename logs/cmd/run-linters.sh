#!/bin/bash

function notifySucces () {
    printf "\t-->\t✅ All good!\n"
}


function notifyError () {
    printf "\t-->\t❌ \e[41mERROR!\e[0m\n\n" >&2 
    printf "\t🔍 Please take a look at the \e[35mlog file\e[0m for more information.\n\n"
    exit 1
}

function lint () {
    npm run lint > /dev/null 2>&1
}


printf "\n🚀 Running \e[34mbackend\e[0m linter "
cd ../../backend && (lint && notifySucces) || notifyError


printf "\n🚀 Running \e[33mfrontend\e[0m linter "
cd ../frontend && (lint && notifySucces) || notifyError

printf "\n"

exit 0
