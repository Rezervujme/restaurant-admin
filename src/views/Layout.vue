<template>
  <div class="flex">
    <Menu
      class="ml-8 mr-4 mb-8 layout-menu"
      :model="items"
    />
    <div class="mr-8 ml-4 mb-8">
      <div
        class="layout-container layout-container-tables cursor-pointer"
        @click.self="closeDetail"
      >
        <div
          v-for="table in layout.tables"
          :id="`table-${table.id}`"
          :key="table.id"
          class="h-8 w-8 bg-gray-300 absolute flex justify-center items-center"
          :class="[table.shape === 'circle' ? 'rounded-full' : '',
                   table.id === selectedTableId ? 'border border-black' : '']"
          @mousedown="setInitialLocation"
          @mouseup="openSettings($event, table.id)"
        >
          <!--          <div class="table-badge">-->
          <!--            <p-->
          <!--              class="text-white text-center text-xs leading-5"-->
          <!--            >-->
          <!--              {{ table.label || '?' }}-->
          <!--            </p>-->
          <!--          </div>-->

          <p class="text-center">
            {{ table.label || '-' }}
          </p>
        </div>
      </div>
    </div>
    <div class="layout-container layout-container-details flex-grow mr-8 mb-8 p-4">
      <div
        v-if="currentTable"
        class="h-full flex flex-col"
      >
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-lg mr-8">
            Označenie:
          </h5>
          <InputText
            v-model="currentTable.label"
            class="w-2/5"
          />
        </div>
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-lg mr-8">
            Tvar:
          </h5>
          <Dropdown
            v-model="currentTable.shape"
            :options="shapes"
            option-label="name"
            option-value="code"
            class="w-2/5"
          />
        </div>
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-lg mr-8">
            Počet miest:
          </h5>
          <InputNumber
            v-model="currentTable.chairs"
            class="chairs-input"
          />
        </div>
        <div class="flex justify-end mt-auto">
          <Button
            class="p-button-danger"
            icon="pi pi-trash"
            @click="removeTable"
          />
        </div>
      </div>
      <div
        v-else
        class="h-full flex flex-col"
      >
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-lg mr-8">
            Názov:
          </h5>
          <InputText
            v-model="layout.name"
            class="w-2/5"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable no-param-reassign */
import {
  computed, ref, toRaw,
} from 'vue';
import { PrimeIcons } from 'primevue/api';
import interact from 'interactjs';
import { v4 as UUIDv4 } from 'uuid';
import { onKeyStroke } from '@vueuse/core';

interface Table {
  id: string
  label: string
  shape: 'square'|'circle'
  position: {
    x: number
    y: number
  }
  size: {
    height: number
    width: number
  }
  chairs: number
}

interface Layout {
  id: string;
  name: string
  tables: Table[]
}

const layout = ref<Layout>({ id: UUIDv4(), name: 'New Layout', tables: [] });

const selectedTableId = ref<string>('');

const currentTable = computed<Table|undefined>(
  () => layout.value.tables.find((t) => t.id === selectedTableId.value),
);

const startX = ref<number>(0);
const startY = ref<number>(0);

const shapes = ref([
  { name: 'Štvorec', code: 'square' },
  { name: 'Kruh', code: 'circle' },
]);

function addTable() {
  selectedTableId.value = '';

  const id = UUIDv4();
  layout.value.tables.push({
    id,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 32,
      height: 32,
    },
    shape: 'square',
    label: '',
    chairs: 0,
  });

  interact(`#table-${id}`)
  //     .resizable({
  //   // resize from all edges and corners
  //   edges: {
  //     left: true, right: true, bottom: true, top: true,
  //   },
  //   margin: 4,
  //   listeners: {
  //     move(event) {
  //       const table = tables.value.find((t) => t.id === id) as Table;
  //
  //       const { target } = event;
  //
  //       console.log(event);
  //       table.size.width = event.rect.width;
  //       table.size.height = event.rect.height;
  //
  //       target.style.width = `${event.rect.width}px`;
  //       target.style.height = `${event.rect.height}px`;
  //
  //       // fix position when resizing top and left
  //       table.position.x += event.deltaRect.left;
  //       table.position.y += event.deltaRect.top;
  //
  //       target.style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;
  //     },
  //   },
  //   modifiers: [
  //     // keep the edges inside the parent
  //     interact.modifiers.restrictEdges({
  //       outer: 'parent',
  //     }),
  //
  //     // minimum size
  //     interact.modifiers.restrictSize({
  //       min: { width: 32, height: 32 },
  //     }),
  //   ],
  //
  // })
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          offset: 'startCoords',
          targets: [interact.snappers.grid({
            x: 32,
            y: 32,
          })],
        }),
        interact.modifiers.restrictRect({
          restriction: 'parent',
        }),
      ],
      listeners: {
        start(event) {
          console.log(event.type, event.target);
        },
        move(event) {
          const table = layout.value.tables.find((t) => t.id === id);
          if (!table) return;

          table.position.x += event.dx;
          table.position.y += event.dy;

          event.target.style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;
        },
      },
    });
}

function removeTable() {
  layout.value.tables = layout.value.tables.filter((table) => table.id !== currentTable.value?.id);
}

function openSettings(e: MouseEvent, tableId: string) {
  const diffX = Math.abs(e.pageX - startX.value);
  const diffY = Math.abs(e.pageY - startY.value);

  if (diffX < 10 && diffY < 10) {
    selectedTableId.value = tableId;
  }
}

function exportData() {
  const rawLayout = toRaw(layout.value.tables);
  if (!rawLayout.length) return alert('Cannot export empty layout!');
  if (rawLayout.some((table) => table.label === '' || table.chairs === 0)) return alert('Please fill all the required data!');
  if (rawLayout.every((t1, i, arr) => arr.some((t2) => t1.id !== t2.id
        && t1.position.x === t2.position.x
        && t1.position.y === t2.position.y))) return alert('Tables cannot overlap!');
  return console.log(rawLayout);
}

function setInitialLocation(e: MouseEvent) {
  startX.value = e.x;
  startY.value = e.y;
}

function closeDetail() {
  selectedTableId.value = '';
}

onKeyStroke('Delete', () => removeTable());
onKeyStroke('Backspace', () => removeTable());

const items = ref([
  {
    label: 'Options',
    items: [
      {
        label: 'Add table',
        icon: PrimeIcons.PLUS,
        command: () => addTable(),
      },
      {
        label: 'Save',
        icon: PrimeIcons.DOWNLOAD,
        command: () => exportData(),
      },
    ],

  },
  {
    label: 'Saved layouts',
    items: [
      {
        label: 'Layout 1',
        icon: PrimeIcons.PENCIL,
      },
      {
        label: 'Layout 2',
        icon: PrimeIcons.PENCIL,
      },
    ],
  },
]);
</script>

<style scoped>
.layout-container-tables {
  height: 48rem;
  width: 48rem;
}
.layout-container-details {
  min-width: 19.5rem;
}

.layout-container {
  outline: 1px solid #DEE2E6;
  border-radius: 3px;
}

.chairs-input {
  @apply w-2/5
}
.chairs-input:deep(.p-inputnumber-input) {
  @apply w-2/5 text-right
}

/*
.table-badge {
  position: absolute;
  height: 1.25rem;
  width: 1.25rem;
  background-color: red;
  top: 0;
  right: 0;
  margin-top: -8px;
  margin-right: -8px;
  border-radius: 100%;
}
 */
</style>

<style>
.p-menu {
  min-width: 12.5rem;
}
</style>
