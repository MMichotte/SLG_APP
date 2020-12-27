#!/bin/bash

printf "\n🔍 Running \e[34mbackend\e[0m linter :\n"
cd ../../backend && npm run lint

echo "-----------------------------"

printf "\n🔍 Running \e[33mfrontend\e[0m linter :\n"
cd ../../frontend && npm run lint
