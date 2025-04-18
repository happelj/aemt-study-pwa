export const metadata = {
  title: 'AEMT Study App',
  description: 'Flashcards and quizzes for AEMT certification',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
