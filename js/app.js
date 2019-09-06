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
        var currentMonthElement = null;

        for(var i = 0; i < this.data.length; i++) {
            var item = this.data[i];
            var isNewMonth = item[1] == '' && item[2] == '';

            if (isNewMonth) {
                var monthName = item[0];
                var monthElement = $('#template-month').clone().show();

                currentMonthElement = monthElement;

                monthElement.find('.month-start h2').html(monthName);
                monthElement.appendTo('#container');
                
            } else {
                var eventElement = $('#template-item').clone().show();

                eventElement.find('.timeline-info span').html(item[0] + '(' + item[1] + ')');
                eventElement.find('.timeline-content .timeline-title').html(item[2]);
                eventElement.find('.timeline-content p').html('desc');
                
                eventElement.appendTo(currentMonthElement.find('ul.timeline'));
            }
        }
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