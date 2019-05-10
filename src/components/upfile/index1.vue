
<template>
        <div class="upload">
          <label class="top" :for="id">
            <p class="label">{{label}}</p>
            <img :src="imgIcon" class="icon" alt>
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
                <!-- <img v-show="type === 'image'" :src="file.src" alt> -->
                <template v-if="type === 'file'">
                  <!-- <img :src="getIconByFile(file)" class="icon" alt> -->
                  <div class="content">
                    <p>{{file.name}}</p>
                    <p>{{getFileSize(file)}}</p>
                  </div>
                </template>
                <div :class="layerClass()">
                  <div v-show="file.status === 'uploading'" class="badge ball-clip-rotate">
                    <div></div>
                  </div>
                  <div
                    class="badge close"
                    v-show="file.status === 'upload-success'"
                    @click="deleteFile(i)"
                  >
                    <img :src="closeIcon" alt>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <script>
      /* eslint-disable */
      import closeIcon from "./close.png";
      import imgIcon from "./img.png";
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
          this.id = Date.now() + "upload";
        },
        computed: {
          label() {
            return this.type === "image" ? "图片" : "附件";
          }
        },
        data() {
          return {
            closeIcon,
            imgIcon,
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
          layerClass() {
            return {
              layer: true,
              ["img-layer"]: this.type === "image",
              ["file-layer"]: this.type === "file"
            };
          },
          getIconByFile(file) {
            //在这里判断file的类型 返回不同的图标
            return this.imgIcon;
          },
          //获取上传成功的文件列表
          getHasUploadFileList(){
            return this.uploadFileList.filter(file=>file.status === 'upload-success');
          },
          onUploadFilesChange(e) {
            const { files } = e.target;
            //将类数组转为数组
            const append = [].slice.call(files, 0).map(file => {
              file.status = "not-upload";
              if (this.type === "image") {
                //绑定图片的src
                this.bindImgSource(file);
              }
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
            }, 1000);
          },
          updateFileStatusByIndex({ index, status }) {
            const next = [...this.uploadFileList];
            next[index].status = status;
            this.uploadFileList = next;
          },
          updateFileSource({ file, src }) {
            const index = this.uploadFileList.indexOf(file);
            if (index > -1) {
              const next = [...this.uploadFileList];
              next[index].src = src;
              this.uploadFileList = next;
            }
          },
          deleteFile(i) {
            this.uploadFileList.splice(i, 1);
          },
          bindImgSource(file) {
            const reads = new FileReader();
            reads.readAsDataURL(file);
            const that = this;
            reads.onload = function(e) {
              that.updateFileSource({
                file,
                src: this.result
              });
            };
          },
          getFileSize(file) {
            return file.size + "kb";
          }
        }
      };
      </script>
      <style>
      @import "./loading.css";
      div,
      label,
      i,
      ul,
      p {
        margin: 0;
        padding: 0;
      }
      .upload {
        /* border: 1px solid red; */
      }
      .top {
        height: 50px;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .top .label {
        font-size: 20px;
        color: #000;
      }
      .top .icon {
        width: 30px;
      }
      ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      li {
        list-style: none;
        position: relative;
      }
      
      .img-type {
        margin: 10px;
        width: 100px;
        height: 100px;
      }
      .img-type img {
        display: block;
        width: 100%;
        height: 100%;
      }
      .file-type {
        width: 100%;
        height: 80px;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #ececec;
      }
      .file-type .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      
      .layer {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0;
        left: 0;
      }
      .badge {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .img-layer .badge {
        top: -10px;
        right: -10px;
      }
      .file-layer .badge {
        top: 20px;
        right: 10px;
        width: 40px;
        height: 40px;
      }
      .close img {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
      </style>
      
      