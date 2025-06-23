import { execSync } from "child_process"

const userAgent = process.env.npm_config_user_agent ?? ""

function runCommand(cmd) {
  execSync(cmd, { stdio: "inherit" })
}

const isBun = userAgent.includes("bun")

if (isBun) {
  console.log("🟢 Detected Bun. Running with `bun run generate-index.ts`...")
  runCommand("bun run generate-index.ts")
} else {
  console.log("🔵 Detected npm/yarn. Running with `tsx`...")
  try {
    require.resolve("tsx")
  } catch {
    console.log("🛠️  tsx not found. Installing...")
    const isYarn = userAgent.includes("yarn")
    const installCmd = isYarn
      ? "yarn add -D tsx"
      : "npm install --save-dev tsx"
    runCommand(installCmd)
  }

  runCommand("npx tsx generate-index.ts")
}
