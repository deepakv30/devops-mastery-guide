# Terraform cheat sheet

`.tf` files are desired state. `terraform.tfstate` is the notebook. `plan` is the diff. No cloud account for this module.

## First commands

```bash
terraform version
cd examples/local-file
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply -auto-approve
cat hello.txt
terraform apply -auto-approve    # expect "No changes"
ls terraform.tfstate             # exists; do not commit it
terraform destroy -auto-approve
```

Override a variable:

```bash
terraform apply -auto-approve -var='greeting=hello again
'
```

Module example:

```bash
cd examples/module-hello
terraform init
terraform apply -auto-approve
ls *.txt                         # hello-from-module.txt alpha.txt beta.txt
terraform destroy -auto-approve
```

## Objects

| Object | What it is |
|---|---|
| Desired state | `.tf` files (HCL) |
| Provider | Plugin for an API (`hashicorp/local`) |
| Resource | One object (`local_file.hello`) |
| State file | `terraform.tfstate` — IDs and attributes |
| Plan | Diff of desired vs state |
| Module | A directory with variables + resources + outputs |
| Workspace | Named copy of state in the same directory |

## Core loop

```text
init → plan → apply → (state updated) → plan again → No changes
```

## Pinning

```hcl
terraform {
  required_version = ">= 1.9.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}
```

Commit `.terraform.lock.hcl`. Do not commit `*.tfstate` or `.terraform/`.

## Files in this module

| File | Role |
|---|---|
| [examples/local-file/main.tf](./examples/local-file/main.tf) | `local_file` resource |
| [examples/local-file/versions.tf](./examples/local-file/versions.tf) | Provider pin |
| [examples/local-file/variables.tf](./examples/local-file/variables.tf) | `greeting`, `filename` |
| [examples/local-file/outputs.tf](./examples/local-file/outputs.tf) | Path and checksum |
| [examples/local-file/.gitignore](./examples/local-file/.gitignore) | Ignore state and `.terraform/` |
| [examples/module-hello/](./examples/module-hello/) | Caller + `modules/hello` + `for_each` |

## Terraform vs Ansible

| Terraform | Ansible |
|---|---|
| Create the box | Configure the box |
| State file | The machine |

## Do not

- Commit `terraform.tfstate`.
- Put passwords in `.tf` arguments (they land in state).
- Use workspaces as a substitute for separate prod pipelines.
- Use Terraform to `apt install` packages (that is Ansible).
