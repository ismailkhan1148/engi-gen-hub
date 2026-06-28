import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Ismail — Engineer, Electrician, Solar Installer & CS Student" },
      { name: "description", content: "Portfolio of Muhammad Ismail bridging Mechanical Engineering, Electrical Systems, Solar Energy, and Computer Science." },
      { property: "og:title", content: "Muhammad Ismail — Engineering & Technology Portfolio" },
      { property: "og:description", content: "Mechanical Engineering · Electrical Systems · Solar Energy · Computer Science." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
