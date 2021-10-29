<template>
  <div class="mx-8">
    <h1 class="text-2xl font-semibold mb-4">
      About your restaurant
    </h1>
    <div class="grid grid-cols-5">
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
          placeholder="Pondelok: 10:00 - 20:00&#10;Utorok: 10:00 - 20:00&#10;Streda: 10:00 - 20:00&#10;Štvrtok: 10:00 - 20:00&#10;Piatok: 10:00 - 20:00&#10;Sobota: 10:00 - 20:00&#10;Nedeľa: 10:00 - 20:00&#10;"
          class="resize-none w-full openinghours-textarea"
        />
      </div>

      <div class="mb-4 mx-4">
        <p class="mb-1">
          Kontakt
        </p>
        <InputText
          v-bind="restaurantInfo.phoneNumber"
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface RestaurantInfo {
  name: string
  address: string
  openingHours: string
  phoneNumber: string,
  reserveDelay: string,
  type: string
}

const restaurantInfo = ref<RestaurantInfo>({
  name: '', address: '', openingHours: '', phoneNumber: '', reserveDelay: '', type: '',
});
</script>

<style scoped>
.openinghours-textarea::placeholder {
  color: #9CA3B0;
  opacity: 1; /* Firefox */
}
</style>
