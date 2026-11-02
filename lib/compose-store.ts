"use client";

import { useCallback, useEffect, useState } from "react";
import type { SubjectType } from "./types";

export interface ComposeState {
  step: number; // 1-4
  subjectType?: SubjectType;
  // Entity selection (step 1)
  entitySubjectId?: string; // set when an existing subject/seller was picked
  title: string; // the entity's display name (selected or freshly typed)
  isNewEntity: boolean;
  sellerPlatform: string; // online_seller only
  sellerHandle: string; // online_seller only
  // Tell your story (step 2)
  story: string;
  durationFrom: string;
  durationTo: string;
  amount: number;
  // Rate (step 3)
  overallStars: number;
  criteriaRatings: Record<string, number>;
  // Evidence (step 4)
  evidenceCategories: string[];
}

const DEFAULT_STATE: ComposeState = {
  step: 1,
  title: "",
  isNewEntity: false,
  sellerPlatform: "",
  sellerHandle: "",
  story: "",
  durationFrom: "",
  durationTo: "",
  amount: 0,
  overallStars: 0,
  criteriaRatings: {},
  evidenceCategories: [],
};

const STORAGE_KEY = "ofie:compose-draft";

function readStoredState(): ComposeState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useComposeStore() {
  const [state, setState] = useState<ComposeState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time read of sessionStorage on mount: this can only happen on the
    // client, so it can't be done during the initial render without a
    // server/client markup mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readStoredState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage failures (private mode, quota, etc.)
    }
  }, [state, hydrated]);

  const update = useCallback((patch: Partial<ComposeState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { state, update, reset, hydrated };
}
