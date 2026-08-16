# Ansible cheat sheet

Control node runs `ansible-playbook`. Managed nodes need Python and SSH (or `ansible_connection=local`).

## First commands

```bash
ansible --version
cd examples
ansible-playbook -i inventory.ini hello.yml
ansible-playbook -i inventory.ini hello.yml          # expect changed=0
ansible -i inventory.ini local -m ping
ansible-playbook -i inventory.ini nginx.yml --check --diff
ansible-playbook -i inventory.ini nginx.yml --tags page
ansible-playbook -i inventory.ini nginx.yml --ask-become-pass
```

## Objects

| Object | What it is |
|---|---|
| Inventory | Hosts and groups (`inventory.ini`) |
| Playbook | YAML: plays → tasks |
| Play | One `hosts:` plus its tasks |
| Module | One action (`copy`, `apt`, `service`) |
| Handler | Task that runs only when notified |
| Role | Reusable directory (`roles/common/tasks/main.yml`) |
| Collection | Packaged modules (`ansible.builtin`, `community.docker`) |
| FQCN | `ansible.builtin.copy`, not `copy` |

## Inventory snippet

```ini
[local]
localhost ansible_connection=local
```

## Task shapes

```yaml
- name: Write a file
  ansible.builtin.copy:
    dest: /tmp/ansible-first-success.txt
    content: "Ansible was here\n"

- name: Read it back
  ansible.builtin.command: cat /tmp/ansible-first-success.txt
  register: out
  changed_when: false

- name: Template a page
  ansible.builtin.template:
    src: templates/index.html.j2
    dest: /var/www/html/index.html
  notify: Restart nginx
  tags: [page]
```

## Vault (encrypt a string, not a server)

```bash
ansible-vault encrypt_string 'change-me' --name 'db_password'
```

## Files in this module

| File | Role |
|---|---|
| [examples/inventory.ini](./examples/inventory.ini) | Localhost inventory |
| [examples/hello.yml](./examples/hello.yml) | First success |
| [examples/nginx.yml](./examples/nginx.yml) | apt + template + handler (needs sudo) |
| [examples/templates/index.html.j2](./examples/templates/index.html.j2) | Jinja2 page |
| [examples/roles/common/tasks/main.yml](./examples/roles/common/tasks/main.yml) | Tiny role |

## Do not

- Use `shell` when a module exists.
- Commit a vault password.
- Treat `--check` as proof a service started.
