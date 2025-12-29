// src/modules/tracking/hooks/useCaseLookup.ts
import * as React from "react";

import type { CaseLookupResponse } from "../tracking.types";
import { lookupCase } from "../tracking.api";
import { normalizeCaseCode, parseQueryParam } from "../tracking.helpers";

type UseCaseLookupState = {
  codeInput: string;
  isLoading: boolean;
  error: string | null;
  data: CaseLookupResponse | null;
};

export function useCaseLookup() {
  const [state, setState] = React.useState<UseCaseLookupState>({
    codeInput: "",
    isLoading: false,
    error: null,
    data: null,
  });

  const setCodeInput = React.useCallback((value: string) => {
    setState((s) => ({ ...s, codeInput: normalizeCaseCode(value) }));
  }, []);

  const reset = React.useCallback(() => {
    setState({ codeInput: "", isLoading: false, error: null, data: null });
  }, []);

  const handleLookup = React.useCallback(async (raw: string) => {
    const normalized = normalizeCaseCode(raw);

    setState((s) => ({
      ...s,
      codeInput: normalized,
      isLoading: true,
      error: null,
      data: null,
    }));

    const res = await lookupCase(normalized);

    if (!res.ok) {
      setState((s) => ({ ...s, isLoading: false, error: res.error, data: null }));
      return;
    }

    setState((s) => ({ ...s, isLoading: false, error: null, data: res.data }));
  }, []);

  React.useEffect(() => {
    const q = parseQueryParam("code");
    if (!q) return;

    const normalized = normalizeCaseCode(q);
    setState((s) => ({ ...s, codeInput: normalized }));

    void handleLookup(normalized);
  }, [handleLookup]);

  return {
    codeInput: state.codeInput,
    setCodeInput,
    isLoading: state.isLoading,
    error: state.error,
    data: state.data,
    handleLookup,
    reset,
  };
}
