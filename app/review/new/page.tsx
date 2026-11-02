"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useComposeStore } from "@/lib/compose-store";
import { ComposeShell, ComposeFooter } from "@/components/compose/ComposeShell";
import { StepSelectEntity } from "@/components/compose/StepSelectEntity";
import { StepTellYourStory } from "@/components/compose/StepTellYourStory";
import { StepRateExperience } from "@/components/compose/StepRateExperience";
import { StepEvidence } from "@/components/compose/StepEvidence";
import { detectIdentityRisks, hasBlockingRisk } from "@/lib/identity-risk";
import { CATS } from "@/lib/categories";
import type { SubjectType } from "@/lib/types";

function toggle(list: string[], key: string): string[] {
  return list.includes(key) ? list.filter((k) => k !== key) : [...list, key];
}

export default function NewReviewPage() {
  return (
    <Suspense fallback={null}>
      <NewReviewForm />
    </Suspense>
  );
}

function NewReviewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, update, reset, hydrated } = useComposeStore();

  const typeParam = searchParams.get("type") as SubjectType | null;

  useEffect(() => {
    if (hydrated && typeParam && !state.subjectType && typeParam in CATS) {
      update({ subjectType: typeParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, typeParam]);

  if (!hydrated) return null;

  const subjectType = state.subjectType ?? typeParam ?? undefined;
  const isSeller = subjectType === "online_seller";

  const stepTitle = (() => {
    if (state.step === 1) {
      if (isSeller) return "Select Online Seller";
      return subjectType ? `Select ${CATS[subjectType].label}` : "Select entity";
    }
    return ["", "Tell your story", "How Was Your Experience", "Add your evidence"][state.step];
  })();

  const canAdvance = (() => {
    switch (state.step) {
      case 1:
        if (isSeller) return state.sellerPlatform.length > 0 && state.sellerHandle.trim().length > 0;
        return state.title.trim().length > 0;
      case 2:
        return (
          state.story.trim().length >= 20 &&
          !hasBlockingRisk(detectIdentityRisks(state.story))
        );
      default:
        return true;
    }
  })();

  function goNext() {
    if (state.step < 4) {
      update({ step: state.step + 1 });
      return;
    }
    const id = `draft-${Date.now()}`;
    const displayName = isSeller ? `${state.sellerHandle} (${state.sellerPlatform})` : state.title;
    try {
      const raw = window.sessionStorage.getItem("ofie:my-reviews");
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({
        id,
        subjectType,
        subjectQuery: displayName,
        body: state.story,
        createdAt: new Date().toISOString(),
      });
      window.sessionStorage.setItem("ofie:my-reviews", JSON.stringify(list));
    } catch {
      // ignore storage failures
    }
    reset();
    router.push(`/review/success?id=${id}`);
  }

  function goBack() {
    if (state.step > 1) {
      update({ step: state.step - 1 });
    } else {
      router.push("/");
    }
  }

  return (
    <ComposeShell
      title={stepTitle}
      step={state.step}
      totalSteps={4}
      onBack={goBack}
      onClose={() => {
        reset();
        router.push("/");
      }}
    >
      {state.step === 1 && (
        <StepSelectEntity
          subjectType={subjectType}
          title={state.title}
          entitySubjectId={state.entitySubjectId}
          sellerPlatform={state.sellerPlatform}
          sellerHandle={state.sellerHandle}
          onSelectExisting={(id, name) =>
            update({ entitySubjectId: id || undefined, title: name, isNewEntity: false })
          }
          onAddNew={(name) => update({ entitySubjectId: undefined, title: name, isNewEntity: true })}
          onChangeSellerPlatform={(platform) => update({ sellerPlatform: platform })}
          onChangeSellerHandle={(handle) => update({ sellerHandle: handle })}
        />
      )}
      {state.step === 2 && (
        <StepTellYourStory
          subjectType={subjectType}
          entityName={isSeller ? state.sellerHandle : state.title}
          story={state.story}
          durationFrom={state.durationFrom}
          durationTo={state.durationTo}
          amount={state.amount}
          onChangeStory={(v) => update({ story: v })}
          onChangeDurationFrom={(v) => update({ durationFrom: v })}
          onChangeDurationTo={(v) => update({ durationTo: v })}
          onChangeAmount={(v) => update({ amount: v })}
        />
      )}
      {state.step === 3 && (
        <StepRateExperience
          subjectType={subjectType}
          overallStars={state.overallStars}
          criteriaRatings={state.criteriaRatings}
          onChangeOverallStars={(n) => update({ overallStars: n })}
          onRateCriterion={(key, value) =>
            update({ criteriaRatings: { ...state.criteriaRatings, [key]: value } })
          }
        />
      )}
      {state.step === 4 && (
        <StepEvidence
          subjectType={subjectType}
          selected={state.evidenceCategories}
          onToggle={(key) => update({ evidenceCategories: toggle(state.evidenceCategories, key) })}
        />
      )}

      <ComposeFooter
        onNext={goNext}
        label={state.step === 4 ? "Submit report" : "Continue"}
        disabled={!canAdvance}
      />
    </ComposeShell>
  );
}
