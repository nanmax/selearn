"use client";

import React, { useEffect, useState } from "react";
import { columns, AnalyticsAdmin } from "./columns";
import { DataTable } from "./data-table";
import { getAnalyticsTableData } from "../action";

export default function DemoPage() {
  const [data, setData] = useState<AnalyticsAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res: AnalyticsAdmin[] = await getAnalyticsTableData();
      setData(res);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="container mx-auto py-10">
        <p className="text-sm text-muted-foreground">Loading analytics...</p>
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
