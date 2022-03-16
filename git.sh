#!/bin/sh
git checkout $1
git add .
git commit -m "$2"
git status
git push origin $1


printf "\n\n${green}Commited $2 to $1 successfully !\n\n"