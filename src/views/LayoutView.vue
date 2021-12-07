<template>
  <div class="mx-8">
    <h1 class="text-2xl font-semibold mb-4">
      Layout editor
    </h1>
    <div class="flex">
      <Menu
        class="mr-4 mb-8 layout-menu"
        :model="menuItems"
      />
      <div
        v-if="selectedLayout"
        class="flex"
      >
        <div class="mr-4 ml-4 mb-8">
          <div
            class="layout-container layout-container-tables cursor-pointer"
            @click.self="closeDetail"
          >
            <div
              v-for="table in selectedLayout?.tables"
              :id="`table-${table.uuid}`"
              :key="table.uuid"
              class="h-8 w-8 absolute flex justify-center items-center"
              :class="[table.shape === 'circle' ? 'rounded-full' : '',
                       table.uuid === selectedTable?.uuid ? 'border border-black' : '']"
              @mousedown="setInitialLocation"
              @mouseup="openSettings($event, table)"
            >
              <!--          <div class="table-badge">-->
              <!--            <p-->
              <!--              class="text-white text-center text-xs leading-5"-->
              <!--            >-->
              <!--              {{ table.label || '?' }}-->
              <!--            </p>-->
              <!--          </div>-->

              <i-ic-outline-table-restaurant
                v-if="table.shape === 'square'"
                class="h-8 w-8 text-xl"
              />
              <i-ic-outline-table-bar
                v-if="table.shape === 'circle'"
                class="h-8 w-8 text-xl"
              />
            </div>
          </div>
        </div>
        <div class="layout-container layout-container-details flex-grow mb-8 ml-4 p-4">
          <div
            v-if="selectedTable"
            class="h-full flex flex-col"
          >
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-lg mr-8">
                Označenie:
              </h5>
              <InputText
                v-model="selectedTable.label"
                class="w-2/5"
              />
            </div>
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-lg mr-8">
                Tvar:
              </h5>
              <Dropdown
                v-model="selectedTable.shape"
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
                v-model="selectedTable.chairs"
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
                v-model="selectedLayout.name"
                class="w-2/5"
              />
            </div>
            <div class="flex justify-end mt-auto">
              <Button
                class="p-button-danger"
                icon="pi pi-trash"
                @click="removeLayout"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="mr-8 ml-4 mb-8"
      >
        <h1>Select a layout to edit</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable no-param-reassign */
import {
  computed, nextTick, ref, toRaw,
} from 'vue';
import { PrimeIcons } from 'primevue/api';
import interact from 'interactjs';
import { v4 as UUIDv4 } from 'uuid';
import { useEventListener } from '@vueuse/core';
import { onBeforeRouteLeave } from 'vue-router';
import { useRestaurantStore } from '@/store/restaurant';
import {
  Layout, LayoutNew, Table, TableNew,
} from '@/interfaces/restaurant';

const restaurantStore = useRestaurantStore();
restaurantStore.fetchRestaurantInfo();

const selectedLayout = ref<Layout>();

const selectedTable = ref<Table>();

const startX = ref<number>(0);
const startY = ref<number>(0);

const shapes = ref([
  { name: 'Štvorec', code: 'square' },
  { name: 'Kruh', code: 'circle' },
]);

function addTable() {
  // if (!selectedLayout.value) return;
  // selectedTable.value = undefined;
  //
  // const uuid = UUIDv4();
  // selectedLayout.value.tables.push({
  //   id: 0,
  //   uuid,
  //   position: {
  //     x: 0,
  //     y: 0,
  //   },
  //   size: {
  //     width: 32,
  //     height: 32,
  //   },
  //   shape: 'square',
  //   label: '',
  //   chairs: 0,
  // });

  // interact(`#table-${uuid}`)
  //     .resizable({
  //   // resize from all edges and corners
  //   edges: {
  //     left: true, right: true, bottom: true, top: true,
  //   },
  //   margin: 4,
  //   listeners: {
  //     move(event) {
  //       const table = tables.value.find((t) => t.id === id) as TableNew;
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
  //   .draggable({
  //     modifiers: [
  //       interact.modifiers.snap({
  //         offset: 'startCoords',
  //         targets: [interact.snappers.grid({
  //           x: 32,
  //           y: 32,
  //         })],
  //       }),
  //       interact.modifiers.restrictRect({
  //         restriction: 'parent',
  //       }),
  //     ],
  //     listeners: {
  //       start(event) {
  //         console.log(event.type, event.target);
  //       },
  //       move(event) {
  //         if (!selectedLayout.value) return;
  //         const table = selectedLayout.value.tables.find((t) => t.uuid === uuid);
  //         if (!table) return;
  //
  //         table.position.x += event.dx;
  //         table.position.y += event.dy;
  //
  //         event.target.style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;
  //       },
  //     },
  //   });
}

function removeTable() {
  // if (currentLayout.value) {
  //   currentLayout.value.tables = currentLayout.value.tables
  //     .filter((table) => table.uuid !== currentTable.value?.uuid);
  // }
}

function removeLayout() {
//   restaurantStore.restaurant.table_views = restaurantStore.restaurant.table_views
//     .filter((layout) => layout.id !== currentLayout.value?.id);
}

function openSettings(e: MouseEvent, table: Table) {
  const diffX = Math.abs(e.pageX - startX.value);
  const diffY = Math.abs(e.pageY - startY.value);

  if (diffX < 10 && diffY < 10) {
    selectedTable.value = table;
  }
}

function exportData() {
  if (!selectedLayout.value) return;
  // const rawLayout = toRaw(currentLayout.value);
  // if (!rawLayout.tables.length) return alert('Cannot export empty layout!');
  // if (rawLayout.tables.some((table) => table.label === '' || table.chairs === 0))
  // return alert('Please fill all the required data!');
  // if (rawLayout.tables.every((t1, i, arr) => arr.some((t2) => t1.id !== t2.id
  //       && t1.position.x === t2.position.x
  //       && t1.position.y === t2.position.y))) return alert('Tables cannot overlap!');
  // console.log(rawLayout);
  restaurantStore.saveLayout(selectedLayout.value);
}

function setInitialLocation(e: MouseEvent) {
  startX.value = e.x;
  startY.value = e.y;
}

function closeDetail() {
  selectedTable.value = undefined;
}

function loadLayout(layout: Layout) {
  selectedLayout.value = restaurantStore.restaurant.table_views
    .find((tableView) => tableView.id === layout.id);
  nextTick(() => {
    selectedLayout.value?.tables.forEach((table) => {
      (document.querySelector(`#table-${table.uuid}`) as HTMLDivElement).style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;

      interact(`#table-${table.uuid}`).draggable({
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
            table.position.x += event.dx;
            table.position.y += event.dy;

            event.target.style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;
          },
        },
      });
    });
  });
}

const menuItems = computed(() => ([
  {
    label: 'Options',
    items: [
      {
        label: 'Add table',
        icon: PrimeIcons.PLUS,
        command: () => addTable(),
        disabled: !selectedLayout.value,
      },
      {
        label: 'Save',
        icon: PrimeIcons.DOWNLOAD,
        command: () => exportData(),
        active: true,
      },
    ],
  },
  {
    label: 'Layouts',
    items: [
      {
        label: 'Create Layout',
        icon: PrimeIcons.PLUS,
        command: () => {
          // const id = UUIDv4();
          // restaurantStore.restaurant.table_views.value.push({ id, name: 'New Layout', tables: [] });
          // selectedLayoutId.value = id;
        },
      },
      ...restaurantStore.restaurant.table_views.map((l) => ({
        label: l.id,
        icon: PrimeIcons.PENCIL,
        command: () => loadLayout(l),
        style: {
          backgroundColor: l.id === selectedLayout.value?.id ? '#f4f4f4' : '#fff',
        },
      })),
    ],
  },
]));
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
