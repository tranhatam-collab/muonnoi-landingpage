# DATA PROTECTION AND RETENTION POLICY · MUONNOI 2026

## Data classes
- Public content
- User private data
- Family private data
- Payment data
- Identity verification data
- Proof and receipt data
- Admin and audit data

## Rules
- encrypt in transit
- encrypt at rest
- minimize collection
- separate access by role
- log access to sensitive data
- define retention per class
- support deletion request workflow
- never use private user data for behavioral advertising

## Retention starting point
- Public content: retained while published
- User private data: retained while account is active unless deletion is requested
- Family private data: strict access and deletion path required
- Payment data: retain only references and provider-safe metadata
- Identity data: shortest legal and operational retention possible
- Proof data: retain according to quest policy and dispute window
- Admin audit data: retain for security review and incident investigation

## Blocker
No full public release for identity, family, proof or payment flows until data retention and deletion procedures are implemented and tested.
