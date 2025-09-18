import { getDoctorById, getAvailableTimeSlots } from "@/actions/appointments";
import { DoctorProfile } from "./_components/doctor-profile";
import { redirect } from "next/navigation";

export default async function DoctorProfilePage({ params }) {
  const { id } = params; // ✅ no await

  try {
    // Fetch doctor data and available slots in parallel
    const [doctorData, slotsData] = await Promise.allSettled([
      getDoctorById(id),
      getAvailableTimeSlots(id),
    ]);

    // Handle fetch errors gracefully
    if (doctorData.status !== "fulfilled" || !doctorData.value?.doctor) {
      console.error("Doctor data not found or fetch failed:", doctorData.reason);
      redirect("/doctors");
    }

    const availableDays =
      slotsData.status === "fulfilled" ? slotsData.value?.days || [] : [];

    return (
      <DoctorProfile
        doctor={doctorData.value.doctor}
        availableDays={availableDays}
      />
    );
  } catch (error) {
    console.error("Unexpected error loading doctor profile:", error);
    redirect("/doctors");
  }
}
