module github.com/maldan/gam-app-<%= name %>

go 1.16

// replace github.com/maldan/go-restserver => ../../../go_lib/restserver

require (
	github.com/maldan/go-restserver v1.2.8
)
