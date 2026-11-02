import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SubjectProfile } from "@/components/SubjectProfile";
import { getSubjectBySlug, reviewsForSubject } from "@/lib/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  return { title: subject ? `${subject.name} — Ofie` : "Not found" };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const reviews = reviewsForSubject(subject.id);
  return <SubjectProfile subject={subject} reviews={reviews} />;
}
