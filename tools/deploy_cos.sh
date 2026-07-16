#!/usr/bin/env bash

set -euo pipefail

require_env() {
    local name="$1"

    if [[ -z "${!name:-}" ]]; then
        echo "Required environment variable ${name} is not set." >&2
        exit 1
    fi
}

normalize_target_dir() {
    local target_dir="$1"

    if [[ "$target_dir" != /* ]]; then
        target_dir="/${target_dir}"
    fi

    while [[ "$target_dir" != "/" && "$target_dir" == */ ]]; do
        target_dir="${target_dir%/}"
    done

    if [[ "$target_dir" =~ (^|/)\.\.?(/|$) ]]; then
        echo 'COS_TARGET_DIR must not contain "." or ".." path segments.' >&2
        exit 1
    fi

    printf '%s' "$target_dir"
}

require_env COS_SECRET_ID
require_env COS_SECRET_KEY
require_env COS_BUCKET
require_env COS_REGION

dist_dir="${DIST_DIR:-dist}"
target_dir="$(normalize_target_dir "${COS_TARGET_DIR:-/}")"

if [[ ! -d "$dist_dir" ]]; then
    echo "Build output directory ${dist_dir} does not exist." >&2
    exit 1
fi

if ! command -v coscmd >/dev/null 2>&1; then
    echo 'coscmd is not installed or is not available on PATH.' >&2
    exit 1
fi

coscmd config \
    -a "$COS_SECRET_ID" \
    -s "$COS_SECRET_KEY" \
    -b "$COS_BUCKET" \
    -r "$COS_REGION"

while IFS= read -r -d '' local_dir; do
    dir_name="${local_dir##*/}"

    if [[ "$target_dir" == "/" ]]; then
        remote_dir="/${dir_name}/"
    else
        remote_dir="${target_dir}/${dir_name}/"
    fi

    echo "Clearing remote directory ${remote_dir}"
    coscmd delete -rf "$remote_dir"
done < <(find "$dist_dir" -mindepth 1 -maxdepth 1 -type d -print0)

if [[ "$target_dir" == "/" ]]; then
    remote_target='/'
else
    remote_target="${target_dir}/"
fi

echo "Uploading ${dist_dir}/ to ${remote_target}"
coscmd upload -rs "${dist_dir%/}/" "$remote_target"
