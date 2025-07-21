export function getOrCreateDailySessionId() {
  if (typeof window === "undefined") {
    // Server-side: return a fallback or skip session generation
    return "";
  }

  const sessionData = JSON.parse(localStorage.getItem("chat_session_data") || "{}");
  const today = new Date().toISOString().split("T")[0];

  if (sessionData?.date === today && sessionData.session_id) {
    return sessionData.session_id;
  }

  const newSessionId = crypto.randomUUID();
  localStorage.setItem(
    "chat_session_data",
    JSON.stringify({ session_id: newSessionId, date: today })
  );

  return newSessionId;
}
