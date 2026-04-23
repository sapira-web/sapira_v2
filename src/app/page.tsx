import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";
import EditorialImagePanel from "@/components/sections/home/EditorialImagePanel";
import OperationalPresence from "@/components/sections/home/OperationalPresence";
import ValuePropositions from "@/components/sections/home/ValuePropositions";
import BrandClose from "@/components/sections/home/BrandClose";

export const metadata: Metadata = {
  title: "Sapira — Operational intelligence for European enterprises",
  description:
    "Pharo captures how your business actually operates and turns it into infrastructure. For European companies that have outgrown what any software was built to handle.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <EditorialImagePanel />
      <OperationalPresence />
      <ValuePropositions />
      <BrandClose />
    </>
  );
}
