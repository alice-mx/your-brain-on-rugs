# Your Brain on Rugs

This is a side project I've been working on that uses the NeuroSky MindWave Mobile to create weird abstract art visualisations.

## How it works

The MindWave transmits a dozen or so different readings every second. These are used to power different parts of the the visualisation - for example, the overall saturation of each brush stroke or the xy coordinates of a brush.

![Example Visualisation](examples/mandela.gif)

## Getting Started/Prerequisites

You will need:

* [MindWave Mobile](https://store.neurosky.com/) - A cheap little EEG headset by NeuroSky.
* [ThinkGear Connector (v4.1.8)](http://developer.neurosky.com/docs/doku.php?id=thinkgear_connector_tgc) You will also need the ThinkGear Connector running in the background whenever you want to connect to the MindWave.

If you don't have either of these things, there is a sample set of brain data that you can use for testing or experiments.
