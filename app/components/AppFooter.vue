<script setup lang="ts">
const columns = [{
  label: 'Product',
  children: [{
    label: 'Pricing',
    to: '/pricing'
  }, {
    label: 'How it works',
    to: '/#features'
  }]
}, {
  label: 'Learn',
  children: [{
    label: 'Docs',
    to: '/docs'
  }, {
    label: 'Blog',
    to: '/blog'
  }, {
    label: 'Changelog',
    to: '/changelog'
  }]
}, {
  label: 'Skills',
  children: [{
    label: 'Popular skills',
    to: '/#skills'
  }, {
    label: 'Learner stories',
    to: '/#testimonials'
  }]
}, {
  label: 'Account',
  children: [{
    label: 'Log in',
    to: '/login'
  }, {
    label: 'Sign up',
    to: '/signup'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })

  loading.value = false
}
</script>

<template>
  <USeparator class="h-px" />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Subscribe to our newsletter"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      label="Subscribe"
                      :loading="loading"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        &copy; {{ new Date().getFullYear() }} Skilleate. All rights reserved.
      </p>
    </template>
  </UFooter>
</template>
