/**
 * This is a simple script to load a CSV file that contains info about academic dates, i.e.
 * events, deadlines, etc, and present them in a decent way.
 * 
 * Author: Fernando Bevilacqua <fernando.bevilacqua@uffs.edu.br>
 */

var CALENDAR = new function() {
    this.render = function(results) {
        var aItemTemplate = $('#month-item');
        console.log(results);
    };

    this.init = function() {
        var nocache = '?nocache=' + Math.random();
        Papa.parse('./data/2019/calendario-2019-02.tsv' + nocache, {
            download: true,
            header: true,
            complete: function(results) {
                CALENDAR.render(results);
            }
        });
    };
};

$(function() {
    CALENDAR.init();
});