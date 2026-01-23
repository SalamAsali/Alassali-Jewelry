#!/bin/bash
# Generate Payload Secret

echo "=== Generating PAYLOAD_SECRET ==="
echo ""
echo "Run this command:"
echo "  openssl rand -base64 32"
echo ""
echo "Or use this generated one:"
openssl rand -base64 32
echo ""
echo "Copy the output above and add it to Vercel as PAYLOAD_SECRET"
