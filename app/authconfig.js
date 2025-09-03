export const authConfig = {
    providers:[],
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized({ auth, request }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
        
        // Protect dashboard routes - require authentication
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // This will redirect to /login automatically
        }
        
        // Allow all other routes (including /login)
        return true;
      },
      async redirect({ url, baseUrl }) {
        // Fix the URL generation issue
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        else if (new URL(url).origin === baseUrl) return url;
        return baseUrl;
      },
    },
  };