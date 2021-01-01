#!/bin/bash

npx insomnia-documenter --config Insomnia_*.json --output ../../backend/public/api-doc
rm -f ../../backend/public/api-doc/favicon.ico