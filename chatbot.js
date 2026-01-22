import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 Carlos Chat: Inicializando...');

    const target = document.querySelector('#n8n-chat');
    if (!target) {
        console.error('❌ Error: No se encontró el elemento #n8n-chat');
        return;
    }

    createChat({
        webhookUrl: 'https://production-n8n.fly.dev/webhook/71551c27-bcad-4a7a-86d1-2fe8b5e49a49/chat',
        webhookConfig: {
            method: 'POST',
            headers: {}
        },
        target: '#n8n-chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        loadPreviousSession: true,
        metadata: {
            source: 'web',
            channel: 'portfolio-carlos-lamas'
        },
        showWelcomeScreen: false,
        defaultLanguage: 'es',
        initialMessages: [
            '¡Hola de nuevo! 👋 Soy el asistente virtual de Carlos Lamas.',
            '¿En qué puedo ayudarte hoy?'
        ],
        i18n: {
            es: {
                title: 'Asistente Digital 👋',
                subtitle: "Consultas sobre Ingeniería y Proyectos",
                footer: '',
                getStarted: 'Nueva conversación',
                inputPlaceholder: 'Escribe tu pregunta aquí...',
            },
        },
        enableStreaming: false,
    });

    console.log('✅ Carlos Chat: Inicializado correctamente');
});