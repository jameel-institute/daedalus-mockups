const cylinderContainerName = 'containerForCylinder'

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
    const depth = 1000
    const aVerticalDistance = '250'

    let cylinderChartSettings = {
        chart: {
            type: 'cylinder',
            options3d: {
                enabled: true,
                alpha: 25,
                beta: 25,
                viewDistance: 20,
                depth: depth
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
            align: 'right',
            itemStyle: {
                color: 'black'
            },
            borderWidth: '1',
            borderRadius: '5',
            backgroundColor: 'rgba(255,255,255,0.5)',
            // y: aVerticalDistance,
            floating: true,
            // borderColor: '#CCC',
            // borderWidth: 1,
            // shadow: false,
            layout: 'vertical',
            verticalAlign: 'middle'
        },
        tooltip: {
            headerFormat: '<small>{point.x}</small><br/>',
            pointFormat: '<b>{series.name}: {point.y}%</b>', // + '<br/>Absences: {point.breakdownData}%',
            useHTML: true
        },
        plotOptions: {
            cylinder: {
                stacking: 'normal',
                depth: depth,
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

    const chart = Highcharts.chart(cylinderContainerName, cylinderChartSettings);


    const overlay = document.getElementById('overlay')
    const outputsDiv = document.querySelector('#outputs')

    if (!!overlay && !!outputsDiv) {
        const container = document.getElementById(cylinderContainerName);
        let containerOriginalWidth;
        let containerOriginalHeight;

        const overlayOriginalBackgroundColor = overlay.style.backgroundColor;
        overlay.style.transition = "background-color 0.5s ease"
        container.style.transition = "width 0.5s ease, height 0.5s ease, left 0.5s ease, right 0.5s ease, top 0.5s ease, bottom 0.5s ease";
        container.style.position = 'fixed'
        const originalLeft = '30%'
        const originalTop = `${(0-aVerticalDistance)}px`
        container.style.left = originalLeft
        container.style.top = originalTop

        const focusCylinder = () => {
            if (container.getAttribute("data-focused") !== "true") {
                container.setAttribute("data-focused", "true");
                console.log('focus')
                // Using actual width and height rather than css attributes because (maybe?) Highcharts is deleting the original
                // css values when it copies them into its chart, so they aren't present.
                containerOriginalWidth = container.offsetWidth;
                containerOriginalHeight = container.offsetHeight;
                const newWidth = outputsDiv.offsetWidth * 0.7
                const newLeft = '10%'
                // container.style.width = "1000px";
                // container.style.height = "1000px";
                container.style.left = newLeft;
                const heightOfInputs = (0 - document.getElementById('inputs').offsetHeight)
                container.style.top = `${heightOfInputs / 2}px`
                chart.setSize(newWidth, (0.8 * window.innerHeight))

                overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            }
        }

        const unfocusCylinder = () => {
            if (container.getAttribute("data-focused") !== "false") {
                container.setAttribute("data-focused", "false");
                console.log('unfocus')
                // container.style.width = containerOriginalWidth;
                // container.style.height = containerOriginalHeight;
                container.style.left = originalLeft;
                container.style.top = originalTop;
                chart.setSize(containerOriginalWidth,containerOriginalHeight)

                overlay.style.backgroundColor = overlayOriginalBackgroundColor;
            }
        }

        const toggleCylinderSize = () => {
            if (container.getAttribute("data-focused") === "false") {
                unfocusCylinder()
            } else {
                focusCylinder()
            }
        }
        
        const centralAreaOfChartClassName = 'highcharts-series-group'
        const centralAreaOfChart = container.getElementsByClassName(centralAreaOfChartClassName)[0]
        centralAreaOfChart.addEventListener("click", () => {
            focusCylinder();
        });

        document.querySelectorAll("*").forEach(element => {
            element.addEventListener("click", (event) => {
                if (container.dataset.active === "false") {
                    return
                }


                let currentElement = event.target;
                let isInCentralAreaOfChart = false;
                while (currentElement) {
                    if (currentElement.classList && currentElement.classList.contains(centralAreaOfChartClassName)) {
                        isInCentralAreaOfChart = true;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
                if (!isInCentralAreaOfChart) {
                    unfocusCylinder();
                }
            });
        });

        toggleCylinderSize();
    }
})