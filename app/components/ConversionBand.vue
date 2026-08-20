<script setup lang="ts">
// Mid-page conversion band, structurally inspired by Udemy's
// "Reimagine your career" dark asymmetric-split band
// (https://www.udemy.com/, captured live during design): benefit
// checklist + CTA on the left, an illustrative progress-card visual
// on the right (same built-from-tokens mock pattern as
// ProductPreview.vue/AgentGuidanceVisual.vue elsewhere on this site,
// never fake photography). Uses UPageCTA's solid variant
// (bg-inverted/text-inverted semantic tokens) for the always-dark
// surface, not a raw palette color.
interface Benefit {
  label: string
  icon: string
}

defineProps<{
  title: string
  description: string
  benefits: Benefit[]
}>()
</script>

<template>
  <UPageCTA
    :title="title"
    :description="description"
    :links="[{ label: 'Start learning', to: '/signup', trailingIcon: 'i-lucide-arrow-right', color: 'neutral' }]"
    variant="solid"
    orientation="horizontal"
    :ui="{ root: 'rounded-3xl' }"
  >
    <template #body>
      <ul class="grid grid-cols-2 gap-4">
        <li
          v-for="benefit in benefits"
          :key="benefit.label"
          class="flex items-center gap-3 text-sm text-inverted"
        >
          <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15">
            <UIcon
              :name="benefit.icon"
              class="size-3.5"
            />
          </span>
          {{ benefit.label }}
        </li>
      </ul>
    </template>

    <div class="hidden lg:flex items-center justify-center rounded-2xl bg-white/5 ring ring-white/10 p-8">
      <div class="w-full max-w-xs rounded-2xl bg-white/10 backdrop-blur p-4 flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-bot"
            class="size-5 text-primary"
          />
          <span class="text-sm font-medium text-inverted">Your agent, always on</span>
        </div>
        <div class="flex items-center justify-between text-xs text-inverted/70">
          <span>Data fundamentals</span>
          <span>80%</span>
        </div>
        <UProgress
          :model-value="80"
          size="sm"
          color="primary"
        />
        <div class="flex items-center justify-between text-xs text-inverted/70">
          <span>Applied statistics</span>
          <span>45%</span>
        </div>
        <UProgress
          :model-value="45"
          size="sm"
          color="primary"
        />
      </div>
    </div>
  </UPageCTA>
</template>
