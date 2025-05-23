class State {
  // keys to graphData are various quantities received from the RPi
  constructor() {
    // everytime new socket message is received, counter is incremented
    this.counter = 0;

    this.graphData = {
      // list of timestamps when data was received, goes on x-axis of plots
      time: { name: "Time", column: 1, data: [] },

      temperature: { name: "Temperature", unit: "°C", column: 3, data: [] },
      altitude: { name: "Altitude", unit: "m", column: 4, data: [] },
      acceleration: { name: "Acceleration", unit: "m/s²", column: 6, data: [] },
      velocity: { name: "Velocity", unit: "m/s", column: 7, data: [] },
      airSpeed: { name: "Air Speed", unit: "m/s", column: 8, data: [] },
      // humidity: { column: 1, data: [] },
    };

    // these quantities should be graphed
    this.GRAPH_QUANTITIES = [
      "temperature",
      "altitude",
      "acceleration",
      "velocity",
      "airSpeed",
    ];

    this.GRAPH_POINT_COUNT = 500;
    this.GRAPH_LINE_THICKNESS = 2.0;

    // create the charts
    for (const quantity of this.GRAPH_QUANTITIES) {
      let object = this.graphData[quantity];

      const canvas = document.getElementById(quantity);
      console.log(canvas);

      object.chart = new Chart(canvas, {
        type: "line",
        data: {
          labels: Array(this.GRAPH_POINT_COUNT)
            .fill("")
            .map((_, i) => i),
          datasets: [
            {
              label: object.name,
              data: [],
              borderColor: "#ff0000",
              borderWidth: this.GRAPH_LINE_THICKNESS,
              pointRadius: 0,
              // pointHoverRadius: 0,
              // fill: false,
            },
          ],
        },
        options: {
          // TODO enabling responsive makes the graphs move and shift, animate
          // probably bcoz it fits the chart to the data
          // we should explicitly specify chart size - eg 400x300 px
          responsive: false,
          animation: false,
          scales: {
            x: { type: "linear", title: { display: true, text: "Time (s)" } },
            // y: { title: { display: true, text: object.name } },
          },
        },
      });
    }
  }

  parse(input_data) {
    const elements = input_data.split(",");

    if (elements[0] == "b'S'") {
      return;
    }

    for (const [quantity, object] of Object.entries(this.graphData)) {
      object.data.push(parseFloat(elements[object.column]));
    }

    this.counter++;
  }

  updateGraphs() {
    // TODO maybe we could slice the data arrays in parse(). will reduce memory usage too

    // initially, COUNT goes from 0 to GRAPH_POINT_COUNT
    const COUNT = Math.min(this.GRAPH_POINT_COUNT, this.counter);

    // each point's x coordinate is the time when data was received
    let xy_pairs = new Array(COUNT);
    for (let i = this.counter - COUNT; i < COUNT; i++) {
      xy_pairs[i] = { x: this.graphData.time.data[i] };
    }

    // loop through the quantities which should be graphed
    for (const quantity of this.GRAPH_QUANTITIES) {
      let object = this.graphData[quantity];

      for (let i = this.counter - COUNT; i < COUNT; i++) {
        xy_pairs[i].y = object.data[i];
      }

      object.chart.data.datasets[0].data = xy_pairs;
      object.chart.update();
    }
  }
}
