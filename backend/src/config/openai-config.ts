export function configureOpenAI() {
    const config = {
        apiKey: process.env.OPEN_AI_SECRET,

    }
    return config
}