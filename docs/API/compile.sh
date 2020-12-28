#!/bin/bash

SWAGGER_FILE="./api-doc.yml"
OUTPUT_FILE="../../backend/public/api-doc/index.html"

./helper/venv/bin/python3 ./helper/swagger-yaml-to-html.py < $SWAGGER_FILE > $OUTPUT_FILE
