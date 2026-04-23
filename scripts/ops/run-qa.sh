#!/usr/bin/env bash
set -e

SEP="────────────────────────────────────────────────────────"

echo ""
echo "$SEP"
echo "QA"
echo "$SEP"
echo ""

npm run qa

echo ""
echo "$SEP"
echo "✓ qa passed"
echo "$SEP"
echo ""
