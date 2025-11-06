# Task 3: CSR & SSR

## a. Explain CSR & SSR

### 1. CSR (Client-Side Rendering)

Client-Side Rendering is a technique where the browser downloads a minimal HTML page and uses JavaScript to dynamically generate and render content on the client side.

**How CSR works:**

1. The browser loads a minimal HTML page.
2. JavaScript bundles (e.g., React) are then loaded.
3. The JavaScript code runs in the browser and dynamically renders the UI.
4. User interactions are handled by JavaScript without full page reloads — only the affected components or sections are updated.

### 2. SSR (Server-Side Rendering)

Server-Side Rendering is a technique where the server generates the complete HTML for a page and sends it to the client. The browser then displays this pre-rendered HTML.

**How SSR works:**

1. The user requests a page.
2. The server runs code to generate the full HTML page.
3. The browser receives and displays fully rendered content immediately.
4. JavaScript may load afterward to make the page interactive.


## b. Difference Between CSR and SSR with Advantages

| Feature             | Client-Side Rendering (CSR)                                                                                  | Server-Side Rendering (SSR)                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| **Definition**      | Rendering occurs in the browser using JavaScript.                                                            | Rendering occurs on the server before the content is sent to the browser. |
| **Initial Load**    | Sends a minimal HTML shell; JavaScript builds and renders the UI.                                            | Sends a fully rendered HTML page from the server.                         |
| **Interactivity**   | High interactivity with fast, dynamic updates.                                                               | Interactivity is possible but may be delayed until JavaScript is loaded.  |
| **SEO**             | SEO can be challenging as content is rendered dynamically via JavaScript.                                    | SEO-friendly, as the content is fully rendered on page load.              |
| **Performance**     | Slower initial load due to JavaScript parsing; faster updates after the page has loaded.                     | Faster initial load; updates may be slower due to server-side processing. |
| **Server Load**     | Reduced server load—client handles rendering.                                                                | Higher server load—server processes rendering on each request.            |
| **User Experience** | Smooth transitions and interactions; first load may be slower as JavaScript must be downloaded and executed. | Users see a fully rendered page quickly, improving perceived performance. |
