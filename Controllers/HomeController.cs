using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using FlippParser.Models;
using FlippParser.Code;

namespace FlippParser.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Search(SearchParams searchParams)
    {
        var parser = new Flippy();
        var results = await parser.SearchAsync(searchParams);
        return View("SearchResults", results);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

}
