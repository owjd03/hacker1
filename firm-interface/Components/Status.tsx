export interface DocumentStatus {
  date?: string;
  documentName?: string;
  status?: string;
  reason?: string;
  fund?: string;
  action?: string;
  dates?: string;
}

export const documentStatusData: Record<string, DocumentStatus[]> = {
  solar: [
    {
      date: "2024-01-15",
      documentName: "Installation Plan",
      status: "Rejected",
      reason: "Incomplete details",
      fund: "$300k",
      dates: "2023-12-30",
      action: "Hit milestone of building 300 solar panels. Great work!"
    },
    {
      date: "2024-01-20",
      documentName: "Inspection Certificate",
      status: "Approved",
      fund: "$150k",
      dates: "2023-12-30",
      action: "Hit milestone of building 150 solar panels. Great work!",
    },
  ],
  wind: [
    {
      date: "2024-02-05",
      documentName: "Site Layout",
      status: "Approved",
      fund: "$500k",
      dates: "2023-9-30",
      action: "Hit milestone of building 500 Wind Turbines. Great work!",
    },
    {
      date: "2024-02-10",
      documentName: "Equipment Details",
      status: "Approved",
      fund: "$300k",
      dates: "2023-5-30",
      action: "Hit milestone of building 300 Wind Turbines. Great work!"
    },
  ],
  trees: [
    {
      date: "2024-03-01",
      documentName: "Tree Species List",
      status: "Approved",
      fund: "$300k",
      dates: "2023-7-30",
      action: "Hit milestone of planting 50 000 trees. Great work!"
    },
    {
      date: "2024-03-05",
      documentName: "Plantation Plan",
      status: "Rejected",
      reason: "Unclear mapping",
      fund: "$300k",
      dates: "2024-2-30",
      action: "Hit milestone of planting 25 000 trees. Great work!"
    },
  ],
};
