package main

import (
	"embed"

	helloworld "github.com/maldan/gam-app-<%= name %>/internal/app/<%= name %>"
)

//go:embed frontend/build/*
var frontFs embed.FS

func main() {
	helloworld.Start(frontFs) //
}
