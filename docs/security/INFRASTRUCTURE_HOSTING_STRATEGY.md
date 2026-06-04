# INFRASTRUCTURE HOSTING STRATEGY · MUONNOI 2026

## Verdict
Do not leave Cloudflare.

Use Cloudflare as Edge, DNS, WAF, cache and Zero Trust. Do not make Cloudflare the only critical dependency for core product data, source code, backups or disaster recovery.

## Target model
- Cloudflare: Edge, DNS, WAF, DDoS protection, cache, SSL/TLS, Zero Trust access for admin.
- AWS: recommended core infrastructure for business workloads when the product outgrows edge-only patterns.
- Google Cloud: optional AI/data/search workload layer.
- Supabase or Neon: managed Postgres for early product stages.
- Cloudflare R2 plus AWS S3 or Backblaze B2: object storage with backup copy.
- GitHub Enterprise or GitHub with strict branch protection: source control.
- Sentry, OpenTelemetry, Grafana: observability.

## Stage 1: 0 to 1 million users
- Frontend: Cloudflare Pages or Vercel.
- API: Cloudflare Workers with AWS/GCP fallback path documented.
- Database: Supabase Postgres or Neon Postgres.
- Object storage: R2 primary plus S3/B2 backup.
- Email: provider with domain authentication and fallback support inbox.
- Payment: provider-owned payment surface with audit logs and rollback playbook.

## Stage 2: 1 to 10 million users
- Primary cloud: AWS or Google Cloud.
- Edge/security: Cloudflare.
- Compute: AWS ECS/EKS/Lambda or GCP Cloud Run/GKE.
- Database: Postgres primary, read replicas, PITR backup.
- Search: OpenSearch, Meilisearch or Typesense.
- Queue: SQS, Pub/Sub or Cloudflare Queues.

## Stage 3: international scale
- AWS: primary business workloads.
- Google Cloud: AI/data/search workloads.
- Cloudflare: edge/security.
- Secondary DNS: AWS Route 53 or NS1.
- Secondary region: disaster recovery.

## Cloudflare-first deployment rule
Before every deploy:
1. Confirm Cloudflare Pages project.
2. Confirm project domains.
3. Confirm output directory.
4. Confirm route/source mapping.
5. Deploy.
6. Record deployment URL and true state.

## External standards checked
- OWASP ASVS 5.0.0 is current stable application security verification guidance.
- CIS Controls v8/v8.1 are suitable operational controls for cloud, hybrid and mobile environments.
- Cloudflare has official outage postmortem evidence; this supports multi-layer resilience planning.
