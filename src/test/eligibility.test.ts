import { describe, expect, it } from "vitest";
import { getIndicativeEligibility, searchDemoProjects, advanceStatus, emptyEligibilityAnswers } from "@/lib/demo-data";

const base = { location: "An urban area", householdIncome: "Under ₹3 lakh", ownsPuccaHome: "No", previousAssistance: "No", housingGoal: "Construct a home", component: "BLC — Beneficiary-Led Construction" };

describe("eligibility", () => {
  it("urban, no home → explore", () => expect(getIndicativeEligibility(base).outcome).toBe("Explore this pathway"));
  it("owns pucca home → verify", () => expect(getIndicativeEligibility({ ...base, ownsPuccaHome: "Yes" }).outcome).toBe("Needs local verification"));
  it("rural → verify", () => expect(getIndicativeEligibility({ ...base, location: "A rural area" }).outcome).toBe("Needs local verification"));
  it("incomplete", () => expect(getIndicativeEligibility(emptyEligibilityAnswers).isComplete).toBe(false));
  it("component code", () => expect(getIndicativeEligibility(base).component).toBe("BLC"));
});

describe("mock flows", () => {
  it("filters projects by component", () => expect(searchDemoProjects("", "ARH").every((p) => p.scheme === "ARH")).toBe(true));
  it("advances status", () => expect(advanceStatus("Draft in progress")).toBe("Review requested"));
});
