import { use } from "react";
import { TeamClient } from "./team-client";

export default function TeamPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <TeamClient teamId={id} />;
}
