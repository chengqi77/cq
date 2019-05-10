<template>
  <img :src="checked ? checkedIcon : uncheckedIcon" class="checked" alt>
</template>
<script>
import checkedIcon from "./img/checked.png";
import uncheckedIcon from "./img/unchecked.png";
export default {
  name: "checked",
  props: ["checked"],
  data() {
    return {
      checkedIcon,
      uncheckedIcon
    };
  }
};
</script>
<style scope>
.checked {
  width: 25px;
  height: 25px;
}
</style>
