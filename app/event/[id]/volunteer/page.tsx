"use client"

import { VolunteerForm } from "@/components/volunteer-form"
import { useParams } from "next/navigation";

export default function VolunteerPage() {
      
    const params = useParams();
    
    return(
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        {params && (
            <VolunteerForm id={Array.isArray(params.id) ? params.id[0] : params.id} />
        )}
        </div>
    )
}