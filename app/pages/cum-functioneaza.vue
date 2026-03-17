<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Cum funcționează' }]" class="mb-6" />

    <h1 class="text-4xl font-bold text-gray-900 text-center mb-4" style="font-family: 'Plus Jakarta Sans', sans-serif;">
      Cum funcționează mesteri.md
    </h1>
    <p class="text-lg text-gray-500 text-center max-w-2xl mx-auto mb-16">
      Procesul nostru simplu te ajută să găsești meșterul perfect în doar câțiva pași
    </p>

    <!-- For Homeowners -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Pentru proprietari de case
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(step, i) in homeownerSteps" :key="i" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-4">
            {{ i + 1 }}
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- For Providers -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Pentru meșteri
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(step, i) in providerSteps" :key="i" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center mb-4">
            {{ i + 1 }}
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        Întrebări frecvente
      </h2>
      <UAccordion :items="faqItems" />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Cum funcționează — mesteri.md' })

const homeownerSteps = [
  { title: 'Descrie lucrarea', description: 'Completează un formular simplu în care descrii ce lucrare ai nevoie, locația și bugetul orientativ. Durează mai puțin de 2 minute.' },
  { title: 'Primește oferte', description: 'Meșterii din zona ta vor primi cererea și îți vor trimite oferte personalizate cu preț, durată estimată și detalii.' },
  { title: 'Alege și colaborează', description: 'Compară ofertele, citește recenziile, și alege meșterul care ți se potrivește cel mai bine. Simplu și transparent.' }
]

const providerSteps = [
  { title: 'Creează-ți profilul', description: 'Înregistrează-te gratuit și completează-ți profilul cu serviciile oferite, prețuri, portofoliu și experiența ta.' },
  { title: 'Primește cereri', description: 'Vei primi cereri de la clienți din zona ta care caută exact serviciile pe care le oferi.' },
  { title: 'Trimite oferte și crește', description: 'Trimite oferte, finalizează lucrări, colectează recenzii pozitive și crește-ți afacerea pe mesteri.md.' }
]

const faqItems = [
  { label: 'Este gratuit să folosesc mesteri.md?', content: 'Da, pentru proprietari de case platforma este complet gratuită. Poți posta cereri și primi oferte fără niciun cost.' },
  { label: 'Cum sunt verificați meșterii?', content: 'Verificăm identitatea, documentele și experiența fiecărui meșter. De asemenea, monitorizăm recenziile și feedback-ul clienților.' },
  { label: 'Cât durează să primesc oferte?', content: 'De obicei primești primele oferte în mai puțin de 24 de ore. Pentru cereri urgente, răspunsurile pot veni în câteva ore.' },
  { label: 'Ce se întâmplă dacă nu sunt mulțumit de lucrare?', content: 'Te încurajăm să comunici direct cu meșterul. Dacă nu reușiți să rezolvați problema, echipa noastră de suport te poate ajuta.' },
  { label: 'Pot anula o cerere?', content: 'Da, poți anula o cerere în orice moment înainte de a accepta o ofertă. După acceptare, contactează meșterul direct.' },
  { label: 'Cât costă pentru meșteri?', content: 'Înregistrarea pe platformă este gratuită. Meșterii plătesc un comision mic doar pentru lucrările finalizate prin platformă.' },
  { label: 'Cum pot lăsa o recenzie?', content: 'După finalizarea lucrării, vei primi o invitație să lași o recenzie. Poți evalua meșterul cu stele și scrie un comentariu detaliat.' },
  { label: 'Este disponibil în tot Moldova?', content: 'Da, mesteri.md acoperă toate orașele și localitățile din Republica Moldova. Avem meșteri în Chișinău, Bălți, Cahul și multe alte localități.' }
]
</script>
