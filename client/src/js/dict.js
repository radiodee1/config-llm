const dict = {

    var : [
        'OPENAI_MODEL',
        'OPENAI_MODEL_FINETUNE',
        'OPENAI_API_KEY',
        'OPENAI_ORGANIZATION',
        'PROJECT_REVIEW_NAME',
        'OPENAI_EMBEDDING_URL',
        'OPENAI_EMBEDDING_NAME',
        'GOOGLE_GEMINI_URL',
        'GOOGLE_GEMINI_MODEL',
        'GOOGLE_GEMINI_API_KEY'
    ],
    config : [
        'PROJECT_LAUNCH_ARGS'
    ],
    list : [
        'OPENAI_CHECKPOINTS'
    ],
    cred : [
        'GOOGLE_APPLICATION_CREDENTIALS'
    ],
    file : [
        'FILE'
    ],
    filename: ".llm.env",
    options: {
        flags: [
            {
                name: '--file',
                selected: false, // will be changed at run time...
                grouped: true, // part of recomended configuration...
                help: "Save statistics in text file."
            },            
            {
                name: '--local',
                selected: false,
                grouped: true,
                help: "Not implemented"

            },            
            {
                name: '--loop_wait',
                selected: false,
                grouped: true,
                help: "Loop until input is detected."

            },            
            {
                name: '--verbose',
                selected: false,
                grouped: true,
                help: "Use verbose mode."

            },            
            {
                name: '--cloud_tts',
                selected: false,
                grouped: true,
                help: "Google Cloud Text to Speech."

            },            
            {
                name: '--cloud_stt',
                selected: false,
                grouped: true,
                help: "Google Cloud Speech Recognition."

            },            
            {
                name: '--truncate',
                selected: false,
                grouped: false,
                help: "Truncate model output."

            },            
            {
                name: '--pc',
                selected: false,
                grouped: false,
                help: "Use prompt-completion for prompt. (Older models.)"

            },
            {
                name: '--mics',
                selected: false,
                grouped: false,
                help: "Display microphone data and quit."

            },
            {
                name: '--test',
                selected: false,
                grouped: false,
                help: "Use test data and no LLM."
            },
            {
                name: '--json',
                selected: false,
                grouped: true,
                help: "Use json for model prompt."
            },
            {
                name: '--review',
                selected: false,
                grouped: false,
                help: "Use review function."
            },
            {
                name: '--google_gemini',
                selected: false,
                grouped: false,
                help: "Use Google Gemini model."
            },
            {
                name: '--sleep_wake',
                selected: false,
                grouped: false,
                help: "Enable sleep/wake type operation for --cloud_stt."
            }



        ],
        args: [
            {
                name: '--voice',
                selected: false, // will be changed at run time.
                grouped: true, // part of recomended configuration...
                def: "female", // default argument
                actual: "", // will be changed at run time.
                type: String,
                help: "Google Cloud TTS Voice Code."

            },            
            {
                name: '--temp',
                selected: false,
                grouped: true,
                def: "0.95",
                actual: "",
                type: Number,
                help: "Temperature for LLM operation."

            },            
            {
                name: '--timeout',
                selected: false,
                grouped: true,
                def: "0.5",
                actual: "",
                type: Number,
                help: "Loop minutes to timeout."

            },            
            {
                name: '--mic_timeout',
                selected: false,
                grouped: true,
                def: "20",
                actual: "",
                type: Number,
                help: "Mic timeout in seconds."

            },            
            {
                name: '--questions',
                selected: false,
                grouped: false,
                def: "10",
                actual: "",
                type: Number,
                help: "Simulate two parties with preset question list. Specify number of simulated questions."

            },            
            {
                name: '--name',
                selected: false,
                grouped: false,
                def: "Jane",
                actual: "",
                type: String,
                help: "Define new name."

            },
            {
                name: '--offset',
                selected: false,
                grouped: false,
                def: "5",
                actual: "",
                type: Number,
                help: "Time in seconds to offset on startup."

            },
            {
                name: '--window',
                selected: false,
                grouped: false,
                def: "35",
                actual: "",
                type: Number,
                help: "Number of memory units used in input."

            },            
            {
                name: '--wake_words',
                selected: false,
                grouped: false,
                def: "wake hello",
                actual: "",
                type: 'plus_args',
                help: "List of wake words used in input."

            },
            {
                name: '--test_review',
                selected: false,
                grouped: false,
                def: "-1",
                actual: "",
                type: Number,
                help: "Index to use for review test."

            },
            {
                name: '--size',
                selected: false,
                grouped: false,
                def: "2048",
                actual: "",
                type: Number,
                help: "Number of TOKENS to use from context-area."

            }



        ]
    }

}

export default dict
