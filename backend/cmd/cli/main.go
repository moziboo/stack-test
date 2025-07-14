package main

import (
	"fmt"
	"os"

	"stack-test/internal/api"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: stack-test <command>\nCommands: api")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "api":
		api.StartAPIServer()
	default:
		fmt.Printf("Unknown command: %s\n", os.Args[1])
		os.Exit(1)
	}
}
