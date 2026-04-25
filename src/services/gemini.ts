export const getGeminiResponse = async (apiKey: string, prompt: string): Promise<string> => {
  const cleanKey = apiKey.trim();
  const versions = ["v1beta", "v1"];
  
  let availableModel: string | null = null;
  let usedVersion: string = "v1beta";

  // 1. 사용 가능한 모델 목록 조회 및 최적 모델 자동 선택
  for (const ver of versions) {
    try {
      const listResp = await fetch(
        `https://generativelanguage.googleapis.com/${ver}/models?key=${cleanKey}`
      );
      const listData = await listResp.json();
      
      if (listResp.ok && listData.models) {
        // 'flash'가 포함된 모델 중 가장 최신 버전을 우선 선택 (2.5 -> 2.0 -> 1.5)
        const sortedModels = listData.models
          .filter((m: any) => m.supportedGenerationMethods.includes("generateContent"))
          .sort((a: any, b: any) => b.name.localeCompare(a.name)); // 이름 내림차순 (높은 버전 우선)

        const flashModel = sortedModels.find((m: any) => m.name.toLowerCase().includes("flash"));
        const selected = flashModel || sortedModels[0];
        
        if (selected) {
          availableModel = selected.name; 
          usedVersion = ver;
          console.log(`[AlgoSolved] Auto-selected model: ${availableModel} (${ver})`);
          break;
        }
      }
    } catch (e) {
      console.warn(`[AlgoSolved] Model listing failed for ${ver}`, e);
    }
  }

  const finalModel = availableModel || "models/gemini-1.5-flash";
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/${usedVersion}/${finalModel}:generateContent?key=${cleanKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
      throw new Error("응답 데이터 형식이 올바르지 않습니다.");
    }
    
    throw new Error(data.error?.message || "알 수 없는 API 에러");
  } catch (error: any) {
    let message = error.message;
    if (message.includes("high demand")) {
      message = "현재 Google AI 서비스 사용량이 많아 잠시 후 다시 시도해주세요. (서버 과부하)";
    } else if (message.includes("API key")) {
      message = "API 키가 유효하지 않거나 설정되지 않았습니다.";
    }
    throw new Error(message);
  }
};
