# Linux cheat sheet

One page. Details live in [README.md](./README.md).

## Who am I

| Command | What it answers |
|---|---|
| `whoami` | Your login name |
| `id` | uid, gid, groups |
| `sudo -l` | Commands sudo will run for you |
| `uname -a` | Kernel and arch |

## Files and permissions

| Command | Notes |
|---|---|
| `ls -l` | type + `rwx` triad + owner + group |
| `chmod 600 file` | owner rw; group/other none |
| `chmod 755 dir` | owner rwx; others rx (enter the directory) |
| `chown user:group file` | needs root for another user |
| `mkdir -p path` | create parents |
| `df -h` | how full is each mount |
| `du -xh -d 1 DIR` | which child of DIR is large |

Modes you will actually use: `644` files, `755` dirs and scripts, `600` secrets.

## Processes and services

| Command | Notes |
|---|---|
| `ps aux` | every process; `USER PID … COMMAND` |
| `ps -u "$USER"` | only yours |
| `kill PID` | SIGTERM (ask) |
| `kill -9 PID` | SIGKILL (last resort) |
| `systemctl status NAME` | running / failed / enabled |
| `systemctl start\|stop\|restart NAME` | now |
| `systemctl enable --now NAME` | now *and* on boot |

## Network and logs

| Command | Notes |
|---|---|
| `ip addr` | interfaces and addresses |
| `ss -tuln` | listening TCP/UDP, numeric |
| `ss -tulpn` | same, with process (needs sudo for other users) |
| `journalctl -n 20 --no-pager` | last 20 journal lines |
| `journalctl -u NAME -e --no-pager` | one unit, jump to end |
| `ls /var/log` | classic log files |

## Packages (Ubuntu)

```bash
sudo apt update
sudo apt install -y PACKAGE
apt show PACKAGE
```

Fedora/RHEL: `sudo dnf install -y PACKAGE`.

## Firewall (Ubuntu)

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw status
```

## Scripts in this module

- [examples/disk-alert.sh](./examples/disk-alert.sh) — ALERT if a filesystem is over 80%.
- [examples/create-sudo-user.sh](./examples/create-sudo-user.sh) — `useradd -m` plus sudo group.
