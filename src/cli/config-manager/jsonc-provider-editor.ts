import { readFileSync, writeFileSync, copyFileSync } from "node:fs"
import { detectConfigFormat } from "./opencode-config-format"
import { parseOpenCodeConfigFileWithError, type OpenCodeConfig } from "./parse-opencode-config-file"
import { ANTIGRAVITY_PROVIDER_CONFIG } from "./antigravity-provider-configuration"
import { modify as jsoncModify, applyEdits } from "jsonc-parser"
import { parseJsoncSafe } from "../../shared/jsonc-parser"
import { formatErrorWithSuggestion } from "./format-error-with-suggestion"

export function modifyProviderInJsonc(content: string, newProviderValue: Record<string, unknown>): string {
  // Validate JSONC first before making modifications
  const parseResult = parseJsoncSafe(content)
  if (parseResult.data === null) {
    const errorMessages = parseResult.errors.map(e => `${e.message} at offset ${e.offset}`).join(", ")
    throw new Error(`Invalid JSONC syntax before modification: ${errorMessages}`)
  }

  const edits = jsoncModify(content, ["provider"], newProviderValue, {
    formattingOptions: { tabSize: 2, insertSpaces: true },
  })
  return applyEdits(content, edits)
}
