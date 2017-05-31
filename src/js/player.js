define([
    'jquery',
    'tone'
], function($,Tone) {
    'use strict';

    var _sequence = "";
    var seqInterval = null;
    var context;

    var buffers = {
        kick: null,
        snare: null,
        clap: null,
        closehh: null,
        openhh: null,
        rim: null,
        tom: null,
        sound1:null,
        sound2:null
    };

    var kick = function (vel) {
        buffers.kick.triggerAttack(0, "+0.1", vel);
    };

    var snare = function (vel) {
        buffers.snare.triggerAttack(0, "+0.1", vel);
    };

    var clap = function (vel) {
        buffers.clap.triggerAttack(0, "+0.1", vel);
    };

    var closehh = function (vel) {
        buffers.closehh.triggerAttack(0, "+0.1", vel);
    };


    var openhh = function (vel) {
        buffers.openhh.triggerAttack(0, "+0.1", vel);
    };


    var rim = function (vel) {
        buffers.rim.triggerAttack(0, "+0.1", vel);
    };


    var tom = function (vel) {
        buffers.tom.triggerAttack(0, "+0.1", vel);
    };


    var sound1 = function(pitch) {
        buffers.sound1.triggerAttack(pitch, "+0.1", pitch);
    };

    var sound2 = function(pitch) {
        buffers.sound2.triggerAttack(pitch, "+0.1", pitch);
    };


    function loadSound(buf,url) {
        buffers[buf] = new Tone.Sampler(url, function () {
            console.log('sound: "' + url + '", loaded!');
        }).toMaster();
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
                    console.log('playing!');

                    var i = 0;
                    var bpm = $("#bpm");
                    var bmpms = 60000 / bpm.val();

                    kick(_sequence.kick[i]);
                    snare(_sequence.snare[i]);
                    clap(_sequence.clap[i]);
                    closehh(_sequence.closehh[i]);
                    openhh(_sequence.openhh[i]);
                    rim(_sequence.rim[i]);
                    tom(_sequence.tom[i]);
                    sound1(_sequence.sound1[i]);
                    sound2(_sequence.sound2[i]);

                    i++;

                    seqInterval = setInterval(function () {

                        kick(_sequence.kick[i]);
                        snare(_sequence.snare[i]);
                        clap(_sequence.clap[i]);
                        closehh(_sequence.closehh[i]);
                        openhh(_sequence.openhh[i]);
                        rim(_sequence.rim[i]);
                        tom(_sequence.tom[i]);
                        sound1(_sequence.sound1[i]);
                        sound2(_sequence.sound2[i]);

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

            loadSound("kick", "./sounds/k.wav");
            loadSound("snare", "./sounds/s.wav");
            loadSound("clap", "./sounds/c.wav");
            loadSound("closehh", "./sounds/hh.wav");
            loadSound("openhh", "./sounds/ohh.wav");
            loadSound("rim", "./sounds/r.wav");
            loadSound("tom", "./sounds/t.wav");
            loadSound("sound1", "./sounds/melo1.wav");
            loadSound("sound2", "./sounds/melo2.wav");

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