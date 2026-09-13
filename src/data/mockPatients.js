export const mockPatients = [
  {
    id: "PAT-8092",
    name: "Eleanor Vance",
    age: 64,
    gender: "Female",
    room: "ICU-04",
    vitals: {
      heartRate: 112,
      bp: "145/92",
      spo2: 91,
      temp: "38.2 °C"
    },
    riskScore: 84,
    riskLevel: "High",
    primaryCondition: "Acute Exacerbation of COPD",
    admissionDate: "2026-03-07",
    history: [
      "Type 2 Diabetes Mellitus (10 yrs)",
      "Hypertension",
      "Prior readmission within 30 days"
    ]
  },
  {
    id: "PAT-4102",
    name: "Marcus Brody",
    age: 52,
    gender: "Male",
    room: "302-B",
    vitals: {
      heartRate: 78,
      bp: "122/80",
      spo2: 98,
      temp: "36.8 °C"
    },
    riskScore: 28,
    riskLevel: "Low",
    primaryCondition: "Post-op Appendectomy",
    admissionDate: "2026-03-08",
    history: [
      "No chronic conditions"
    ]
  },
  {
    id: "PAT-6190",
    name: "Sophia Martinez",
    age: 71,
    gender: "Female",
    room: "ICU-01",
    vitals: {
      heartRate: 98,
      bp: "158/98",
      spo2: 93,
      temp: "37.5 °C"
    },
    riskScore: 68,
    riskLevel: "Medium",
    primaryCondition: "Congestive Heart Failure",
    admissionDate: "2026-03-06",
    history: [
      "Coronary Artery Disease",
      "Chronic Kidney Disease Stage 3"
    ]
  }
];