import Vue from 'vue';

const handleListeners = function (el, current, old) {
    if (el === document.body) {
        document.onscroll = function (e) {
            current && current(e, {
                scrollTop: document.body.scrollTop,
                scrollLeft: document.body.scrollLeft
            });
        };
    } else if (el.addEventListener) {
        old && el.removeEventListener('scroll', old);
        el.addEventListener('scroll', function (e) {
            current && current(e, {
                scrollTop: el.scrollTop,
                scrollLeft: el.scrollLeft
            });
        }, {passive: true});
    } else {
        old && el.detachEvent('onscroll', old);
        el.attach('onscroll', function (e) {
            e = e || window.event;
            current && current(e, {
                scrollTop: el.scrollTop,
                scrollLeft: el.scrollLeft
            });
        });
    }
};

Vue.directive('scroll', {
    bind(el, binding) {
        if (!binding.value || typeof binding.value !== 'function') {
            throw new Error('The scroll listener is not a function');
        }
        handleListeners(el, binding.value, binding.oldValue);
    },
    update(el, binding) {
        if (binding.value === binding.oldValue) {
            return;
        }
        if (!binding.value || typeof binding.value !== 'function') {
            throw new Error('The scroll listener is not a function');
        }
        handleListeners(el, binding.value, binding.oldValue);
    },
    unbind(el, binding) {
        if (binding.value && typeof binding.value === 'function') {
            if (el.removeEventListener) {
                el.removeEventListener('scroll', binding.value);
            } else {
                el.detachEvent('onscroll', binding.value);
            }
        }
    }
});
