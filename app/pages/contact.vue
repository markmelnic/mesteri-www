<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-20" style="background: var(--gradient-dark-section)">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-1/4 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="animate-fade-up text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          {{ $t('contact.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-indigo-200/60 max-w-xl mx-auto">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="animate-fade-up p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ $t('contact.formTitle') }}</h2>
            <form class="space-y-5" @submit.prevent="submitForm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <UFormField :label="$t('contact.name')">
                  <UInput v-model="form.name" :placeholder="$t('contact.namePlaceholder')" />
                </UFormField>
                <UFormField :label="$t('contact.email')">
                  <UInput v-model="form.email" type="email" :placeholder="$t('contact.emailPlaceholder')" />
                </UFormField>
              </div>
              <UFormField :label="$t('contact.subject')">
                <UInput v-model="form.subject" :placeholder="$t('contact.subjectPlaceholder')" />
              </UFormField>
              <UFormField :label="$t('contact.message')">
                <UTextarea v-model="form.message" :rows="5" :placeholder="$t('contact.messagePlaceholder')" />
              </UFormField>
              <UButton type="submit" color="primary" size="lg" class="font-semibold bg-indigo-600 hover:bg-indigo-700" trailing-icon="i-heroicons-paper-airplane">
                {{ $t('contact.send') }}
              </UButton>
            </form>
          </div>
        </div>

        <!-- Contact info -->
        <div class="space-y-4">
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            class="animate-fade-up p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <UIcon :name="info.icon" class="w-5 h-5" />
            </div>
            <h3 class="font-bold text-gray-900 text-sm mb-1">{{ info.title }}</h3>
            <p class="text-sm text-gray-500">{{ info.value }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
useHead({ title: `${t('contact.title')} — mesteri.md` })
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const contactInfo = computed(() => [
  { icon: 'i-heroicons-map-pin', title: t('contact.addressLabel'), value: t('contact.address') },
  { icon: 'i-heroicons-phone', title: t('contact.phoneLabel'), value: t('contact.phone') },
  { icon: 'i-heroicons-envelope', title: t('contact.emailLabel'), value: t('contact.emailAddress') }
])

function submitForm() {
  toast.add({
    title: t('contact.sent'),
    description: t('contact.sentDesc'),
    icon: 'i-heroicons-check-circle',
    color: 'success'
  })
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
}
</script>
