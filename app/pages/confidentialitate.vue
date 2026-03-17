<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <UBreadcrumb :items="[{ label: 'Acasă', to: '/' }, { label: 'Politica de confidențialitate' }]" class="mb-6" />

    <h1 class="text-3xl font-bold text-gray-900 mb-8" style="font-family: 'Plus Jakarta Sans', sans-serif;">
      Politica de confidențialitate
    </h1>

    <div class="prose prose-gray max-w-none">
      <p class="text-gray-500 text-sm mb-8">Ultima actualizare: 1 ianuarie 2026</p>

      <h2>1. Informații colectate</h2>
      <p>Colectăm informații pe care ni le furnizați direct: nume, adresă de email, număr de telefon, oraș și informații despre serviciile solicitate sau oferite.</p>

      <h2>2. Utilizarea informațiilor</h2>
      <p>Folosim informațiile colectate pentru a facilita conectarea între clienți și meșteri, a îmbunătăți platforma, a comunica cu dvs. și a asigura securitatea conturilor.</p>

      <h2>3. Partajarea informațiilor</h2>
      <p>Nu vindem și nu partajăm informațiile dvs. personale cu terțe părți, cu excepția cazurilor necesare pentru funcționarea platformei sau când suntem obligați legal.</p>

      <h2>4. Securitatea datelor</h2>
      <p>Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja informațiile dvs. personale împotriva accesului neautorizat, pierderii sau distrugerii.</p>

      <h2>5. Drepturile dvs.</h2>
      <p>Aveți dreptul de a accesa, corecta sau șterge datele dvs. personale. De asemenea, puteți solicita restricționarea prelucrării sau portabilitatea datelor.</p>

      <h2>6. Cookie-uri</h2>
      <p>Utilizăm cookie-uri pentru a îmbunătăți experiența pe platformă. Puteți controla preferințele privind cookie-urile din setările browser-ului dvs.</p>

      <h2>7. Contact</h2>
      <p>Pentru întrebări legate de confidențialitate, contactați-ne la privacy@mesteri.md.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Politica de confidențialitate — mesteri.md' })
</script>
