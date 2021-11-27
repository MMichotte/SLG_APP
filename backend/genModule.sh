#!/bin/bash

MODULE_NAME=$1

MPATH="modules/$MODULE_NAME"

nest g module $MPATH
cd "src/$MPATH"
mkdir controllers dto entities enums repositories services