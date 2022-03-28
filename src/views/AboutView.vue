<template>
  <div class="mx-8">
    <h1 class="text-2xl font-semibold mb-4">
      O reštaurácií
    </h1>
    <div v-if="Object.keys(restaurant).length">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        <div class="mb-4 mx-4">
          <p class="mb-1">
            Názov Reštaurácie
          </p>
          <InputText
            v-model="restaurant.name"
            placeholder="Moja reštaurácia"
            class="w-full"
          />
        </div>
        <div class="mb-4 mx-4">
          <p class="mb-1">
            Adresa Reštaurácie
          </p>
          <InputText
            v-model="restaurant.address"
            placeholder="Súmračná 25, 821 02 Bratislava"
            class="w-full"
          />
        </div>
        <div class="mb-4 mx-4">
          <p class="mb-1">
            Otváracie hodiny
          </p>
          <Textarea
            v-model="restaurant.opening_hours"
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
            v-model="restaurant.telephone_number"
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
            v-model="restaurant.reservation_advance_hours"
            placeholder="2 hodiny"
            class="w-full"
          />
        </div>
        <div class="mb-4 mx-4">
          <p class="mb-1">
            Typ reštaurácie
          </p>
          <InputText
            v-model="restaurant.description"
            placeholder="Formálna/Neformálna..."
            class="w-full"
          />
        </div>
        <div class="mb-4 mx-4">
          <p class="mb-1">
            Aktuálny layout
          </p>
          <Dropdown
            v-model="restaurant.primary_table_view"
            :options="restaurant.table_views"
            option-label="name"
            option-value="id"
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
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es';
import { ref } from 'vue';
import { useRestaurantStore } from '@/store/restaurant';
import { Restaurant } from '@/interfaces/restaurant';

const restaurantStore = useRestaurantStore();

const restaurant = ref<Restaurant>(cloneDeep(restaurantStore.restaurant));

restaurantStore.fetchRestaurantInfo().then(() => {
  restaurant.value = cloneDeep(restaurantStore.restaurant);
});

const openingHoursPlaceholder = `Pondelok: 10:00 - 20:00
Utorok: 10:00 - 20:00
Streda: 10:00 - 20:00
Štvrtok: 10:00 - 20:00
Piatok: 10:00 - 20:00
Sobota: 10:00 - 20:00
Nedeľa: 10:00 - 20:00`;

function save() {
  console.log(restaurantStore);
  restaurantStore.updateInfo(restaurant.value);
}
</script>

<style scoped>
.openinghours-textarea::placeholder {
  color: #9CA3B0;
  opacity: 1; /* Firefox */
}
</style>
