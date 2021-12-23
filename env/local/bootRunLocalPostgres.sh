#!/usr/bin/env bash

SCRIPT_DIR=$(cd $(dirname $(readlink -f $0 || echo $0));pwd -P)
cd ${SCRIPT_DIR}/../..

./gradlew clean bootRun --args='--spring.config.additional-location=./env/local/application-local.properties'
