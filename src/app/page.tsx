import Image from "next/image";
import Container from "../components/layout/Container";

export default function Home() {
  return (
    <main className="p-20 bg-gray-200 min-h-screen">
      <Container>
         <div className="bg-blue-500 text-white p-20 rounded-xl">
        Tailwind virker 🎉
      </div>
      </Container>
    </main>
  );
}