# MULTI CLOUD DISASTER RECOVERY PLAN · MUONNOI 2026

## Strategy
Cloudflare remains the edge and security layer, but Muonnoi must keep core data, backup and recovery independent from any single provider.

## Required resilience design
- Primary DNS: Cloudflare
- Secondary DNS: AWS Route 53 or NS1 when scale justifies it
- Primary frontend: Cloudflare Pages
- Static backup mirror: object storage or alternate host
- Primary database: Supabase/Neon/Postgres
- Database backup: provider backup plus external export
- Object storage: R2 primary plus S3/B2 backup
- Observability: Sentry plus OpenTelemetry/Grafana path

## Recovery levels
### Level 1 - Static public shell outage
Serve static backup or rollback to last known Pages deployment.

### Level 2 - API outage
Degrade app to read-only public mode and disable mutations.

### Level 3 - Database outage
Stop writes, preserve queues, restore from latest verified backup.

### Level 4 - Cloudflare edge outage
Switch critical public surfaces to secondary DNS/origin when configured.

## Drills
- monthly backup integrity check
- quarterly restore drill
- incident role review before major release
- DNS failover tabletop before public scale
