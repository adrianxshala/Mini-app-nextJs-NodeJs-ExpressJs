export const metadata = {
    title: 'My App',
    description: 'Kjo është një aplikacion Next.js',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {children} {/* Pika ku do të ngarkohen të gjitha faqet */}
        </body>
      </html>
    );
  }
  