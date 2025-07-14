package database

import (
	"os"
	"testing"
)

func TestInitDB(t *testing.T) {
	// Use an in-memory SQLite database for testing
	db, err := InitDB(":memory:")
	if err != nil {
		t.Fatalf("InitDB() error = %v", err)
	}
	if db == nil {
		t.Fatal("InitDB() db is nil")
	}
	defer db.Close()

	// Test with a file path
	const dbPath = "./test.db"
	db, err = InitDB(dbPath)
	if err != nil {
		t.Fatalf("InitDB() error = %v", err)
	}
	if db == nil {
		t.Fatal("InitDB() db is nil")
	}
	defer db.Close()
	defer os.Remove(dbPath) // Clean up the created file

	if _, err := os.Stat(dbPath); os.IsNotExist(err) {
		t.Fatalf("DB file was not created at %s", dbPath)
	}
}
