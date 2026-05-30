import { redirect } from "next/navigation";

export default function Home() {
    redirect("/room?eventId=1");
}