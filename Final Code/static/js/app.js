// Use the D3 library to read in samples.json
// URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON and console log it 
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashboard
function init() {

    // Use D3 to select dropdown menu 
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and add to drop down selector 
    d3.json(url).then((data) => {
        // Set variable for sample names 
        let names = data.names;

        // Add sample names to dropdown         
        names.forEach((idNum) => {
            console.log(idNum);

            dropdownMenu.append("option")
            .text(idNum)
            .property("value", idNum);
        });

        // Set first sample 
        let sampleInit = names[0];
        console.log(sampleInit);


        // Initial Plots
        buildMetadata(sampleInit);
        buildBarChart(sampleInit);
        buildBubbleChart(sampleInit);
        buildGaugeChart(sampleInit);
    });
};

// Create Function to populate MetaData 
function buildMetadata(sample) {

    // Use D3 to retrieve all the data 
    d3.json(url).then((data) => {

        // Retrieve the MetaData 
        let metadata = data.metadata;

        // Filter on value of the sample 
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        let valueData = value[0];

        // Get the first index of the Array 
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add key-value pairs to the panel 
        Object.entries(valueData).forEach(([key, value]) => {
            console.log(key, value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);

        });
    });
};

// Function to build Bar Chart 
function buildBarChart(sample) {

    // Use D3 to retrieve data 
    d3.json(url).then((data) => {

        // Retrieve the sample Data 
        let sampleInfo = data.samples;

        // Filter on the value of the Sample 
        let value = sampleInfo.filter(result => result.id == sample);

        // Get the first index in the Array 
        let valueData = value[0];

        // Get the ID's, Labels and the Values of the sample  
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the Data to the Console 
        console.log(otu_ids, otu_labels, sample_values);

        // Get top ten items and place them in Descending Order 
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        // Set up the trace for the Bar Chart 
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Set up the Layout 
        let layout = {
            title: {
              text: " <b> Top 10 OTUs </b>",
              font: {
                color: "olive",
                size: 20
              }
          }
        }

        // Call Plotly to plot the Bar Chart 
        Plotly.newPlot("bar", [trace], layout)        
    });
};

// Function for Bubble Chart 
function buildBubbleChart(sample) {

     // Use D3 to retrieve data 
    d3.json(url).then((data) => {

        // Retrieve the sample Data 
        let sampleInfo = data.samples;

        // Filter on the value of the Sample
        let value = sampleInfo.filter(result => result.id == sample);
        
        // Get the first index in the Array 
        let valueData = value[0];

        // Get the ID's, Labels, and the Values of the sample
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);


        // Set up Trace for Bubble Chart 
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: { 
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the Layout 
        let layout = {
            title: {
              text: "<b>Bacteria Per Sample</b>",
              font: {color: "mediumvioletred", size: 20}
            },
            xaxis: {title: {text: "OTU ID",
                          font: { 
                            color: "orchid",
                            size: 18
                          }}}
        };

        // Call the Plotly to plot the Bubble Chart 
        Plotly.newPlot("bubble", [trace1], layout)

    });
};

// Function to keep the dashboard updated when the sample changes 
function optionChanged(value) {

    // Log the new value 
    console.log(value);

    // Call all of the functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the Initialize Function 
init();
