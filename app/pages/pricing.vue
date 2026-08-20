<script setup lang="ts">
const { data: page } = await useAsyncData('pricing', () => queryCollection('pricing').first())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Saas', { title, description })

const isYearly = ref('0')
</script>

<template>
  <div v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
    >
      <template #links>
        <UFieldGroup size="lg">
          <UButton
            label="Monthly"
            :color="isYearly === '0' ? 'primary' : 'neutral'"
            :variant="isYearly === '0' ? 'solid' : 'outline'"
            :aria-pressed="isYearly === '0'"
            @click="isYearly = '0'"
          />
          <UButton
            label="Yearly"
            :color="isYearly === '1' ? 'primary' : 'neutral'"
            :variant="isYearly === '1' ? 'solid' : 'outline'"
            :aria-pressed="isYearly === '1'"
            @click="isYearly = '1'"
          />
        </UFieldGroup>
      </template>
    </UPageHero>

    <UContainer>
      <UPricingPlans scale>
        <UPricingPlan
          v-for="(plan, index) in page.plans"
          :key="index"
          v-bind="plan"
          :price="isYearly === '1' ? plan.price.year : plan.price.month"
          :billing-cycle="isYearly === '1' ? '/year' : '/month'"
        />
      </UPricingPlans>
    </UContainer>

    <UPageSection
      :title="page.faq.title"
      :description="page.faq.description"
    >
      <UAccordion
        :items="page.faq.items"
        :unmount-on-hide="false"
        :default-value="['0']"
        type="multiple"
        class="max-w-3xl mx-auto"
        :ui="{
          trigger: 'text-base text-highlighted',
          body: 'text-base text-muted'
        }"
      />
    </UPageSection>
  </div>
</template>
