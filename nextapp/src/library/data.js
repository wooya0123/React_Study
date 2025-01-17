export async function getTopics() {
    const response = await fetch("http://localhost:9999/topics");
    return response.json();
  }
  