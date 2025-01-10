export type Borrower = {
  id: number;
  name: string;
  solar: number;
  date: string;
  fundsDistributed: number
  milestonesCompleted: number;
  wind: number;
  trees: number;
  discrepancies: number;
  reason: string;
};

export type DocumentUpload = {
  borrowerId: number;
  date: string;
  name: string;
  status: string;
  reason: string;
  category: string;
};

export type Transaction = {
  borrowerId: number;
  fundsPaid: string;
  date: string;
  action: string;
  category: string;
};

export const fakeBorrowers: Borrower[] = [
  {
    id: 1,
    name: "Borrower A",
    date: "NA",
    reason: "NA",
    fundsDistributed: 100000,
    milestonesCompleted: 80,
    discrepancies: 0,
    solar: 70, 
    wind: 88, 
    trees: 75
  },
  {
    id: 2,
    name: "Borrower B",
    date: "NA",
    reason: "NA",
    fundsDistributed: 250000,
    milestonesCompleted: 60,
    discrepancies: 0, solar: 70, wind: 88, trees: 75
  },
  {
    id: 3,
    name: "Borrower C",
    date: "NA",
    reason: "NA",
    fundsDistributed: 150000,
    milestonesCompleted: 75,
    discrepancies: 0, solar: 70, wind: 88, trees: 75
  },
  {
    id: 4,
    name: "Borrower D",
    date: "NA",
    reason: 'NA',
    fundsDistributed: 300000,
    milestonesCompleted: 50,
    discrepancies: 0, solar: 70, wind: 88, trees: 75
  },
  {
    id: 5,
    name: "Borrower E",
    date: "NA",
    reason: "NA",
    fundsDistributed: 200000,
    milestonesCompleted: 90,
    discrepancies: 0, solar: 100, wind: 100, trees: 100
  },
];

// Document Upload Data
export const documentUploadData: DocumentUpload[] = [
  // Borrower A
  { borrowerId: 1, date: "2024-01-15", name: "Installation Plan", status: "Approved", reason: "NA", category: "Solar" },
  { borrowerId: 1, date: "2024-01-20", name: "Inspection Certificate", status: "Approved", reason: "NA", category: "Wind" },

  // Borrower B
  { borrowerId: 2, date: "2024-01-18", name: "Site Plan", status: "Approved", reason: "NA", category: "Trees" },
  { borrowerId: 2, date: "2024-01-22", name: "Energy Report", status: "Approved", reason: "NA", category: "Solar" },

  // Borrower C
  { borrowerId: 3, date: "2024-01-25", name: "Maintenance Log", status: "Approved", reason: "NA", category: "Wind" },
  { borrowerId: 3, date: "2024-01-30", name: "Installation Manual", status: "Approved", reason: "NA", category: "Trees" },

  // Borrower D
  { borrowerId: 4, date: "2024-02-01", name: "Site Inspection Report", status: "Approved", reason: "NA", category: "Solar" },
  { borrowerId: 4, date: "2024-02-03", name: "Safety Guidelines", status: "Approved", reason: "NA", category: "Wind" },

  // Borrower E
  { borrowerId: 5, date: "2024-02-05", name: "Emission Control Report", status: "Approved", reason: "NA", category: "Trees" },
  { borrowerId: 5, date: "2024-02-08", name: "Warranty Document", status: "Approved", reason: "NA", category: "Solar" },
];

// Transaction Data
export const transactionData: Transaction[] = [
  // Borrower A
  { borrowerId: 1, fundsPaid: "$300k", date: "2023-12-30", action: "Hit milestone of building 300 solar panels", category: "Solar" },
  { borrowerId: 1, fundsPaid: "$150k", date: "2024-01-10", action: "Hit milestone of installing 150 wind turbines", category: "Wind" },

  // Borrower B
  { borrowerId: 2, fundsPaid: "$200k", date: "2024-01-05", action: "Hit milestone of building 100 wind turbines", category: "Wind" },
  { borrowerId: 2, fundsPaid: "$100k", date: "2024-01-15", action: "Hit milestone of planting 500 trees", category: "Trees" },

  // Borrower C
  { borrowerId: 3, fundsPaid: "$250k", date: "2024-01-20", action: "Hit milestone of building 200 solar panels", category: "Solar" },
  { borrowerId: 3, fundsPaid: "$125k", date: "2024-01-25", action: "Hit milestone of installing 75 wind turbines", category: "Wind" },

  // Borrower D
  { borrowerId: 4, fundsPaid: "$300k", date: "2024-02-01", action: "Hit milestone of building 300 solar panels", category: "Solar" },
  { borrowerId: 4, fundsPaid: "$200k", date: "2024-02-03", action: "Hit milestone of installing 100 wind turbines", category: "Wind" },

  // Borrower E
  { borrowerId: 5, fundsPaid: "$350k", date: "2024-02-05", action: "Hit milestone of building 350 solar panels", category: "Solar" },
  { borrowerId: 5, fundsPaid: "$250k", date: "2024-02-08", action: "Hit milestone of planting 1,000 trees", category: "Trees" },
];

export default fakeBorrowers;
