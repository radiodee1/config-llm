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
    options : [
        '--file',
        '--voice',
        '--local',
        '--loop_wait',
        '--verbose',
        '--temp',
        '--timeout',
        '--cloud_tts',
        '--cloud_stt',
        '--mic_timeout',
        '--truncate',
        '--questions',
        '--pc'
    ],
    filename: ".llm.env"
}

export default dict
