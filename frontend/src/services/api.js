const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

export const getLeads = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`);

    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};