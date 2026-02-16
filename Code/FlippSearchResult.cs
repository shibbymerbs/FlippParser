using System.Collections.Generic;

namespace FlippParser.Code;

public class FlippSearchResult
{
    public List<FlippItem>? items { get; set; }
    public int Total { get; set; }
    public bool IsError { get; set; }
    public string? ErrorMessage { get; set; }
    public SearchParams? SearchParams { get; set; }
}