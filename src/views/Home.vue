<template>
  <div>
    <Toolbar class="mb-8">
      <template #left>
        <div class="flex items-center">
          <img src="https://www.primefaces.org/sakai-vue/images/logo-dark.svg">
          <h1 class="text-3xl ml-4">
            ADMIN
          </h1>
        </div>
      </template>
    </Toolbar>
    <div class="flex">
      <Menu
        class="ml-8 mr-4"
        :model="items"
      />
      <div class="mr-8 ml-4 flex-grow">
        <Button
          icon="pi pi-plus"
          @click="addTable"
        />
        <Button
          icon="pi pi-minus"
          @click="removeTable"
        />
        <div class="bg-red-200 h-64">
          <div
            v-for="table in tables"
            :id="`table-${table.id}`"
            :key="table.id"
            class="h-8 w-8 bg-black"
            @click="openSettings($event, table.id)"
          />
          <OverlayPanel ref="op">
            <img
              src="https://via.placeholder.com/150"
              alt="Nature Image"
            >
            <h1>{{ currentTable.id }}</h1>
            <Button @click="test" />
          </OverlayPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { PrimeIcons } from 'primevue/api';
import interact from 'interactjs';
import { v4 as UUIDv4 } from 'uuid';

interface Table {id: string; test: number; position: {x:number; y:number}}

const tables = ref<Table[]>([]);

const selectedTableId = ref<string>('');
const items = ref([
  {
    label: 'Options',
    items: [{
      label: 'Update',
      icon: PrimeIcons.REFRESH,
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TIMES,
    },
    ],
  },
  {
    label: 'Navigate',
    items: [{
      label: 'Vue Website',
      icon: PrimeIcons.EXTERNAL_LINK,
      url: 'https://vuejs.org/',
    },
    {
      label: 'Router',
      icon: PrimeIcons.UPLOAD,
      command: () => {
        window.location.hash = '/fileupload';
      },
    },
    ],
  },
]);

function addTable() {
  const id = UUIDv4();
  tables.value.push({
    id,
    position: {
      x: 0,
      y: 0,
    },
    test: 0,
  });
  interact(`#table-${id}`).draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
      }),
    ],
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        const table = tables.value.find((t) => t.id === id);
        if (!table) return;

        table.position.x += event.dx;
        table.position.y += event.dy;

        // eslint-disable-next-line no-param-reassign
        event.target.style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;
      },
    },
  });
}

function removeTable() {
  console.log('remove');
}

const op = ref();

function openSettings(e: MouseEvent, tableId: string) {
  selectedTableId.value = tableId;
  op.value.toggle(e);
}

const currentTable = computed(() => tables.value.find((t) => t.id === selectedTableId.value));

function test() {
  if (!currentTable.value) return;
  currentTable.value.test += 1;
}
</script>
