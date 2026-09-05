#!/usr/bin/env python3
"""Report which first-success paths can run on this machine.

Does not install anything. Does not invent command output for labs.
Reads tools and modules from curriculum.json. Path order from learning-paths/.
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_json(rel: str):
    return json.loads((ROOT / rel).read_text(encoding="utf-8"))


def have(binary: str) -> bool:
    return shutil.which(binary) is not None


def docker_daemon_ok() -> bool:
    try:
        r = subprocess.run(
            ["docker", "info"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        return r.returncode == 0
    except OSError:
        return False


def sudo_status() -> tuple[str, str]:
    if not have("sudo"):
        return "missing", "needed for some Linux exercises, not for first success"
    r = subprocess.run(
        ["sudo", "-n", "true"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    if r.returncode == 0:
        return "ok", "01 Linux exercises that create users"
    return "check", "present; may ask a password. 01 Linux first success does not need it"


def tool_ok(spec: dict) -> tuple[str, str, str]:
    """Return (status, used_label_suffix, detail). status is ok|missing|check."""
    kind = spec.get("kind")
    if kind == "always":
        return "ok", "", "this script is already running"

    binaries = spec.get("binary")
    if isinstance(binaries, str):
        binaries = [binaries]
    if not binaries:
        return "missing", "", spec.get("missing") or "no binary configured"

    found = next((b for b in binaries if have(b)), None)
    missing_hint = spec.get("missing") or ""
    if not found:
        return "missing", "", missing_hint

    if spec.get("daemon") and found == "docker":
        if docker_daemon_ok():
            return "ok", found, ""
        return "check", found, "binary found, daemon not reachable. Start Docker; add your user to the docker group"

    label = found if found != binaries[0] else ""
    return "ok", label, ""


def used_by(tool_id: str, modules: list[dict]) -> str:
    names = []
    for m in modules:
        if tool_id in (m.get("preflight") or []):
            names.append(f"{m.get('number', '')} {m.get('title', m.get('id'))}".strip())
    return ", ".join(names) if names else "—"


def module_ready(mod: dict, statuses: dict[str, str]) -> bool:
    for t in mod.get("preflight") or []:
        if statuses.get(t) != "ok":
            return False
    return True


def required_chain(path: dict, modules_by_id: dict) -> str:
    parts = []
    for step in path.get("steps") or []:
        if not step.get("required"):
            continue
        mid = step.get("module")
        mod = modules_by_id.get(mid)
        if not mod:
            continue
        parts.append(mod.get("dir") or mid)
    return " → ".join(parts)


def main() -> int:
    cur = load_json("curriculum.json")
    tools = cur.get("tools") or {}
    modules = cur.get("modules") or []
    modules_by_id = {m["id"]: m for m in modules if "id" in m}

    print("DevOps Mastery Guide — preflight")
    print(f"Repo: {ROOT}")
    print()
    print("  Tool          Status     Used by")
    print("  ------------  ---------  --------------------------------")

    statuses: dict[str, str] = {}

    def row(name: str, status: str, detail: str) -> None:
        print(f"  {name:<12}  {status:<9}  {detail}")

    for tool_id, spec in tools.items():
        status, found_label, detail = tool_ok(spec)
        statuses[tool_id] = status
        used = used_by(tool_id, modules)
        extra = []
        if found_label and found_label != tool_id:
            extra.append(found_label)
        if detail:
            extra.append(detail)
        if used != "—":
            extra.append(used)
        row(tool_id, status, "  ".join(extra) if extra else used)

    sudo_st, sudo_detail = sudo_status()
    row("sudo", sudo_st, sudo_detail)
    if have("python3"):
        row("python3", "ok", "optional; some examples and this preflight")
    else:
        row("python3", "check", "not required for module first-success paths")

    print()
    print("You can start now (tools present for that module's first success):")
    for mod in modules:
        if not module_ready(mod, statuses):
            continue
        note = mod.get("preflightNote")
        suffix = f"  ({note})" if note else ""
        print(f"  - {mod.get('number', '')} {mod.get('title', mod['id']):<12} ./{mod['dir']}/README.md{suffix}")

    apps = None
    paths_dir = ROOT / "learning-paths"
    if paths_dir.is_dir():
        for f in sorted(paths_dir.glob("*.json")):
            lp = json.loads(f.read_text(encoding="utf-8"))
            if lp.get("id") == "apps":
                apps = lp
                break

    print()
    print("Recommended first command after clone:")
    print("  # Linux first success lives in 01-linux/README.md — Beginner: first success")
    if apps:
        chain = required_chain(apps, modules_by_id)
        if chain:
            print(f"  # Apps path after that: {chain}")

    path_names = []
    if paths_dir.is_dir():
        loaded = []
        for p in paths_dir.glob("*.json"):
            lp = json.loads(p.read_text(encoding="utf-8"))
            loaded.append((lp.get("order", 99), p.name))
        path_names = [name for _, name in sorted(loaded)]
    print()
    if path_names:
        print("Paths: " + ", ".join(f"learning-paths/{n}" for n in path_names))
    print("How to study: docs/HOW_TO_LEARN.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())
