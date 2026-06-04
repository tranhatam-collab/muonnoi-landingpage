# Muonnoi Mobile

This folder is the execution lane for Muonnoi Life Quest OS mobile.

## Current status

Sprint 0 / Sprint 1 planning and scaffold are ready.

The production mobile shell currently lives under `app.muonnoi.org/mobile-shell`. This folder is the team-facing execution hub for planning, contracts, screen ownership and future shared mobile source migration.

## Read first

1. `MUONNOI_MOBILE_TEAM_HANDOFF_SPRINT_01_2026-05-11.md`
2. `MUONNOI_MOBILE_INFORMATION_ARCHITECTURE_2026-05-11.md`
3. `MUONNOI_MOBILE_SCREEN_FLOW_AND_STATE_MAP_2026-05-11.md`
4. `MUONNOI_NOTIFICATION_AND_EVENT_TAXONOMY_2026-05-11.md`
5. `MUONNOI_MOBILE_DESIGN_SYSTEM_LOCK_2026-05-11.md`

## Scaffold

- `app/`: app entry and platform shell notes
- `src/navigation/`: navigation maps and route ownership
- `src/screens/`: screen-level implementation
- `src/features/`: feature modules
- `src/components/`: shared UI components
- `src/lib/`: API, storage, sync, permission helpers
- `src/theme/`: design tokens and mobile theming
- `src/contracts/`: copied/generated client contracts

## Rule

Do not build from chat memory. Every implementation task must point to a documented route, state, API contract or release gate.

