# Muonnoi Mobile Screen Flow And State Map

Date: 2026-05-11
Scope: Sprint 0 / Sprint 1 implementation map.

## App launch

States:
- loading session
- unauthenticated
- authenticated
- offline with cached session
- blocked by required update

Flow:
1. Open app.
2. Load session.
3. If no session, show onboarding/auth.
4. If session exists, show Today.
5. If offline, show cached Today and sync status.

## Onboarding and auth

Screens:
- Welcome
- Privacy promise
- Sign in
- Verify link/code
- Profile basics
- Permission intro

Required states:
- loading
- empty
- invalid code
- expired link
- network error
- offline retry

## Today

Screens:
- Today overview
- Active mission
- Next action
- Pending validation
- Receipt highlight

States:
- no active quest
- active quest
- proof pending upload
- proof pending review
- proof accepted
- proof rejected

## Quest discovery

Screens:
- Quest list
- Quest filters
- Quest detail
- Join confirmation

States:
- loading
- empty module
- no eligible quests
- joined
- already joined
- join failed

## Proof submission

Screens:
- Proof instructions
- Text proof
- Photo proof
- Location consent
- Review before submit
- Upload progress
- Submitted status

States:
- draft saved
- permission denied
- upload queued
- upload failed
- duplicate request
- submitted
- rejected with reason

## Notifications

Screens:
- Notification inbox
- Notification detail route

States:
- unread
- read
- expired
- muted
- permission not granted

## Settings

Screens:
- Account
- Privacy
- Permissions
- Notifications
- Security
- Help and complaints

States:
- permission enabled
- permission disabled
- permission blocked by OS
- delete/export data request

## Deep links

Supported:
- `/quests/:questId`
- `/proof/:proofId`
- `/receipts/:receiptId`
- `/host/validation/:validationId`
- `/settings/privacy`

Rule:
- Every deep link must resolve to auth-aware loading, success, not-found and no-permission states.

