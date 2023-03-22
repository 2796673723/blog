import { defineStore } from "pinia";

export const useInfoStore = defineStore("infoState", {
  state: () => ({ id: null, info: "" }),
  actions: {
    setState(id = null, info = "") {
      this.id = id;
      this.info = info;
    },
  },
});
