# Production — ServiceAccount can-i

**Band:** Production  
**Setup:** Same kind cluster. Work from `04-kubernetes/`.

**Task:** Apply [examples/rbac-example.yaml](../examples/rbac-example.yaml). Prove the `log-reader` ServiceAccount can list Pods and cannot delete them.

**Hint:** `kubectl auth can-i` with `--as=system:serviceaccount:default:log-reader`.

**Success:** `get pods` is `yes`; `delete pods` is `no`.

<details>
<summary>Solution sketches</summary>

After apply: `kubectl auth can-i get pods --as=system:serviceaccount:default:log-reader` and the same for `delete`.

</details>
