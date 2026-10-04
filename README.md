# BOLT StyleFlow

BOLT StyleFlow explores governed beauty and e-commerce AI workflows for the YouCam API hackathon.

## What works

The repository includes a real YouCam AI Skin Analysis V2.1 integration. The Node.js script submits a public selfie URL to the official YouCam endpoint, receives a task ID, polls the status endpoint, and prints the final response. The API key is read only from an environment variable and is never embedded in the browser client or repository.

The lightweight browser page demonstrates the governance concept: analysis and recommendation can proceed automatically, while consequential downstream actions such as purchase are separated behind explicit human approval.

## Run the API integration

Requires Node.js 18+.

1. Set YOUCAM_API_KEY in your shell environment.
2. Run: npm run skin -- https://your-public-image.example/selfie.jpg

The script calls the official AI Skin Analysis V2.1 task and status endpoints and requests wrinkle, pore, texture, and acne analysis.

## Security

Never put a real YouCam API key in browser JavaScript, screenshots, commits, or issue text. Local environment and key files are ignored.

## Team

Omar Baró — Founder, Unfire
https://unfire.technology
