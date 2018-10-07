.PHONY: dev open

# Run the dev server.
dev:
	@echo "[Running dev server...]"
	@cd ./src && node server.js

# Open the dev server in browser.
open:
	@open http://localhost:3000
