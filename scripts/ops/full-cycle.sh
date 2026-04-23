#!/usr/bin/env bash
set -e

SEP="────────────────────────────────────────────────────────"
SEP2="════════════════════════════════════════════════════════"

echo ""
echo "$SEP2"
echo "FULL CYCLE"
echo "$SEP2"

# VERIFY

echo ""
echo "$SEP"
echo "PHASE 1 — VERIFY"
echo "$SEP"
echo ""

npm run verify

echo ""
echo "✓ verify passed"

# QA

echo ""
echo "$SEP"
echo "PHASE 2 — QA"
echo "$SEP"
echo ""

npm run qa

echo ""
echo "✓ qa passed"

# SUMMARY

echo ""
echo "$SEP2"
echo "SUMMARY"
echo "$SEP2"
echo ""
echo "  verify   ✓ PASS"
echo "  qa       ✓ PASS"
echo ""
echo "$SEP2"
echo "✓ full cycle passed"
echo "$SEP2"
echo ""
