# DNS CNAME Setup Report - Cuocsong & Nguoiviet Migration to Cloudflare Pages

## Executive Summary

Both `cuocsong.muonnoi.org` and `nguoiviet.muonnoi.org` have associated Cloudflare Pages projects, but the required CNAME DNS records are not yet configured. Investigation and setup attempt completed 2026-05-17T13:45 ICT.

## Current DNS Status

### cuocsong.muonnoi.org
- **Current State**: No CNAME record set
- **dig +short Result**: (empty - no record exists)
- **dig CNAME Result**: (empty - not a CNAME)
- **Pages Project**: `cuocsong-muonnoi-org` exists
- **Target CNAME**: `cuocsong-muonnoi-org.pages.dev`
- **Status**: DNS record needs to be created

### nguoiviet.muonnoi.org
- **Current State**: CNAME points to Wix legacy DNS
- **dig +short Result**: `pointing.wixdns.net.` (legacy Wix nameserver)
- **Also resolves to**: `34.149.87.45` (Wix IP)
- **Pages Project**: `nguoiviet-muonnoi-org` exists
- **Target CNAME**: `nguoiviet-muonnoi-org.pages.dev`
- **Status**: CNAME needs to be updated from Wix to Cloudflare Pages

### www.nguoiviet.muonnoi.org
- **Current State**: Points to Wix IP
- **dig +short Result**: `34.149.87.45` (Wix IP address)
- **Target**: Should also be `nguoiviet-muonnoi-org.pages.dev` (or duplicate the nguoiviet CNAME)
- **Status**: Needs updating to Cloudflare Pages

## Verification: Pages Projects Exist

```bash
wrangler pages project list
# Results:
# - cuocsong-muonnoi-org (cuocsong-muonnoi-org.pages.dev)
# - nguoiviet-muonnoi-org (nguoiviet-muonnoi-org.pages.dev)
```

Both Pages projects are active and ready to serve traffic.

## Setup Instructions (Manual Cloudflare Dashboard)

### Why Manual?
- OAuth token available has `pages:write` but not `zone:write` permissions
- Browser-based automation experienced persistent loading issues
- Cloudflare dashboard is most reliable method for DNS record management

### Steps

1. **Access Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com/f3f9e76222dcb488d5e303e29e8ba192/muonnoi.org/dns/records

2. **Create CNAME for cuocsong.muonnoi.org**
   - Click "Add record"
   - Type: CNAME
   - Name: `cuocsong`
   - Target: `cuocsong-muonnoi-org.pages.dev`
   - Proxy status: ON (orange cloud)
   - TTL: 1 (Auto)
   - Click Save

3. **Update CNAME for nguoiviet.muonnoi.org**
   - Find existing `nguoiviet` CNAME record (currently `pointing.wixdns.net`)
   - Click Edit
   - Change Target to: `nguoiviet-muonnoi-org.pages.dev`
   - Proxy status: ON (orange cloud)
   - TTL: 1 (Auto)
   - Click Save

4. **Update CNAME for www.nguoiviet.muonnoi.org**
   - Find or create `www.nguoiviet` CNAME record
   - Target: `nguoiviet-muonnoi-org.pages.dev`
   - Proxy status: ON (orange cloud)
   - TTL: 1 (Auto)
   - Click Save

## Verification After Setup

Run these commands to verify propagation:

```bash
# Should return cuocsong-muonnoi-org.pages.dev within 1-5 minutes
dig CNAME cuocsong.muonnoi.org +short

# Should return nguoiviet-muonnoi-org.pages.dev within 1-5 minutes
dig CNAME nguoiviet.muonnoi.org +short

# Should also return the Cloudflare Pages CNAME
dig CNAME www.nguoiviet.muonnoi.org +short

# HTTPS should return 200 once propagated
curl -I https://cuocsong.muonnoi.org
curl -I https://nguoiviet.muonnoi.org
```

## Expected Timeline

- **Immediate**: DNS record creation visible in Cloudflare dashboard
- **1-5 minutes**: DNS propagation to most resolvers
- **5-30 minutes**: Full global propagation
- **After propagation**: Both domains will serve from Cloudflare Pages

## Investigation Details

### Tools Used
- `dig` - DNS lookups
- `wrangler pages project list` - Pages project inventory
- Cloudflare OAuth token - Zone information verification

### Findings
- Pages projects have been created and deployed
- Custom domain attachment in Pages projects requires DNS CNAME records
- OAuth token insufficient for direct API DNS management
- Browser automation blocked by Cloudflare dashboard loading issues

### Blocker Status
- **Primary blocker**: Cloudflare dashboard access for manual DNS record creation
- **Secondary blocker**: OAuth token lacks zone:write permission for API-based DNS updates

## Evidence Timestamp
- **Date/Time**: 2026-05-17T13:45 ICT
- **Completed Actions**: DNS audit, Pages project verification, documentation
- **Next Action**: Manual Cloudflare dashboard DNS record creation and propagation verification
