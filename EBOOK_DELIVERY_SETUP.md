# Ebook Email Delivery Setup

This system automatically sends purchased ebooks to customers via email after successful Stripe checkout.

## How It Works

1. **Customer Purchase**: Customer adds ebooks to cart and provides email address
2. **Stripe Checkout**: Customer completes payment through Stripe
3. **Webhook Processing**: Stripe webhook triggers email delivery
4. **Email Sent**: Customer receives email with ebook download link/attachment

## Required Environment Variables

Add these to your `.env.local` file:

### Stripe Configuration
```
STRIPE_SECRET_KEY=sk_test_... # or sk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_... # Get this from Stripe webhook settings
```

### Email Service (Choose One)

#### Option 1: Resend (Recommended)
```
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@medifree.cz
```

#### Option 2: SendGrid
```
SENDGRID_API_KEY=SG....
FROM_EMAIL=noreply@medifree.cz
```

#### Option 3: SMTP (Nodemailer)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@medifree.cz
```

## Setup Steps

### 1. Install Email Dependencies (Choose Based on Your Provider)

```bash
# For Resend
npm install resend

# For SendGrid
npm install @sendgrid/mail

# For SMTP (Nodemailer)
npm install nodemailer @types/nodemailer
```

### 2. Configure Stripe Webhook

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set endpoint URL to: `https://www.medifree.cz/api/webhook/stripe`
4. Select event: `checkout.session.completed`
5. Copy the webhook secret to your environment variables

### 3. Update Sanity Schema

The product schema has been updated to include an `ebookFile` field. Run:

```bash
cd studio
npm run build
```

Then upload ebook files to your products in Sanity Studio.

### 4. Test the System

1. Add ebooks to cart
2. Enter test email address
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete purchase
5. Check email delivery

## File Structure

- `app/api/checkout/route.ts` - Modified to include customer email
- `app/api/webhook/stripe/route.ts` - New webhook handler
- `app/lib/email.ts` - Email service abstraction
- `app/components/CheckoutSuccessHandler.tsx` - Clear cart after success
- `app/components/sections/kosik/CartClient.tsx` - Added email collection
- `studio/src/schemaTypes/documents/product.ts` - Added ebook file field

## Troubleshooting

### Webhook Not Triggering
- Check Stripe webhook logs in dashboard
- Verify webhook secret in environment variables
- Ensure webhook URL is accessible

### Emails Not Sending
- Check console logs for email service errors
- Verify API keys and email configuration
- Test with a simple email first

### Files Not Attached
- Ensure ebook files are uploaded to Sanity
- Check file URLs are accessible
- Verify file permissions

## Production Considerations

1. **File Storage**: Consider using private file storage with signed URLs for security
2. **Email Limits**: Monitor email service limits and quotas
3. **Error Handling**: Set up proper logging and error monitoring
4. **Backup**: Have a manual process for failed email deliveries
5. **Security**: Validate webhook signatures and sanitize inputs

## Support

For issues with this implementation, check:
1. Stripe webhook logs
2. Application logs
3. Email service provider logs
4. Sanity asset URLs