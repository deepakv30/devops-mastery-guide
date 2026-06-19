# Setting Up HashiCorp Vault with AppRole + ID Token Authentication

This guide explains how to configure HashiCorp Vault for secure authentication from GitLab CI/CD using **AppRole** and **ID Tokens** (OIDC).

## 1. Enable AppRole Auth Method

```bash
vault auth enable approle
```

## 2. Create a Policy

Create a policy file (e.g., `devops-policy.hcl`):

```hcl
path "secret/data/devops/*" {
  capabilities = ["read"]
}

path "secret/data/devops/db" {
  capabilities = ["read"]
}
```

Apply the policy:

```bash
vault policy write devops-policy devops-policy.hcl
```

## 3. Create AppRole

```bash
vault write auth/approle/role/devops-ci \
    token_policies="devops-policy" \
    token_ttl=1h \
    token_max_ttl=4h
```

Get Role ID and Secret ID:

```bash
vault read auth/approle/role/devops-ci/role-id
vault write -f auth/approle/role/devops-ci/secret-id
```

## 4. Using ID Token (OIDC) in GitLab CI (Recommended)

GitLab can generate ID tokens for secure authentication without long-lived credentials.

In `.gitlab-ci.yml`:

```yaml
id_tokens:
  VAULT_ID_TOKEN:
    aud: https://vault.example.com
```

Then configure Vault JWT auth:

```bash
vault auth enable jwt
vault write auth/jwt/config \
    oidc_discovery_url="https://gitlab.com" \
    bound_issuer="https://gitlab.com"
```

## 5. Best Practices

- Use short-lived tokens
- Rotate Secret IDs regularly
- Use separate roles for different environments
- Prefer OIDC/ID Token over static Secret IDs when possible
- Store Role ID and Secret ID as GitLab CI/CD variables (masked)
