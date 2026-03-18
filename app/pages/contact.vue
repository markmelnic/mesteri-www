<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden py-16 lg:py-20 bg-[#0A0A0A]">
      <div class="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#0D9373]/[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div class="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="animate-fade-up text-[32px] sm:text-[40px] lg:text-[48px] font-bold text-white tracking-tight mb-4">
          {{ $t('contact.title') }}
        </h1>
        <p class="animate-fade-up delay-100 text-lg text-[#A1A1AA] max-w-xl mx-auto">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="animate-fade-up p-8 rounded-xl bg-[#141416] border border-white/[0.06]">
            <h2 class="text-xl font-semibold text-white mb-6">{{ $t('contact.formTitle') }}</h2>
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
              <button
                type="submit"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0D9373] hover:bg-[#0FAA84] rounded-lg transition-colors duration-150"
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
            class="animate-fade-up p-6 rounded-xl bg-[#141416] border border-white/[0.06]"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="w-9 h-9 rounded-lg bg-[#0D9373]/10 text-[#0D9373] flex items-center justify-center mb-4">
              <UIcon :name="info.icon" class="w-4 h-4" />
            </div>
            <h3 class="font-semibold text-white text-sm mb-1">{{ info.title }}</h3>
            <p class="text-sm text-[#A1A1AA]">{{ info.value }}</p>
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
