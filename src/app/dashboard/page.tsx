import { DashAdm } from "@/components/DashAdm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function dashboard() {
  return <DashAdm />;
}
