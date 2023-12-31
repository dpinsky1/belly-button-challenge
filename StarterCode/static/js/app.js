// // Set up URL for data
const url =
    "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise pending for obtaining JSON data from URL
const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);

// // Fetch the JSON data and console log it
d3.json(url).then(function(data){
    console.log(data);
});
// Set up variables and get data from JSON for charts 
var samples;
var meta_Data;
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_Data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta_Data[0]);
    barChart(samples[0]);
    bubbleChart(samples[0]);
});

// Viz Updater Function
function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_Data.find((item) => item.id == value);
    metaData(demographicInfo);
    
    bubbleChart(selectedId);
barChart(selectedId);
}

// MetaData Gathering Function
function metaData(demographicInfo) {
    let demography = d3.select("#sample-metadata");

    demography.html(
        `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}

// Bar Chart Function
function barChart(selectedId) {
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();
    let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0, 10).reverse();

    bar_chart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [bar_chart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}

// Bubble Chart Function
function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;

    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Pastel",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
}
