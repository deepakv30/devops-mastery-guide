#!/usr/bin/env bash
# Create a login user with a home directory and add them to the sudo group.
# Ubuntu/Debian only (the admin group is called wheel on Fedora/RHEL).
#
# Intermediate example. The basic exercise creates a user *without* sudo.
#
#   sudo ./create-sudo-user.sh devops
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this script with sudo." >&2
  exit 1
fi

username="${1:-devops}"

if id "$username" >/dev/null 2>&1; then
  echo "User $username already exists." >&2
  exit 1
fi

# -m: create /home/$username from /etc/skel
# -s: login shell (omit this and the account cannot start a normal session)
useradd -m -s /bin/bash "$username"

# -a: append (without it, usermod would *replace* the user's groups)
# -G: supplementary group. sudo on Ubuntu == "may run commands as root".
usermod -aG sudo "$username"

echo "Created $username with a home directory and sudo."
echo "Set a password before they log in: passwd $username"
echo "For least privilege, skip the usermod line and grant only the commands they need."
