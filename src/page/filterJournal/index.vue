<template>
  <div class="filter-journal">
    <div class="filterType bgWhite marT">
      <span class="filter-type">按发送人筛选</span>
      <div class="sendPersonList">
        <dl class="floL">
          <template v-if="sendPersonList">
            <dd v-for="( v, i ) in sendPersonList" :key="i">
              <span v-text="v.name.slice(0, 1)"></span>
              <strong v-text="v.name"></strong>
            </dd>
            <!-- <dd><span></span><strong>小李子</strong></dd>
                                <dd><span></span><strong>小李子</strong></dd>
                                <dd><span></span><strong>小李子</strong></dd>
                                <dd><span></span><strong>小李子</strong></dd>
                                <dd><span></span><strong>小李子</strong></dd>
                                <dd><span></span><strong>小李子</strong></dd>
                      <dd><span></span><strong>小李子</strong></dd>-->
          </template>
          <dd>
            <p class="floL">
              <span @click="addSendPersonFn">+</span>
            </p>
          </dd>
        </dl>
      </div>

      <div class="filterTimeRange">
        <span class="filter-type">选择时间段</span>
        <ul>
          <li>
            <div class="box alignC">
              <div class="boxFlex">开始时间:</div>
              <div @click="timeRangeFn(0)" class="select-time-btn">
                <small v-text="startTime ? startTime : '请选择'"></small>
                <p class="arrow-right"></p>
              </div>
            </div>
          </li>
          <li>
            <div class="box alignC">
              <div class="boxFlex">结束时间:</div>
              <div @click="timeRangeFn(1)" class="select-time-btn">
                <small v-text="endTime ? endTime : '请选择'"></small>
                <p class="arrow-right"></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="globalBtn bgWhite boxShadow">
      <span class="gloResetBtn" @click="resetFilter">取消</span>
      <span class="gloYesBtn" @click="sendFn">确定</span>
    </div>
  </div>
  </div>
</template>
<script>
  export default {

  }
</script>

<style scoped>
</style>