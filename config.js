const config =
{
    activeConfiguration: 'config1_4',
    configurations:
    {
        config1_0:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=b609db12-a1eb-4fd4-9f67-605b5a941ce3&draft=true'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 10,
            REQUESTS_PER_BATCH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            WAIT_TIME_MS_BETWEEN_BATCHES: 1000,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v12.log',
            FILE_OVERWRITE: true,
            VERBOSITY: 'low'
        },
        config1_1:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=8be60669-ba1f-4135-85fd-aff271713201&draft=true'
                ],
            POLICY: 'alternate',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 10,
            REQUESTS_PER_BATCH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            WAIT_TIME_MS_BETWEEN_BATCHES: 2000,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v6.log',
            FILE_OVERWRITE: true,
            VERBOSITY: 'low'
        },
        config1_2:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 250,
            REQUESTS_PER_BATCH: [20],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v13.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: false,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'low'
        },
        config1_3:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=8be60669-ba1f-4135-85fd-aff271713201&draft=true'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 10,
            REQUESTS_PER_BATCH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v11.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: true,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'low'
        },
        config1_4:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true',
                   // 'http://localhost:4001/webhook?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 1,
            REQUESTS_PER_BATCH: [1],
            WAIT_TIME_MS_BETWEEN_BATCHES: 2000,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-.log',
            FILE_OVERWRITE: true,
            VERBOSITY: 'high'
        },
        config1_5:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=6daf0ae2-f560-48d8-aa03-8d50e4104981&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=9684e514-e4cb-4def-a683-384aecba7b22&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=748b9838-de75-4132-a6d1-72ae6a90ac14&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=eacb0ccc-eff1-4ac9-9b5d-92cbee6a8347&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=c1f3f380-6a17-49ed-a994-9e44c61e0047&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=622cbaec-0b4a-452d-b6e2-9fec1bd807f8&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=524bba21-2249-4493-9fb1-3395f4e59a94&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=03b6dbf3-db8a-4e56-b8e2-97a3a02855ae&draft=true&displayExecutionLogs=false',
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=dfa1bfc4-dd15-4f64-801c-caa5d403f2db&draft=true&displayExecutionLogs=false'
                ],
            POLICY: 'alternate',
            TIMEOUT: 180000,
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make an appointment',
            NUM_BATCHES: 193,
            REQUESTS_PER_BATCH: [13],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v18-_@numBatches@_-_@minNumRequestsPerBatch@_.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: false,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'low'
        },
        config_hh_1:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev-hh.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true',
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 100,
            REQUESTS_PER_BATCH: [10],
            WAIT_TIME_MS_BETWEEN_BATCHES: 50,
            OUTPUT_FILE_NAME: './results/iAnswer-hh-1.log',
            FILE_OVERWRITE: true,
            VERBOSITY: 'high',
            TIMEOUT: 60000
        },
        config_simple_1:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=771ef3cb-0b71-4dda-91b2-5d18c49cb2ab&draft=true&displayExecutionLogs=false'
                ],
            POLICY: 'alternate',
            TIMEOUT: 100000,
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make an appointment',
            NUM_BATCHES: 2500,
            REQUESTS_PER_BATCH: [10],
            WAIT_TIME_MS_BETWEEN_BATCHES: 10,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v20-_@numBatches@_-_@minNumRequestsPerBatch@_.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: false,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'none'
        },
        config_local_1:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true&displayExecutionLogs=false'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 10,
            REQUESTS_PER_BATCH: [10],
            WAIT_TIME_MS_BETWEEN_BATCHES: 1000,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v11.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: false,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'high'
        },
        config_local_2:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=b609db12-a1eb-4fd4-9f67-605b5a941ce3&draft=true&displayExecutionLogs=false'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 250,
            REQUESTS_PER_BATCH: [20],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v11.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: true,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'high'
        },
        config_local_3:
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true&displayExecutionLogs=false'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 10,
            REQUESTS_PER_BATCH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-v11.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: true,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'low'
        },
        config_local_4: 
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=6daf0ae2-f560-48d8-aa03-8d50e4104981&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=9684e514-e4cb-4def-a683-384aecba7b22&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=748b9838-de75-4132-a6d1-72ae6a90ac14&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=eacb0ccc-eff1-4ac9-9b5d-92cbee6a8347&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=c1f3f380-6a17-49ed-a994-9e44c61e0047&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=622cbaec-0b4a-452d-b6e2-9fec1bd807f8&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=524bba21-2249-4493-9fb1-3395f4e59a94&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=03b6dbf3-db8a-4e56-b8e2-97a3a02855ae&draft=true&displayExecutionLogs=false',
                    'http://localhost:4001/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=dfa1bfc4-dd15-4f64-801c-caa5d403f2db&draft=true&displayExecutionLogs=false' 
                ],
            POLICY: 'alternate',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 1,
            REQUESTS_PER_BATCH: [1],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-_@numBatches@_-_@minNumRequestsPerBatch@_.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: false,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'high'
        },
        config_local_5: 
        {
            name: 'iAnswer',
            FLOW_REST_URLS:
                [
                    'http://localhost:4001/webhook?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=1d7fff51-a17e-450e-a9b6-135c565f905a&draft=true&displayExecutionLogs=false' 
                ],
            POLICY: 'alternate',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'I want to make a reservation',
            NUM_BATCHES: 1,
            REQUESTS_PER_BATCH: [1],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/iAnswer-2-pods-_@numBatches@_-_@minNumRequestsPerBatch@_.log',
            FILE_OVERWRITE: true,
            REPORT_TO_ESA:
            {
                enabled: false,
                esaUrl: 'http://18.212.156.75:7778',
                userName: 'apiClient',
                password: 'cap*Cr0119',
                analysisId: 'flowPerformance',
                entityId: 'iAnswer-integration',
                initialEvent: { step: "clear" },
                launchEvent: { step: 'start' },
                postEvent: { step: 'end' },
                showResponse: true
            },
            VERBOSITY: 'high'
        },
        config2:
        {
            name: 'Flow Tester Min',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=3e202f2c-6534-4d3a-a546-be7a38a601b3&draft=true'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'Hello, please return OK!',
            NUM_BATCHES: 10,
            REQUESTS_PER_BATCH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            WAIT_TIME_MS_BETWEEN_BATCHES: 1000,
            OUTPUT_FILE_NAME: './results/flow-tester-min-2-pods.log',
            FILE_OVERWRITE: true,
            VERBOSITY: 'low'
        },
        config3:
        {
            name: 'Flow Tester',
            FLOW_REST_URLS:
                [
                    'https://cxf-executor-dev.cxfabric.io/restendpoint?tenant_id=cus_QZ2vTHtqYrOmud&flow_id=8be60669-ba1f-4135-85fd-aff271713201&draft=true'
                ],
            POLICY: 'batch',
            BEARER_TOKEN: '',
            INPUT_TEXT: 'Please return OK!',
            NUM_BATCHES: 25,
            REQUESTS_PER_BATCH: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            WAIT_TIME_MS_BETWEEN_BATCHES: 100,
            OUTPUT_FILE_NAME: './results/flow-tester-2-pods-v3.log',
            FILE_OVERWRITE: true,
            VERBOSITY: 'low'
        }
    }
};

module.exports = config; 