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
          class="!mr-4"
          icon="pi pi-plus"
          @click="addTable"
        />
        <Button
          icon="pi pi-minus"
          @click="removeTable"
        />
        <div class="bg-red-200 h-64 my-4">
          <div
            v-for="table in tables"
            :id="`table-${table.id}`"
            :key="table.id"
            class="h-8 w-8 bg-black"
            :class="table.shape === 'circle' ? 'rounded-full' : ''"
            @click="openSettings($event, table.id)"
          />
          <OverlayPanel ref="op">
            <h1 class="text-2xl">
              Stôl
            </h1>
            <div class="flex items-center">
              <h5 class="text-lg mr-16">
                Označenie:
              </h5>
              <InputText
                v-model="currentTable.label"
                class="ml-auto"
              />
            </div>
            <div class="flex items-center">
              <h5 class="text-lg mr-16">
                Tvar:
              </h5>
              <Dropdown
                v-model="currentTable.shape"
                :options="shapes"
                option-label="name"
                option-value="code"
                class="ml-auto"
              />
            </div>
          </OverlayPanel>
        </div>
        <Button @click="exportData">
          Export
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed, ref, toRaw,
} from 'vue';
import { PrimeIcons } from 'primevue/api';
import interact from 'interactjs';
import { v4 as UUIDv4 } from 'uuid';

interface Table {
  id: string;
  label: string;
  shape: string;
  position: {
    x: number;
    y: number
  }
}

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
]);

const shapes = ref([
  { name: 'Štvorec', code: 'square' },
  { name: 'Kruh', code: 'circle' },
]);

function addTable() {
  const id = UUIDv4();
  tables.value.push({
    id,
    position: {
      x: 0,
      y: 0,
    },
    shape: 'square',
    label: '',
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

function exportData() {
  const test = toRaw(tables.value);
  console.log(test);
}
</script>
