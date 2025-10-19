import React from 'react';
import { getCoolDate } from '@/lib/toolets/ddmmyyyy';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type Volunteer = {
  userid: string;
  name: string;
  email: string;
  dob: string;
};

const ExportCSV = ({ data, fileName }: { data: Volunteer[]; fileName: string }) => {
    const downloadCSV = () => {
        if (data[0] != null) {
            const csvString = [
                ["Name", "Email", "DOB"],
                ...data.map((item: Volunteer) => [item.name, item.email, getCoolDate(item.dob)])
            ]
            .map(row => row.join(","))
            .join("\n")

            const blob = new Blob([csvString], { type: "text/csv" });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName || 'download.csv';
            document.body.appendChild(link);
            link.click();
            toast.success("Download started")
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
    } else {
        toast.error("Can't export volunteer list for event with no volunteers.")
    }
}

    return(
    <Button onClick={downloadCSV}>Download CSV</Button>
    
    );
};

export default ExportCSV;