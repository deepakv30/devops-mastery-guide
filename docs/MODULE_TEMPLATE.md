# Module Template

> Use this template when creating any new module. This ensures consistency across the entire DevOps Mastery Guide.

## Instructions for AI Agents

Before creating a new module, **always read `AGENTS.md`** first.

## Folder Structure

```
XX-tool-name/
├── README.md
├── examples/
├── exercises/
└── resources/
```

## README.md Structure (Mandatory Order)

Copy the sections below into every module README.

---

# [Tool Name] Mastery

**Last Major Update:** YYYY-MM-DD | Tested with [Tool] vX.Y

## Introduction & Why It Matters

Explain what the tool is and why it is important in modern DevOps, with emphasis on enterprise usage.

## Core Concepts

Key concepts, architecture, and terminology.

## Installation & Setup

How to install on control machine and managed nodes (if applicable).

## Key Features & Best Practices

- Enterprise-focused best practices
- Security considerations
- Scalability notes

## Hands-on Examples

Provide 2–3 practical, runnable examples.

## Common Pitfalls & Troubleshooting

List frequent mistakes and how to fix them.

## Integration with Other Tools

How this tool connects with Ansible, Kubernetes, Terraform, CI/CD, etc.

## Exercises

### Basic
- Exercise 1
- Exercise 2

### Intermediate
- Exercise 3

### Advanced
- Exercise 4

## Official Documentation & Further Reading

- [Official Docs](link)
- [Best Practices](link)

---

## Notes for Contributors

- Always include the "Last Major Update" line at the top.
- Use official documentation links.
- Focus on production/enterprise patterns.
- Add real runnable code in the `examples/` folder.
