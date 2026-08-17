let meta = #{
    name: "enhance-module",
    description: "Enhance one existing module using the Agent Skill, then review for teaching-contract regressions",
    when_to_use: "Deepen or rewrite an existing module (01-linux through 08-github-actions) without breaking Beginner to Production",
    phases: [
        #{ title: "Enhance", detail: "follow .agents/skills/enhance-module" },
        #{ title: "Review", detail: "read-only regression check" },
    ],
};

let review_schema = #{
    "type": "object",
    "required": ["regressions", "summary"],
    "properties": #{
        "summary": #{ "type": "string" },
        "regressions": #{
            "type": "array",
            "maxItems": 16,
            "items": #{
                "type": "object",
                "required": ["file", "issue", "band"],
                "properties": #{
                    "file": #{ "type": "string" },
                    "issue": #{ "type": "string" },
                    "band": #{ "type": "string" },
                },
            },
        },
    },
};

let target = if args == () { () } else { args.target };
if target == () {
    pause("verification", "Pass args.target — one of 01-linux, 02-ansible, 03-docker, 04-kubernetes, 05-terraform, 06-prometheus, 07-grafana, 08-github-actions.");
}

phase("Enhance");
let enhance_prompt = "";
enhance_prompt += "Follow the skill at .agents/skills/enhance-module/SKILL.md exactly. ";
enhance_prompt += "Target module folder: ";
enhance_prompt += target;
enhance_prompt += ". Read AGENTS.md, then .agents/skills/enhance-module/references/gotchas.md, then the module README and any beginner.md/intermediate.md/advanced.md and examples/. ";
enhance_prompt += "Use read_file and grep; do not answer from memory. ";
enhance_prompt += "State the one-line job and the current first-success path before editing. ";
enhance_prompt += "Do not create a new module folder. Do not commit or push. ";
enhance_prompt += "After edits run .agents/skills/enhance-module/scripts/check-module.sh ";
enhance_prompt += target;
enhance_prompt += " and walk .agents/skills/enhance-module/references/checklist.md.";

let enhance = agent(enhance_prompt, #{
    label: "enhance:" + target,
    capability_mode: "all",
});

if enhance == () || !enhance.success {
    complete(#{
        summary: "Enhance agent failed or returned nothing. No review ran.",
        target: target,
        regressions: [],
        enhance_ok: false,
    });
}

phase("Review");
let review_prompt = "";
review_prompt += "Adversarially review the working tree for teaching-contract regressions in module ";
review_prompt += target;
review_prompt += ". Use read-only tools: git diff, read_file, grep. Do not edit. ";
review_prompt += "Read AGENTS.md and .agents/skills/enhance-module/references/gotchas.md. ";
review_prompt += "Set regressions to a non-empty list when you find: Production-as-first-install, term dumps, dead relative links, see-examples with no file, invented expected output, a new module folder, or missing Beginner/Production bands. ";
review_prompt += "band must be beginner, intermediate, production, or honesty. ";
review_prompt += "An empty regressions list is valid only after you inspected the module files and the diff. Missing evidence is not a clean review.";

let review = agent(review_prompt, #{
    label: "review:" + target,
    capability_mode: "read-only",
    output_schema: review_schema,
});

let regressions = [];
let review_summary = "Review did not return usable output; treat as unverified.";
if review != () && review.success && review.output.regressions != () {
    regressions = review.output.regressions;
    if review.output.summary != () {
        review_summary = review.output.summary;
    } else {
        review_summary = regressions.len().to_string() + " regressions reported";
    }
}

let report = "";
report += "# enhance-module ";
report += target;
report += "\n\n";
report += review_summary;
report += "\n\nRegressions: ";
report += regressions.len().to_string();
report += "\n";

let path = write_scratch_file("enhance-module-report.md", report);
complete(#{
    summary: review_summary,
    target: target,
    regressions: regressions,
    enhance_ok: true,
    path: path,
});
