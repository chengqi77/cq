<template>
        <div>
                <mt-tabbar v-model="selected">
                        <mt-tab-item id="tab1">
                          <img slot="icon" src="../assets/100x100.png">
                          tab1
                        </mt-tab-item>
                        <mt-tab-item id="tab2">
                          <img slot="icon" src="../assets/100x100.png">
                          tab2
                        </mt-tab-item>
                        <mt-tab-item id="tab3">
                          <img slot="icon" src="../assets/100x100.png">
                          tab3
                        </mt-tab-item>
                        <mt-tab-item id="tab4">
                          <img slot="icon" src="../assets/100x100.png">
                          tab4
                        </mt-tab-item>
                      </mt-tabbar>
        </div>
    </template>
    <script>
        import { Tabbar, TabItem } from 'mint-ui';
    </script>