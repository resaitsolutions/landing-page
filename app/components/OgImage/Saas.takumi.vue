<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps<{
  headline?: string
  title?: string
  description?: string
}>()

const rootClass = 'w-full h-full flex bg-neutral-950 relative overflow-hidden' // ds-allow-hardcode: Nuxt UI semantic 'neutral' scale (app.config.ts neutral: 'stone'), not a raw palette color
// Takumi (@takumi-rs/core) renders OG images through its own compiled Rust
// Tailwind-class resolver, not the app's live @theme CSS/app.config.ts, so it
// cannot resolve the custom 'terracotta' color registered for ui.colors.primary.
// Hardcoding the verified terracotta-400 hex (see design.md, matches --ui-primary
// dark-mode shade) is the documented, correct workaround for this OG-only surface.
const accentBg = 'bg-[#e5946f]' // ds-allow-hardcode: terracotta-400, Takumi renderer limitation (see comment above)
const accentText = 'text-[#e5946f]' // ds-allow-hardcode: terracotta-400, Takumi renderer limitation (see comment above)
</script>

<template>
  <div
    :class="rootClass"
    data-theme="dark"
  >
    <div :class="`absolute top-0 left-0 w-1.5 h-full ${accentBg}`" />

    <div class="flex flex-col justify-between flex-1 px-20 py-16">
      <div />

      <div class="flex flex-col gap-5">
        <span
          v-if="headline"
          :class="`text-2xl font-medium ${accentText}`"
        >
          {{ headline }}
        </span>

        <h1
          v-if="title"
          class="text-6xl font-bold text-highlighted"
        >
          {{ title }}
        </h1>

        <p
          v-if="description"
          class="text-3xl/11 text-muted"
          :style="{ lineClamp: 2, textOverflow: 'ellipsis' }"
        >
          {{ description }}
        </p>
      </div>

      <div class="flex items-center gap-4">
        <span :class="`text-2xl font-bold ${accentText} tracking-tight`">Skilleate</span>
        <div class="h-px flex-1 bg-border" />
      </div>
    </div>
  </div>
</template>
