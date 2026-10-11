---
title: home-lab
tagline: Bare-metal multi-node K3s cluster for platform engineering and self-hosted LLM inference.
status: building
order: 2
problem: Managed cloud hides the parts of platform engineering worth learning. This cluster runs on hardware I already own, with everything defined as code.
worksToday:
  - Hardware verified for both nodes (OptiPlex control plane, Raspberry Pi worker).
  - Architecture and decisions documented as ADRs.
planned:
  - Ansible baseline and K3s across both nodes.
  - GitOps with Argo CD, ingress, and Sealed Secrets.
  - Observability stack for the cluster.
  - Ollama inference, Qdrant, and a RAG query path behind a lightweight LLM gateway.
stack: [Kubernetes, K3s, Ansible, Argo CD, Ollama, Qdrant]
diagram:
  nodes:
    - { id: git, label: Git repo, role: "Single source of truth. Every change to the cluster is a commit.", col: 0 }
    - { id: argocd, label: Argo CD, role: "GitOps controller that syncs the cluster to the repo.", col: 1 }
    - { id: control, label: OptiPlex node, role: "K3s control plane and the node with enough RAM for inference.", col: 2 }
    - { id: worker, label: Raspberry Pi node, role: "Real worker node, so scheduling and failure are multi-node.", col: 2 }
    - { id: gateway, label: LLM gateway, role: "Single entry point that routes prompts to models and the RAG path.", col: 3 }
    - { id: rag, label: Ollama + Qdrant, role: "Self-hosted model serving and vector search for retrieval.", col: 4 }
  edges:
    - { from: git, to: argocd, label: sync }
    - { from: argocd, to: control }
    - { from: argocd, to: worker }
    - { from: control, to: gateway }
    - { from: gateway, to: rag, label: query }
---
