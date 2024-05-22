let timeseriesCharts = []

document.addEventListener("DOMContentLoaded", function() {
    timeseriesContainer = document.getElementById('timeseriesContainer')

        /*
    The purpose of this demo is to demonstrate how multiple charts on the same page
    can be linked through DOM and Highcharts events and API methods. It takes a
    standard Highcharts config with a small variation for each data set, and a
    mouse/touch event handler to bind the charts together.
    */
    
    
    /**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    ['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
        timeseriesContainer.addEventListener(
            eventType,
            function (e) {
                let chart,
                    point,
                    i,
                    event;
    
                for (i = 0; i < timeseriesCharts.length; i = i + 1) {
                    chart = timeseriesCharts[i];
                    // Find coordinates within the chart
                    event = chart.pointer.normalize(e);
                    // Get the hovered point
                    point = chart.series[0].searchPoint(event, true);
    
                    if (point) {
                        point.highlight(e);
                    }
                }
            }
        );
    });
    
    /**
     * Override the reset function, we don't need to hide the tooltips and
     * crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };
    
    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    Highcharts.Point.prototype.highlight = function (event) {
        event = this.series.chart.pointer.normalize(event);
        this.onMouseOver(); // Show the hover marker
        this.series.chart.tooltip.refresh(this); // Show the tooltip
        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };
    
    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        const thisChart = this.chart;
    
        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(
                            e.min,
                            e.max,
                            undefined,
                            false,
                            { trigger: 'syncExtremes' }
                        );
                    }
                }
            });
        }
    }
    
    // Get the data. The contents of the data file can be viewed at
    Highcharts.ajax({
        url: 'https://j-idea.github.io/daedalus-mockups/samples/data/activity.json',
        // url: 'https://www.highcharts.com/samples/data/activity.json', Original data from here (faked)
        dataType: 'text',
        success: function (activity) {
    
            activity = JSON.parse(activity);
            activity.datasets.forEach(function (dataset, i) {
    
                // Add X values
                dataset.data = Highcharts.map(dataset.data, function (val, j) {
                    return [(activity.xData[j] * 100), val];
                });
    
                let plotlines = [];
                let yAxisTitle = null;
                let xAxisTitle = null;
                let plotbands = [{
                    from: 10,
                    to: 50,
                    color: 'rgba(200, 170, 213, .5)'
                },
                {
                    from: 204,
                    to: 258,
                    color: 'rgba(200, 170, 213, .8)'
                },
                {
                    from: 509,
                    to: 590,
                    color: 'rgba(200, 170, 213, .3)'
                }];
                switch (dataset.name) {
                    case 'Speed':
                        dataset.name = 'Vaccination uptake';
                        dataset.unit = '%';
                        yAxisTitle = dataset.unit;
                        plotbands = [];
                        break;
                    case 'Elevation':
                        dataset.name = 'Infections';
                        dataset.unit = '';
                        dataset.data = dataset.data.map(x => [x[0], x[1] * 1000]);
                        break;
                    case 'Heart rate':
                        dataset.name = 'Hospital occupancy';
                        dataset.unit = '';
                        dataset.data = dataset.data.map(x => [x[0], x[1] * 1000]);
                        xAxisTitle = 'Day'
                        plotlines = [{
                            color: '#FF0000',
                            width: 2,
                            value: 150000
                        }]
                        break;
                }
    
                const chartDiv = document.createElement('div');
                chartDiv.className = 'chart';
                document.getElementById('timeseriesContainer').appendChild(chartDiv);
    
                const newChart = Highcharts.chart(chartDiv, {
                    chart: {
                        marginLeft: 60, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20,
                        fontFamily: 'inherit',
                        height: 150
                    },
                    exporting: { enabled: false },
                    title: {
                        text: dataset.name,
                        align: 'left',
                        x: 50
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        title: {
                            text: xAxisTitle,
                        },
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: '{value}'
                        },
                        plotBands: plotbands
                    },
                    yAxis: {
                        title: {
                            text: yAxisTitle
                        },
                        plotLines: plotlines
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                // right aligned
                                x: (this.chart.chartWidth - this.label.width) - 30,
                                y: 16
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '18px'
                        },
                        valueDecimals: dataset.valueDecimals
                    },
                    series: [{
                        data: dataset.data,
                        name: dataset.name,
                        type: dataset.type,
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
                            valueSuffix: ' ' + dataset.unit
                        }
                    }]
                });

                timeseriesCharts.push(newChart);
            });
        }
    });
});