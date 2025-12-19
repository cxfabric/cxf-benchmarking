import axios from 'axios';
import { Base64 } from 'js-base64';
import { v4 as uuidv4 } from 'uuid';
import config from './config.js';
import fs from 'node:fs';
import { setTimeout } from "node:timers/promises";
import format from "date-format";

const ALL_CONFIGS = config,
    EMPTY = /^[\s'"]*$/,
    VERBOSITY_LEVELS = new Set([ 'high', 'low', 'none' ]),
    DOT_OUTPUT_EVERY = 100,
    NOW = Date.now();

var activeConfig,
    verbosity,
    dotOutputs = 0;

function getCurrentTime()
{
    return format.asString().replace('T', ' ');
}

function logEvent(logEntry, eventCategory, fileDescriptor, overrideVerbosity = false)
{
    let timestamp;

    if (eventCategory === 'info')
    {
        if (overrideVerbosity || verbosity !== 'none')
        {
            console.info(`\x1b[32m[INFO]\x1b[0m ${logEntry}`);
            if (fileDescriptor)
                fs.writeSync(fileDescriptor, `[INFO] ${logEntry}\n`);
        }
        else if (dotOutputs++ % DOT_OUTPUT_EVERY === 0)
            console.info('.');
    }
    else if (eventCategory === 'error')
    {
        timestamp = getCurrentTime();
        console.error(`\x1b[31m[ERROR]\x1b[0m ${timestamp} ${logEntry}\x1b`);
        if (fileDescriptor)
            fs.writeSync(fileDescriptor, `[ERROR] ${timestamp} ${logEntry}\n`);
    }
    else
    {
        timestamp = getCurrentTime();
        console.warn(`\x1b[33m[WARN]\x1b[0m ${timestamp} ${logEntry}\x1b`);
        if (fileDescriptor)
            fs.writeSync(fileDescriptor, `[WARN] ${timestamp} ${logEntry}\n`);
    }
}

function makeRequestBody(numRequests)
{
    return {
        ...activeConfig.INPUT,
        sessionId: uuidv4(),
        label: `Request ${numRequests}`
    };
}

function matchesExpectedObject(flowUrl, fileDescriptor, path, obj, expectedObj, response)
{
    let objKeys;

    if (!expectedObj)
        return 2;

    if (typeof obj === 'object')
        if (Array.isArray(obj))
            if (obj.every((element, index) => matchesExpectedObject(flowUrl, fileDescriptor, `${path}[${index}]`, element, expectedObj[index]) === 2 ), response)
                return 2;
            else return 1;        
        else
        {
            objKeys = new Set(Object.keys(obj));
            if (objKeys.isSupersetOf(new Set(Object.keys(expectedObj))))
            {
                for (const [ key, value ] of Object.entries(obj))
                {
                    if (matchesExpectedObject(flowUrl, fileDescriptor, `${path}.${key}`, value, expectedObj[key]) < 2, response)
                        return 1;        
                }
                return 2;
            }
            else
            {
                logEvent(`  Flow invocation successful but flow execution error for flow ${flowUrl}: flow response ${JSON.stringify(response)} object properties path "${path}" value "${JSON.stringify(obj)}" does not contain all properties expected in "${JSON.stringify(expectedObj)}"`, 'warn', fileDescriptor);
                return 1;        
            }
        }
    
    if (typeof obj === 'string')
        if (new RegExp(expectedObj).test(obj))
            return 2;
        else
        {
            logEvent(`  Flow invocation successful but flow execution error for flow ${flowUrl}: flow response ${JSON.stringify(response)} object properties path "${path}" value "${obj}" does not correspond to expected pattern "${expectedObj}"`, 'warn', fileDescriptor);
            return 1;        
        }

    if (obj === expectedObj)
        return 2;

    logEvent(`  Flow invocation successful but flow execution error for flow ${flowUrl}: flow response ${JSON.stringify(response)} object properties path "${path}" value "${obj}" does not have expected value "${expectedObj}"`, 'warn', fileDescriptor);
    return 1;     
}

function processResponse(response, flowUrl, fileDescriptor) 
{
    if (response.status === 200)
    {
        if (verbosity === 'high')
            logEvent(`  Response = ${JSON.stringify(response.data)} for flow ${flowUrl}`, 'info', fileDescriptor);
        if (response.data)
            return matchesExpectedObject(flowUrl, fileDescriptor, '', response.data, activeConfig.RESPONSE, response.data);
        else 
        {
            logEvent(`  Flow invocation successful but flow execution error for flow ${flowUrl}: no response payload or response payload is not a JSON object`, 'warn', fileDescriptor);
            return 1;
        }
    }
    logEvent(` Flow invocation error ${errorMessage}`, 'error', fileDescriptor);
    return 0;
}

async function sendToEsa(esaUrl, analysisId, entityId, event, userName, password, showResponse, fileDescriptor) 
{
    const requestOptions = 
    {
        headers: { 'Content-Type': 'application/json', Authorization: 'Basic ' + Base64.encode(userName + ':' + password) },
        timeout: 30000
    };

    let response = null;

    if (!esaUrl.endsWith('/'))
        esaUrl = esaUrl + '/';
    esaUrl = `${esaUrl}eventAnalysis?analysisPipelines=${encodeURIComponent(entityId + ',' + analysisId)}`;

    if (verbosity === 'high')
        logEvent(`FlowStats connector configuration: target URL = ${esaUrl}, request configuration = ${JSON.stringify(requestOptions)}, request body = ${JSON.stringify(event)}`, 'info', fileDescriptor);

    try 
    {
        response = await axios.post(esaUrl, event, requestOptions);
        if (response.status >= 400)
            logEvent(`Response status: ${response.status} - error detail: ${JSON.stringify(response.data)}`, 'warn', fileDescriptor);
        else if (showResponse)
            logEvent(`ESA response: ${JSON.stringify(response.data)}`, 'info', fileDescriptor);
    } catch (error) 
    {
        logEvent(`ESA response error: ${error.message}`, 'error', fileDescriptor);
    }
};

async function oneFlowTest(axiosClient, flowUrl, requestOptions, stats, fileDescriptor, reportToEsa)
{
    let now,
        response,
        responseClassification;
    
    try
    {
        if (reportToEsa?.enabled)
            await sendToEsa(reportToEsa.esaUrl, reportToEsa.analysisId, reportToEsa.entityId, reportToEsa.launchEvent, reportToEsa.userName, reportToEsa.password, reportToEsa.showResponse, fileDescriptor);

        now = Date.now();
        response = await axiosClient.post(flowUrl, makeRequestBody(stats.totalNumRequests), requestOptions, fileDescriptor);
        stats.executionTime += Date.now() - now;

        responseClassification = processResponse(response, flowUrl, fileDescriptor);
        switch (responseClassification)
        {
            case 2: stats.numSuccessfulFlowInvocationsAndExecutions++; break;
            case 1: stats.numSuccessfulFlowInvocations++; break;
            default:
        }
        
        if (reportToEsa?.enabled)
            await sendToEsa(reportToEsa.esaUrl, reportToEsa.analysisId, reportToEsa.entityId, reportToEsa.postEvent, reportToEsa.userName, reportToEsa.password, reportToEsa.showResponse, fileDescriptor);
    } catch (error)
    {
        logEvent(`Error in retrieving flow response: ${error}`, 'error', fileDescriptor);
    }
}

async function flowTestBatches(axiosClient, flowUrl, numRequests, requestOptions, stats, fileDescriptor, csvFileDescriptor)
{
    const flowInvocationBatch = [],
        numConcurrentRequests = flowUrl === null ? numRequests * activeConfig.FLOW_REST_URLS.length : numRequests;

    let index,
        logStatement;
    
    for (stats.batchNumber = 0; stats.batchNumber < activeConfig.NUM_BATCHES; stats.batchNumber++)
    {
        logEvent('', 'info', fileDescriptor);
        if (flowUrl)
            logEvent(`Starting batch ${stats.batchNumber + 1}/${activeConfig.NUM_BATCHES} with ${numConcurrentRequests} concurrent request(s) to ${flowUrl}`, 'info', fileDescriptor);
        else logEvent(`Starting batch ${stats.batchNumber + 1}/${activeConfig.NUM_BATCHES} with ${numConcurrentRequests} concurrent request(s)`, 'info', fileDescriptor);
    
        for (index = 0; index < numRequests; index++)
            if (flowUrl)
            {
                stats.totalNumRequests++;
                logEvent(`  Starting test ${index + 1}/${numRequests}`, 'info', fileDescriptor);
                flowInvocationBatch.push(oneFlowTest(axiosClient, flowUrl, requestOptions, stats, fileDescriptor, activeConfig.REPORT_TO_ESA));
            }
            else activeConfig.FLOW_REST_URLS.forEach((flowUrl) =>
            {
                stats.totalNumRequests++;
                logEvent(`  Starting test ${index + 1}/${numConcurrentRequests} with flow ${flowUrl}`, 'info', fileDescriptor);
                flowInvocationBatch.push(oneFlowTest(axiosClient, flowUrl, requestOptions, stats, fileDescriptor, activeConfig.REPORT_TO_ESA));
            });
        
        await Promise.all(flowInvocationBatch);

        await setTimeout(activeConfig.WAIT_TIME_MS_BETWEEN_BATCHES);
    }

    const { numSuccessfulFlowInvocationsAndExecutions, numSuccessfulFlowInvocations, totalNumRequests, executionTime } = stats,
        numberFailedFlowInvocations = activeConfig.NUM_BATCHES * numRequests * activeConfig.FLOW_REST_URLS.length - numSuccessfulFlowInvocationsAndExecutions - numSuccessfulFlowInvocations;

    logStatement = `Number of batches: ${activeConfig.NUM_BATCHES}
        Number of concurrent flow invocations: ${activeConfig.policy === 'batch' ? numRequests : numRequests * activeConfig.FLOW_REST_URLS.length}
        Total number of flow invocations: ${totalNumRequests}
        Number of successful flow invocations and executions: ${numSuccessfulFlowInvocationsAndExecutions}/${totalNumRequests} (${100 * numSuccessfulFlowInvocationsAndExecutions / totalNumRequests}%)
        Number of successful flow invocations with failed executions: ${numSuccessfulFlowInvocations}/${totalNumRequests} (${100 * numSuccessfulFlowInvocations / totalNumRequests}%)
        Number of unsuccessful flow invocations: ${numberFailedFlowInvocations}/${totalNumRequests} (${100 * numberFailedFlowInvocations / totalNumRequests}%)
        Average roundtrip time to/from CXF flow = ${executionTime / totalNumRequests}ms
        Total execution time: ${(Date.now() - NOW) / 1000} seconds`;
    logEvent(logStatement, 'info', fileDescriptor, true);
    if (fileDescriptor)
        fs.writeSync(csvFileDescriptor, `${activeConfig.NUM_BATCHES}, ${numRequests}, ${totalNumRequests}, ${numSuccessfulFlowInvocationsAndExecutions}, ${100 * numSuccessfulFlowInvocationsAndExecutions / totalNumRequests}, ${numSuccessfulFlowInvocations}, ${100 * numSuccessfulFlowInvocations / totalNumRequests}, ${executionTime / totalNumRequests}\r\n`);
}

async function flowTester()
{
    const axiosClient = axios.create();

    let requestOptions,
        requestTimeout,
        fileDescriptor,
        csvFileDescriptor,
        index,
        flowIndex,
        stats,
        logStatement,
        reportToEsa,
        outputFileName;

    if (ALL_CONFIGS.hasOwnProperty('configurations') && typeof ALL_CONFIGS.configurations === 'object')
    {
        if (ALL_CONFIGS.hasOwnProperty('activeConfiguration'))
            if (ALL_CONFIGS.configurations.hasOwnProperty(ALL_CONFIGS.activeConfiguration))
            {
                activeConfig = ALL_CONFIGS.configurations[ALL_CONFIGS.activeConfiguration];
                console.info(`Selected configuration ${ALL_CONFIGS.activeConfiguration}`);
            }
            else 
            {
                console.error(`Selected active configuration ${ALL_CONFIGS.activeConfiguration} is not specified as a key in the "configurations" property of the configuration file`);
                return;
            }
        else if (Object.keys(ALL_CONFIGS.configurations).length === 1)
            activeConfig = Object.keys(ALL_CONFIGS.configurations)[0];
        else
        {
            console.error('The "configuration" key in the configuration file contains multiple name/value pairs, and therefore an "activeConfiguration" property naming the configuration to choose must be included in the configuration file');
            return;
        }
            
        logStatement = `Flow test starting at ${getCurrentTime()}`;

        if (activeConfig?.VERBOSITY)
        {
            verbosity = activeConfig.VERBOSITY.toLowerCase();
            if (!VERBOSITY_LEVELS.has(verbosity))
            {
                console.error('Valid VERBOSITY levels are "high" (request, responses, errors are being logged), "low" (requests and errors are being logged), and "none" (only errors are being logged)');
                return;
            }
        }
        else verbosity = 'low';

        requestTimeout = Math.min(Math.max(0, activeConfig?.TIMEOUT ?? 60000), 600000);

        requestOptions = !activeConfig.hasOwnProperty('BEARER_TOKEN') || EMPTY.test(activeConfig.BEARER_TOKEN) ? 
        {
            headers: 
            { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json' 
            },
            timeout: requestTimeout
        }
        :
        {
            headers: 
            { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'Authorization': activeConfig.BEARER_TOKEN
            },
            timeout: requestTimeout
        };

        if (EMPTY.test(activeConfig.OUTPUT_FILE_NAME))
        {
            fileDescriptor = null;
            csvFileDescriptor = null;
        }
        else 
        {
            outputFileName = activeConfig.OUTPUT_FILE_NAME
                .replaceAll('_@numFlows@_', activeConfig.FLOW_REST_URLS.length)
                .replaceAll('_@numBatches@_', activeConfig.NUM_BATCHES)
                .replaceAll('_@minNumRequestsPerBatch@_', activeConfig.REQUESTS_PER_BATCH[0])
                .replaceAll('_@maxNumRequestsPerBatch@_', activeConfig.REQUESTS_PER_BATCH[activeConfig.REQUESTS_PER_BATCH.length - 1]);
            fileDescriptor = fs.openSync(outputFileName, activeConfig.FILE_OVERWRITE ? 'w' : 'a');
            csvFileDescriptor = fs.openSync(outputFileName + '.csv', activeConfig.FILE_OVERWRITE ? 'w' : 'a');
        }

        reportToEsa = activeConfig.REPORT_TO_ESA;
        if (reportToEsa?.enabled)
            await sendToEsa(reportToEsa.esaUrl, reportToEsa.analysisId, reportToEsa.entityId, reportToEsa.initialEvent, reportToEsa.userName, reportToEsa.password, reportToEsa.showOutput, fileDescriptor);

        logEvent(logStatement, 'info', fileDescriptor);
        if (fileDescriptor)
            fs.writeSync(csvFileDescriptor, '"Number batches", "Number concurrent flow invocations", "Total number flow invocations", "Number successful flow invocations + executions", "% successful flow invocations + executions", "Number successful flow invocations with failed executions", "% successful flow invocations with failed executions", "Average flow roundtrip time (ms)"\r\n');

        if (Array.isArray(activeConfig.REQUESTS_PER_BATCH) && activeConfig.REQUESTS_PER_BATCH.length > 0)
            if (activeConfig.NUM_BATCHES <= 0 || activeConfig.WAIT_TIME_MS_BETWEEN_BATCHES <= 0)
                console.error('Invalid configuration: NUM_BATCHES, WAIT_TIME_MS_BETWEEN_BATCHES must all be greater than 0');
            else 
            {
                if (activeConfig.POLICY.toLowerCase() === 'batch')
                    for (flowIndex = 0; flowIndex < activeConfig.FLOW_REST_URLS.length; flowIndex++)
                        for (index = 0; index < activeConfig.REQUESTS_PER_BATCH.length; index++)
                        {
                            stats = 
                            {
                                numSuccessfulFlowInvocationsAndExecutions: 0,
                                numSuccessfulFlowInvocations: 0,
                                totalNumRequests: 0,
                                batchNumber: 0,
                                executionTime: 0
                            };
                    
                            await flowTestBatches(axiosClient, activeConfig.FLOW_REST_URLS[flowIndex], activeConfig.REQUESTS_PER_BATCH[index], requestOptions, stats, fileDescriptor, csvFileDescriptor);
                        }
                else if (activeConfig.POLICY.toLowerCase() === 'alternate')
                    for (index = 0; index < activeConfig.REQUESTS_PER_BATCH.length; index++)
                    {
                        stats = 
                        {
                            numSuccessfulFlowInvocationsAndExecutions: 0,
                            numSuccessfulFlowInvocations: 0,
                            totalNumRequests: 0,
                            batchNumber: 0,
                            executionTime: 0
                        };
                
                        await flowTestBatches(axiosClient, null, activeConfig.REQUESTS_PER_BATCH[index], requestOptions, stats, fileDescriptor, csvFileDescriptor);
                    }
                else console.error('POLICY must be either ALTERNATE or BATCH');
            }
        else console.error('REQUESTS_PER_BATCH must be an array with length > 0');

        logStatement = `Flow test ended at ${new Date(Date.now()).toString()}`;
        logEvent(logStatement, 'info', fileDescriptor);
        if (fileDescriptor)
        {
            fs.closeSync(fileDescriptor);
            fs.closeSync(csvFileDescriptor);
        }
    }
    else console.error('The FlowTester configuration must have an object property "configurations" with at least one name/value pair')
}

flowTester();