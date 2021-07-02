package <%= name %>

type TestApi struct {
	Table string
}

func (f TestApi) GetIndex() {
	return "Test"
}
