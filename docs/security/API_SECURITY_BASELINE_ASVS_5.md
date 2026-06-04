# API SECURITY BASELINE ASVS 5 · MUONNOI 2026

## Baseline
Use OWASP ASVS 5.0.0 as the application/API verification baseline.

## Required controls for Muonnoi APIs
- authentication hardening
- session management
- authorization checks for every object
- input validation
- output encoding
- rate limiting by IP, user and action
- CSRF protection when using cookie auth
- strict CORS allowlist
- audit logging
- secure error responses
- idempotency for mutation endpoints
- replay protection for sensitive actions

## Required API surfaces
- auth/session
- feed
- quest list/detail
- proof draft/upload
- proof review status
- push registration
- complaints
- payment webhook
- email receipt/status
- admin audit

## Release gate
No API is production-ready until:
- schema is documented
- happy path is tested
- abuse path is tested
- permission failure path is tested
- rate limit path is tested
- logs exclude secrets
- CORS matches only approved origins
