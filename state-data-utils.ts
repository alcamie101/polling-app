// State population data (2023 estimates)
export const statePopulations = {
  'AL': { name: 'Alabama', population: 5074296, region: 'South' },
  'AK': { name: 'Alaska', population: 733583, region: 'West' },
  'AZ': { name: 'Arizona', population: 7359197, region: 'West' },
  'AR': { name: 'Arkansas', population: 3025891, region: 'South' },
  'CA': { name: 'California', population: 39029342, region: 'West' },
  'CO': { name: 'Colorado', population: 5839926, region: 'West' },
  'CT': { name: 'Connecticut', population: 3626205, region: 'Northeast' },
  'DE': { name: 'Delaware', population: 1018396, region: 'South' },
  'FL': { name: 'Florida', population: 22244823, region: 'South' },
  'GA': { name: 'Georgia', population: 10912876, region: 'South' },
  'HI': { name: 'Hawaii', population: 1440196, region: 'West' },
  'ID': { name: 'Idaho', population: 1939033, region: 'West' },
  'IL': { name: 'Illinois', population: 12582032, region: 'Midwest' },
  'IN': { name: 'Indiana', population: 6833037, region: 'Midwest' },
  'IA': { name: 'Iowa', population: 3200517, region: 'Midwest' },
  'KS': { name: 'Kansas', population: 2937150, region: 'Midwest' },
  'KY': { name: 'Kentucky', population: 4505836, region: 'South' },
  'LA': { name: 'Louisiana', population: 4624047, region: 'South' },
  'ME': { name: 'Maine', population: 1372247, region: 'Northeast' },
  'MD': { name: 'Maryland', population: 6177224, region: 'South' },
  'MA': { name: 'Massachusetts', population: 7029917, region: 'Northeast' },
  'MI': { name: 'Michigan', population: 10034113, region: 'Midwest' },
  'MN': { name: 'Minnesota', population: 5707390, region: 'Midwest' },
  'MS': { name: 'Mississippi', population: 2940057, region: 'South' },
  'MO': { name: 'Missouri', population: 6154913, region: 'Midwest' },
  'MT': { name: 'Montana', population: 1084225, region: 'West' },
  'NE': { name: 'Nebraska', population: 1961504, region: 'Midwest' },
  'NV': { name: 'Nevada', population: 3143991, region: 'West' },
  'NH': { name: 'New Hampshire', population: 1388992, region: 'Northeast' },
  'NJ': { name: 'New Jersey', population: 9267130, region: 'Northeast' },
  'NM': { name: 'New Mexico', population: 2117522, region: 'West' },
  'NY': { name: 'New York', population: 20201249, region: 'Northeast' },
  'NC': { name: 'North Carolina', population: 10551162, region: 'South' },
  'ND': { name: 'North Dakota', population: 774948, region: 'Midwest' },
  'OH': { name: 'Ohio', population: 11780017, region: 'Midwest' },
  'OK': { name: 'Oklahoma', population: 3986639, region: 'South' },
  'OR': { name: 'Oregon', population: 4246155, region: 'West' },
  'PA': { name: 'Pennsylvania', population: 12964056, region: 'Northeast' },
  'RI': { name: 'Rhode Island', population: 1097379, region: 'Northeast' },
  'SC': { name: 'South Carolina', population: 5190705, region: 'South' },
  'SD': { name: 'South Dakota', population: 886667, region: 'Midwest' },
  'TN': { name: 'Tennessee', population: 7051339, region: 'South' },
  'TX': { name: 'Texas', population: 30029572, region: 'South' },
  'UT': { name: 'Utah', population: 3337975, region: 'West' },
  'VT': { name: 'Vermont', population: 645570, region: 'Northeast' },
  'VA': { name: 'Virginia', population: 8642274, region: 'South' },
  'WA': { name: 'Washington', population: 7738692, region: 'West' },
  'WV': { name: 'West Virginia', population: 1782959, region: 'South' },
  'WI': { name: 'Wisconsin', population: 5892539, region: 'Midwest' },
  'WY': { name: 'Wyoming', population: 578803, region: 'West' }
};

// Regional baseline margins (typical Dem-Rep margins)
export const regionalBaselines = {
  'Northeast': { demMin: 52, demMax: 62 },
  'West': { demMin: 51, demMax: 58 },
  'Midwest': { demMin: 46, demMax: 54 },
  'South': { demMin: 42, demMax: 49 }
};

// State-specific adjustments to regional baseline
export const stateAdjustments = {
  'CA': { adjust: 12 }, // More Democratic
  'VT': { adjust: 15 },
  'MA': { adjust: 10 },
  'HI': { adjust: 15 },
  'NY': { adjust: 8 },
  'WY': { adjust: -20 }, // More Republican
  'WV': { adjust: -15 },
  'ID': { adjust: -15 },
  'OK': { adjust: -15 },
  'ND': { adjust: -12 },
  'GA': { adjust: 2 }, // More competitive
  'AZ': { adjust: 1 },
  'PA': { adjust: 0 },
  'MI': { adjust: 0 },
  'WI': { adjust: 0 },
  'NV': { adjust: 1 }
};

// Calculate sample size based on population
export const calculateStateSampleSize = (population: number): number => {
  // Base sample size calculation with diminishing returns for larger populations
  const baseSample = Math.sqrt(population / 10000);
  return Math.max(400, Math.min(2000, Math.round(baseSample * 20)));
};

// Generate realistic polling numbers for a state
export const generateStatePolling = (
  stateCode: string,
  baseDemMin: number,
  baseDemMax: number
): { democrat: number; republican: number; margin: number } => {
  const adjustment = stateAdjustments[stateCode]?.adjust || 0;
  
  // Adjust the baseline range based on state-specific factors
  const demMin = baseDemMin + adjustment;
  const demMax = baseDemMax + adjustment;
  
  // Add some random variation
  const democrat = Number((Math.random() * (demMax - demMin) + demMin).toFixed(1));
  const republican = Number((100 - democrat).toFixed(1));
  const margin = Number((democrat - republican).toFixed(1));
  
  return { democrat, republican, margin };
};
