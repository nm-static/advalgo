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

# Global variable to store Obsidian commit message
OBSIDIAN_COMMIT_MSG=""

# Output JSON result
output_json() {
  local status="$1"
  local message="$2"
  local changes="$3"
  local commit_hash="$4"
  local pages_json="$5"

  # Default to empty array if no pages
  if [ -z "$pages_json" ]; then
    pages_json="[]"
  fi

  # Escape commit message for JSON
  local escaped_commit_msg=$(echo "$OBSIDIAN_COMMIT_MSG" | sed 's/\\/\\\\/g; s/"/\\"/g; s/	/\\t/g' | tr -d '\n')

  cat << EOF
{
  "status": "$status",
  "message": "$message",
  "changes": $changes,
  "commit": "$commit_hash",
  "commit_message": "$escaped_commit_msg",
  "preview_url": "$STAGING_URL",
  "pages": $pages_json,
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF
}

# Convert file path to preview URL
# src/docs/data/docs/en/01-greedy/file-storage.md -> https://staging--advalgo.netlify.app/materials/01-greedy/file-storage
file_to_url() {
  local file="$1"
  # Only process docs content files
  if [[ "$file" == src/docs/data/docs/en/*.md ]]; then
    # Strip prefix and .md suffix
    local path="${file#src/docs/data/docs/en/}"
    path="${path%.md}"
    # Skip index files, use parent path
    if [[ "$path" == */index ]]; then
      path="${path%/index}"
    fi
    echo "${STAGING_URL}/materials/${path}"
  fi
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
  git fetch origin >&2
  git checkout main >&2
  git pull origin main >&2

  # Capture the latest commit message for card title
  OBSIDIAN_COMMIT_MSG=$(git log -1 --pretty=%s)
  log "Latest Obsidian commit: $OBSIDIAN_COMMIT_MSG"
}

# Prepare staging branch
prepare_staging() {
  log "Preparing staging branch..."
  cd "$ADVALGO_REPO"
  git fetch origin >&2
  git checkout staging >&2
  git pull origin staging >&2

  # Ensure we have the latest parser
  git merge origin/main --no-edit >&2 || true
}

# Run the parser
run_parser() {
  log "Running content parser..."
  cd "$ADVALGO_REPO"

  # Set environment variables for the parser
  export OBSIDIAN_BASE="$OBSIDIAN_REPO"

  node parse.mjs >&2
}

# Commit and push changes
commit_and_push() {
  cd "$ADVALGO_REPO"

  # Stage all changes
  git add -A >&2

  # Check if there are changes to commit
  if git diff --cached --quiet; then
    log "No changes to commit"
    output_json "no_changes" "No content changes detected" "false" "" "[]"
    return 0
  fi

  # Get list of changed files for the commit message
  local changed_files=$(git diff --cached --name-only | head -10)
  local file_count=$(git diff --cached --name-only | wc -l | tr -d ' ')

  # Build JSON array of changed page URLs
  local pages_json="["
  local first=true
  while IFS= read -r file; do
    local url=$(file_to_url "$file")
    if [ -n "$url" ]; then
      if [ "$first" = true ]; then
        first=false
      else
        pages_json+=","
      fi
      pages_json+="\"$url\""
    fi
  done < <(git diff --cached --name-only)
  pages_json+="]"

  # Create commit message
  local commit_msg="Content sync: $(date +%Y-%m-%d)

Changed files ($file_count total):
$changed_files"

  # Commit
  git commit -m "$commit_msg" >&2
  local commit_hash=$(git rev-parse --short HEAD)

  # Push to staging
  log "Pushing to staging branch..."
  git push origin staging >&2

  log "Successfully pushed commit $commit_hash"
  output_json "success" "Content synced to staging" "true" "$commit_hash" "$pages_json"
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
