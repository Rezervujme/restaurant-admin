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
        class="ml-8 mr-4 mb-8"
        :model="items"
      />
      <div class="mr-8 ml-4 flex-grow">
        <div class="layout-container mb-4">
          <div
            v-for="table in tables"
            :id="`table-${table.id}`"
            :key="table.id"
            class="h-8 w-8 bg-black absolute flex justify-center items-center"
            :class="table.shape === 'circle' ? 'rounded-full' : ''"
            @mousedown="setInitialLocation"
            @mouseup="openSettings($event, table.id)"
          >
            <p class="text-white text-center">
              {{ table.chairs }}
            </p>
          </div>
          <OverlayPanel
            ref="modalRef"
          >
            <h1 class="text-2xl">
              Stôl
            </h1>
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-lg mr-8">
                Označenie:
              </h5>
              <InputText v-model="currentTable.label" />
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
              />
            </div>
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-lg mr-8">
                Počet miest:
              </h5>
              <InputNumber
                v-model="currentTable.chairs"
              />
            </div>
            <div class="flex justify-end">
              <Button
                class="p-button-danger"
                icon="pi pi-trash"
                @click="removeTable"
              />
            </div>
          </OverlayPanel>
        </div>
        <Button
          class="!mr-4 !mb-8"
          icon="pi pi-plus"
          @click="addTable"
        />
        <Button
          class="!mb-8"
          @click="exportData"
        >
          Export
        </Button>
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
import OverlayPanel from 'primevue/overlaypanel';

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
  isOverlapping: boolean
}

const modalRef = ref();

const tables = ref<Table[]>([]);

const selectedTableId = ref<string>('');

const currentTable = computed<Table|undefined>(
  () => tables.value.find((t) => t.id === selectedTableId.value),
);

const startX = ref<number>(0);
const startY = ref<number>(0);

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
    size: {
      width: 32,
      height: 32,
    },
    shape: 'square',
    label: '',
    chairs: 0,
    isOverlapping: false,
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
          const table = tables.value.find((t) => t.id === id);
          if (!table) return;

          table.position.x += event.dx;
          table.position.y += event.dy;

          if (tables.value
            .some((t) => t.id !== id
                  && t.position.x === table.position.x
                  && t.position.y === table.position.y
                  && !table.isOverlapping)) {
            table.isOverlapping = true;
            event.target.style.backgroundColor = 'red';
            event.target.style.opacity = 0.5;
          } else {
            event.target.style.backgroundColor = 'black';
            event.target.style.opacity = 1;
            table.isOverlapping = false;
          }
          event.target.style.transform = `translate(${table.position.x}px, ${table.position.y}px)`;
        },
      },
    });
}

function removeTable(e: MouseEvent) {
  modalRef.value.toggle(e);

  tables.value = tables.value.filter((table) => table.id !== currentTable.value?.id);
}

function openSettings(e: MouseEvent, tableId: string) {
  const diffX = Math.abs(e.pageX - startX.value);
  const diffY = Math.abs(e.pageY - startY.value);

  if (diffX < 10 && diffY < 10) {
    selectedTableId.value = tableId;
    modalRef.value.toggle(e);
  }
}

function exportData() {
  if (tables.value.some((table) => table.isOverlapping)) return alert('Tables cant overlap');
  const exportedData = toRaw(tables.value);
  console.log(exportedData);
}

function setInitialLocation(e: MouseEvent) {
  startX.value = e.x;
  startY.value = e.y;
}
</script>

<style scoped>
.layout-container {
  height: 48rem;
  width: 48rem;
  outline: 1px solid #DEE2E6
}
</style>
