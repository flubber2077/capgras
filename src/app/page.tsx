import { Navbar } from '@/components/Navbar'

export default async function Index() {
  return (
    <main className="prose:max-w-none prose:text-center prose mx-auto mt-10 list-none text-center text-xl backdrop-blur-xl prose-ul:list-none">
      <h1 className="mb-20 font-header text-6xl font-medium text-slate-800 sm:text-8xl">
        CAPGRAS
      </h1>
      <Navbar/>
      <h2>pic of sexy dead people</h2>
    </main>
  )
}
