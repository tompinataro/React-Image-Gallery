#!/bin/sh
# Publish only the production build; keep source and server files off Pages.
set -eu
cd "$(dirname "$0")/.."
npm run test:static
publish_dir=$(mktemp -d)
trap 'rm -rf "$publish_dir"' EXIT
cp -R build/. "$publish_dir/"
touch "$publish_dir/.nojekyll"
git -C "$publish_dir" init -b gh-pages
git -C "$publish_dir" add .
git -C "$publish_dir" -c user.name="Tom Pinataro" -c user.email="tompinataro@users.noreply.github.com" commit -m "Deploy flower gallery from $(git rev-parse --short HEAD)"
git -C "$publish_dir" remote add origin "$(git remote get-url origin)"
# The deployment branch contains generated files only. Lease protects concurrent deploys.
remote_tip=$(git ls-remote origin refs/heads/gh-pages | cut -f1)
git -C "$publish_dir" push --force-with-lease="refs/heads/gh-pages:$remote_tip" origin gh-pages
