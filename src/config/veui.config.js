import Vue from 'vue';

import 'veui-theme-one/common.less'

import {resize} from 'veui/directives';
import toast from 'veui/managers/toast';
import Icon from 'vue-awesome/components/Icon';

import {
    Input,
    Button,
    Checkbox,
    Select,
    Form,
    Field,
    Label,
    Icon as VIcon
} from 'veui';

// global component
Vue.component('icon', Icon);
Vue.component('veui-icon', VIcon);
Vue.component('veui-button', Button);
Vue.component('veui-input', Input);
Vue.component('veui-select', Select);
Vue.component('veui-option', Option);
Vue.component('veui-checkbox', Checkbox);
Vue.component('veui-form', Form);
Vue.component('veui-label', Label);
Vue.component('veui-field', Field);

Vue.directive('veui-resize', resize);
Vue.prototype.$toast = toast;
