<template>
  <div class="mx-8">
    <h1 class="text-2xl font-semibold mb-4">
      Rezervácie
    </h1>
    <div
      v-for="reservation in restaurantStore.reservations"
      :key="reservation.id"
      class="border-bottom-2 m-8 flex justify-between items-center"
    >
      <div>
        <p class="py-1">
          {{ reservation.user.name }} {{ reservation.user.surname }}
        </p>
        <p class="py-1">
          {{ formatDate(reservation.from, reservation.to) }}
        </p>
        <p
          v-if="reservation.note?.length"
          class="py-1"
        >
          Poznámka: {{ reservation.note }}
        </p>
      </div>
      <div>
        <p>
          Stôl: {{ reservation?.restaurantTable?.label }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { useRestaurantStore } from '@/store/restaurant';

const restaurantStore = useRestaurantStore();
restaurantStore.fetchReservations();

function formatDate(dateFrom: string, dateTo: string) {
  return `${DateTime.fromISO(dateFrom).toFormat('dd. MM. yyyy hh:mm')} - ${DateTime.fromISO(dateTo).toFormat('hh:mm')}`;
}
</script>
