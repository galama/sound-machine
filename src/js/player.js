define([
    'jquery'
], function($) {
    'use strict';

    var _sequence = "";
    var seqInterval = null;
    var context;

    var buffers = {
        kick: null,
        snare: null,
        closehh: null,
        openhh: null,
        tom1: null,
        tom2: null,
        tom3: null
    };

    var kick = function (vel) {
        playSound(buffers.kick, vel);
    };

    var snare = function (vel) {
        playSound(buffers.snare, vel);
    };


    var closehh = function (vel) {
        playSound(buffers.closehh, vel);
    };


    var openhh = function (vel) {
        playSound(buffers.openhh, vel);
    };


    var tom1 = function (vel) {

    };


    var tom2 = function (vel) {

    };


    var tom3 = function (vel) {

    };

    function playSound(buffer,vel) {

        if (vel == 0) {
            return;
        }

        var source = context.createBufferSource();
        var gainNode = context.createGain();

        source.buffer = buffer;

        source.connect(gainNode);
        gainNode.gain.value = vel;

        gainNode.connect(context.destination);

        source.start(0);
    }


    function loadSound(buf,url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) {
                buffers[buf] = buffer;
            }, function () {
                console.log('error!');
            });
        };
        request.send();
    }

    var player = {
        state: undefined,
        states: {
            playing: {
                initialize: function(target) {
                    this.target = target;
                },
                enter: function() {
                    console.log('setting up the playing state');
                },
                execute: function() {
                    //console.log(_sequence);
                    console.log('playing!');

                    var i = 0;
                    var bpm = $("#bpm");
                    var bmpms = 60000 / bpm.val();

                    kick(_sequence.kick[i]);
                    snare(_sequence.snare[i]);
                    closehh(_sequence.closehh[i]);
                    openhh(_sequence.openhh[i]);
                    tom1(_sequence.tom1[i]);
                    tom2(_sequence.tom2[i]);
                    tom3(_sequence.tom3[i]);
                    i++;

                    seqInterval = setInterval(function () {

                        kick(_sequence.kick[i]);
                        snare(_sequence.snare[i]);
                        closehh(_sequence.closehh[i]);
                        openhh(_sequence.openhh[i]);
                        tom1(_sequence.tom1[i]);
                        tom2(_sequence.tom2[i]);
                        tom3(_sequence.tom3[i]);
                        i++;

                        if (i === 7) {
                            i = 0;
                        }

                    }, bmpms);

                },
                play: function() {
                    console.log('already playing!');
                },
                stop: function() {
                    this.target.changeState(this.target.states.stopping);
                },
                pause: function() {
                    this.target.changeState(this.target.states.pausing);
                },
                exit: function() {
                    console.log('tearing down the playing state');
                }
            },
            stopping: {
                initialize: function(target) {
                    this.target = target;
                },
                enter: function() {
                    console.log('setting up the stopping state');
                },
                execute: function() {
                    console.log('stopping!');
                    window.clearInterval(seqInterval);
                },
                play: function() {
                    this.target.changeState(this.target.states.playing);
                },
                stop: function() {
                    console.log('already stopped!');
                },
                pause: function() {
                    this.target.changeState(this.target.states.pausing);
                },
                exit: function() {
                    console.log('tearing down the stopping state');
                }
            },
            pausing: {
                initialize: function(target) {
                    this.target = target;
                },
                enter: function() {
                    console.log('setting up the pausing state');
                },
                execute: function() {
                    console.log('pausing!');
                },
                play: function() {
                    this.target.changeState(this.target.states.playing);
                },
                stop: function() {
                    this.target.changeState(this.target.states.stopping);
                },
                pause: function() {
                    console.log('already paused!');
                },
                exit: function() {
                    console.log('tearing down the pausing state!');
                }
            }
        },
        initialize: function() {
            this.states.playing.initialize(this);
            this.states.stopping.initialize(this);
            this.states.pausing.initialize(this);
            this.state = this.states.stopping;

            try {
                window.AudioContext = window.AudioContext||window.webkitAudioContext;
                context = new AudioContext();
            }
            catch(e) {
                alert('Web Audio API is not supported in this browser');
            }


            loadSound("kick", "sounds/k.wav");
            loadSound("snare", "sounds/s.wav");
            loadSound("closehh", "sounds/chh.wav");
            loadSound("openhh", "sounds/ohh.wav");

        },
        play: function(sequence) {
            _sequence = sequence;
            this.state.play();
        },
        stop: function() {
            this.state.stop();
        },
        pause: function() {
            this.state.pause();
        },
        changeState: function(state) {
            if (this.state !== state) {
                this.state.exit();
                this.state = state;
                this.state.enter();
                this.state.execute();
            }
        }
    };

    return player;
});