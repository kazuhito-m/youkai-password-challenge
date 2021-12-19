import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

/**
 * 本システムのアイコンのエイリアス。
 * 
 * TODO が、動かない。いつかうごかせるようにする。
 */
export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default
        values: {
            company: 'mdi-office-building-outline',
        },
    },
})