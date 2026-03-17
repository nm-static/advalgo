# Advalgo Content Publishing Workflow

## Overview

This document describes the automated content publishing workflow for the Advanced Algorithms course website.

```
nm-obsidian/teaching (push)
        │
        ▼
   [n8n: Sync Workflow]
        │
        ├── Run parser
        ├── Push to staging branch
        ├── Create Fizzy card
        └── Send Mattermost notification
        │
        ▼
   staging--advalgo.netlify.app (preview)
        │
        ▼
   [Approval: Close Fizzy card OR Mattermost OK]
        │
        ▼
   [n8n: Deploy Workflow]
        │
        ├── Merge staging → main
        └── Push (triggers production deploy)
        │
        ▼
   advalgo.neeldhara.courses (production)
```

## API Endpoints

### GitHub

**Repository:** `nm-obsidian/teaching`

**Webhook:** Configure in GitHub → Settings → Webhooks
- Payload URL: `https://n8n.neeldhara.website/webhook/content-push`
- Content type: `application/json`
- Secret: (set a secret and add to n8n)
- Events: Just the push event

**Authentication:** PAT token for API calls
```
Authorization: Bearer github_pat_11ADZW6RA0JnpjaCXI82gC_...
```

### Fizzy

**Base URL:** `https://fizzy.neeldhara.cloud`
**Account Slug:** `2`
**Board:** `🎁 Advanced Algorithms`
**Board ID:** `03fohyr5beu3dv8kuwzvr1i6v`

**Columns:**
- Active: `03fohyrekubyv7wffcf7wqkji`
- Waiting: `03fohyrhfddnh0nz38jiputls`

**Authentication:**
```
Authorization: Bearer 4jGzJQHepfupkbGAR1U1W7u9
```

**Create Card:**
```bash
# Response includes card number in JSON
curl -X POST \
  -H "Authorization: Bearer {PAT}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "📝 Content Update: {description}",
    "status": "published",
    "column_id": "03fohyrhfddnh0nz38jiputls"
  }' \
  "https://fizzy.neeldhara.cloud/2/boards/03fohyr5beu3dv8kuwzvr1i6v/cards.json"
```

**Add Step to Card (for preview URL and instructions):**
```bash
# Add preview URL step
curl -X POST \
  -H "Authorization: Bearer {PAT}" \
  -H "Content-Type: application/json" \
  --data-raw '{"content":"Preview: https://staging--advalgo.netlify.app"}' \
  "https://fizzy.neeldhara.cloud/2/cards/{card_number}/steps.json"

# Add deploy instruction step
curl -X POST \
  -H "Authorization: Bearer {PAT}" \
  -H "Content-Type: application/json" \
  --data-raw '{"content":"Close this card to approve and deploy to production"}' \
  "https://fizzy.neeldhara.cloud/2/cards/{card_number}/steps.json"
```

**Update Card Title:**
```bash
curl -X PUT \
  -H "Authorization: Bearer {PAT}" \
  -H "Content-Type: application/json" \
  --data-raw '{"title":"Updated Title"}' \
  "https://fizzy.neeldhara.cloud/2/cards/{card_number}.json"
```

**Webhook for Card Closure:**
Configure in Fizzy → Board Settings → Webhooks
- URL: `https://n8n.neeldhara.website/webhook/fizzy-card-closed`
- Events: Card closed

### Netlify

**Sites:**
- Staging: `staging--advalgo.netlify.app` (auto-deploys from `staging` branch)
- Production: `advalgo.neeldhara.courses` (auto-deploys from `main` branch)

**Setup branch deploys (one-time):**
1. Go to Netlify Dashboard → Your site → Site configuration
2. Navigate to Build & deploy → Branches and deploy contexts
3. Under "Branch deploys", select "Let me add individual branches"
4. Add `staging` to the list
5. Save changes

The staging branch will now auto-deploy to `staging--advalgo.netlify.app`

## n8n Workflows

### Workflow 1: Content Sync (content-push webhook)

**Trigger:** GitHub webhook on push to `nm-obsidian/teaching`

**Steps:**
1. Receive webhook → extract commit info
2. SSH to Hetzner server
3. Run `~/repos/nm-static/advalgo/scripts/sync-content.sh`
4. Parse JSON output (contains: status, changes, commit, preview_url)
5. If `changes` is true:
   - Create Fizzy card in Waiting column → get card number from response
   - Add step: "Preview: {preview_url}"
   - Add step: "Close this card to approve and deploy to production"
   - Send Mattermost message with preview URL and card link

**Environment variables on Hetzner:**
```bash
export OBSIDIAN_REPO="$HOME/repos/nm-obsidian"
export ADVALGO_REPO="$HOME/repos/nm-static/advalgo"
```

### Workflow 2: Deploy to Production (fizzy-card-closed webhook)

**Trigger:** Fizzy webhook when card is closed on 🎁 Advanced Algorithms board

**Steps:**
1. Receive webhook → verify board ID matches
2. SSH to Hetzner server
3. Run `~/repos/nm-static/advalgo/scripts/deploy-to-production.sh`
4. Parse JSON output
5. Send Mattermost confirmation

### Workflow 3: Deploy from Mattermost (mattermost-approve webhook)

**Trigger:** Mattermost action button click

**Steps:**
1. Receive webhook with card_number
2. SSH to Hetzner server
3. Run deploy script
4. Close the Fizzy card (via webhook or direct action)
5. Reply to Mattermost thread

## Mattermost Integration

**Notification Message Format:**
```
📝 **Content Update Ready for Review**

**Preview:** https://staging--advalgo.netlify.app
**Commit:** {commit_hash}
**Changes:** {file_count} files

[Approve & Deploy] [View Changes]
```

**Action Button:**
Configure interactive message with action URL pointing to n8n webhook.

## Server Setup (Hetzner)

### Clone repositories:
```bash
mkdir -p ~/repos/nm-obsidian ~/repos/nm-static
cd ~/repos/nm-obsidian
git clone git@github.com:nm-obsidian/teaching.git

cd ~/repos/nm-static
git clone git@github.com:neeldhara/advalgo.git

# Make scripts executable
chmod +x ~/repos/nm-static/advalgo/scripts/*.sh
```

### Install dependencies:
```bash
cd ~/repos/nm-static/advalgo
npm install  # or pnpm install
```

### SSH key for n8n:
Add n8n's SSH public key to `~/.ssh/authorized_keys` on the Hetzner server.

## Testing

### Manual test - Content sync:
```bash
cd ~/repos/nm-static/advalgo
./scripts/sync-content.sh
```

### Manual test - Deploy:
```bash
cd ~/repos/nm-static/advalgo
./scripts/deploy-to-production.sh
```

### Test Fizzy card creation:
```bash
curl -X POST \
  -H "Authorization: Bearer 4jGzJQHepfupkbGAR1U1W7u9" \
  -H "Content-Type: application/json" \
  -d '{"title":"🧪 Test Card","status":"published","column_id":"03fohyrhfddnh0nz38jiputls"}' \
  "https://fizzy.neeldhara.cloud/2/boards/03fohyr5beu3dv8kuwzvr1i6v/cards.json"
```
