
<template>
    <div class="upload">
      <label class="top" :for="id">
        <p class="label">{{label}}</p>
        <i>icon</i>
      </label>
      <input
        :id="id"
        type="file"
        class="file-input"
        :accept="type==='image'?'image/png,image/jpeg,image/jpg':'*'"
        :multiple="multiple"
        @change="onUploadFilesChange"
        style="display: none"
      >
      <div class="content">
        <ul>
          <li v-for="(file,i) in uploadFileList" :key="file.name" :class="fileItemClass(file)">
            <p>{{file.name}}</p>
            <i class="close" v-show="file.status === 'upload-success'" @click="deleteFile(i)">x</i>
          </li>
        </ul>
      </div>
    </div>
  </template>
  <script>
  /* eslint-disable */
  export default {
    name: "upload",
    props: {
      type: {
        type: String,
        default: "image"
      },
      multiple: {
        type: Boolean,
        default: true
      }
    },
    created() {
      //生成id
      console.log(this.uploadTool, "this.uploadTool");
      this.id = Date.now() + "upload";
    },
    computed: {
      label() {
        return this.type === "image" ? "图片" : "附件";
      }
    },
    data() {
      return {
        uploadFileList: [],
        uploadTool: (function() {
          let isInWork = false;
          return {
            tryUpload() {
              //当前不存在上传任务时继续下一个任务
              if (!isInWork) {
                const { uploadFileList } = this;
                const uploadI = uploadFileList.findIndex(
                  file => file.status === "not-upload"
                );
                //const {hasUploadList,uploadFileList}
                //如果文件队列中有未上传的开始上传
                if (uploadI > -1) {
                  this.upload(uploadI);
                }
              }
            },
            updateWorkStatus(v) {
              isInWork = v;
            }
          };
        })()
      };
    },
    methods: {
      fileItemClass(file) {
        return {
          ["file-item"]: true,
          ["img-type"]: this.type === "image",
          ["file-type"]: this.type === "file",
          [file.status]: true
        };
      },
      onUploadFilesChange(e) {
        const { files } = e.target;
        //将类数组转为数组
        const append = [].slice.call(files, 0).map(file => {
          file.status = "not-upload";
          return file;
        });
        this.uploadFileList = this.uploadFileList.concat(append);
        //调用上传
        this.uploadTool.tryUpload.bind(this)();
      },
  
      upload(uploadI) {
        this.updateFileStatusByIndex({
          index: uploadI,
          status: "uploading"
        });
        setTimeout(() => {
          this.updateFileStatusByIndex({
            index: uploadI,
            status: "upload-success"
          });
          this.uploadTool.updateWorkStatus(false);
          //调用上传
          this.uploadTool.tryUpload.bind(this)();
        }, 300);
      },
      updateFileStatusByIndex({ index, status }) {
        const next = [...this.uploadFileList];
        next[index].status = status;
        this.uploadFileList = next;
      },
      deleteFile(i) {
        this.uploadFileList.splice(i, 1);
      }
    }
  };
  </script>
  <style>
  div,
  label,
  i,
  p {
    margin: 0;
    padding: 0;
  }
  .upload {
    border: 1px solid red;
  }
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  li {
    list-style: none;
  }
  .img-type {
    margin: 10px;
    width: 100px;
    height: 100px;
  }
  .not-upload {
    background: rgba(0, 0, 0, 0.5);
  }
  .upload-success {
    position: relative;
  }
  .close {
    position: absolute;
    top: -10px;
    right: 0;
  }
  </style>
  
  