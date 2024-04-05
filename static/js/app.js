// Get the samples endpoint
const sample = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data and console log it
let data = d3.json(sample).then(function(data)
  {init(data);}
);

//var yticks = data.otu_ids.slice(0,10).reverse()

function init(data) {

  // get the top 10 OTUs for the individual
  var yticks = data.samples[0].otu_ids.slice(0,10);
  for (i =0; i<10; i++) {
    yticks[i] = "OTU " + yticks[i];
  }

  let barData= [{
    y: data.samples[0].sample_values,
    x: yticks,
    text: data.samples[0].otu_labels,
    type: "bar"
  }];

  let barLayout = {
    height: 600,
    width: 800
  };

  let bubbleData = [{
    x: data.samples[0].otu_ids,
    y: data.samples[0].sample_values,
    text: data.samples[0].otu_labels,
    mode: 'markers',
    marker: {
      color: data.samples[0].otu_ids,
      size: data.samples[0].sample_values,
    }
  }];
  
  let bubbleLayout = {
    height: 500,
    width: 1200
  };

  let metadata = data.metadata[0];
  console.log(metadata);

  Plotly.newPlot("bar", barData, barLayout);
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {

  let dropdownMenu = d3.select("#selDataset");
  let selection = dropdownMenu.property("value");

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf=
  var result = data.samples.find(samples => samples.id === selection);
  
  barData= [{
    y: result.sample_values,
    x: yticks,
    text: result.otu_labels,
    type: "bar"
  }];

  bubbleData = [{
    x: result.otu_ids,
    y: result.sample_values,
    text: result.otu_labels,
    mode: 'markers',
    marker: {
      color: result.otu_ids,
      size: result.sample_values,
    }
  }];

// Call function to update the chart
  updatePlotly(barData, bubbleData);
}

// Update the restyled plot's values
function updatePlotly(barData, bubbleData) {
  Plotly.restyle("bar", "values", barData);
  Plotly.restyle("bubble", "values", bubbleData);
}
