export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">My Business Card</h1>
        <p className="text-xl mb-8">Welcome to my digital business card!</p>
        
        <div className="mt-6 grid gap-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-black dark:text-white">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Contact Information</h2>
            <p className="mb-2">Email: example@email.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-black dark:text-white">
            <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">About Me</h2>
            <p>Professional developer with expertise in Next.js and modern web technologies.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
