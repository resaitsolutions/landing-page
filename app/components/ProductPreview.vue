<script setup lang="ts">
// Illustrative mock of the agent-guided learning experience described in the
// hero/feature copy. Built entirely from existing Nuxt UI primitives and
// design tokens, not a real product screenshot (the agentic product UI
// doesn't exist yet) and not a third-party stock asset. Static (no motion),
// so it carries no reduced-motion or captioning requirements.
</script>

<template>
  <UPageCard
    variant="subtle"
    class="rounded-2xl"
  >
    <div class="flex flex-col gap-4 p-2">
      <div class="flex items-center gap-3">
        <UAvatar
          icon="i-lucide-bot"
          size="md"
          class="bg-primary/10 text-primary"
        />
        <div class="flex-1">
          <p class="text-sm font-medium text-highlighted">
            Your learning path
          </p>
          <p class="text-xs text-muted">
            Guided by your agent, supervised by our team
          </p>
        </div>
        <UBadge
          color="primary"
          variant="subtle"
          size="sm"
        >
          On track
        </UBadge>
      </div>

      <div class="flex flex-col gap-3 rounded-lg bg-elevated/50 p-4">
        <div class="flex items-center justify-between">
          <span class="text-sm text-highlighted">Data fundamentals</span>
          <span class="text-xs text-muted">80%</span>
        </div>
        <UProgress
          :model-value="80"
          size="sm"
          color="primary"
        />

        <div class="flex items-center justify-between">
          <span class="text-sm text-highlighted">Applied statistics</span>
          <span class="text-xs text-muted">45%</span>
        </div>
        <UProgress
          :model-value="45"
          size="sm"
          color="primary"
        />

        <div class="flex items-center justify-between">
          <span class="text-sm text-dimmed">Data storytelling</span>
          <span class="text-xs text-dimmed">Not started</span>
        </div>
        <UProgress
          :model-value="0"
          size="sm"
          color="neutral"
        />
      </div>

      <div class="flex items-start gap-2 rounded-lg border border-default p-3">
        <UIcon
          name="i-lucide-lightbulb"
          class="mt-0.5 size-4 shrink-0 text-primary"
        />
        <p class="text-xs text-muted">
          You've been moving fast through statistics. Want to add an extra
          practice set before the next lesson?
        </p>
      </div>
    </div>
  </UPageCard>
</template>
