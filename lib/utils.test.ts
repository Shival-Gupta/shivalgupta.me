/**
 * Unit tests for utility functions
 * Simple test runner without external dependencies
 * Run with: npx tsx lib/utils.test.ts
 */
import { cn } from "./utils"

// Simple test helper
function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    console.error(`✗ ${name}`)
    console.error(error)
    process.exit(1)
  }
}

function expect(value: unknown) {
  return {
    toBe(expected: unknown) {
      if (value !== expected) {
        throw new Error(`Expected ${expected}, got ${value}`)
      }
    },
    toContain(expected: string) {
      if (typeof value !== "string" || !value.includes(expected)) {
        throw new Error(`Expected "${value}" to contain "${expected}"`)
      }
    },
  }
}

// Tests
console.log("\n🧪 Running cn utility tests...\n")

test("merges class names correctly", () => {
  const result = cn("px-4", "py-2", "bg-red-500")
  expect(result).toContain("px-4")
  expect(result).toContain("py-2")
  expect(result).toContain("bg-red-500")
})

test("handles conditional classes", () => {
  const isActive = true
  const result = cn("base-class", isActive && "active-class")
  expect(result).toContain("base-class")
  expect(result).toContain("active-class")
})

test("handles falsy values", () => {
  const result = cn("base", false, null, undefined, "valid")
  expect(result).toBe("base valid")
})

test("merges conflicting Tailwind classes correctly", () => {
  const result = cn("px-4", "px-8")
  expect(result).toBe("px-8")
})

console.log("\n✅ All tests passed!\n")
