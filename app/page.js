import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth"); // ✅ immediately send to login
}