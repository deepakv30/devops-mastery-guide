# Basic 2 — ConfigMap as env

**Band:** Beginner  
**Setup:** Same kind cluster `learn`. Work from `04-kubernetes/`.

**Task:** Apply [examples/configmap.yaml](../examples/configmap.yaml). Exec into the `config-demo` Pod and print `APP_COLOR`.

**Hint:** `kubectl exec deploy/config-demo -- env | grep APP_`

**Success:** Output includes `APP_COLOR=blue`.

<details>
<summary>Solution sketches</summary>

`kubectl apply -f examples/configmap.yaml` then `kubectl exec deploy/config-demo -- env | grep APP_`.

</details>
