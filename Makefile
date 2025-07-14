.PHONY: dev dev-api dev-frontend dev-storybook build clean stop

# Default target: run both backend API and frontend dev server
dev: dev-api dev-frontend

# Run backend API server
dev-api:
	@echo "Starting backend API server..."
	@cd backend/cmd/api && go run main.go &
	@echo "Backend API running at http://localhost:8080"

# Run frontend dev server
dev-frontend:
	@echo "Starting frontend dev server..."
	@cd frontend && npm run dev &
	@echo "Frontend dev server running at http://localhost:5173"

# Run Storybook
dev-storybook:
	@echo "Starting Storybook..."
	@cd frontend && npm run storybook &
	@echo "Storybook running at http://localhost:6006"

# Stop all running development processes
stop:
	@echo "Stopping all development processes..."
	@-pkill -f "go run main.go" 2>/dev/null || true
	@-pkill -f "npm run dev" 2>/dev/null || true
	@-pkill -f "npm run storybook" 2>/dev/null || true
	@-pkill -f "node.*storybook" 2>/dev/null || true
	@echo "All development processes stopped"

# Build everything
build:
	@echo "Building backend..."
	@cd backend/cmd/api && go build -o ../bin/api
	@cd backend/cmd/cli && go build -o ../bin/cli
	@echo "Building frontend..."
	@cd frontend && npm run build

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf backend/bin
	@rm -rf frontend/dist

# Help target
help:
	@echo "Available targets:"
	@echo "  dev          - Run both backend API and frontend dev servers"
	@echo "  dev-api      - Run backend API server only"
	@echo "  dev-frontend - Run frontend dev server only"
	@echo "  dev-storybook - Run Storybook"
	@echo "  stop         - Stop all running development processes"
	@echo "  build        - Build backend and frontend"
	@echo "  clean        - Remove build artifacts" 