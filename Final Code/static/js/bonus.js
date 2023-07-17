// Fetch and console log the JSON data 
d3.json(url).then(function(data){
    console.log(data);
});

// Initialize the dashboard at the start up 
function init() {

    // Use D3 to select the Dropdown 
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get the sample names and add to Dropdown 
    d3.json(url).then((data) => {
        let names = data.names;

        // Add samples to dropdown 
        names.forEach((idNum) => {
            console.log(idNum);

            dropdownMenu.append("option")
            .text(idNum)
            .property("value", idNum);
        });

        // Set the first sample from the list 
        let sample_one = names[0];

        console.log(sample_one)

        // Build the initial plot 
        buildGaugeChart(sample_one);
    });
};

// Function to build the guage chart 
function buildGaugeChart(sample) {

    // Use D3 to retrieve all of the data 
    d3.json(url).then((data) => {

        // Retrieve the metadata 
        let metadata = data.metadata;

        // Filter on the value of the sample 
        let value = metadata.filter(result => result.id == sample);

        console.log(value)

        // Get the first index of the Array 
        let valueData = value[0];

        // use Object.entries to get the key/value pairs for demographics box
         washFrequency = Object.values(valueData)[6];

        //  Set up the trace for thr gauge chart 

        let trace2 = {
            value: washFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "darkcyan", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "olive"},
                steps: [
                    {range: [0, 1], color: "lightcyan"},
                    {range: [1, 2], color: "paleturquoise"},
                    {range: [2, 3], color: "skyblue"},
                    {range: [3, 4], color:  "turquoise"},
                    {range: [4, 5], color:  "mediumturquoise"},
                    {range: [5, 6], color: "lightseagreen"},
                    {range: [6, 7], color: "steelblue"},
                    {range: [7, 8], color:  "dodgerblue"},
                    {range: [8, 9], color: "darkblue"},
                    {range: [9, 10], color: "midnightblue"},
                ],
                threshold: {
                  line: { 
                      color:"lightgreen", width: 4},
                  thickness: 0.75,
                  value: 10
                }
            } 
        };

        // Set up the Layout 
        let layout = {
            width: 420,
            height: 420, 
            margin: {t: 0, b: 0}
        };

        // Call the Plotly for gauge chart 
        Plotly.newPlot("gauge", [trace2], layout)
    });

};

// Call the initialize function 
init();



