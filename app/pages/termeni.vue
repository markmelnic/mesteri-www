<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Termeni și condiții' }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
      Termeni și condiții
    </h1>

    <div class="prose prose-gray max-w-none">
      <p class="text-gray-500 text-sm mb-8">Ultima actualizare: 1 ianuarie 2026</p>

      <h2>1. Acceptarea termenilor</h2>
      <p>Prin accesarea și utilizarea platformei mesteri.md, acceptați acești termeni și condiții în totalitate. Dacă nu sunteți de acord cu oricare dintre acești termeni, vă rugăm să nu utilizați platforma.</p>

      <h2>2. Descrierea serviciului</h2>
      <p>mesteri.md este o platformă online care conectează proprietarii de case cu furnizori de servicii pentru locuințe (meșteri). Platforma facilitează comunicarea și nu este parte a contractului dintre client și meșter.</p>

      <h2>3. Conturile utilizatorilor</h2>
      <p>Pentru a utiliza anumite funcții ale platformei, trebuie să vă creați un cont. Sunteți responsabil pentru menținerea confidențialității datelor de autentificare și pentru toate activitățile care au loc sub contul dumneavoastră.</p>

      <h2>4. Obligațiile utilizatorilor</h2>
      <p>Utilizatorii se angajează să furnizeze informații corecte și actualizate, să respecte legislația în vigoare și să nu utilizeze platforma în scopuri frauduloase sau ilegale.</p>

      <h2>5. Responsabilitate</h2>
      <p>mesteri.md nu garantează calitatea serviciilor prestate de meșteri și nu este responsabilă pentru eventualele dispute între clienți și furnizori de servicii. Platforma pune la dispoziție un sistem de recenzii pentru a ajuta utilizatorii să ia decizii informate.</p>

      <h2>6. Modificarea termenilor</h2>
      <p>Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi publicate pe această pagină cu data ultimei actualizări.</p>

      <h2>7. Contact</h2>
      <p>Pentru întrebări legate de acești termeni, ne puteți contacta la adresa contact@mesteri.md.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Termeni și condiții — mesteri.md' })
</script>
