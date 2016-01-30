angular.module('WYA-App')
    .controller('setTimeCtrl', function($log) {
        this.mytime = new Date();

        this.hstep = 1;
        this.mstep = 15;

        this.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        this.ismeridian = true;
        this.toggleMode = function() {
            this.ismeridian = ! this.ismeridian;
        };

        this.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            this.mytime = d;
        };

        this.changed = function () {
            $log.log('Time changed to: ' + this.mytime);
        };

        this.clear = function() {
            this.mytime = null;
        };        
        
    })