# SOURCE CODE PROTECTION POLICY · MUONNOI 2026

## Purpose
Protect source code, secrets, deployment authority and production branches.

## Required GitHub controls
- protect `main`
- require pull request review
- require status checks
- require signed commits when available
- enable secret scanning
- enable Dependabot
- enable CodeQL
- disable force push on protected branches
- block direct push to production branches

## Branch flow
`dev` or feature branch -> pull request -> CI checks -> security scan -> review -> merge -> staging -> production.

## Secret rule
Never commit:
- API keys
- database URLs
- JWT secrets
- OAuth secrets
- Stripe/payment keys
- Cloudflare tokens
- private keys

Use:
- Cloudflare Secrets
- AWS Secrets Manager
- GCP Secret Manager
- 1Password or Doppler if adopted

## Review rule
Any change touching auth, payment, email, proof, storage, admin, deployment or DNS requires Platform + Security review before production deploy.
