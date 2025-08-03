# Map Deployment Guide for Netlify

## Issue
The map component in the WishlistDetail page works locally but shows "Location not available" when deployed to Netlify. This is due to Content Security Policy (CSP) restrictions that prevent loading map tiles from OpenStreetMap.

## Solution
We've updated the following files to fix the issue:

1. `public/_headers` - Added CSP headers to allow loading resources from OpenStreetMap
2. `netlify.toml` - Added headers configuration to ensure CSP is properly applied
3. `netlify.headers` - Created as a backup to ensure headers are properly applied

## Deployment Steps

1. Commit all changes to your repository
2. Push to your connected Git repository
3. Netlify will automatically deploy the changes

## Verifying the Fix

After deployment, check the following:

1. Visit your Netlify site and navigate to a wishlist detail page
2. The map should now load correctly
3. If issues persist, check the browser console for any CSP-related errors

## Manual Headers Configuration

If the automatic configuration doesn't work, you can manually add the headers in the Netlify dashboard:

1. Go to your site settings in Netlify
2. Navigate to "Build & deploy" > "Post processing" > "Headers"
3. Add the following headers:

```
/*
  Content-Security-Policy: default-src 'self'; connect-src 'self' https://*.tile.openstreetmap.org; img-src 'self' data: https://*.tile.openstreetmap.org; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval';
```

## Troubleshooting

If the map still doesn't work after deployment:

1. Check the browser console for any CSP-related errors
2. Verify that the headers are being applied by using the browser's network inspector
3. Try clearing your browser cache or testing in an incognito window
4. Ensure that the Netlify deployment completed successfully