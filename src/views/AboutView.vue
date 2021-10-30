<template>
  <div class="mx-8">
    <h1 class="text-2xl font-semibold mb-4">
      About your restaurant
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    >
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Názov Reštaurácie
        </p>
        <InputText
          v-model="restaurantInfo.name"
          placeholder="Moja reštaurácia"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Adresa Reštaurácie
        </p>
        <InputText
          v-model="restaurantInfo.address"
          placeholder="Súmračná 25, 821 02 Bratislava"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Otváracie hodiny
        </p>
        <Textarea
          v-model="restaurantInfo.openingHours"
          rows="7"
          :placeholder="openingHoursPlaceholder"
          class="resize-none w-full openinghours-textarea"
        />
      </div>

      <div class="mb-4 mx-4">
        <p class="mb-1">
          Kontakt
        </p>
        <InputText
          v-model="restaurantInfo.phoneNumber"
          placeholder="+421 123 456 789"
          type="tel"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Minimálna doba rezervácie vopred
        </p>
        <InputText
          v-model="restaurantInfo.reserveDelay"
          placeholder="2 hodiny"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Typ reštaurácie
        </p>
        <InputText
          v-model="restaurantInfo.type"
          placeholder="Formálna/Neformálna..."
          class="w-full"
        />
      </div>
    </div>
    <div class="mb-4 mx-4 flex">
      <Button
        class="!mt-auto !ml-auto"
        @click="save"
      >
        Uložiť
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue';

interface RestaurantInfo {
  name: string
  address: string
  openingHours: string
  phoneNumber: string,
  reserveDelay: string,
  type: string
}

const openingHoursPlaceholder = `Pondelok: 10:00 - 20:00
Utorok: 10:00 - 20:00
Streda: 10:00 - 20:00
Štvrtok: 10:00 - 20:00
Piatok: 10:00 - 20:00
Sobota: 10:00 - 20:00
Nedeľa: 10:00 - 20:00`;

const restaurantInfo = ref<RestaurantInfo>(JSON.parse(localStorage.getItem('about') ?? '{"name": "","address": "","openingHours": "","phoneNumber": "","reserveDelay": "","type": ""}') as RestaurantInfo);

console.log(restaurantInfo.value);
function save() {
  localStorage.setItem('about', JSON.stringify(toRaw(restaurantInfo.value)));
}
</script>

<style scoped>
.openinghours-textarea::placeholder {
  color: #9CA3B0;
  opacity: 1; /* Firefox */
}
</style>
