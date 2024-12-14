const dict = {

    var : [
        'OPENAI_MODEL',
        'OPENAI_MODEL_FINETUNE',
        'OPENAI_API_KEY',
        'OPENAI_ORGANIZATION',
        'GOOGLE_APPLICATION_CREDENTIALS'
    ],
    config : [
        'PROJECT_LAUNCH_ARGS'
    ],
    list : [
        'OPENAI_CHECKPOINTS'
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
                grouped: true,
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

            },            {
                name: '--temp',
                selected: false,
                grouped: true,
                def: "0.95",
                actual: "",
                type: Number,
                help: "Temperature for LLM operation."

            },            {
                name: '--timeout',
                selected: false,
                grouped: true,
                def: "0.5",
                actual: "",
                type: Number,
                help: "Loop minutes to timeout."

            },            {
                name: '--mic_timeout',
                selected: false,
                grouped: true,
                def: "20",
                actual: "",
                type: Number,
                help: "Mic timeout in seconds."

            },            {
                name: '--questions',
                selected: false,
                grouped: true,
                def: "10",
                actual: "",
                type: Number,
                help: "Simulate two parties with preset question list. Specify number of simulated questions."

            },            {
                name: '--name',
                selected: false,
                grouped: false,
                def: "Jane",
                actual: "",
                type: String,
                help: "Define new name."

            },

        ]
    }

}

export default dict
