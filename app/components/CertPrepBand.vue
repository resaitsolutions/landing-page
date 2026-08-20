<script setup lang="ts">
// "Get certified" equivalent band, structurally inspired by Udemy's
// cert-prep-module (https://www.udemy.com/, captured live during
// design): header + CTA left, 3 vertical cards right. Uses real
// Skilleate certificate tracks (already promised in the pricing/
// features copy - "Skill certificates"), never fabricated external
// certification-body logos (CompTIA/AWS/PMI in Udemy's real version
// are third parties Skilleate has no relationship with).
interface Card {
  title: string
  description: string
  icon: string
}

interface Cta {
  label: string
  to: string
}

defineProps<{
  title: string
  description: string
  cta: Cta
  cards: Card[]
}>()
</script>

<template>
  <div class="rounded-3xl bg-inverted p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
    <div class="lg:flex-1">
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-inverted">
        {{ title }}
      </h2>
      <p class="mt-4 text-base sm:text-lg text-dimmed">
        {{ description }}
      </p>
      <UButton
        :label="cta.label"
        :to="cta.to"
        color="neutral"
        variant="outline"
        trailing-icon="i-lucide-arrow-right"
        size="lg"
        class="mt-6"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:flex-1">
      <div
        v-for="card in cards"
        :key="card.title"
        class="rounded-2xl bg-white/5 ring ring-white/10 p-6 flex flex-col gap-3"
      >
        <UIcon
          :name="card.icon"
          class="size-8 text-primary"
        />
        <h3 class="font-semibold text-inverted">
          {{ card.title }}
        </h3>
        <p class="text-xs text-inverted/70">
          {{ card.description }}
        </p>
      </div>
    </div>
  </div>
</template>
