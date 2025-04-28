import { TeamClient } from "./team-client";

interface TeamPageProps {
  params: { id: string };
}

export default function TeamPage({ params }: TeamPageProps) {
  return <TeamClient teamId={params.id} />;
}
