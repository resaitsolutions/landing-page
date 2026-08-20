<script setup lang="ts">
// Tabbed skill-category browser, structurally inspired by Udemy's
// "Skills to transform your career and life" section
// (https://www.udemy.com/, captured live during design): colored
// thumbnail-style card headers echo Udemy's course-card imagery,
// built from icons + tokens (never fake photography), with real
// Skilleate content tracks and no fabricated ratings/learner counts.
interface Track {
  title: string
  level: string
  detail: string
  icon: string
}

interface Category {
  label: string
  tracks: Track[]
}

defineProps<{
  categories: Category[]
}>()

const active = ref('0')

const levelColor: Record<string, 'neutral' | 'primary' | 'warning'> = {
  Foundational: 'neutral',
  Intermediate: 'primary',
  Advanced: 'warning'
}
</script>

<template>
  <UTabs
    v-model="active"
    :items="categories.map((c, i) => ({ label: c.label, value: String(i) }))"
    :content="false"
    class="w-full"
  />

  <UPageGrid class="mt-6 sm:grid-cols-3">
    <UPageCard
      v-for="track in categories[Number(active)]?.tracks ?? []"
      :key="track.title"
      :description="track.detail"
      variant="subtle"
      class="overflow-hidden"
      :ui="{ description: 'mt-2' }"
    >
      <template #header>
        <div class="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 mb-4 flex h-28 items-center justify-center bg-primary/10">
          <UIcon
            :name="track.icon"
            class="size-12 text-primary"
          />
        </div>
      </template>

      <template #title>
        <div class="flex items-center justify-between gap-2">
          <span class="font-semibold text-highlighted">{{ track.title }}</span>
          <UBadge
            :color="levelColor[track.level] ?? 'neutral'"
            variant="subtle"
            size="sm"
          >
            {{ track.level }}
          </UBadge>
        </div>
      </template>
    </UPageCard>
  </UPageGrid>
</template>
