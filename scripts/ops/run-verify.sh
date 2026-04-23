#!/usr/bin/env bash
set -e

SEP="────────────────────────────────────────────────────────"

echo ""
echo "$SEP"
echo "VERIFY"
echo "$SEP"
echo ""

npm run verify

echo ""
echo "$SEP"
echo "✓ verify passed"
echo "$SEP"
echo ""
