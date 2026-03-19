#!/bin/bash
#
# Advalgo Content Sync Script
# Called by n8n when changes are pushed to nm-obsidian/teaching
#
# Usage: ./sync-content.sh
# Returns: JSON with status and details
#
# Environment variables (optional):
#   OBSIDIAN_REPO - Path to nm-obsidian repo (default: ~/repos/nm-obsidian)
#   ADVALGO_REPO  - Path to nm-static/advalgo repo (default: ~/repos/nm-static/advalgo)
#

set -e

OBSIDIAN_REPO="${OBSIDIAN_REPO:-$HOME/repos/nm-obsidian/teaching}"
ADVALGO_REPO="${ADVALGO_REPO:-$HOME/repos/nm-static/advalgo}"
STAGING_URL="https://staging--advalgo.netlify.app"

# Colors for terminal output (disabled in non-interactive mode)
if [ -t 1 ]; then
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[1;33m'
  NC='\033[0m'
else
  RED=''
  GREEN=''
  YELLOW=''
  NC=''
fi

log() {
  echo -e "${GREEN}[SYNC]${NC} $1" >&2
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1" >&2
}

error() {
  echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Output JSON result
output_json() {
  local status="$1"
  local message="$2"
  local changes="$3"
  local commit_hash="$4"

  cat << EOF
{
  "status": "$status",
  "message": "$message",
  "changes": $changes,
  "commit": "$commit_hash",
  "preview_url": "$STAGING_URL",
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
}

# Check prerequisites
check_prereqs() {
  if [ ! -d "$OBSIDIAN_REPO" ]; then
    error "Obsidian repo not found at $OBSIDIAN_REPO"
    output_json "error" "Obsidian repo not found" "false" ""
    exit 1
  fi

  if [ ! -d "$ADVALGO_REPO" ]; then
    error "Advalgo repo not found at $ADVALGO_REPO"
    output_json "error" "Advalgo repo not found" "false" ""
    exit 1
  fi

  if ! command -v node &> /dev/null; then
    error "Node.js not found"
    output_json "error" "Node.js not installed" "false" ""
    exit 1
  fi
}

# Pull latest from Obsidian vault
pull_obsidian() {
  log "Pulling latest from Obsidian vault..."
  cd "$OBSIDIAN_REPO"
  git fetch origin
  git checkout main
  git pull origin main
}

# Prepare staging branch
prepare_staging() {
  log "Preparing staging branch..."
  cd "$ADVALGO_REPO"
  git fetch origin
  git checkout staging
  git pull origin staging

  # Ensure we have the latest parser
  git merge origin/main --no-edit || true
}

# Run the parser
run_parser() {
  log "Running content parser..."
  cd "$ADVALGO_REPO"

  # Set environment variables for the parser
  export OBSIDIAN_BASE="$OBSIDIAN_REPO"

  node parse.mjs
}

# Commit and push changes
commit_and_push() {
  cd "$ADVALGO_REPO"

  # Stage all changes
  git add -A

  # Check if there are changes to commit
  if git diff --cached --quiet; then
    log "No changes to commit"
    output_json "no_changes" "No content changes detected" "false" ""
    return 0
  fi

  # Get list of changed files for the commit message
  local changed_files=$(git diff --cached --name-only | head -10)
  local file_count=$(git diff --cached --name-only | wc -l | tr -d ' ')

  # Create commit message
  local commit_msg="Content sync: $(date +%Y-%m-%d)

Changed files ($file_count total):
$changed_files"

  # Commit
  git commit -m "$commit_msg"
  local commit_hash=$(git rev-parse --short HEAD)

  # Push to staging
  log "Pushing to staging branch..."
  git push origin staging

  log "Successfully pushed commit $commit_hash"
  output_json "success" "Content synced to staging" "true" "$commit_hash"
}

# Main execution
main() {
  log "Starting content sync..."
  log "Obsidian repo: $OBSIDIAN_REPO"
  log "Advalgo repo: $ADVALGO_REPO"

  check_prereqs
  pull_obsidian
  prepare_staging
  run_parser
  commit_and_push
}

main "$@"
