# Movie App

Welcome to the **Movie App**, a web application that allows you to explore movies and TV shows from the IMDb database. With this app, you can search for any movie or TV show, add it to your favorites, and manage your favorites list by removing individual items or clearing the entire list.

## Features

- **Search Movies and TV Shows**: Search for any movie or TV show using data fetched from the IMDb database via an API.
- **Favorites Management**:
  - Add movies or TV shows to your favorites list using zustand.
  - Remove individual movies or TV shows from your favorites.
  - Clear your entire favorites list.
- **Pagination**: To avoid overwhelming the user, the app uses pagination to display a limited number of results at a time.
- **Conditional Rendering**: If a search result is found, the app hides the default list of movies to focus on the search results.
- **Server-Side Rendering (SSR)**: The app is optimized for performance with SSR.
- **Deployment**: The app is deployed using **Vercel** with CI/CD integration for seamless updates from a GitHub repository.

## Design Decisions

1. **Search and Default List**: The first page of the app displays a search bar and a default list of movies. However, when a user searches for a movie, the default list is hidden to prioritize the search results.
2. **Pagination**: To handle large datasets and improve performance, pagination was implemented to limit the number of movies displayed per page.
3. **SSR**: Server-side rendering was added to enhance the app's performance and SEO.
4. **Deployment**: The app is deployed on **Vercel** with CI/CD integration, ensuring automatic updates whenever changes are pushed to the GitHub repository.

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Bun**: A fast all-in-one JavaScript runtime used as the package manager and runtime for this project.
- **API**: IMDb database API for fetching movie and TV show data.
- **Vercel**: For deployment and CI/CD integration.
- **GitHub**: For version control and repository hosting.

## How to Run the App Locally

To run the app locally, follow these steps:

1. **Install Bun**: If you don't have Bun installed, you can install it by following the instructions on the [official Bun website](https://bun.sh/).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
   ```
3. **Install Dependencies**:

   ```bash
   bun install
   ```

4. **Run the App**:

   ```bash
   bun dev
   ```

5. **Open the App**:
   Copy the localhost URL provided in the terminal (e.g., http://localhost:3000).
   Paste it into your browser's address bar and press Enter.

## Deployment

The app is deployed and can be accessed at https://movie-app-omega-virid.vercel.app/
