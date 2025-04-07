
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase";

interface TableStatus {
  name: string;
  exists: boolean;
  recordCount: number | null;
  checking: boolean;
}

export default function SqlTablesStatus() {
  const [isChecking, setIsChecking] = useState(false);
  const [tableStatuses, setTableStatuses] = useState<TableStatus[]>([
    { name: 'jobs', exists: false, recordCount: null, checking: false },
    { name: 'senior_livings', exists: false, recordCount: null, checking: false },
    { name: 'match_profiles', exists: false, recordCount: null, checking: false },
    { name: 'job_applications', exists: false, recordCount: null, checking: false },
    { name: 'job_scrapers', exists: false, recordCount: null, checking: false },
    { name: 'events', exists: false, recordCount: null, checking: false },
    { name: 'event_attendees', exists: false, recordCount: null, checking: false },
    { name: 'donations', exists: false, recordCount: null, checking: false },
    { name: 'success_stories', exists: false, recordCount: null, checking: false },
    { name: 'user_settings', exists: false, recordCount: null, checking: false },
  ]);

  const checkTableExists = async (tableName: string, index: number) => {
    // Set checking status for this table
    setTableStatuses(prev => {
      const newStatuses = [...prev];
      newStatuses[index] = { ...newStatuses[index], checking: true };
      return newStatuses;
    });

    try {
      // Try to select a count from the table
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      // Update table status based on result
      setTableStatuses(prev => {
        const newStatuses = [...prev];
        newStatuses[index] = {
          ...newStatuses[index],
          exists: !error,
          recordCount: count,
          checking: false
        };
        return newStatuses;
      });
    } catch (error) {
      console.error(`Error checking table ${tableName}:`, error);
      setTableStatuses(prev => {
        const newStatuses = [...prev];
        newStatuses[index] = {
          ...newStatuses[index],
          exists: false,
          recordCount: null,
          checking: false
        };
        return newStatuses;
      });
    }
  };

  const checkAllTables = async () => {
    setIsChecking(true);
    for (let i = 0; i < tableStatuses.length; i++) {
      await checkTableExists(tableStatuses[i].name, i);
    }
    setIsChecking(false);
  };

  useEffect(() => {
    checkAllTables();
  }, []);

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Database Tables</h2>
        <Button 
          onClick={checkAllTables} 
          disabled={isChecking}
          variant="outline"
          size="sm"
        >
          {isChecking ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Check Tables
            </>
          )}
        </Button>
      </div>
      
      <Table>
        <TableCaption>Status of Supabase tables in the project</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Table Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Record Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableStatuses.map((table, index) => (
            <TableRow key={table.name}>
              <TableCell className="font-medium">{table.name}</TableCell>
              <TableCell>
                {table.checking ? (
                  <span className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </span>
                ) : table.exists ? (
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Exists
                  </span>
                ) : (
                  <span className="flex items-center text-red-600 dark:text-red-400">
                    <XCircle className="h-4 w-4 mr-2" />
                    Missing
                  </span>
                )}
              </TableCell>
              <TableCell>
                {table.checking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : table.exists ? (
                  table.recordCount !== null ? table.recordCount : 'Unknown'
                ) : (
                  'N/A'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
