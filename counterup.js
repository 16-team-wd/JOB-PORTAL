/*!
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
(function($) {
    "use strict";
    $.fn.counterUp = function(options) {
        var settings = $.extend({
            'time': 400,
            'delay': 10
        }, options);
        return this.each(function() {
            var $this = $(this);
            var $settings = settings;
            var counterUpper = function() {
                var nums = [];
                var divisions = $settings.time / $settings.delay;
                var num = $this.text();
                var isComma = /[0-9]+,[0-9]+/.test(num);
                num = num.replace(/,/g, '');
                var isInt = /^[0-9]+$/.test(num);
                var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
                var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
                for (var i = divisions; i >= 1; i--) {
                    var newNum = parseInt(num / divisions * i);
                    if (isFloat) {
                        newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                    }
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }
                    }
                    nums.unshift(newNum);
                }
                $this.data('counterup-nums', nums);
                $this.text('0');
                var f = function() {
                    $this.text($this.data('counterup-nums').shift());
                    if ($this.data('counterup-nums').length) {
                        setTimeout($this.data('counterup-func'), $settings.delay);
                    } else {
                        delete $this.data('counterup-nums');
                        $this.data('counterup-nums', null);
                        $this.data('counterup-func', null);
                    }
                };
                $this.data('counterup-func', f);
                setTimeout($this.data('counterup-func'), $settings.delay);
            };
            $this.waypoint(counterUpper, {
                offset: '100%',
                triggerOnce: true
            });
        });
    }
    ;
}
)(jQuery);
