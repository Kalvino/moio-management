#!/bin/bash

# Update the dependencies
npm install

if [ -z "$1" ]
then
    ng build --prod
else
    ng build --$1
fi


# Build the application with AngularCLI

