#!/bin/bash

SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd $SCRIPTPATH

SWAGGER_FILE="./api-doc.yml"
OUTPUT_FILE="../../backend/public/api-doc/index.html"

./helper/venv/bin/python3 ./helper/swagger-yaml-to-html.py < $SWAGGER_FILE > $OUTPUT_FILE
