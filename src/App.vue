<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
</style>

<style>
.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1rem;
}
.btn-primary {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.btn-primary-disabled {
  cursor: not-allowed;
  color: #8cc5ff;
  background-color: #ecf5ff;
  border-color: #d9ecff;
}

.btn-danger {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}

.btn-danger-disabled {
  cursor: not-allowed;
  color: #f9a7a7;
  background-color: #fef0f0;
  border-color: #fde2e2;
}
</style>

<style>
.input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
</style>
