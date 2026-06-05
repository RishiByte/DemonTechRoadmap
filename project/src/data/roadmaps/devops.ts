import type { ReadinessMetric, RoadmapNode, RoadmapPageShellProps, RoadmapPath, StageSummary, ProjectTrack } from "../../components/roadmap/RoadmapPageShell";

const stageSummaries: StageSummary[] = [
  {
    stage: "Beginner",
    duration: "15-18 weeks",
    outcome: "Operate Linux systems, understand networking, automate with shell scripts, and collaborate through Git.",
  },
  {
    stage: "Intermediate",
    duration: "28-32 weeks",
    outcome: "Build CI/CD pipelines, run containers, deploy cloud infrastructure, and manage repeatable configuration.",
  },
  {
    stage: "Advanced",
    duration: "32-38 weeks",
    outcome: "Operate Kubernetes platforms, observability stacks, secure delivery flows, SRE practices, and platform engineering systems.",
  },
  {
    stage: "Expert",
    duration: "18-26 weeks",
    outcome: "Design advanced cloud architecture, DR plans, distributed infrastructure, incident systems, and DevOps leadership practices.",
  },
];

const roadmapNodes: RoadmapNode[] = [
  {
    "id": "internet-and-networking-fundamentals",
    "title": "Internet & Networking Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "2 weeks",
    "description": "Internet & Networking Fundamentals turns How the Internet Works, DNS, HTTP/HTTPS into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Basic command-line comfort"
    ],
    "topics": [
      "How the Internet Works",
      "DNS",
      "HTTP/HTTPS",
      "TCP/IP",
      "UDP",
      "Ports",
      "Firewalls",
      "Load Balancers",
      "Reverse Proxies"
    ],
    "skillsGained": [
      "Operate How the Internet Works in production-like environments",
      "Connect DNS to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Internet & Networking Fundamentals impacts reliability and delivery",
      "Build or configure a lab around How the Internet Works",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Cloudflare Learning Center",
        "href": "https://www.cloudflare.com/learning/",
        "category": "Official Docs"
      },
      {
        "label": "MDN HTTP overview",
        "href": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
        "category": "Official Docs"
      },
      {
        "label": "Networking labs",
        "href": "https://labs.iximiuz.com/",
        "category": "Labs & Sandboxes"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for How the Internet Works.",
      "Write a troubleshooting checklist for How the Internet Works and DNS.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a internet & networking fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Internet & Networking Fundamentals, and how would you detect it?"
  },
  {
    "id": "linux-fundamentals",
    "title": "Linux Fundamentals",
    "stage": "Beginner",
    "difficulty": "Starter",
    "duration": "3 weeks",
    "description": "Linux Fundamentals turns Linux File System, Shell Commands, Permissions into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Internet & Networking Fundamentals"
    ],
    "topics": [
      "Linux File System",
      "Shell Commands",
      "Permissions",
      "Processes",
      "System Services",
      "Package Management"
    ],
    "skillsGained": [
      "Operate Linux File System in production-like environments",
      "Connect Shell Commands to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Linux Fundamentals impacts reliability and delivery",
      "Build or configure a lab around Linux File System",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Linux Journey",
        "href": "https://linuxjourney.com/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "Ubuntu Server docs",
        "href": "https://ubuntu.com/server/docs",
        "category": "Official Docs"
      },
      {
        "label": "The Linux Documentation Project",
        "href": "https://tldp.org/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Linux File System.",
      "Write a troubleshooting checklist for Linux File System and Shell Commands.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a linux fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Linux Fundamentals, and how would you detect it?"
  },
  {
    "id": "bash-and-shell-scripting",
    "title": "Bash & Shell Scripting",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Bash & Shell Scripting turns Variables, Loops, Functions into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Linux Fundamentals"
    ],
    "topics": [
      "Variables",
      "Loops",
      "Functions",
      "Automation Scripts",
      "Cron Jobs"
    ],
    "skillsGained": [
      "Operate Variables in production-like environments",
      "Connect Loops to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Bash & Shell Scripting impacts reliability and delivery",
      "Build or configure a lab around Variables",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Bash manual",
        "href": "https://www.gnu.org/software/bash/manual/",
        "category": "Official Docs"
      },
      {
        "label": "ShellCheck",
        "href": "https://www.shellcheck.net/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "Bash Guide",
        "href": "https://mywiki.wooledge.org/BashGuide",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Variables.",
      "Write a troubleshooting checklist for Variables and Loops.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a bash & shell scripting lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Bash & Shell Scripting, and how would you detect it?"
  },
  {
    "id": "version-control",
    "title": "Version Control",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "1 week",
    "description": "Version Control turns Git, GitHub, Branching into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Bash & Shell Scripting"
    ],
    "topics": [
      "Git",
      "GitHub",
      "Branching",
      "Pull Requests",
      "Merge Strategies"
    ],
    "skillsGained": [
      "Operate Git in production-like environments",
      "Connect GitHub to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Version Control impacts reliability and delivery",
      "Build or configure a lab around Git",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Git docs",
        "href": "https://git-scm.com/doc",
        "category": "Official Docs"
      },
      {
        "label": "GitHub Skills",
        "href": "https://skills.github.com/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "DemonTech Git roadmap",
        "href": "/roadmaps/git",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Git.",
      "Write a troubleshooting checklist for Git and GitHub.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a version control lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Version Control, and how would you detect it?"
  },
  {
    "id": "programming-basics",
    "title": "Programming Basics",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Programming Basics turns Python, Go, JavaScript into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Version Control"
    ],
    "topics": [
      "Python",
      "Go",
      "JavaScript",
      "Automation Scripts"
    ],
    "skillsGained": [
      "Operate Python in production-like environments",
      "Connect Go to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Programming Basics impacts reliability and delivery",
      "Build or configure a lab around Python",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Python docs",
        "href": "https://docs.python.org/3/",
        "category": "Official Docs"
      },
      {
        "label": "Go docs",
        "href": "https://go.dev/doc/",
        "category": "Official Docs"
      },
      {
        "label": "Exercism",
        "href": "https://exercism.org/",
        "category": "Labs & Sandboxes"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Python.",
      "Write a troubleshooting checklist for Python and Go.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a programming basics lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Programming Basics, and how would you detect it?"
  },
  {
    "id": "operating-systems",
    "title": "Operating Systems",
    "stage": "Beginner",
    "difficulty": "Core",
    "duration": "3 weeks",
    "description": "Operating Systems turns Linux Internals, Memory Management, CPU Scheduling into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Programming Basics"
    ],
    "topics": [
      "Linux Internals",
      "Memory Management",
      "CPU Scheduling",
      "Process Management"
    ],
    "skillsGained": [
      "Operate Linux Internals in production-like environments",
      "Connect Memory Management to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Operating Systems impacts reliability and delivery",
      "Build or configure a lab around Linux Internals",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Operating Systems: Three Easy Pieces",
        "href": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
        "category": "Community Resources"
      },
      {
        "label": "Linux kernel docs",
        "href": "https://docs.kernel.org/",
        "category": "Official Docs"
      },
      {
        "label": "Brendan Gregg systems performance",
        "href": "https://www.brendangregg.com/systems-performance-2nd-edition-book.html",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Linux Internals.",
      "Write a troubleshooting checklist for Linux Internals and Memory Management.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a operating systems lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Operating Systems, and how would you detect it?"
  },
  {
    "id": "web-servers-and-reverse-proxies",
    "title": "Web Servers & Reverse Proxies",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Web Servers & Reverse Proxies turns Nginx, Apache, Caddy into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Operating Systems"
    ],
    "topics": [
      "Nginx",
      "Apache",
      "Caddy",
      "Load Balancing"
    ],
    "skillsGained": [
      "Operate Nginx in production-like environments",
      "Connect Apache to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Web Servers & Reverse Proxies impacts reliability and delivery",
      "Build or configure a lab around Nginx",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Nginx docs",
        "href": "https://nginx.org/en/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Apache docs",
        "href": "https://httpd.apache.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Caddy docs",
        "href": "https://caddyserver.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Nginx.",
      "Write a troubleshooting checklist for Nginx and Apache.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a web servers & reverse proxies lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Web Servers & Reverse Proxies, and how would you detect it?"
  },
  {
    "id": "databases-for-devops",
    "title": "Databases for DevOps",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Databases for DevOps turns PostgreSQL, MySQL, MongoDB into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Web Servers & Reverse Proxies"
    ],
    "topics": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Backups & Recovery"
    ],
    "skillsGained": [
      "Operate PostgreSQL in production-like environments",
      "Connect MySQL to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Databases for DevOps impacts reliability and delivery",
      "Build or configure a lab around PostgreSQL",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "PostgreSQL docs",
        "href": "https://www.postgresql.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Redis docs",
        "href": "https://redis.io/docs/latest/",
        "category": "Official Docs"
      },
      {
        "label": "Percona backup resources",
        "href": "https://www.percona.com/resources",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for PostgreSQL.",
      "Write a troubleshooting checklist for PostgreSQL and MySQL.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a databases for devops lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Databases for DevOps, and how would you detect it?"
  },
  {
    "id": "ci-cd-fundamentals",
    "title": "CI/CD Fundamentals",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "CI/CD Fundamentals turns Continuous Integration, Continuous Deployment, Continuous Delivery into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Databases for DevOps"
    ],
    "topics": [
      "Continuous Integration",
      "Continuous Deployment",
      "Continuous Delivery",
      "Pipeline Design"
    ],
    "skillsGained": [
      "Operate Continuous Integration in production-like environments",
      "Connect Continuous Deployment to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how CI/CD Fundamentals impacts reliability and delivery",
      "Build or configure a lab around Continuous Integration",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "GitHub Actions docs",
        "href": "https://docs.github.com/en/actions",
        "category": "Official Docs"
      },
      {
        "label": "Continuous Delivery Foundation",
        "href": "https://cd.foundation/",
        "category": "Community Resources"
      },
      {
        "label": "Google SRE release engineering",
        "href": "https://sre.google/sre-book/release-engineering/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Continuous Integration.",
      "Write a troubleshooting checklist for Continuous Integration and Continuous Deployment.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a ci/cd fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in CI/CD Fundamentals, and how would you detect it?"
  },
  {
    "id": "ci-cd-tools",
    "title": "CI/CD Tools",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "CI/CD Tools turns GitHub Actions, GitLab CI/CD, Jenkins into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "CI/CD Fundamentals"
    ],
    "topics": [
      "GitHub Actions",
      "GitLab CI/CD",
      "Jenkins",
      "CircleCI"
    ],
    "skillsGained": [
      "Operate GitHub Actions in production-like environments",
      "Connect GitLab CI/CD to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how CI/CD Tools impacts reliability and delivery",
      "Build or configure a lab around GitHub Actions",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "GitLab CI docs",
        "href": "https://docs.gitlab.com/ee/ci/",
        "category": "Official Docs"
      },
      {
        "label": "Jenkins docs",
        "href": "https://www.jenkins.io/doc/",
        "category": "Official Docs"
      },
      {
        "label": "CircleCI docs",
        "href": "https://circleci.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for GitHub Actions.",
      "Write a troubleshooting checklist for GitHub Actions and GitLab CI/CD.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a ci/cd tools lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in CI/CD Tools, and how would you detect it?"
  },
  {
    "id": "containerization",
    "title": "Containerization",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "4 weeks",
    "description": "Containerization turns Docker, Images, Containers into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "CI/CD Tools"
    ],
    "topics": [
      "Docker",
      "Images",
      "Containers",
      "Docker Compose",
      "Registries"
    ],
    "skillsGained": [
      "Operate Docker in production-like environments",
      "Connect Images to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Containerization impacts reliability and delivery",
      "Build or configure a lab around Docker",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Docker docs",
        "href": "https://docs.docker.com/",
        "category": "Official Docs"
      },
      {
        "label": "Play with Docker",
        "href": "https://labs.play-with-docker.com/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "Docker curriculum",
        "href": "https://docker-curriculum.com/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Docker.",
      "Write a troubleshooting checklist for Docker and Images.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a containerization lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Containerization, and how would you detect it?"
  },
  {
    "id": "cloud-fundamentals",
    "title": "Cloud Fundamentals",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "5 weeks",
    "description": "Cloud Fundamentals turns AWS, Azure, Google Cloud into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Containerization"
    ],
    "topics": [
      "AWS",
      "Azure",
      "Google Cloud",
      "Cloud Concepts"
    ],
    "skillsGained": [
      "Operate AWS in production-like environments",
      "Connect Azure to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Cloud Fundamentals impacts reliability and delivery",
      "Build or configure a lab around AWS",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS docs",
        "href": "https://docs.aws.amazon.com/",
        "category": "Official Docs"
      },
      {
        "label": "Azure docs",
        "href": "https://learn.microsoft.com/en-us/azure/",
        "category": "Official Docs"
      },
      {
        "label": "Google Cloud docs",
        "href": "https://cloud.google.com/docs",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for AWS.",
      "Write a troubleshooting checklist for AWS and Azure.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a cloud fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Cloud Fundamentals, and how would you detect it?"
  },
  {
    "id": "infrastructure-as-code",
    "title": "Infrastructure as Code",
    "stage": "Intermediate",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Infrastructure as Code turns Terraform, OpenTofu, Pulumi into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Cloud Fundamentals"
    ],
    "topics": [
      "Terraform",
      "OpenTofu",
      "Pulumi"
    ],
    "skillsGained": [
      "Operate Terraform in production-like environments",
      "Connect OpenTofu to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Infrastructure as Code impacts reliability and delivery",
      "Build or configure a lab around Terraform",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Terraform docs",
        "href": "https://developer.hashicorp.com/terraform/docs",
        "category": "Official Docs"
      },
      {
        "label": "OpenTofu docs",
        "href": "https://opentofu.org/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Pulumi docs",
        "href": "https://www.pulumi.com/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Terraform.",
      "Write a troubleshooting checklist for Terraform and OpenTofu.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a infrastructure as code lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Infrastructure as Code, and how would you detect it?"
  },
  {
    "id": "configuration-management",
    "title": "Configuration Management",
    "stage": "Intermediate",
    "difficulty": "Applied",
    "duration": "3 weeks",
    "description": "Configuration Management turns Ansible, Chef, Puppet into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Infrastructure as Code"
    ],
    "topics": [
      "Ansible",
      "Chef",
      "Puppet"
    ],
    "skillsGained": [
      "Operate Ansible in production-like environments",
      "Connect Chef to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Configuration Management impacts reliability and delivery",
      "Build or configure a lab around Ansible",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Ansible docs",
        "href": "https://docs.ansible.com/",
        "category": "Official Docs"
      },
      {
        "label": "Chef docs",
        "href": "https://docs.chef.io/",
        "category": "Official Docs"
      },
      {
        "label": "Puppet docs",
        "href": "https://www.puppet.com/docs",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Ansible.",
      "Write a troubleshooting checklist for Ansible and Chef.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a configuration management lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Configuration Management, and how would you detect it?"
  },
  {
    "id": "kubernetes-fundamentals",
    "title": "Kubernetes Fundamentals",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "5 weeks",
    "description": "Kubernetes Fundamentals turns Pods, Services, Deployments into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Configuration Management"
    ],
    "topics": [
      "Pods",
      "Services",
      "Deployments",
      "StatefulSets",
      "Namespaces"
    ],
    "skillsGained": [
      "Operate Pods in production-like environments",
      "Connect Services to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Kubernetes Fundamentals impacts reliability and delivery",
      "Build or configure a lab around Pods",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Kubernetes docs",
        "href": "https://kubernetes.io/docs/home/",
        "category": "Official Docs"
      },
      {
        "label": "Kubernetes tutorials",
        "href": "https://kubernetes.io/docs/tutorials/",
        "category": "Labs & Sandboxes"
      },
      {
        "label": "KodeKloud Kubernetes labs",
        "href": "https://kodekloud.com/",
        "category": "Certification Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Pods.",
      "Write a troubleshooting checklist for Pods and Services.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a kubernetes fundamentals lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Kubernetes Fundamentals, and how would you detect it?"
  },
  {
    "id": "advanced-kubernetes",
    "title": "Advanced Kubernetes",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Advanced Kubernetes turns Helm, Ingress, Operators into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Kubernetes Fundamentals"
    ],
    "topics": [
      "Helm",
      "Ingress",
      "Operators",
      "Service Mesh",
      "Autoscaling"
    ],
    "skillsGained": [
      "Operate Helm in production-like environments",
      "Connect Ingress to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Advanced Kubernetes impacts reliability and delivery",
      "Build or configure a lab around Helm",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Helm docs",
        "href": "https://helm.sh/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Istio docs",
        "href": "https://istio.io/latest/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Kubernetes autoscaling",
        "href": "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Helm.",
      "Write a troubleshooting checklist for Helm and Ingress.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a advanced kubernetes lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Advanced Kubernetes, and how would you detect it?"
  },
  {
    "id": "monitoring-and-observability",
    "title": "Monitoring & Observability",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Monitoring & Observability turns Prometheus, Grafana, Loki into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Advanced Kubernetes"
    ],
    "topics": [
      "Prometheus",
      "Grafana",
      "Loki",
      "OpenTelemetry"
    ],
    "skillsGained": [
      "Operate Prometheus in production-like environments",
      "Connect Grafana to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Monitoring & Observability impacts reliability and delivery",
      "Build or configure a lab around Prometheus",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Prometheus docs",
        "href": "https://prometheus.io/docs/introduction/overview/",
        "category": "Official Docs"
      },
      {
        "label": "Grafana docs",
        "href": "https://grafana.com/docs/",
        "category": "Official Docs"
      },
      {
        "label": "OpenTelemetry docs",
        "href": "https://opentelemetry.io/docs/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Prometheus.",
      "Write a troubleshooting checklist for Prometheus and Grafana.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a monitoring & observability lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Monitoring & Observability, and how would you detect it?"
  },
  {
    "id": "logging-systems",
    "title": "Logging Systems",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "3 weeks",
    "description": "Logging Systems turns ELK Stack, EFK Stack, Centralized Logging into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Monitoring & Observability"
    ],
    "topics": [
      "ELK Stack",
      "EFK Stack",
      "Centralized Logging"
    ],
    "skillsGained": [
      "Operate ELK Stack in production-like environments",
      "Connect EFK Stack to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Logging Systems impacts reliability and delivery",
      "Build or configure a lab around ELK Stack",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Elastic docs",
        "href": "https://www.elastic.co/docs",
        "category": "Official Docs"
      },
      {
        "label": "Fluentd docs",
        "href": "https://docs.fluentd.org/",
        "category": "Official Docs"
      },
      {
        "label": "Loki docs",
        "href": "https://grafana.com/docs/loki/latest/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for ELK Stack.",
      "Write a troubleshooting checklist for ELK Stack and EFK Stack.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a logging systems lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Logging Systems, and how would you detect it?"
  },
  {
    "id": "security-and-devsecops",
    "title": "Security & DevSecOps",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Security & DevSecOps turns Secrets Management, IAM, Vulnerability Scanning into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Logging Systems"
    ],
    "topics": [
      "Secrets Management",
      "IAM",
      "Vulnerability Scanning",
      "Security Automation",
      "Compliance"
    ],
    "skillsGained": [
      "Operate Secrets Management in production-like environments",
      "Connect IAM to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Security & DevSecOps impacts reliability and delivery",
      "Build or configure a lab around Secrets Management",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "OWASP DevSecOps guideline",
        "href": "https://owasp.org/www-project-devsecops-guideline/",
        "category": "Official Docs"
      },
      {
        "label": "HashiCorp Vault docs",
        "href": "https://developer.hashicorp.com/vault/docs",
        "category": "Official Docs"
      },
      {
        "label": "Trivy docs",
        "href": "https://aquasecurity.github.io/trivy/",
        "category": "Open Source Projects"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Secrets Management.",
      "Write a troubleshooting checklist for Secrets Management and IAM.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a security & devsecops lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Security & DevSecOps, and how would you detect it?"
  },
  {
    "id": "networking-for-devops",
    "title": "Networking for DevOps",
    "stage": "Advanced",
    "difficulty": "Advanced",
    "duration": "4 weeks",
    "description": "Networking for DevOps turns VPC, VPN, Subnets into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Security & DevSecOps"
    ],
    "topics": [
      "VPC",
      "VPN",
      "Subnets",
      "Routing",
      "NAT",
      "CDN"
    ],
    "skillsGained": [
      "Operate VPC in production-like environments",
      "Connect VPN to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Networking for DevOps impacts reliability and delivery",
      "Build or configure a lab around VPC",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS VPC docs",
        "href": "https://docs.aws.amazon.com/vpc/",
        "category": "Official Docs"
      },
      {
        "label": "Cloudflare CDN learning",
        "href": "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/",
        "category": "Official Docs"
      },
      {
        "label": "Kubernetes networking",
        "href": "https://kubernetes.io/docs/concepts/services-networking/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for VPC.",
      "Write a troubleshooting checklist for VPC and VPN.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a networking for devops lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Networking for DevOps, and how would you detect it?"
  },
  {
    "id": "platform-engineering",
    "title": "Platform Engineering",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Platform Engineering turns Internal Developer Platforms, Self-Service Infrastructure, Golden Paths into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Networking for DevOps"
    ],
    "topics": [
      "Internal Developer Platforms",
      "Self-Service Infrastructure",
      "Golden Paths"
    ],
    "skillsGained": [
      "Operate Internal Developer Platforms in production-like environments",
      "Connect Self-Service Infrastructure to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Platform Engineering impacts reliability and delivery",
      "Build or configure a lab around Internal Developer Platforms",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Platform Engineering guide",
        "href": "https://platformengineering.org/",
        "category": "Community Resources"
      },
      {
        "label": "Backstage docs",
        "href": "https://backstage.io/docs/overview/what-is-backstage",
        "category": "Open Source Projects"
      },
      {
        "label": "Humanitec platform engineering",
        "href": "https://humanitec.com/blog",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Internal Developer Platforms.",
      "Write a troubleshooting checklist for Internal Developer Platforms and Self-Service Infrastructure.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a platform engineering lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Platform Engineering, and how would you detect it?"
  },
  {
    "id": "site-reliability-engineering-sre",
    "title": "Site Reliability Engineering (SRE)",
    "stage": "Advanced",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Site Reliability Engineering (SRE) turns SLI, SLO, SLA into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Platform Engineering"
    ],
    "topics": [
      "SLI",
      "SLO",
      "SLA",
      "Error Budgets",
      "Reliability Engineering"
    ],
    "skillsGained": [
      "Operate SLI in production-like environments",
      "Connect SLO to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Site Reliability Engineering (SRE) impacts reliability and delivery",
      "Build or configure a lab around SLI",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Google SRE books",
        "href": "https://sre.google/books/",
        "category": "Official Docs"
      },
      {
        "label": "SLO workbook",
        "href": "https://sre.google/workbook/table-of-contents/",
        "category": "Official Docs"
      },
      {
        "label": "OpenSLO",
        "href": "https://openslo.com/",
        "category": "Open Source Projects"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for SLI.",
      "Write a troubleshooting checklist for SLI and SLO.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a site reliability engineering (sre) lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Site Reliability Engineering (SRE), and how would you detect it?"
  },
  {
    "id": "advanced-cloud-architecture",
    "title": "Advanced Cloud Architecture",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Advanced Cloud Architecture turns Multi-Cloud, Hybrid Cloud, Cloud Cost Optimization into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Site Reliability Engineering (SRE)"
    ],
    "topics": [
      "Multi-Cloud",
      "Hybrid Cloud",
      "Cloud Cost Optimization"
    ],
    "skillsGained": [
      "Operate Multi-Cloud in production-like environments",
      "Connect Hybrid Cloud to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Advanced Cloud Architecture impacts reliability and delivery",
      "Build or configure a lab around Multi-Cloud",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS Well-Architected",
        "href": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
        "category": "Official Docs"
      },
      {
        "label": "Azure Architecture Center",
        "href": "https://learn.microsoft.com/en-us/azure/architecture/",
        "category": "Official Docs"
      },
      {
        "label": "Google Cloud Architecture Framework",
        "href": "https://cloud.google.com/architecture/framework",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Multi-Cloud.",
      "Write a troubleshooting checklist for Multi-Cloud and Hybrid Cloud.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a advanced cloud architecture lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Advanced Cloud Architecture, and how would you detect it?"
  },
  {
    "id": "distributed-systems",
    "title": "Distributed Systems",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Distributed Systems turns Scalability, CAP Theorem, Distributed Databases into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Advanced Cloud Architecture"
    ],
    "topics": [
      "Scalability",
      "CAP Theorem",
      "Distributed Databases",
      "Event-Driven Systems"
    ],
    "skillsGained": [
      "Operate Scalability in production-like environments",
      "Connect CAP Theorem to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Distributed Systems impacts reliability and delivery",
      "Build or configure a lab around Scalability",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Designing Data-Intensive Applications",
        "href": "https://dataintensive.net/",
        "category": "Community Resources"
      },
      {
        "label": "System Design Primer",
        "href": "https://github.com/donnemartin/system-design-primer",
        "category": "Open Source Projects"
      },
      {
        "label": "Jepsen analyses",
        "href": "https://jepsen.io/analyses",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Scalability.",
      "Write a troubleshooting checklist for Scalability and CAP Theorem.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a distributed systems lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Distributed Systems, and how would you detect it?"
  },
  {
    "id": "message-queues-and-streaming",
    "title": "Message Queues & Streaming",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Message Queues & Streaming turns Kafka, RabbitMQ, Amazon SQS into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Distributed Systems"
    ],
    "topics": [
      "Kafka",
      "RabbitMQ",
      "Amazon SQS",
      "Apache Pulsar"
    ],
    "skillsGained": [
      "Operate Kafka in production-like environments",
      "Connect RabbitMQ to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Message Queues & Streaming impacts reliability and delivery",
      "Build or configure a lab around Kafka",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Kafka docs",
        "href": "https://kafka.apache.org/documentation/",
        "category": "Official Docs"
      },
      {
        "label": "RabbitMQ tutorials",
        "href": "https://www.rabbitmq.com/tutorials",
        "category": "Official Docs"
      },
      {
        "label": "Amazon SQS docs",
        "href": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Kafka.",
      "Write a troubleshooting checklist for Kafka and RabbitMQ.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a message queues & streaming lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Message Queues & Streaming, and how would you detect it?"
  },
  {
    "id": "advanced-infrastructure",
    "title": "Advanced Infrastructure",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Advanced Infrastructure turns Service Mesh, Istio, Envoy into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Message Queues & Streaming"
    ],
    "topics": [
      "Service Mesh",
      "Istio",
      "Envoy",
      "API Gateways"
    ],
    "skillsGained": [
      "Operate Service Mesh in production-like environments",
      "Connect Istio to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Advanced Infrastructure impacts reliability and delivery",
      "Build or configure a lab around Service Mesh",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Istio docs",
        "href": "https://istio.io/latest/docs/",
        "category": "Official Docs"
      },
      {
        "label": "Envoy docs",
        "href": "https://www.envoyproxy.io/docs",
        "category": "Official Docs"
      },
      {
        "label": "Kong API gateway docs",
        "href": "https://docs.konghq.com/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Service Mesh.",
      "Write a troubleshooting checklist for Service Mesh and Istio.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a advanced infrastructure lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Advanced Infrastructure, and how would you detect it?"
  },
  {
    "id": "disaster-recovery",
    "title": "Disaster Recovery",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "4 weeks",
    "description": "Disaster Recovery turns Backup Strategies, Failover Systems, High Availability into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Advanced Infrastructure"
    ],
    "topics": [
      "Backup Strategies",
      "Failover Systems",
      "High Availability",
      "Business Continuity"
    ],
    "skillsGained": [
      "Operate Backup Strategies in production-like environments",
      "Connect Failover Systems to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Disaster Recovery impacts reliability and delivery",
      "Build or configure a lab around Backup Strategies",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "AWS disaster recovery",
        "href": "https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html",
        "category": "Official Docs"
      },
      {
        "label": "Azure business continuity",
        "href": "https://learn.microsoft.com/en-us/azure/architecture/framework/resiliency/backup-and-recovery",
        "category": "Official Docs"
      },
      {
        "label": "Google DR planning",
        "href": "https://cloud.google.com/architecture/dr-scenarios-planning-guide",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Backup Strategies.",
      "Write a troubleshooting checklist for Backup Strategies and Failover Systems.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a disaster recovery lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Disaster Recovery, and how would you detect it?"
  },
  {
    "id": "production-engineering",
    "title": "Production Engineering",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "5 weeks",
    "description": "Production Engineering turns Capacity Planning, Reliability, Incident Management into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Disaster Recovery"
    ],
    "topics": [
      "Capacity Planning",
      "Reliability",
      "Incident Management",
      "Root Cause Analysis"
    ],
    "skillsGained": [
      "Operate Capacity Planning in production-like environments",
      "Connect Reliability to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how Production Engineering impacts reliability and delivery",
      "Build or configure a lab around Capacity Planning",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Google SRE incident response",
        "href": "https://sre.google/sre-book/managing-incidents/",
        "category": "Official Docs"
      },
      {
        "label": "PagerDuty incident response",
        "href": "https://response.pagerduty.com/",
        "category": "Community Resources"
      },
      {
        "label": "Grafana incident docs",
        "href": "https://grafana.com/docs/grafana-cloud/alerting-and-irm/irm/",
        "category": "Official Docs"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Capacity Planning.",
      "Write a troubleshooting checklist for Capacity Planning and Reliability.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a production engineering lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in Production Engineering, and how would you detect it?"
  },
  {
    "id": "devops-leadership",
    "title": "DevOps Leadership",
    "stage": "Expert",
    "difficulty": "Expert",
    "duration": "3 weeks",
    "description": "DevOps Leadership turns Team Collaboration, Documentation, Incident Response into practical infrastructure skill for reliable production systems.",
    "prerequisites": [
      "Production Engineering"
    ],
    "topics": [
      "Team Collaboration",
      "Documentation",
      "Incident Response",
      "Architecture Decisions"
    ],
    "skillsGained": [
      "Operate Team Collaboration in production-like environments",
      "Connect Documentation to infrastructure workflows",
      "Troubleshoot failures with repeatable runbooks",
      "Document operational tradeoffs and risks"
    ],
    "learningOutcomes": [
      "Explain how DevOps Leadership impacts reliability and delivery",
      "Build or configure a lab around Team Collaboration",
      "Identify common failure modes and mitigation strategies"
    ],
    "resources": [
      {
        "label": "Google engineering practices",
        "href": "https://google.github.io/eng-practices/",
        "category": "Community Resources"
      },
      {
        "label": "Architecture decision records",
        "href": "https://adr.github.io/",
        "category": "Community Resources"
      },
      {
        "label": "Staff Engineer",
        "href": "https://staffeng.com/",
        "category": "Community Resources"
      }
    ],
    "practiceExercises": [
      "Complete a hands-on lab for Team Collaboration.",
      "Write a troubleshooting checklist for Team Collaboration and Documentation.",
      "Automate one repeatable DevOps task connected to this topic."
    ],
    "miniProject": "Run a devops leadership lab in a local or cloud sandbox.",
    "realWorldApplications": [
      "Production operations",
      "Incident response",
      "Infrastructure automation"
    ],
    "quiz": "What is the first production failure you would expect in DevOps Leadership, and how would you detect it?"
  }
];

const projectTracks: ProjectTrack[] = [
  {
    "stage": "Beginner",
    "projects": [
      "Linux Server Setup",
      "Personal VPS Hosting",
      "Nginx Reverse Proxy Setup",
      "Automated Backup Script"
    ]
  },
  {
    "stage": "Intermediate",
    "projects": [
      "CI/CD Pipeline",
      "Dockerized Application",
      "Terraform Infrastructure Deployment",
      "Cloud Hosting Platform"
    ]
  },
  {
    "stage": "Advanced",
    "projects": [
      "Kubernetes Cluster Deployment",
      "Monitoring Stack Setup",
      "GitOps Platform",
      "Multi-Service Infrastructure"
    ]
  },
  {
    "stage": "Expert",
    "projects": [
      "Production-Grade Kubernetes Platform",
      "Multi-Cloud Infrastructure",
      "Enterprise Observability Platform",
      "Large-Scale Platform Engineering System"
    ]
  }
];

const missingTopics: string[] = [
  "GitOps and Argo CD",
  "Progressive delivery",
  "Policy as code",
  "Secrets rotation",
  "Supply-chain security",
  "FinOps and cost governance",
  "Chaos engineering",
  "Runbook automation",
  "SLO governance",
  "Developer portals",
  "Blue-green and canary deployments",
  "Capacity forecasting"
];

const careerPaths: RoadmapPath[] = [
  {
    "title": "Junior DevOps Engineer",
    "focus": "Operate Linux servers, write scripts, support CI/CD, and document incidents with supervision.",
    "milestones": [
      "Server setup",
      "Backup script",
      "Nginx reverse proxy"
    ]
  },
  {
    "title": "DevOps Engineer",
    "focus": "Own pipelines, containers, cloud deployments, IaC changes, and production release workflows.",
    "milestones": [
      "CI/CD pipeline",
      "Dockerized app",
      "Terraform deploy"
    ]
  },
  {
    "title": "Senior DevOps Engineer",
    "focus": "Design resilient platforms, review infrastructure changes, lead incidents, and mentor teams.",
    "milestones": [
      "Kubernetes platform",
      "Observability stack",
      "Incident review"
    ]
  },
  {
    "title": "Site Reliability Engineer",
    "focus": "Define SLOs, manage error budgets, automate toil, and improve reliability with data.",
    "milestones": [
      "SLO dashboard",
      "Runbooks",
      "Error budget policy"
    ]
  },
  {
    "title": "Platform Engineer",
    "focus": "Build internal developer platforms, golden paths, self-service infrastructure, and paved-road tooling.",
    "milestones": [
      "Developer portal",
      "Golden path templates",
      "Self-service envs"
    ]
  },
  {
    "title": "Cloud Architect",
    "focus": "Design secure, cost-aware cloud architecture across networking, identity, compute, data, and DR.",
    "milestones": [
      "Architecture diagrams",
      "Cost model",
      "DR strategy"
    ]
  }
];

const certificationPaths: RoadmapPath[] = [
  {
    "title": "AWS Certified Solutions Architect",
    "focus": "Cloud architecture, networking, compute, databases, reliability, and cost controls.",
    "milestones": [
      "AWS fundamentals",
      "Well-Architected review",
      "Resilient reference architecture"
    ]
  },
  {
    "title": "AWS DevOps Engineer",
    "focus": "CI/CD, automation, monitoring, security, deployment operations, and incident readiness.",
    "milestones": [
      "Pipeline design",
      "CloudWatch operations",
      "Deployment automation"
    ]
  },
  {
    "title": "Azure Administrator",
    "focus": "Azure identities, networking, compute, storage, monitoring, and governance.",
    "milestones": [
      "Resource groups",
      "Azure networking",
      "Backup and monitor"
    ]
  },
  {
    "title": "Azure DevOps Engineer",
    "focus": "Azure pipelines, GitOps, release practices, infrastructure automation, and test strategy.",
    "milestones": [
      "Azure Pipelines",
      "IaC deployment",
      "Release gates"
    ]
  },
  {
    "title": "Google Professional Cloud Engineer",
    "focus": "Google Cloud architecture, operations, networking, IAM, and reliability engineering.",
    "milestones": [
      "GCP services",
      "Operations suite",
      "Cloud architecture"
    ]
  },
  {
    "title": "Certified Kubernetes Administrator (CKA)",
    "focus": "Cluster administration, workloads, networking, storage, troubleshooting, and security.",
    "milestones": [
      "Cluster ops",
      "kubectl fluency",
      "Troubleshooting drills"
    ]
  },
  {
    "title": "Certified Kubernetes Application Developer (CKAD)",
    "focus": "Kubernetes app design, configuration, observability, probes, and resource management.",
    "milestones": [
      "Pod specs",
      "ConfigMaps and secrets",
      "Probes and rollouts"
    ]
  },
  {
    "title": "Terraform Associate",
    "focus": "Terraform workflow, state, modules, providers, planning, and infrastructure review.",
    "milestones": [
      "Plan/apply workflow",
      "Modules",
      "Remote state"
    ]
  }
];

const achievementBadges: string[] = [
  "Linux Operator",
  "Pipeline Builder",
  "Container Captain",
  "Cloud Ready",
  "Terraform Engineer",
  "Kubernetes Operator",
  "SRE Guardian",
  "Platform Architect"
];

const progressSchema: Array<[string, string]> = [
  [
    "users",
    "id, name, email, role, created_at"
  ],
  [
    "devops_progress",
    "user_id, roadmap_id, completed_node_ids, xp, streak_days, maturity_level"
  ],
  [
    "lab_runs",
    "user_id, topic_id, sandbox_url, status, started_at, completed_at"
  ],
  [
    "incident_simulations",
    "user_id, scenario_id, mttr, notes, completed_at"
  ],
  [
    "certification_tracking",
    "user_id, certification_id, target_date, status, score"
  ],
  [
    "infra_notes",
    "user_id, topic_id, note, updated_at"
  ]
];

const gamificationCards: Array<[string, string]> = [
  ["Hands-on Labs", "Track Linux, pipelines, container, cloud, Kubernetes, and SRE labs as concrete milestones."],
  ["Achievement Badges", "Unlock visible badges for Linux, pipelines, containers, cloud, Kubernetes, SRE, security, and platform mastery."],
  ["Incident Notes", "Use notes and quizzes to record runbooks, failure modes, and postmortem lessons."],
];

const resourceCategories: string[] = ["Official Docs", "Certification Resources", "Labs & Sandboxes", "Community Resources", "Open Source Projects"];

const readinessMetrics: ReadinessMetric[] = [
  { label: "Cloud readiness", icon: "server", topicTitles: ["Cloud Fundamentals", "Infrastructure as Code", "Networking for DevOps", "Advanced Cloud Architecture", "Disaster Recovery"] },
  { label: "K8s readiness", icon: "layers", topicTitles: ["Kubernetes Fundamentals", "Advanced Kubernetes", "Advanced Infrastructure", "Platform Engineering"] },
  { label: "Reliability readiness", icon: "shield", topicTitles: ["Observability", "SRE Fundamentals", "Security for DevOps", "Incident Management"] },
];

export const devopsRoadmap = {
  storageKey: "demontech-devops-roadmap",
  breadcrumb: "DevOps Engineer",
  eyebrow: "Production Infrastructure Engineering Path",
  title: "DevOps Engineer Roadmap",
  description: "A complete hands-on infrastructure journey across Linux, networking, CI/CD, containers, Kubernetes, cloud, observability, security, SRE, and platform engineering.",
  stats: [["29", "Roadmap nodes", "layers"], ["78-108 weeks", "Total duration", "clock"], ["130+", "Infra skills", "badge"], ["16", "Hands-on labs", "target"]],
  architectureLabel: "Infrastructure Architecture",
  projectIntro: "Every phase ends with hands-on infrastructure labs that combine servers, pipelines, containers, cloud, observability, security, and incident response.",
  journeyTitle: "Vertical Infrastructure Journey",
  journeyDescription: "Expand each node for prerequisites, learning outcomes, resources, practice labs, mini projects, quizzes, bookmarks, and notes.",
  resourceTitle: "DevOps Resource Matrix",
  pathTitle: "DevOps Career Paths",
  pathDescription: "Pick a specialization across cloud operations, platform engineering, SRE, security, and infrastructure architecture.",
  certificationTitle: "Cloud Certifications Tracker",
  certificationDescription: "Use certifications as structured validation for cloud, Kubernetes, Linux, and security skills.",
  gamificationTitle: "Learning Features & Component Plan",
  progressSchemaTitle: "DevOps Progress Database Schema",
  progressTitle: "DevOps Progress",
  readinessTitle: "DevOps Readiness",
  missingTitle: "Missing DevOps Topics Added",
  estimatedTime: "78-108w",
  miniProjectLabel: "Infrastructure Lab",
  stageSummaries: stageSummaries,
  roadmapNodes: roadmapNodes,
  projectTracks: projectTracks,
  resourceCategories: resourceCategories,
  paths: careerPaths,
  certifications: certificationPaths,
  gamificationCards: gamificationCards,
  progressSchema: progressSchema,
  achievementBadges: achievementBadges,
  missingTopics: missingTopics,
  readinessMetrics: readinessMetrics,
} satisfies RoadmapPageShellProps;
