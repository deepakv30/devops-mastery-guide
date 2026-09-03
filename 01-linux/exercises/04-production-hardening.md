# Production — name five hardening steps

**Band:** Production  
**Setup:** None. This is writing, not a CIS run.

**Task:** List five hardening steps you would apply to a fresh VM and *why* each one. Do not implement a benchmark.

**Hint:** Start from this module’s Production section: root SSH, keys, updates, firewall, journal persistence.

**Success:** Five bullets, each with a failure it prevents (for example “`PermitRootLogin no` — a guessed root password is not an SSH session”).

<details>
<summary>Solution notes</summary>

Sample set: disable root SSH; key-only auth after a test login; `unattended-upgrades`; `ufw` default deny + allow 22/tcp; persist the journal. Each line names the incident it blocks.

</details>
