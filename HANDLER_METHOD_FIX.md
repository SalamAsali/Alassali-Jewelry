# Payload Handler Method Fix

## Issue
Error: `c.handler is not a function`

This suggests that the Payload instance doesn't have a `handler` method, or it's not being called correctly.

## What I've Done

1. **Updated `/cms` route** to delegate to the API route handlers
2. **Added handler method check** in the API route to verify it exists
3. **Added logging** to see what methods are available on the Payload instance

## Next Steps

After deploying, check the Vercel logs to see:
1. What methods are available on the Payload instance
2. Whether `handler` exists or if we need to use a different method

## Possible Solutions

If `handler` doesn't exist, we may need to:
1. Use a different Payload API method
2. Check Payload 3.0 documentation for the correct way to handle requests
3. Update Payload version if there's a newer version with the handler method

## Testing

After deployment:
1. Check Vercel logs for "Available methods:" output
2. Share the logs so we can see what methods Payload actually provides
3. Update the code based on the actual Payload API
