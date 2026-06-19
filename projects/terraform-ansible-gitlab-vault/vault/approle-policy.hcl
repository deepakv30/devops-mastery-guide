# Vault Policy for CI/CD (AppRole)
path "secret/data/devops/*" {
  capabilities = ["read"]
}

path "auth/approle/login" {
  capabilities = ["create", "read"]
}
