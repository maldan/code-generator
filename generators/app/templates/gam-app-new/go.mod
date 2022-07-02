module github.com/maldan/gam-app-<%= name %>

go 1.18

// replace github.com/maldan/go-cmhp => ../../go_lib/cmhp

// replace github.com/maldan/go-rapi => ../../go_lib/rapi

require github.com/maldan/go-rapi v0.0.6

require github.com/maldan/go-cmhp v0.0.23
