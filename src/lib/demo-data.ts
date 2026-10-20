export const schemes = [
  {
    code: "BLC",
    name: "Beneficiary-Led Construction",
    short: "Support for eligible households to build a new home on their own land.",
    detail:
      "Explore how assistance may support households that hold land and want to construct a pucca house. Land documentation, building plans and local approvals are typically checked by the urban local body.",
    steps: ["Confirm land ownership records", "Prepare a basic house plan", "Check local approval requirements", "Follow stage-wise construction guidance"],
  },
  {
    code: "AHP",
    name: "Affordable Housing in Partnership",
    short: "Homes built in partnership projects with public or private agencies.",
    detail:
      "Partnership projects offer affordable units in planned developments. Allotment rules, unit sizes and contributions vary by project and are decided by the implementing agency.",
    steps: ["Browse partner projects in your city", "Read the project's allotment rules", "Check household and income conditions", "Apply through the authorised channel"],
  },
  {
    code: "ARH",
    name: "Affordable Rental Housing",
    short: "Rental homes for urban migrants, workers and students.",
    detail:
      "Rental housing is meant for people who need affordable accommodation in a city without owning a home there. Terms and rent levels are set by the operating entity.",
    steps: ["Identify rental housing near your workplace", "Check tenancy terms", "Prepare identity and employment details", "Contact the operator through official channels"],
  },
  {
    code: "ISS",
    name: "Interest Subsidy Scheme",
    short: "Guidance on home-loan interest support through lending institutions.",
    detail:
      "Interest support is processed through participating lenders. Loan terms, subsidy amounts and eligibility are verified by the lender and the central nodal agency.",
    steps: ["Speak to a participating lender", "Understand loan and subsidy terms", "Prepare income and property details", "Track the claim with your lender"],
  },
] as const;

export type SchemeCode = (typeof schemes)[number]["code"];

export const demoProjects = [
  { slug: "green-courtyard-residences", name: "Green Courtyard Residences", city: "Pune", state: "Maharashtra", scheme: "AHP", type: "Partner housing", summary: "Illustrative partner-housing listing for exploring the project directory." },
  { slug: "river-view-homes", name: "River View Homes", city: "Ahmedabad", state: "Gujarat", scheme: "AHP", type: "Partner housing", summary: "Sample project information. Availability is not confirmed." },
  { slug: "city-rental-homes", name: "City Rental Homes", city: "Nagpur", state: "Maharashtra", scheme: "ARH", type: "Rental housing", summary: "Illustrative rental-housing listing; check local conditions before applying." },
  { slug: "lakeside-workers-hostel", name: "Lakeside Workers' Residences", city: "Bhopal", state: "Madhya Pradesh", scheme: "ARH", type: "Rental housing", summary: "Synthetic rental example for migrant workers. Not a real listing." },
] as const;

export type DemoProject = (typeof demoProjects)[number];

export const demoApplications = [
  { reference: "DEMO-24-0816", applicant: "Sample Applicant A", component: "BLC", status: "Draft in progress", city: "Pune" },
  { reference: "DEMO-24-0632", applicant: "Sample Applicant B", component: "AHP", status: "Review requested", city: "Ahmedabad" },
  { reference: "DEMO-24-0419", applicant: "Sample Applicant C", component: "ISS", status: "Guidance viewed", city: "Nagpur" },
] as const;

export const faqItems = [
  { category: "Eligibility", question: "Does this assessment confirm my eligibility?", answer: "No. It is an introductory, indicative guide for a demonstration. Eligibility depends on current scheme rules and verification by the responsible authority." },
  { category: "Schemes", question: "How do I choose a scheme component?", answer: "Start with the housing support you are exploring: construction, a partner housing project, rental housing, or loan-related guidance. Check the latest local instructions before taking action." },
  { category: "Documents", question: "Does every applicant need the same documents?", answer: "No. The correct list depends on the component and applicable local requirements. This site offers a preparation guide, not a final mandatory checklist." },
  { category: "Applications", question: "Will an application here be sent to a government office?", answer: "No. Application actions on this prototype are simulated locally. It is not connected to a government submission, verification or payment service." },
  { category: "Projects", question: "Are the housing projects and availability real?", answer: "No. Projects displayed in the directory are synthetic examples created for this demonstration. No availability or allotment is represented as confirmed." },
];

export const documentGroups = [
  { title: "Identity", items: ["Identity proof for each adult member", "Household composition details"] },
  { title: "Income", items: ["Income declaration or certificate as required locally", "Employment or occupation details"] },
  { title: "Property & land", items: ["Land records (for construction support)", "Self-declaration about not owning a pucca house"] },
  { title: "Banking", items: ["Bank account details for any transfer — share only through official portals"] },
];

export const officialSchemeUrl = "https://pmay-urban.gov.in/";

export type EligibilityAnswers = {
  location: string;
  householdIncome: string;
  ownsPuccaHome: string;
  previousAssistance: string;
  housingGoal: string;
  component: string;
};

export const eligibilityQuestions: { key: keyof EligibilityAnswers; label: string; hint: string; options: readonly string[] }[] = [
  { key: "location", label: "Where are you looking for housing guidance?", hint: "This guide focuses on urban housing support.", options: ["An urban area", "A rural area", "Not sure yet"] },
  { key: "householdIncome", label: "What is your approximate annual household income?", hint: "This helps you identify what income details to verify. It is not an eligibility decision.", options: ["Under ₹3 lakh", "₹3–6 lakh", "₹6–9 lakh", "Over ₹9 lakh", "I would rather not say"] },
  { key: "ownsPuccaHome", label: "Does your household own a pucca home in India?", hint: "Use the current scheme definition when checking official guidance.", options: ["Yes", "No", "Not sure"] },
  { key: "previousAssistance", label: "Has anyone in your household received housing assistance?", hint: "Previous assistance may affect next steps.", options: ["Yes", "No", "Not sure"] },
  { key: "housingGoal", label: "What kind of housing support are you exploring?", hint: "Choose the closest match.", options: ["Construct a home", "Explore partner housing", "Find rental housing", "Home-loan guidance"] },
  { key: "component", label: "Which component would you like to explore first?", hint: "You can change this later. It does not submit an application.", options: schemes.map((s) => `${s.code} — ${s.name}`) },
];

export const emptyEligibilityAnswers: EligibilityAnswers = { location: "", householdIncome: "", ownsPuccaHome: "", previousAssistance: "", housingGoal: "", component: "" };

export function getIndicativeEligibility(answers: EligibilityAnswers) {
  const unanswered = eligibilityQuestions.filter((q) => !answers[q.key]);
  const unknowns = ["Not sure", "Not sure yet", "I would rather not say"].some((a) =>
    [answers.location, answers.householdIncome, answers.ownsPuccaHome, answers.previousAssistance].includes(a),
  );
  const isUrban = answers.location === "An urban area";
  const overIncome = answers.householdIncome === "Over ₹9 lakh";
  const flagged = !isUrban || answers.ownsPuccaHome === "Yes" || answers.previousAssistance === "Yes" || overIncome || unknowns;
  return {
    isComplete: unanswered.length === 0,
    outcome: flagged ? "Needs local verification" : "Explore this pathway",
    component: answers.component.split(" — ")[0] || "Not selected",
    nextStep: !isUrban
      ? "Confirm which local housing programme applies in your area before proceeding."
      : answers.ownsPuccaHome === "Yes"
        ? "Ask the responsible authority how existing home ownership affects the current scheme conditions."
        : overIncome
          ? "Your stated income may be above typical limits. Check current income categories with the authority."
          : "Review the component-specific instructions and confirm household, land and income conditions locally.",
  };
}

export function searchDemoProjects(query: string, component = "All") {
  const q = query.trim().toLowerCase();
  return demoProjects.filter((p) => {
    const text = [p.name, p.city, p.state, p.type].some((v) => v.toLowerCase().includes(q));
    return text && (component === "All" || p.scheme === component);
  });
}

export type DemoRole = "citizen" | "officer" | "admin";
export const demoRoles: { role: DemoRole; label: string; description: string }[] = [
  { role: "citizen", label: "Citizen", description: "Save drafts and follow sample application progress." },
  { role: "officer", label: "Officer", description: "Review a queue of synthetic applications." },
  { role: "admin", label: "Administrator", description: "Manage sample projects and announcements." },
];

export const officerNextStatus: Record<string, string> = {
  "Draft in progress": "Review requested",
  "Review requested": "Field check (simulated)",
  "Field check (simulated)": "Recommended (simulated)",
  "Guidance viewed": "Draft in progress",
};
export function advanceStatus(status: string) {
  return officerNextStatus[status] ?? status;
}
