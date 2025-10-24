# Gmail Authentication Setup for Vercel

## Issue: Gmail Authentication Failed

The error "Username and Password not accepted" indicates that Gmail credentials are not properly configured or the account doesn't have App Passwords enabled.

## Required Gmail Setup

### 1. Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", enable **2-Step Verification**
3. Complete the 2FA setup process

### 2. Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **Medifree Website**
6. Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`)

### 3. Configure Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

⚠️ **Important**: Use the App Password (16 chars), NOT your regular Gmail password!

## Troubleshooting Steps

### If you still get authentication errors:

1. **Double-check the App Password**:
   - Remove any spaces from the App Password
   - Make sure you're using the App Password, not your regular password

2. **Verify the Gmail address**:
   - Must be the exact Gmail address where you created the App Password
   - Should be a @gmail.com address (not G Suite/Workspace)

3. **Check 2FA is enabled**:
   - App Passwords only work with 2-Factor Authentication enabled

4. **Test locally first**:
   ```bash
   # Add to your .env.local file:
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   
   # Test the contact form to verify Gmail works
   ```

5. **Alternative: Use a different email service**:
   If Gmail continues to cause issues, consider using:
   - Resend (resend.com) - Easy setup for transactional emails
   - SendGrid - Enterprise email service
   - Postmark - Developer-friendly email API

## Environment Variables Checklist

Make sure ALL these are set in Vercel:

```
STRIPE_SECRET_KEY=sk_live_... (or sk_test_...)
STRIPE_WEBHOOK_SECRET=whsec_...
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

## Testing

After setting up the environment variables:

1. Redeploy your Vercel app
2. Make a test purchase
3. Check Vercel function logs for success/errors
4. Verify email delivery

If the issue persists, the enhanced error logging in the webhook will help identify exactly what's wrong with the Gmail configuration.