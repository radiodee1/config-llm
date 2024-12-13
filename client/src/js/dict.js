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
                help: "Help text here."
            },            
            {
                name: '--local',
                selected: false,
                grouped: true,
                help: "Help text here."

            },            
            {
                name: '--loop_wait',
                selected: false,
                grouped: true,
                help: "Help text here."

            },            
            {
                name: '--verbose',
                selected: false,
                grouped: true,
                help: "Help text here."

            },            
            {
                name: '--cloud_tts',
                selected: false,
                grouped: true,
                help: "Help text here."

            },            
            {
                name: '--cloud_stt',
                selected: false,
                grouped: true,
                help: "Help text here."

            },            
            {
                name: '--truncate',
                selected: false,
                grouped: true,
                help: "Help text here."

            },            
            {
                name: '--pc',
                selected: false,
                grouped: false,
                help: "Help text here."

            },
            {
                name: '--mics',
                selected: false,
                grouped: false,
                help: "Help text here."

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
                help: "Help text here."

            },            {
                name: '--temp',
                selected: false,
                grouped: true,
                def: "0.95",
                actual: "",
                type: Number,
                help: "Help text here."

            },            {
                name: '--timeout',
                selected: false,
                grouped: true,
                def: "0.5",
                actual: "",
                type: Number,
                help: "Help text here."

            },            {
                name: '--mic_timeout',
                selected: false,
                grouped: true,
                def: "20",
                actual: "",
                type: Number,
                help: "Help text here."

            },            {
                name: '--questions',
                selected: false,
                grouped: true,
                def: "10",
                actual: "",
                type: Number,
                help: "Help text here."

            },            {
                name: '--name',
                selected: false,
                grouped: false,
                def: "Jane",
                actual: "",
                type: String,
                help: "Help text here."

            },

        ]
    }

}

export default dict
