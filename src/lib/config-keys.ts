// src/lib/config-keys.ts
export const CONFIG_KEYS = [
  { key: 'SENDGRID_API_KEY',    label: 'SendGrid API Key',    secret: true },
  { key: 'GITHUB_ID',           label: 'GitHub Client ID',    secret: false },
  { key: 'GITHUB_SECRET',       label: 'GitHub Client Secret',secret: true },
  { key: 'GOOGLE_CLIENT_ID',    label: 'Google Client ID',    secret: false },
  { key: 'GOOGLE_CLIENT_SECRET',label: 'Google Client Secret',secret: true },
  { key: 'DISCORD_CLIENT_ID',   label: 'Discord Client ID',   secret: false },
  { key: 'DISCORD_CLIENT_SECRET',label: 'Discord Client Secret',secret: true },
  { key: 'STRIPE_SECRET_KEY',   label: 'Stripe Secret Key',   secret: true },
  { key: 'STRIPE_WEBHOOK_SECRET',label: 'Stripe Webhook Secret',secret: true },
  // … ajoute ici toutes les autres clés
]
