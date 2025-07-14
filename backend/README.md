# Backend Structure (Go)

This backend uses idiomatic Go project layout:

```
backend/
  cmd/
    api/    # API server entry point (main.go)
    cli/    # CLI entry point (main.go)
  internal/
    api/    # Internal API server logic (StartAPIServer)
  database.go
  go.mod
  go.sum
```

## Running the API server

```sh
cd backend/cmd/api
go run main.go
```

## Running the CLI

```sh
cd backend/cmd/cli
# Example: run the API server via CLI
# (add more subcommands as needed)
go run main.go api
```

- Shared/internal logic goes in `internal/`
- Public libraries (if any) would go in `pkg/`
- Entry points go in `cmd/<name>/main.go` 