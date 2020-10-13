#!/bin/bash

npm run build
git add .
echo "Write comment: "
read comment
git commit -m "$comment"
git push -u origin master
git subtree push --prefix dist origin gh-pages



