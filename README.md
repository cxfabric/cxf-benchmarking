cxf-benchmarking
================

_flowTester_: a flow testing and benchmarking tool for the CXF platform
-----------------------------------------------------------------------

The _flowTester_ is an automated test tool for invoking the REST trigger(s) of designated CXF flow(s), in a particular order, concurrently, and spaced apart by configured time intervals. The tool can attach a configured request payload and determines flow success based on configured flow results. In its simplest configuration, the _flowTester_ can invoke just one flow. In a more complex configuration, the _flowTester_ might invoke a designated flow 5 times concurrently, repeat this batch 10 times, then wait for 10 seconds, then invoke the flow 15 times concurrently, repeat this batch 10 times, etc.

Prerequisites
-------------

You need to have Node.js version 18.19.1 or higher installed. You will also need NPM version 9.2.0 or higher.

In this directory, run _npm install_. If the install succeeds, you are ready to run _flowTester_.

Usage
-----

The _flowTester_ has a configuration _config.js_. This file contains a JavaScript object with one or more alternative configurations. Each of these configurations has a _name_, and the _config.js_ has an _activeConfiguration_ property that points to the configuration _name_ that we want the _flowTester_ to execute. By changing the _activeConfiguration_, we can quickly switch back and forth between different configurations.

