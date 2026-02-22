import { useState } from "react";
import { useTranslation } from "react-i18next";

import { searchEntities, type SearchResult } from "@/api/client";
import { SearchBar, type SearchParams } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";

export function Search() {
  const { t } = useTranslation();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await searchEntities(params.query, params.type);
      setResults(response.results);
      setHasSearched(true);
    } catch {
      setError(t("search.error"));
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {error && (
        <p style={{ color: "var(--color-sanction)", textAlign: "center" }}>{error}</p>
      )}
      {hasSearched && !error && <SearchResults results={results} />}
    </div>
  );
}
