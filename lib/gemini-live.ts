/**
 * WebSocket client for Gemini Live API (bidiGenerateContent)
 */

export type GeminiLiveCallbacks = {
  onAudioChunk: (base64Pcm: string) => void;
  onTurnEnd: () => void;
  onError: (msg: string) => void;
  onClose: () => void;
};

export type GeminiLiveClient = {
  sendAudio: (base64Pcm: string) => void;
  close: () => void;
  isOpen: () => boolean;
};

export function connectGeminiLive(
  wsUrl: string,
  model: string,
  systemInstruction: string,
  callbacks: GeminiLiveCallbacks,
): Promise<GeminiLiveClient> {
  return new Promise((resolve, reject) => {
    let ws: WebSocket;
    let setupComplete = false;

    try {
      ws = new WebSocket(wsUrl);
    } catch (err) {
      reject(new Error("Không thể kết nối WebSocket"));
      return;
    }

    ws.onopen = () => {
      // Send setup message
      const setupMsg = {
        setup: {
          model: `models/${model}`,
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Kore" },
              },
            },
          },
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
        },
      };
      ws.send(JSON.stringify(setupMsg));
    };

    ws.onmessage = (event) => {
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(event.data as string);
      } catch {
        return;
      }

      // Setup complete acknowledgment
      if ("setupComplete" in data) {
        setupComplete = true;
        resolve({
          sendAudio: (base64Pcm: string) => {
            if (ws.readyState !== WebSocket.OPEN) return;
            ws.send(
              JSON.stringify({
                realtimeInput: {
                  mediaChunks: [
                    {
                      mimeType: "audio/pcm;rate=16000",
                      data: base64Pcm,
                    },
                  ],
                },
              }),
            );
          },
          close: () => {
            ws.close();
          },
          isOpen: () => ws.readyState === WebSocket.OPEN,
        });
        return;
      }

      // Handle server content (audio responses)
      const serverContent = data.serverContent as
        | { modelTurn?: { parts?: Array<{ inlineData?: { data: string } }> }; turnComplete?: boolean }
        | undefined;

      if (serverContent) {
        // Audio chunks from model
        const parts = serverContent.modelTurn?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData?.data) {
              callbacks.onAudioChunk(part.inlineData.data);
            }
          }
        }

        // Turn complete
        if (serverContent.turnComplete) {
          callbacks.onTurnEnd();
        }
      }
    };

    ws.onerror = () => {
      if (!setupComplete) {
        reject(new Error("WebSocket connection failed"));
      }
      callbacks.onError("Mất kết nối. Vui lòng thử lại.");
    };

    ws.onclose = () => {
      callbacks.onClose();
    };
  });
}
