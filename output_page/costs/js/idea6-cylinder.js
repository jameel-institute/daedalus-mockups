

const seriesWithOneScenarios = [{
    name: 'Education',
    data: [{
    y: 0.3,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.2
        },
        {
        name: 'Closures',
        y: 0.1
        }
    ]
    }],
    dataLabels: {
    enabled: true,
    formatter: function() {
        return (this.y).toFixed(1) + '%';
    }
    }
}, {
    name: 'Life years',
    data: [2.6],
    dataLabels: {
    enabled: true,
    formatter: function() {
        return (this.y).toFixed(1) + '%';
    }
    }
}, {
    name: 'GDP',
    data: [{
    y: 0.4,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.35
        },
        {
        name: 'Closures',
        y: 0.05
        }
    ]
    }],
    dataLabels: {
    enabled: true,
    formatter: function() {
        return (this.y).toFixed(1) + '%';
    }
    }
}]

const seriesWithThreeScenarios = [{
    name: 'Education',
    data: [{
    y: 0.3,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.2
        },
        {
        name: 'Closures',
        y: 0.1
        }
    ]
    },
    {
    y: 0.2,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.05
        },
        {
        name: 'Closures',
        y: 0.15
        }
    ]
    },
    {
    y: 0.7,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.2
        },
        {
        name: 'Closures',
        y: 0.5
        }
    ]
    }
    ],
    dataLabels: {
    enabled: true,
    formatter: function() {
        return (this.y).toFixed(1) + '%';
    }
    }
}, {
    name: 'Life years',
    data: [2.6, 4.4, 3.2],
    dataLabels: {
    enabled: true,
    formatter: function() {
        return (this.y).toFixed(1) + '%';
    }
    }
}, {
    name: 'GDP',
    data: [{
    y: 0.4,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.35
        },
        {
        name: 'Closures',
        y: 0.05
        }
    ]
    },
    {
    y: 0.3,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.05
        },
        {
        name: 'Closures',
        y: 0.25
        }
    ]
    },
    {
    y: 0.2,
    breakdownData: [
        {
        name: 'Absences',
        y: 0.19
        },
        {
        name: 'Closures',
        y: 0.01
        }
    ]
    }
    ],
    dataLabels: {
    enabled: true,
    formatter: function() {
        return (this.y).toFixed(1) + '%';
    }
    }
}]

document.addEventListener('DOMContentLoaded', function () {
    const widthOfContainer = document.getElementById('container').offsetWidth

    let chartSettings = {
        chart: {
            type: 'cylinder',
            options3d: {
                enabled: true,
                alpha: 25,
                beta: 25,
                viewDistance: 20,
                depth: (widthOfContainer/2)
            },
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'inherit'
            }
        },
        exporting: { enabled: false },
        title: {
            text: ''
        },
        xAxis: {
            visible: false,
            categories: ['Scenario 1', 'Scenario 2', 'Scenario 3']
        },
        yAxis: {
            visible: false,
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<small>{point.x}</small><br/>',
            pointFormat: '<b>{series.name}: {point.y}%</b>', // + '<br/>Absences: {point.breakdownData}%',
            useHTML: true
        },
        plotOptions: {
            cylinder: {
            stacking: 'normal',
            depth: (widthOfContainer/2),
            dataLabels: {
                enabled: true,
                align: 'center',
                format: '{series.name}',
                style: {
                color: 'black',
                textOutline: '1px white',
                },
                borderWidth: '1',
                borderRadius: '5',
                backgroundColor: 'rgba(255,255,255,0.5)',
            }
            }
        },
        series: seriesWithOneScenarios,
    }

    const chart = Highcharts.chart('container', chartSettings);
})