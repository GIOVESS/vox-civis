import type { Report } from "@/types"

// Google Sheets API configuration
const CLIENT_ID = "58398565933-5vsrsugpirirrfi3slpqaqbpu2v4i2cu.apps.googleusercontent.com"
const SHEET_ID = "" // You'll need to add your Google Sheet ID here

// This function fetches data from Google Sheets API
export async function fetchReports(): Promise<Report[]> {
  try {
    // For the MVP, we'll use mock data until the full Google Sheets integration is set up
    // In a production environment, you would:
    // 1. Set up proper OAuth2 authentication
    // 2. Use the sheets API to fetch data
    // 3. Transform the data into the Report type

    // Mock data for Kenya
    return [
      {
        id: "1",
        title: "Bribery at County Licensing Office",
        description: "Officials demanding bribes to process business permits in Nairobi CBD.",
        category: "corruption",
        latitude: -1.2864,
        longitude: 36.8172,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "2",
        title: "Dangerous Road Condition",
        description: "Large potholes on Mombasa Road causing accidents near Athi River junction.",
        category: "safety",
        latitude: -1.4547,
        longitude: 36.9726,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "3",
        title: "Broken Water Pipes",
        description: "Burst water pipes in Kibera causing flooding and water shortage for residents.",
        category: "water",
        latitude: -1.3098,
        longitude: 36.7819,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: null,
      },
      {
        id: "4",
        title: "Mugging Hotspot",
        description: "Increased mugging incidents near Kencom bus stop during evening hours.",
        category: "violence",
        latitude: -1.2867,
        longitude: 36.8249,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: null,
      },
      {
        id: "5",
        title: "Illegal Land Subdivision",
        description: "Private developer illegally subdividing public land near Karura Forest.",
        category: "land",
        latitude: -1.2311,
        longitude: 36.8219,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "6",
        title: "School Without Teachers",
        description: "Public primary school in Kisumu has been without teachers for 3 months.",
        category: "services",
        latitude: -0.1022,
        longitude: 34.7617,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: null,
      },
      {
        id: "7",
        title: "Bridge Collapse",
        description: "Footbridge over Nairobi River collapsed after heavy rains, blocking access to Korogocho.",
        category: "infrastructure",
        latitude: -1.2513,
        longitude: 36.8789,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        imageUrl: "/placeholder.svg?height=300&width=400",
      },
    ]
  } catch (error) {
    console.error("Error fetching reports:", error)
    throw error
  }
}

// Function to implement when connecting to Google Sheets
async function fetchReportsFromGoogleSheets(): Promise<Report[]> {
  try {
    // This is a placeholder for the actual implementation
    // You'll need to:
    // 1. Set up OAuth2 authentication
    // 2. Get the sheet data
    // 3. Transform the data into Report objects
    // 4. Filter for approved reports only

    // Example implementation (not functional without proper setup):
    /*
    const auth = new google.auth.OAuth2(CLIENT_ID);
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2:H', // Adjust based on your sheet structure
    });
    
    const rows = response.data.values || [];
    
    return rows
      .filter(row => row[7] === 'approved') // Assuming column H is approval status
      .map((row, index) => ({
        id: index.toString(),
        title: row[0],
        description: row[1],
        category: row[2],
        latitude: parseFloat(row[3]),
        longitude: parseFloat(row[4]),
        createdAt: row[5],
        imageUrl: row[6] || null,
      }));
    */

    return []
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error)
    throw error
  }
}

