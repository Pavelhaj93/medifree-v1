# Stripe Webhook Setup Guide

## Issue: Webhook Secret Not Found

The error you're seeing indicates that `STRIPE_WEBHOOK_SECRET` is not properly configured on Vercel.

## Required Environment Variables

Make sure these are set in your Vercel dashboard:

### 1. Go to Vercel Dashboard
- Navigate to your project
- Go to Settings → Environment Variables

### 2. Add these variables:

```
STRIPE_SECRET_KEY=sk_live_... (or sk_test_... for testing)
STRIPE_WEBHOOK_SECRET=whsec_...
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-app-password
```

### 3. Get the Webhook Secret

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. Click "Reveal" next to "Signing secret"
4. Copy the value that starts with `whsec_...`

### 4. Webhook Endpoint URL

Make sure your webhook endpoint in Stripe is set to:
```
https://your-domain.vercel.app/api/webhook/stripe
```

### 5. Webhook Events

Ensure the webhook is listening for:
- `checkout.session.completed`

### 6. Redeploy

After adding environment variables, trigger a new deployment:
- Push a commit to your repository, or
- Go to Vercel dashboard → Deployments → Redeploy

## Testing

You can test the webhook locally using Stripe CLI:

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward events to local server
stripe listen --forward-to localhost:3000/api/webhook/stripe

# Test with a checkout session
stripe trigger checkout.session.completed
```

## Troubleshooting

If the webhook still fails:

1. Check Vercel function logs
2. Verify environment variables are set correctly
3. Ensure webhook URL matches exactly
4. Check that webhook secret starts with `whsec_`
5. Make sure the webhook is enabled in Stripe dashboard