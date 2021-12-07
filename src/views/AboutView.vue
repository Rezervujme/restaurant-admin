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
          v-model="restaurantStore.restaurant.name"
          placeholder="Moja reštaurácia"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Adresa Reštaurácie
        </p>
        <InputText
          v-model="restaurantStore.restaurant.address"
          placeholder="Súmračná 25, 821 02 Bratislava"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Otváracie hodiny
        </p>
        <Textarea
          v-model="restaurantStore.restaurant.opening_hours"
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
          v-model="restaurantStore.restaurant.telephone_number"
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
          v-model="restaurantStore.restaurant.reservation_advance_hours"
          placeholder="2 hodiny"
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Typ reštaurácie
        </p>
        <InputText
          v-model="restaurantStore.restaurant.description"
          placeholder="Formálna/Neformálna..."
          class="w-full"
        />
      </div>
      <div class="mb-4 mx-4">
        <p class="mb-1">
          Primary layout
        </p>
        <Dropdown
          v-model="restaurantStore.restaurant.primary_table_view"
          :options="[{name: 'Main', value: '1'}]"
          option-label="name"
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
import { useRestaurantStore } from '@/store/restaurant';

const restaurantStore = useRestaurantStore();
restaurantStore.fetchRestaurantInfo();

const openingHoursPlaceholder = `Pondelok: 10:00 - 20:00
Utorok: 10:00 - 20:00
Streda: 10:00 - 20:00
Štvrtok: 10:00 - 20:00
Piatok: 10:00 - 20:00
Sobota: 10:00 - 20:00
Nedeľa: 10:00 - 20:00`;

function save() {
  console.log(restaurantStore);
  restaurantStore.updateInfo();
}
</script>

<style scoped>
.openinghours-textarea::placeholder {
  color: #9CA3B0;
  opacity: 1; /* Firefox */
}
</style>
