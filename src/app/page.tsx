import { HomePage } from "@/components/HomePage";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <section>
      <HomePage />
    </section>
  );
}
