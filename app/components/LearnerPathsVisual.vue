<script setup lang="ts">
// Illustrative mock showing two adapted learning paths (a first-timer path
// and an advanced path) branching from the same starting point. Built
// from existing UI primitives and tokens, not a real product screenshot.
</script>

<template>
  <UPageCard
    variant="subtle"
    class="rounded-2xl"
  >
    <div class="flex flex-col gap-4 p-2">
      <div class="flex items-center gap-2">
        <UIcon
          name="i-lucide-users"
          class="size-4 text-primary"
        />
        <p class="text-sm font-medium text-highlighted">
          Two learners, one course
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col gap-2 rounded-lg bg-elevated/50 p-3">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-sprout"
              class="size-4 text-primary"
            />
            <span class="text-xs font-medium text-highlighted">First skill</span>
          </div>
          <p class="text-xs text-muted">
            Starts with fundamentals, extra practice, no jargon
          </p>
        </div>

        <div class="flex flex-col gap-2 rounded-lg bg-elevated/50 p-3">
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-trending-up"
              class="size-4 text-primary"
            />
            <span class="text-xs font-medium text-highlighted">Already technical</span>
          </div>
          <p class="text-xs text-muted">
            Skips the basics, routes straight to advanced material
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 rounded-lg border border-default p-3">
        <UIcon
          name="i-lucide-clock"
          class="size-4 shrink-0 text-primary"
        />
        <p class="text-xs text-muted">
          Pause and resume anytime, either path picks up right where you left
          off
        </p>
      </div>
    </div>
  </UPageCard>
</template>
