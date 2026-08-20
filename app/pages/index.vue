<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Saas', { title, description })

const featuredTestimonials = computed(() => page.value?.testimonials?.items?.slice(0, 4) ?? [])
const moreTestimonials = computed(() => page.value?.testimonials?.items?.slice(4) ?? [])
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.hero.links"
    >
      <template #top>
        <HeroBackground />
      </template>

      <template #title>
        <MDC
          :value="page.title"
          unwrap="p"
        />
      </template>

      <ProductPreview />
    </UPageHero>

    <UPageSection
      v-for="(section, index) in page.sections"
      :id="section.id"
      :key="index"
      :title="section.title"
      :description="section.description"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
      :ui="index === 1 ? { root: 'bg-elevated/50' } : {}"
    >
      <AgentGuidanceVisual v-if="index === 0" />
      <LearnerPathsVisual v-else />
    </UPageSection>

    <UPageSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          spotlight
          :class="index === 0 ? 'md:col-span-2 md:row-span-2' : ''"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      id="testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UPageColumns class="lg:columns-2">
        <UPageCard
          v-for="(testimonial, index) in featuredTestimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :class="index === 0 ? 'font-serif text-lg' : ''"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="testimonial.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UPageColumns>

      <UCollapsible
        v-if="moreTestimonials.length"
        class="mt-8 flex flex-col items-center gap-6"
      >
        <UButton
          label="See more stories"
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-chevron-down"
        />

        <template #content>
          <UPageColumns class="lg:columns-2">
            <UPageCard
              v-for="(testimonial, index) in moreTestimonials"
              :key="index"
              variant="subtle"
              :description="testimonial.quote"
              :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
            >
              <template #footer>
                <UUser
                  v-bind="testimonial.user"
                  size="lg"
                />
              </template>
            </UPageCard>
          </UPageColumns>
        </template>
      </UCollapsible>
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-bind="page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>
