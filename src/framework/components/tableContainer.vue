<template>
  <div class="activity-layout-table-container">
    <header>
      <span
        v-if="title"
        class="title"
      >{{ title }}</span>
      <slot
        v-if="showSubBtn"
        name="subBtn"
      >
        <div
          style="display: flex"
          class="inputStyle"
        >
          <el-input
            v-if="inputShow"
            v-model="keywords"
            :placeholder="placeholderText"
            suffix-icon="el-icon-search"
            class="input-search-style-wrapper"
            @change="handleChange"
          >
            <!-- <i
              slot="suffix"
              class="el-input__icon el-icon-search"
              style="line-height: 46px;"
            ></i> -->
          </el-input>

          <el-select
            v-if="selectShow"
            v-model="selectedKeyValue"
            :loading="selectLoading"
            :placeholder="placeholderText"
            @change="selectOption"
          >
            <el-option
              v-for="item of options"
              :key="item.key"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>

          <el-button
            v-if="subBtnText4"
            :loading="subBtn4Loading"
            type="primary"
            size="medium"
            @click="onClickSub4"
          >{{ subBtnText4 }}</el-button>

          <el-button
            v-if="subBtnText"
            type="primary"
            size="medium"
            @click="onClickSub"
          >{{ subBtnText }}</el-button>

          <el-upload
            v-if="subBtnText2"
            :show-file-list="false"
            :on-success="onUploadSuccess"
            :on-error="onUploadError"
            :headers="{
              Authorization: `Bearer ${token}`
            }"
            :action="`${url}${id}`"
            class="upload"
            style="display:inline-block"
            accept=".xls, .xlsx"
          >
            <el-button
              type="primary"
              size="medium"
            >{{ subBtnText2 }}</el-button>
          </el-upload>

          <el-button
            v-if="subBtnText3"
            :style="isDelete ? 'background: #ff808b;box-shadow: 0px 0px 5px 0px rgba(255,128,139,0.50);color:#FFFFFF' : ''"
            size="medium"
            @click="onClickSub3"
          >{{ subBtnText3 }}</el-button>

        </div>
      </slot>
    </header>
    <main v-loading="loading">
      <div
        v-if="tabShow"
        class="tabBox"
      >
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="(item, index) of tabsArr"
            :key="index"
            :label="item.label"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    btnText: {
      type: [String, Number],
      default: '下一步'
    },
    btnLoading: {
      type: Boolean,
      default: false
    },
    subBtnText: {
      type: [String, Number],
      default: ''
    },
    showSubBtn: {
      type: Boolean,
      default: false
    },
    subBtnText2: {
      type: [String, Number],
      default: ''
    },
    btnShow: {
      type: Boolean,
      default: false
    },
    subBtnText3: {
      type: [String, Number],
      default: ''
    },
    showSubBtn3: {
      type: Boolean,
      default: false
    },
    subBtnText4: {
      type: [String, Number],
      default: ''
    },
    subBtn4Loading: {
      type: Boolean,
      delete: false
    },
    id: {
      type: [String, Number],
      default: '0'
    },
    token: {
      type: String,
      default: '0'
    },
    url: {
      type: String,
      default: ''
    },
    inputShow: {
      type: Boolean,
      default: false
    },
    selectShow: {
      type: Boolean,
      default: false
    },
    placeholderText: {
      type: String,
      default: ''
    },
    selectedKey: {
      type: [String, Number],
      default: ''
    },
    selectLoading: {
      type: Boolean,
      default: false
    },
    tabShow: {
      type: Boolean,
      default: false
    },
    tabsArr: {
      type: Array,
      default: function () {
        return []
      }
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      activeName: '',
      keywords: '',
      selectedKeyValue: this.selectedKey
    }
  },
  watch: {
    tabsArr: {
      handler(newValue) {
        // this.tabsArr = newValue
        if (newValue.length > 0) {
          this.activeName = newValue[0].name
        }
      },
      deep: true
    },
    selectedKey: {
      handler(newValue) {
        this.selectedKeyValue = newValue
      },
      deep: true
    }
  },
  methods: {
    uploadFileMethod(param) {
      console.log(param)
      const fileObject = param.file
      const formData = new FormData()
      formData.append('file', fileObject)
      this.$api('oklife.batchSend.send', formData).then(res => {
        console.log(res)
        console.log(res.message)
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      })
        .catch(err => {
          console.log(err)
          console.log(err.message)
        })
      this.$emit('uploadFileMethod')
    },
    onClickSub() {
      this.$emit('click-sub-button')
    },
    onClickSub3() {
      this.$emit('click-onClickSub3')
    },
    onClickSub4() {
      this.$emit('click-onClickSub4')
    },
    onUploadSuccess(res) {
      this.$emit('onUploadSuccess', res)
    },
    onUploadError(res) {
      this.$emit('onUploadError', res)
    },
    handleChange(value) {
      this.keywords = value
      this.$emit('search-keywords', this.keywords)
    },
    selectOption(val) {
      this.selectedKeyValue = val
      this.$emit('select-option', this.selectedKeyValue)
    },
    handleClick(tab) {
      this.activeName = tab.name
      this.$emit('change-tab', this.activeName)
    }
  }
}
</script>

<style lang="scss">
.activity-layout-table-container {
  height: 100%;
  padding: 20px 15px;
  .title {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #3c4476;
  }
  .deleteStyle {
    height: 35px;
    opacity: 1;
    background: #ff808b;
    border-radius: 19px;
    box-shadow: 0px 0px 5px 0px rgba(255, 128, 139, 0.5);
  }
  background: #f0f2f5;
  & > header {
    font-size: 19px;
    line-height: 26px;
    color: #3c4476;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-button {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .tabBox {
    min-width: 964px;
    height: 45px;
    opacity: 1;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0px 0px 5px 0px rgba(162, 168, 195, 0.4);
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: blue;
    height: 40px;
    opacity: 1;
    background: linear-gradient(134deg, #019cff 2%, #006cff);
    box-shadow: 0px 0px 5px 0px rgba(57, 158, 252, 0.49);
    border-radius: 18px;
    color: white;
    letter-spacing: 2px;
  }
  .el-tabs--card > .el-tabs__header {
    border-bottom: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
    margin-left: 5px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    height: 40px;
    border-bottom: none;
    color: #c2cbd6;
    border-left: none;
    border-right: none;
    letter-spacing: 2px;
    text-align: center;
  }
  .el-tabs__nav-scroll {
    height: 43px;
    line-height: 43px;
  }
  .activity-layout-table-container
    .el-tabs--card
    > .el-tabs__header
    .el-tabs__nav {
    height: 43px;
    line-height: 43px;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
    border-bottom: none;
    height: 40px;
    line-height: 47px;
  }
  .inputStyle {
    .el-input__inner {
      width: 229px;
      height: 40px;
      opacity: 1;
      background: #ffffff;
      border-radius: 19px;
      box-shadow: 0px 0px 5px 0px rgba(162, 168, 195, 0.4);
    }
    .el-input__inner::placeholder {
      font-size: 12px;
      font-weight: 400;
      color: #c2cbd6;
      letter-spacing: 1px;
    }
  }
  .el-button {
    height: 40px;
    opacity: 1;
    /* background: linear-gradient(134deg, #019cff 2%, #006cff); */
    border-radius: 21px;
    padding: 10px 28px;
    /* box-shadow: 0px 0px 5px 0px rgba(57, 158, 252, 0.49); */
  }
  & > main {
    padding: 18px 0;
    .filter-box {
      background: #fafafa;
      padding: 10px;
      margin-bottom: 15px;
      & > .el-radio-group {
        float: left;
        margin-right: 15px;
      }
      & > .el-input {
        float: left;
        margin-right: 15px;
        width: unset;
      }
      & > .el-date-editor {
        float: left;
        margin-right: 15px;
        width: unset;
      }
      & > .el-button {
        float: left;
      }
    }
    .el-table {
      margin-bottom: 18px;
      padding: 18px;
      border-radius: 12.5px;
      box-shadow: 0px 0px 5px 0px rgba(162, 168, 195, 0.4);
      color: #49517d;
      thead > tr > th {
        background: #f8f9fa;
      }
      thead {
        color: #49517d;
        font-weight: 500;
      }
      .status-box {
        display: flex;
        align-items: center;
        justify-content: center;
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 4px;
          &-1 {
            background-color: #0d77d1;
          }
          &-3 {
            background-color: #ffbf00;
          }
          &-5 {
            background-color: #00a854;
          }
          &-7 {
            background-color: #bfbfbf;
          }
          &-9 {
            background-color: #f04134;
          }
        }
      }
      .actions-box {
        a {
          font-size: 12px;
        }
      }
    }
    .el-pagination {
      padding: 8px 17px;
    }
    .el-pagination.is-background .el-pager li {
      border-radius: 40px;
      margin: 0 5px;
      background-color: white;
      color: #d5d5d5;
      border: 1px solid rgba(151, 151, 151, 0.4);
      /* min-width: 28px; */
      line-height: 28px;
    }
    .el-pagination.is-background .el-pager li:hover {
      border-radius: 40px;
      margin: 0 5px;
      background-color: white;
      color: var(--el-color-primary);
      border: 1px solid var(--el-color-primary);
      /* min-width: 28px; */
      line-height: 28px;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev {
      background-color: white;
      color: #d5d5d5;
      border-radius: 30px;
      border: 1px solid rgba(151, 151, 151, 0.4);
      /* min-width: 28px; */
      line-height: 40px;
    }
    .el-pagination.is-background .btn-prev:disabled,
    .el-pagination.is-background .btn-next:disabled {
      border-radius: 20px;
      background-color: white;
      color: #979797;
      border: 1px solid rgba(151, 151, 151, 0.4);
      /* min-width: 28px; */
      line-height: 43px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #0279ff;
      color: #fff;
      border: 1px solid #0279ff;
    }
    .el-table td {
      // padding: 6px 0;
    }
    .el-pagination__jump {
      margin-right: 5px;
    }
    .el-pagination {
      background-color: white;
      height: 43px;
      border-radius: 20px;
      line-height: 43px;
      float: right;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
    }
    .activity-layout-table-container > main .el-table {
      min-width: 964px;
      opacity: 1;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0px 0px 5px 0px rgba(162, 168, 195, 0.4);
    }
    .el-table__footer-wrapper,
    .el-table__header-wrapper {
      border-radius: 33px;
    }
  }
}
</style>
