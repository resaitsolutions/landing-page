<script setup lang="ts">
// Dense multi-column skill index, structurally inspired by Udemy's
// "Popular Skills" section (https://www.udemy.com/, captured live
// during design). Every link points at an existing route or in-page
// anchor on this site, never a fabricated destination. The top-skill
// callout mirrors Udemy's structural pattern (a single featured
// panel beside the index) with editorial, non-falsifiable copy -
// never a fabricated learner-count/ranking statistic.
interface SkillGroup {
  label: string
  skills: { label: string, to: string }[]
}

interface TopSkill {
  label: string
  description: string
  icon: string
  to: string
}

defineProps<{
  groups: SkillGroup[]
  topSkill?: TopSkill
}>()
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8 lg:gap-16">
    <UPageCard
      v-if="topSkill"
      variant="subtle"
      class="lg:w-72 shrink-0 rounded-2xl"
    >
      <UIcon
        :name="topSkill.icon"
        class="size-8 text-primary"
      />
      <h3 class="mt-3 font-semibold text-highlighted">
        {{ topSkill.label }}
      </h3>
      <p class="mt-2 text-sm text-muted">
        {{ topSkill.description }}
      </p>
      <ULink
        :to="topSkill.to"
        class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
      >
        Explore skills
        <UIcon
          name="i-lucide-arrow-right"
          class="size-4"
        />
      </ULink>
    </UPageCard>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
      <nav
        v-for="group in groups"
        :key="group.label"
        :aria-label="group.label"
      >
        <h3 class="text-sm font-semibold text-highlighted mb-3">
          {{ group.label }}
        </h3>
        <ul class="flex flex-col gap-2">
          <li
            v-for="skill in group.skills"
            :key="skill.label"
          >
            <ULink
              :to="skill.to"
              class="text-sm text-muted hover:text-primary"
            >
              {{ skill.label }}
            </ULink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
