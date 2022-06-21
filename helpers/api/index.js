export function AutoSuggestApi(val) {
  return `https://ground-auto-suggest.makemytrip.com/rails/autosuggest/stations?search_query=${val}&limit=10&version=v1`;
}
