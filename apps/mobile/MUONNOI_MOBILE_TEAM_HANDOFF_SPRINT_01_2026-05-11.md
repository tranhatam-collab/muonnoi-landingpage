# MUONNOI · MOBILE TEAM HANDOFF · SPRINT 01 · 2026-05-11

## Sprint objective
Ship a working internal alpha shell for iOS + Android that proves:
- auth loop
- feed read shell
- quest hub shell
- proof draft capture
- local queue skeleton
- notifications shell

## Sprint duration
14 working days

## Deliverables
1. app shell boots on iOS/Android
2. auth and session restore functional
3. feed home shell functional
4. quest hub shell functional
5. quest detail + submit proof draft functional
6. basic settings functional
7. build pipelines functional

## Product tasks
- finalize screen list
- finalize quest MVP content assumptions
- finalize permission copy
- finalize placeholder empty states

## Mobile tasks
- bootstrap RN/Expo app
- setup navigation
- setup state management
- setup secure storage
- implement auth screens
- implement feed shell
- implement quest hub shell
- implement proof draft local form

## API tasks
- provide auth endpoints + mocks if needed
- provide feed endpoint contract
- provide quest list/detail contract
- provide proof submit contract draft

## Platform tasks
- configure CI
- signing prep
- env/secrets
- preview builds distribution

## QA tasks
- define device matrix
- define smoke test script
- define regression script for auth/feed/quest/proof

## Definition of done
- internal build installed on at least 2 iOS devices and 2 Android devices
- auth path passes end to end
- quest draft survives app restart
- no blocker crash in smoke test
- documented known issues list exists
