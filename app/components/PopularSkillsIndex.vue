<script setup lang="ts">
// Dense multi-column skill index, structurally inspired by Udemy's
// "Popular Skills" section (https://www.udemy.com/, captured live
// during design). Every link points at an existing route or in-page
// anchor on this site, never a fabricated destination.
interface SkillGroup {
  label: string
  skills: { label: string, to: string }[]
}

defineProps<{
  groups: SkillGroup[]
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
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
</template>
