<template>
  <div class="bg-stone-50 min-h-screen">
    <!-- Header -->
    <section class="bg-white border-b border-stone-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-center">
        <h1 class="animate-fade-up font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
          {{ $t('contact.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-stone-500 max-w-xl mx-auto">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="animate-fade-up p-6 sm:p-8 rounded-2xl bg-white border border-stone-200">
            <h2 class="font-display text-xl font-semibold text-stone-900 mb-6">{{ $t('contact.formTitle') }}</h2>
            <form class="space-y-5" @submit.prevent="submitForm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <UFormField :label="$t('contact.name')">
                  <UInput v-model="form.name" :placeholder="$t('contact.namePlaceholder')" class="w-full" />
                </UFormField>
                <UFormField :label="$t('contact.email')">
                  <UInput v-model="form.email" type="email" :placeholder="$t('contact.emailPlaceholder')" class="w-full" />
                </UFormField>
              </div>
              <UFormField :label="$t('contact.subject')">
                <UInput v-model="form.subject" :placeholder="$t('contact.subjectPlaceholder')" class="w-full" />
              </UFormField>
              <UFormField :label="$t('contact.message')">
                <UTextarea v-model="form.message" :rows="5" :placeholder="$t('contact.messagePlaceholder')" class="w-full" />
              </UFormField>
              <button
                type="submit"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors"
              >
                {{ $t('contact.send') }}
                <UIcon name="i-heroicons-paper-airplane" class="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <!-- Contact info -->
        <div class="space-y-4">
          <div
            v-for="(info, i) in contactInfo"
            :key="i"
            class="animate-fade-up p-6 rounded-2xl bg-white border border-stone-200"
            :style="{ animationDelay: `${i * 0.08}s` }"
          >
            <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <UIcon :name="info.icon" class="w-4 h-4" />
            </div>
            <h3 class="font-semibold text-stone-900 text-sm mb-1">{{ info.title }}</h3>
            <p class="text-sm text-stone-500">{{ info.value }}</p>
          </div>

          <div class="animate-fade-up p-6 rounded-2xl bg-white border border-stone-200" style="animation-delay: 0.24s">
            <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            </div>
            <h3 class="font-semibold text-stone-900 text-sm mb-2">{{ $t('contact.workingHours') }}</h3>
            <div class="space-y-1 text-sm text-stone-500">
              <p>{{ $t('contact.monFri') }}</p>
              <p>{{ $t('contact.saturday') }}</p>
            </div>
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
  { icon: 'i-heroicons-phone', title: t('contact.phoneLabel'), value: '+373 22 123 456' },
  { icon: 'i-heroicons-envelope', title: t('contact.emailLabel'), value: 'contact@mesteri.md' }
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
