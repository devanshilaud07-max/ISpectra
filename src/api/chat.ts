import { apiClient } from './client';
import { generateLocalCopilotResponse } from '../services/copilotService';

export interface ChatResponse {
  reply: string;
  model?: string;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const data = await apiClient<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    return data;
  } catch (error) {
    console.warn('[Chat API] Falling back to client-side copilot engine:', error);
    const fallbackReply = generateLocalCopilotResponse(message);
    return {
      reply: fallbackReply,
      model: 'ispectra-copilot-engine'
    };
  }
}
