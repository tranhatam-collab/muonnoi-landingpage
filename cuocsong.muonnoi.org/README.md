# Cuoc Song Muon Noi · `cuocsong.muonnoi.org`

Static source for Team 6 web implementation lane in Muon Noi.

## Current status

- Source path: locked as `cuocsong.muonnoi.org/`
- Deployment: not executed in this lane
- DNS: not attached in this lane
- Scope: first sprint static routes + legal boundary pages

## Routes currently implemented

- `/`
- `/gioi-thieu/`
- `/song-o-nhieu-noi/`
- `/cho-va-nhan/`
- `/legal/disclaimer/`
- `/legal/privacy/`
- `/legal/terms/`

## Local verify

```bash
find public -type f | sort
rg -n "Tiếng Việt|English|Cuộc Sống Muôn Nơi|Life Across Places" public
```

## Deployment note

Do not deploy or attach custom domain from this lane until QA, legal gate, and DNS matrix evidence are marked ready.
