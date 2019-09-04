/**
 * This is a simple script to load a CSV file that contains info about academic dates, i.e.
 * events, deadlines, etc, and present them in a decent way.
 * 
 * Author: Fernando Bevilacqua <fernando.bevilacqua@uffs.edu.br>
 */

var CALENDAR = new function() {
    const CALENDAR_FILE = 'calendario-2019-02.tsv';
    const DATA_URL = './data/2019/' + CALENDAR_FILE + '?nocache=' + Math.random();

    this.rawData = null;
    this.header = [];
    this.data = [];

    this.render = function() {
        var aItemTemplate = $('#month-item');

        console.log(this.data);
        console.log(this.header);
    };

    this.organizeData = function(results) {
        this.rawData = results.data.shi;
        this.header = results.data.shift();
        this.data = results.data;
    };

    this.load = function() {
        Papa.parse(DATA_URL, {
            download: true,
            header: false,
            complete: function(results) {
                CALENDAR.start(results);
            }
        });
    };

    this.start = function(results) {
        this.organizeData(results);
        this.render();
    };

    this.init = function() {
        this.load();
    };
};

$(function() {
    CALENDAR.init();
});