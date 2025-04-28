import { TeamClient } from "./team-client";

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;

  return <TeamClient teamId={id} />;
}
