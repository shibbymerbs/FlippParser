# FlippParser

## Overview

FlippParser is a .NET Core web application that allows users to search for products on the Flipp platform (a grocery store price comparison service) by entering a postal code and search query. The application makes API calls to the Flipp backend, displays search results in a table or card view, and includes features like filtering, sorting, pagination, and view switching.

🌐 Demo link:  https://flippparser2-u68061.vm.elestio.app/

## Features

- Search for products on Flipp by postal code and query
- Display search results in table or card view
- Filter results by text input
- Sort results by any column
- Pagination for large result sets
- View switching between table and card views
- Persistent view preferences using localStorage
- Auto-save of last search parameters

## Technical Architecture

The application is built using .NET Core and follows the MVC pattern:

- **Frontend**: HTML, CSS, JavaScript with Bootstrap for responsive design
- **Backend**: .NET Core Web API with controllers and services
- **Data Model**: FlippSearchResult, FlippItem, SearchParams classes
- **API Integration**: Makes HTTP requests to Flipp's search API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FlippParser.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FlippParser
   ```

3. Restore dependencies:
   ```bash
   dotnet restore
   ```

4. Build the application:
   ```bash
   dotnet build
   ```

5. Run the application:
   ```bash
   dotnet run
   ```

## Usage

1. Open the application in a web browser
2. Enter a postal code and search query (e.g., "Walmart AND milk")
3. Click the Search button
4. View results in table or card view
5. Use the filter box to narrow results
6. Sort columns by clicking on column headers
7. Navigate through pages using pagination controls
8. Toggle between table and card views using the View toggle button

## API Integration

The application makes HTTP requests to the Flipp API at `https://backflipp.wishabi.com/flipp/items/search` with parameters for locale, postal code, and query. The API returns JSON data containing product information, which is parsed and displayed in the application.

## File Structure

```
FlippParser/
├── FlippParser.csproj
├── Program.cs
├── Controllers/
│   └── HomeController.cs
├── Models/
│   └── ErrorViewModel.cs
├── Views/
│   ├── Home/
│   │   ├── Index.cshtml
│   │   └── SearchResults.cshtml
│   └── Shared/
│       ├── _Layout.cshtml
│       ├── _ValidationScriptsPartial.cshtml
│       └── Error.cshtml
├── Code/
│   ├── FlippItem.cs
│   ├── FlippSearchResult.cs
│   └── SearchParams.cs
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── site.js
│   └── lib/
│       └── bootstrap/
├── appsettings.json
├── appsettings.Development.json
└── Dockerfile