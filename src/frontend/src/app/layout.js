import "@/styles/globals.css";
import { AuthProvider } from "@/hooks/use-auth-token";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
