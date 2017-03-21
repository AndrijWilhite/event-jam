(function() {
    'use strict';

    angular
        .module("app")
        .controller("event", event);

    function event($http, toastr) {
        var vm = this;
        vm.artist = 'Event Jam';
        /*Serch query*/
        vm.found = true;
        vm.searched = true;

        function callApi() {
            $http.get('http://api.eventful.com/json/events/search?app_key=Cdn2Q3fskSrMvnMR&keywords=' + vm.artist)
                .then(function(response) {
                    vm.eventData = response.data;
                    console.log(vm.eventData)
                    vm.searched = false;

                    if (vm.eventData.events === null) {
                        vm.found = false
                    } else {
                        vm.found = true;
                    }
                })
                .catch(function(error) {
                    toastr.error('error', "FAIL: Check Cross-Origin");
                });
        }
        //Player
        vm.widgetOptions = {
            auto_play: true,
            buying: true,
            liking: true,
            download: true,
            sharing: true,
            show_artwork: true,
            show_comments: false,
            show_playcount: true,
            show_user: true,
            start_track: 0
        }


        vm.widgetIframe = document.getElementById('sc-widget');
        vm.widget = SC.Widget(vm.widgetIframe);

        vm.widget.bind(SC.Widget.Events.READY, function() {
            vm.widget.bind(SC.Widget.Events.PLAY, function() {
                vm.widget.getCurrentSound(function(currentSound) {
                    vm.artist = currentSound.user.username;
                    console.log(currentSound)
                    callApi();
                });

            });
        });




        vm.getInfo = function info() {
            vm.artist = vm.artist;

        }
        vm.changePlaylist = function change() {
            vm.widget.load(vm.URL, vm.widgetOptions);
            vm.URL = "";
        };
    }

})();
