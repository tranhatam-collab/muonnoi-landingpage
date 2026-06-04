# Muonnoi Sync Offline Cache Strategy

Date: 2026-05-11
Scope: Mobile offline behavior and conflict handling.

## Cache policy by data type

Network-first:
- session refresh
- proof submission result
- validation result
- complaint submission

Cache-first with background refresh:
- quest catalog
- profile summary
- trust receipt list
- notification inbox

Offline-draft:
- proof text
- selected photo references
- pending location proof
- join quest mutation

## Mutation queue

Every queued mutation stores:
- `idempotencyKey`
- endpoint
- payload hash
- createdAt
- retryCount
- lastErrorCode
- userVisibleState

Retry policy:
- retry on network errors
- retry on 5xx
- do not retry on 4xx unless error says `retryable: true`
- exponential backoff with visible pending state

## Conflict handling

Quest join:
- server state wins if already joined
- client maps duplicate join to success

Proof submit:
- idempotency key wins
- duplicate payload returns original proof id
- changed payload with same idempotency key returns conflict

Profile update:
- last-write wins only for low-risk fields
- security/privacy fields require fresh fetch before save

## Offline user copy

Allowed:
- "Đã lưu nháp trên máy này."
- "Sẽ gửi khi có mạng."
- "Cần mở lại quyền ảnh hoặc vị trí để gửi bằng chứng này."

Not allowed:
- "Đã hoàn thành" before server acceptance
- "Đã nhận thưởng" before trust result

## Required mobile states

- online
- offline
- syncing
- queued
- retrying
- failed_retryable
- failed_final
- conflict

