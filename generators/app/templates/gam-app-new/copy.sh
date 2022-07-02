#!/usr/bin/env bash
export PATH=$PATH:/usr/local/go/bin
GOARCH=arm64 GOOS=linux go build -ldflags "-s -w" -buildvcs=false -o app .
rsync ./app root@192.168.1.93:/root/.gam-app/maldan-gam-app-<%= name %>-v0.0.0