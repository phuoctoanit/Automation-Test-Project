#!/bin/bash
# Start the mock API server

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.." # adjust based on where this script is

echo "Starting Mock API Server from: $PROJECT_ROOT/mock-apis/src/server.ts"
npx ts-node "$PROJECT_ROOT/mock-apis/src/server.ts"

if [ $? -ne 0 ]; then
  echo "❌ Failed to start the mock API server."
  exit 1
fi

echo "✅ Mock API server started successfully."