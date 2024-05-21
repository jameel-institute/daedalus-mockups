const pieContainerName = 'containerForPie'

const data = [{
    id: '0.0',
    parent: '',
    name: 'Total'
}, {
    id: '1.gdp',
    parent: '0.0',
    name: 'GDP'
}, {
    id: '1.edu',
    parent: '0.0',
    name: 'Education'
}, {
    id: '1.health',
    parent: '0.0',
    name: 'Life years',
    value: 4.8
},


// GDP
{
    id: '2.1',
    parent: '1.gdp',
    name: 'Closures',
    value: 0.2
},
{
    id: '2.2',
    parent: '1.gdp',
    name: 'Absences',
    value: 0.7
},

// Education
{
    id: '2.3',
    parent: '1.edu',
    name: 'Closures',
    value: 0.5
},
{
    id: '2.5',
    parent: '1.edu',
    name: 'Absences',
    value: 0.8
},

// Health
{
    id: '2.6',
    parent: '1.health',
    name: 'Infants',
    value: 0.04
},
{
    id: '2.7',
    parent: '1.health',
    name: 'Adolescents',
    value: 0.06
},
{
    id: '2.8',
    parent: '1.health',
    name: 'Working-age Adults',
    value: 1.2
},
{
    id: '2.9',
    parent: '1.health',
    name: 'Retirement-age Adults',
    value: 3.5
}

]

let chartSeries = {
    type: 'sunburst',
    data: data,
    name: 'Root',
    allowDrillToNode: true,
    borderRadius: 3,
    cursor: 'pointer',
    dataLabels: {
        format: '{point.name}',
        filter: {
            property: 'innerArcLength',
            operator: '>',
            value: 16
        },
        style: {
            fontSize: '1rem',
        }
    },
    levels: [{
        level: 1,
        levelIsConstant: false,
        dataLabels: {
            filter: {
                property: 'outerArcLength',
                operator: '>',
                value: 64
            }
        },
        levelSize: {
            unit: 'weight',
            value: 1
        }
    }, {
        level: 2,
        colorByPoint: true,
        levelSize: {
            unit: 'weight',
            value: 2
        }
    },
    {
        level: 3,
        colorVariation: {
            key: 'brightness',
            to: -0.5
        },
        dataLabels: {
            enabled: false
        },
        levelSize: {
            unit: 'weight',
            value: 2
        }
    }],
    animation: false,
}
let pieChartSettings = {
    chart: {
        options3d: {
            enabled: true
        },
        backgroundColor: 'transparent',
        style: {
            fontFamily: 'inherit'
        }
    },

    // Let the center circle be transparent
    colors: ['transparent'].concat(Highcharts.getOptions().colors),

    title: {
        text: '',
        style: {
            color: 'white'
        }
    },

    exporting: { enabled: false },

    series: [chartSeries],

    tooltip: {
        valueSuffix: '%',
        pointFormat: '<b>{point.name}</b>: {point.value:.2f}%'
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const chart = Highcharts.chart(pieContainerName, pieChartSettings);

    const overlay = document.getElementById('overlay')
    const outputsDiv = document.querySelector('#outputs')
    const container = document.getElementById(pieContainerName);

    if (!!overlay && !!outputsDiv) {
        let containerOriginalWidth;
        let containerOriginalHeight;

        const overlayOriginalBackgroundColor = overlay.style.backgroundColor;
        overlay.style.transition = "background-color 0.5s ease"
        container.style.transition = "width 0.5s ease, height 0.5s ease, left 0.5s ease, right 0.5s ease, top 0.5s ease, bottom 0.5s ease";
        container.style.position = 'fixed'
        const originalLeft = '50%'
        const originalTop = '0'
        container.style.left = originalLeft
        container.style.top = originalTop

        const focusPie = () => {
            if (container.getAttribute("data-focused") !== "true") {
                container.setAttribute("data-focused", "true");
                console.log('focus')
                // Using actual width and height rather than css attributes because (maybe?) Highcharts is deleting the original
                // css values when it copies them into its chart, so they aren't present.
                containerOriginalWidth = container.offsetWidth;
                containerOriginalHeight = container.offsetHeight;
                const newWidth = outputsDiv.offsetWidth * 0.7
                const newLeft = '1Z0%'
                // container.style.width = "1000px";
                // container.style.height = "1000px";
                container.style.left = newLeft;
                const heightOfInputs = (0 - document.getElementById('inputs').offsetHeight)
                container.style.top = `${heightOfInputs / 2}px`
                chart.setSize(newWidth, (0.8 * window.innerHeight))

                overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            }
        }

        const unfocusPie = () => {
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

        const togglePieSize = () => {
            if (container.getAttribute("data-focused") === "false") {
                unfocusPie()
            } else {
                focusPie()
            }
        }
        
        const centralAreaOfChart = container.getElementsByClassName('highcharts-series highcharts-series-0 highcharts-sunburst-series highcharts-color-0 highcharts-tracker')[0]
        centralAreaOfChart.addEventListener("click", () => {
            focusPie();
        });

        document.querySelectorAll("*").forEach(element => {
            element.addEventListener("click", (event) => {
                if (container.dataset.active === "false") {
                    return
                }

                let currentElement = event.target;
                let hasHighchartsContainer = false;
                while (currentElement) {
                    if (currentElement.classList && currentElement.classList.contains("highcharts-container")) {
                        hasHighchartsContainer = true;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
                if (!hasHighchartsContainer) {
                    unfocusPie();
                }
            });
        });

        togglePieSize();
    }
});