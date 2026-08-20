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
      id="skills"
      :title="page.skillBrowser.title"
      :description="page.skillBrowser.description"
    >
      <SkillCategoryBrowser :categories="page.skillBrowser.categories" />
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

    <ConversionBand
      :title="page.conversionBand.title"
      :description="page.conversionBand.description"
      :benefits="page.conversionBand.benefits"
    />

    <UPageSection
      id="testimonials"
      :headline="page.testimonials.headline"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    >
      <UCarousel
        v-slot="{ item }"
        :items="page.testimonials.items"
        arrows
        class="w-full"
        :ui="{ item: 'basis-full sm:basis-1/2 lg:basis-1/3' }"
      >
        <UPageCard
          variant="subtle"
          :description="item.quote"
          class="h-full"
          :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
        >
          <template #footer>
            <UUser
              v-bind="item.user"
              size="lg"
            />
          </template>
        </UPageCard>
      </UCarousel>
    </UPageSection>

    <CertPrepBand
      :title="page.certPrep.title"
      :description="page.certPrep.description"
      :cta="page.certPrep.cta"
      :cards="page.certPrep.cards"
    />

    <UPageSection
      id="popular-skills"
      :title="page.popularSkills.title"
    >
      <PopularSkillsIndex
        :groups="page.popularSkills.groups"
        :top-skill="page.popularSkills.topSkill"
      />
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
