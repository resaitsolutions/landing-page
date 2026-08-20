<script setup lang="ts">
// Illustrative mock of an agent guiding a learner through a stuck moment,
// with a human-reviewed escalation. Built from existing UI primitives and
// tokens, not a real product screenshot or third-party asset.
</script>

<template>
  <UPageCard
    variant="subtle"
    class="rounded-2xl"
  >
    <div class="flex flex-col gap-3 p-2">
      <div class="flex items-start gap-3">
        <UAvatar
          icon="i-lucide-bot"
          size="sm"
          class="bg-primary/10 text-primary shrink-0"
        />
        <div class="rounded-lg bg-elevated/50 px-3 py-2">
          <p class="text-sm text-highlighted">
            I noticed you tried this exercise twice. Want me to explain it a
            different way?
          </p>
        </div>
      </div>

      <div class="flex items-start justify-end gap-3">
        <div class="rounded-lg bg-primary/10 px-3 py-2">
          <p class="text-sm text-highlighted">
            Yes please
          </p>
        </div>
        <UAvatar
          icon="i-lucide-user"
          size="sm"
          class="bg-elevated text-muted shrink-0"
        />
      </div>

      <div class="flex items-center gap-2 rounded-lg border border-default p-3">
        <UIcon
          name="i-lucide-user-check"
          class="size-4 shrink-0 text-primary"
        />
        <p class="text-xs text-muted">
          Escalated to a human mentor for a follow-up review
        </p>
        <UBadge
          color="success"
          variant="subtle"
          size="sm"
          class="ml-auto"
        >
          Reviewed
        </UBadge>
      </div>
    </div>
  </UPageCard>
</template>
