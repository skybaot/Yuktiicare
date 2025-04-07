
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Database, Code, Users, CalendarDays, Briefcase, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import SqlTablesStatus from "@/components/admin/SqlTablesStatus";
import JobScraperStatus from "@/components/jobs/JobScraperStatus";

export default function Admin() {
  const { isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("database");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <section className="section-container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-8"
          >
            <Shield className="h-8 w-8 mr-3 text-primary" />
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </motion.div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TabsTrigger value="database" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                <span>Database</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2" />
                <span>Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    Database Management
                  </CardTitle>
                  <CardDescription>
                    Manage database tables and data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <SqlTablesStatus />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Job Management
                  </CardTitle>
                  <CardDescription>
                    Manage job listings and job scrapers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <JobScraperStatus />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage users and user roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">User management tools coming soon</p>
                    <Button variant="outline">Add User</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    Analytics
                  </CardTitle>
                  <CardDescription>
                    View platform analytics and metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Analytics tools coming soon</p>
                    <Button variant="outline">Generate Report</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
