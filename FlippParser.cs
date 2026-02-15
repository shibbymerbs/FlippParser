using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.Collections.Generic;
using FlippParser.Code;

namespace FlippParser
{
    public class Flippy
    {
        public async Task<FlippSearchResult> SearchAsync(SearchParams query)
        {
            using (var client = new HttpClient())
            {
                var parameters = new Dictionary<string, string>
                {
                    { "locale", "en-ca" },
                    { "postal_code", query.PostalCode },
                    { "q", query.Query }
                };
                var queryString = string.Join("&", parameters.Select(kv => $"{kv.Key}={Uri.EscapeDataString(kv.Value)}"));
                var url = $"https://backflipp.wishabi.com/flipp/items/search?{queryString}";

                var response = await client.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    return new FlippSearchResult { items = null, Total = 0, IsError = true, ErrorMessage = $"Error: {response.StatusCode}", SearchParams = query };
                }

                var stream = await response.Content.ReadAsStreamAsync();
                using (var doc = await JsonDocument.ParseAsync(stream))
                {
                    if (doc.RootElement.TryGetProperty("items", out var itemsElement) && itemsElement.ValueKind == JsonValueKind.Array)
                    {
                        var items = JsonSerializer.Deserialize<List<FlippItem>>(itemsElement.GetRawText());
                        if (items != null && items.Count > 0)
                        {
                            return new FlippSearchResult { items = items, Total = items.Count, IsError = false, SearchParams = query };
                        }
                        else
                        {
                            return new FlippSearchResult { items = null, Total = 0, IsError = true, ErrorMessage = "No items found.", SearchParams = query };
                        }
                    }
                    else
                    {
                        return new FlippSearchResult { items = null, Total = 0, IsError = true, ErrorMessage = "No items array in response.", SearchParams = query };
                    }
                }
            }
        }
    }
}
