<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Contact' }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
      Contactează-ne
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Contact Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <form class="space-y-5" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UFormField label="Nume">
                <UInput v-model="form.name" placeholder="Numele tău" />
              </UFormField>
              <UFormField label="Email">
                <UInput v-model="form.email" type="email" placeholder="email@exemplu.md" />
              </UFormField>
            </div>
            <UFormField label="Subiect">
              <UInput v-model="form.subject" placeholder="Subiectul mesajului" />
            </UFormField>
            <UFormField label="Mesaj">
              <UTextarea v-model="form.message" placeholder="Scrie mesajul tău aici..." :rows="6" />
            </UFormField>
            <UButton type="submit" color="primary" size="lg">
              Trimite mesajul
            </UButton>
          </form>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="space-y-6">
        <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 class="font-semibold text-gray-900 mb-4">Informații de contact</h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Adresă</p>
                <p class="text-sm text-gray-500">str. Ștefan cel Mare 123, Chișinău, Moldova</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Telefon</p>
                <p class="text-sm text-gray-500">+373 22 123 456</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-gray-900">Email</p>
                <p class="text-sm text-gray-500">contact@mesteri.md</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h3 class="font-semibold text-gray-900 mb-4">Program de lucru</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">Luni - Vineri</span>
              <span class="text-gray-900 font-medium">09:00 - 18:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Sâmbătă</span>
              <span class="text-gray-900 font-medium">10:00 - 14:00</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">Duminică</span>
              <span class="text-gray-900 font-medium">Închis</span>
            </div>
          </div>
        </div>

        <!-- Map placeholder -->
        <div class="bg-gray-200 rounded-xl h-48 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <UIcon name="i-heroicons-map" class="w-8 h-8 mb-2 mx-auto" />
            <p class="text-sm">Hartă interactivă</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact — mesteri.md' })

const toast = useToast()
const form = reactive({ name: '', email: '', subject: '', message: '' })

function submitForm() {
  toast.add({ title: 'Mesajul a fost trimis!', description: 'Vă vom contacta în cel mai scurt timp.', icon: 'i-heroicons-check-circle', color: 'success' })
  Object.assign(form, { name: '', email: '', subject: '', message: '' })
}
</script>
