export function detectAIProvider(apiKey: string): 'gemini' | 'claude' | 'openai' | 'unknown' {
    const cleanKey = apiKey.trim();

    if (cleanKey.startsWith('AIzaSy')) return 'gemini';
    if (cleanKey.startsWith('sk-ant-')) return 'claude';
    if (cleanKey.startsWith('sk-proj-') || cleanKey.startsWith('sk-')) return 'openai';

    return 'unknown';
}