<template>
  <div class="content">
    <div class="tools">
      <button @click="uploadHtml" class="btn btn-primary">上传</button>
      <button @click="cancelEdit" class="btn">取消</button>
    </div>
    <div class="editor">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { compressImage } from "@/utils/compressImage";
import { useInfoStore } from "@/stores/info";
import { useRouter } from "vue-router";
import { addInfo, updateInfo } from "@/api/info";

const infoState = useInfoStore();
const router = useRouter();
const mode = "default";
const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
const valueHtml = ref(""); // 内容 HTML

const toolbarConfig = {};
const menuConfig = {
  uploadImage: {
    async customUpload(file, insertFn) {
      // JS 语法
      // file 即选中的文件
      // 自己实现上传，并得到图片 url alt href
      // 最后插入图片
      // console.log(file);
      const limit = 512 * 1024;
      file = await compressImage(file, limit);
      if (file.size > limit) {
        alert("上传图片过大");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", (e) => {
        const url = reader.result;
        insertFn(url);
      });
    },
  },
};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: menuConfig,
};

onMounted(() => {
  setTimeout(() => {
    valueHtml.value = infoState.info;
  }, 0);
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const uploadHtml = async () => {
  // console.log(valueHtml.value);
  const id = infoState.id;
  const user = "luoluo";
  const info = valueHtml.value;
  if (id) await updateInfo(id, user, info);
  else await addInfo(user, info);
  alert("编辑成功");
  cancelEdit();
};

const cancelEdit = () => {
  infoState.setState();
  router.push("/");
};
</script>

<style scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
}

.content .editor {
  flex-grow: 1;
  overflow-y: auto;
}
</style>

<style scoped>
.content .tools {
  padding: 2rem;
}
</style>
