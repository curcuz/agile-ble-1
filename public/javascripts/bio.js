$(function () {
    $('#container').highcharts({
        chart: {
            type: 'spline',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Real-time Oximeter Measurement'
        },
        subtitle: {
            text: 'Status: Offline'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                "format": "{value:%H:%M:%S}"
            }
        },
        yAxis: {},
        plotOptions: {
            spline: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Pulse'
            //data: data.pulse
        }, {
            name: 'SpO2'
            //data: data.spO2
        }]
    });
});

function requestData() {
    $.getJSON('./bio/data', function (data) {
        var chart = $('#container').highcharts();
        var s1 = [];
        var s2 = [];
        for (var i = 0; i < data.date.length; i++) {
            s1[i] = [Date.parse(data.date[i]), data.pulse[i], data.SpO2[i]];
            s2[i] = [Date.parse(data.date[i]), data.SpO2[i]];
        }

        //update to addPoint

        chart.series[0].setData(s1, false); //(point, true, shift);
        chart.series[1].setData(s2, false); //(point, true, shift);
        chart.setTitle(null, {'text': data.status}, false);
        chart.redraw();

//        }
        // call it again after one second
        setTimeout(requestData, 1000);
    });
}

