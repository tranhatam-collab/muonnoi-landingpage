# MUONNOI EVIDENCE REDACTION GUIDELINES · 2026-05-12

## Purpose
Use this guide before attaching payment, email, webhook, DNS, deployment or provider dashboard evidence to repo docs.

## Never commit
- API tokens
- provider keys
- webhook signing secrets
- cookies
- JWT/session values
- one-time codes
- full payment provider ids
- full customer ids
- full email addresses
- full IP addresses when not necessary
- private dashboard URLs with tokens

## Allowed with redaction
- payment id prefix only, for example `pay_***redacted`
- email id prefix only, for example `email_***redacted`
- email domain only, for example `***@muonnoi.org`
- webhook event type without signature value
- deployment id
- Cloudflare Pages deployment URL
- HTTP status and safe headers
- timestamp

## Evidence shape
Every evidence block must include:
- command or source
- timestamp
- environment
- expected result
- actual result
- pass/fail
- redaction note

## Hard stop
If evidence contains a secret, do not commit it. Replace it with a redacted value and rerun the relevant check.
