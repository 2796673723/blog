<template>
  <div class="content">
    <div class="tools" @click="resetSelectedItem">
      <button @click="toEditor" class="btn btn-primary">添加</button>
      <button
        :disabled="!selectedItem"
        @click.stop="toEditor"
        :class="['btn', setBtn('primary')]"
      >
        编辑
      </button>
      <button
        :disabled="!selectedItem"
        @click="deleteItem"
        :class="['btn', setBtn('danger')]"
      >
        删除
      </button>
      <div style="float: right; display: flex">
        <input v-model="token" class="input" style="margin-right: 1rem" type="password"/>
        <button class="btn" @click="setToken">确定</button>
      </div>
    </div>
    <div class="items">
      <div
        v-for="{ id, user, info } of infoList"
        :key="id"
        :class="['item', isSelectedItem(id)]"
        @click="selectItem(id, info)"
        v-html="info"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { deleteInfo, listInfo } from "@/api/info";
import { useRouter } from "vue-router";
import { useInfoStore } from "@/stores/info";

const infoState = useInfoStore();
const router = useRouter();
const infoList = ref([]);
const token = ref("");

onMounted(async () => {
  await initList();
});

const toEditor = () => {
  router.push("/about");
};

const initList = async () => {
  infoList.value = await listInfo();
};

const selectedItem = ref(null);

const resetSelectedItem = () => {
  selectedItem.value = null;
  infoState.setState();
};
const selectItem = (id, info) => {
  selectedItem.value = id;
  infoState.setState(id, info);
};
const setBtn = (type) => `btn-${type}${!selectedItem.value ? "-disabled" : ""}`;
const isSelectedItem = (id) => (id === selectedItem.value ? "item-select" : "");

const deleteItem = async () => {
  await deleteInfo(+selectedItem.value, infoState.token);
  await initList();
};

const setToken = () => (infoState.token = token.value);
</script>

<style scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;

  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.content .items {
  flex-grow: 1;
  overflow-y: auto;
}

.content .items .item {
  border: solid 1px rgba(128, 128, 128, 0.1);
  padding: 0.5rem;
  margin: 1.5rem 1rem;
}

.content .items .item:first-child {
  margin: 0 1rem 1.5rem;
}

.content .items .item:last-child {
  margin: 1.5rem 1rem 0;
}

.content .items .item-select {
  border: solid 1px rgba(128, 128, 128, 0.1);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  margin: 1.5rem 1rem;
}
</style>

<style scoped>
.content .tools {
  padding: 1rem;
}
</style>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
