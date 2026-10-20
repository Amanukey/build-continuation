import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "./projects.index";
export const Route=createFileRoute("/housing-projects/")({component:Projects});
