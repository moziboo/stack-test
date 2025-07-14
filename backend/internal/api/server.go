package api

import (
	"log"
	"net/http"

	"stack-test/internal/database"

	"github.com/labstack/echo/v4"
)

func StartAPIServer() {
	e := echo.New()

	// Initialize database (example)
	db, err := database.InitDB("./data.db")
	if err != nil {
		log.Fatal("Failed to initialize database:", err)
	}
	defer db.Close()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello from Echo + SQLite!")
	})

	if err := e.Start(":8080"); err != nil {
		log.Fatal(err)
	}
}
