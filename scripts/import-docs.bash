#! /usr/bin/env bash


for package in $(ls node_modules/@sharedweb); do
  doc_path="./node_modules/@sharedweb/$package/union-docs"

  if [ -d $doc_path/_content_patterns ]; then
    cp -r $doc_path/_content_patterns/* ./_content_patterns
    echo "Copied $doc_path/_content_patterns"
  fi
done
