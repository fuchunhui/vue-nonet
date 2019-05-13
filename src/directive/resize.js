/**
 * resize指令，备用
 */

import Vue from 'vue';
import {debounce, throttle, isObject, assign, isEqual, find, keys} from 'lodash';

const modeMap = {
    debounce,
    throttle
};

let elementResizeDetectorMaker = require('element-resize-detector');
const erd = elementResizeDetectorMaker({
    strategy: 'scroll'
});

function getNumberArg(modifiers, defaultTime) {
    let timing;
    find(keys(modifiers), key => {
        let keyNum = Number(key);
        if (!isNaN(keyNum) && keyNum >= 0 && modifiers[key]) {
            timing = keyNum;
            return true;
        }
    });
    return timing != null ? timing : defaultTime;
}

function attach(el, {value, oldValue, modifiers}) {
    let mode = find(keys(modeMap), mode => modifiers[mode]);
    let wait = getNumberArg(modifiers, 150);
    let options = {
        wait,
        mode,
        handler: value,
        leading: modifiers.leading
    };
    if (isObject(value)) {
        assign(options, value);
    }

    let fn = modeMap[options.mode];
    let cb = fn
        ? fn(options.handler, options.wait, options.leading)
        : options.handler;

    if (!oldValue) {
        el._resizeHandler = cb;
        erd.listenTo(el, cb);
    } else {
        let oldOptions = {
            wait,
            mode,
            handler: oldValue,
            leading: modifiers.leading
        };

        if (isObject(oldValue)) {
            assign(oldOptions, oldValue);
        }

        let changed = isEqual(oldValue, options);
        if (changed) {
            let oldCb = el._resizeHandler;
            erd.removeListener(el, oldCb);
            el._resizeHandler = cb;
            erd.listenTo(el, cb);
        }
    }
}

function clear(el) {
    erd.removeListener(el, el._resizeHandler);
}

Vue.directive('resize', {
    inserted: attach,
    componentUpdated: attach,
    unbind: clear
});
