
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";

const eventsList = [
  {
    id: 1,
    title: "Career Fair for Differently-Abled",
    type: "Career",
    date: new Date(Date.now() + 86400000 * 7),
    time: "10:00 AM - 3:00 PM",
    location: "San Francisco Community Center",
    attendees: 120,
    description: "Connect with employers who value diversity and inclusion. Bring your resume and be prepared for on-site interviews.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Event+Image",
    virtual: false
  },
  {
    id: 2,
    title: "Accessible Technology Workshop",
    type: "Workshop",
    date: new Date(Date.now() + 86400000 * 3),
    time: "2:00 PM - 4:00 PM",
    location: "Virtual",
    attendees: 75,
    description: "Learn about the latest assistive technologies and how they can improve your daily life and work productivity.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Event+Image",
    virtual: true
  },
  {
    id: 3,
    title: "Elderly Community Social",
    type: "Social",
    date: new Date(Date.now() + 86400000 * 14),
    time: "1:00 PM - 5:00 PM",
    location: "Sunshine Senior Center, Boston",
    attendees: 50,
    description: "Join us for an afternoon of activities, refreshments, and an opportunity to meet others in your community.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Event+Image",
    virtual: false
  },
  {
    id: 4,
    title: "Accessibility in the Workplace Panel",
    type: "Panel",
    date: new Date(Date.now() + 86400000 * 10),
    time: "11:00 AM - 12:30 PM",
    location: "Virtual",
    attendees: 200,
    description: "Industry experts discuss practical approaches to creating truly inclusive workplaces for all abilities.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Event+Image",
    virtual: true
  },
];

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        <section className="section-container">
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Community Events & Workshops
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                Join events designed to connect, educate, and empower our community.
                From career opportunities to social gatherings, there's something for everyone.
              </p>
            </motion.div>

            <Tabs defaultValue="upcoming" className="w-full">
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="upcoming">
                <div className="space-y-8 max-w-4xl mx-auto">
                  {eventsList.map((event, index) => (
                    <motion.div
                      key={event.id}
                      className="glass-card border border-border/50 hover:border-primary/20 overflow-hidden rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          {event.virtual && (
                            <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                              Virtual Event
                            </div>
                          )}
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                            <div>
                              <span className="inline-block bg-secondary/80 rounded-full px-3 py-1 text-xs font-medium mb-2">
                                {event.type}
                              </span>
                              <h3 className="text-xl font-bold">{event.title}</h3>
                            </div>
                            <div className="text-primary font-semibold mt-2 md:mt-0">
                              {format(event.date, "MMMM d, yyyy")}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-6 gap-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" className="mr-2">
                              Add to Calendar
                            </Button>
                            <Button size="sm">
                              RSVP Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar">
                <motion.div
                  className="glass-panel border border-border p-6 rounded-xl max-w-3xl mx-auto"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border w-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4">
                        {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                      </h3>
                      
                      {selectedDate && eventsList.some(event => 
                        format(event.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                      ) ? (
                        <div className="space-y-4">
                          {eventsList
                            .filter(event => format(event.date, "yyyy-MM-dd") === format(selectedDate!, "yyyy-MM-dd"))
                            .map((event) => (
                              <div key={event.id} className="p-4 bg-secondary/50 rounded-lg border border-border">
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-sm text-muted-foreground mt-1">
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{event.time}</span>
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                                <Button size="sm" className="mt-3 w-full">View Details</Button>
                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <p className="text-muted-foreground text-center">
                            No events scheduled for this date.
                          </p>
                          <Button variant="outline" size="sm" className="mt-4">
                            View All Events
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="featured">
                <motion.div
                  className="glass-panel border border-border p-6 rounded-xl max-w-4xl mx-auto"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">
                      Upcoming Live Stream
                    </h3>
                    <p className="text-muted-foreground">
                      Join our upcoming virtual event focused on employment opportunities for the differently-abled.
                    </p>
                  </div>
                  
                  <div className="aspect-video bg-secondary/50 rounded-lg border border-border mb-8 flex items-center justify-center">
                    <div className="text-center p-10">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <div className="w-14 h-14 rounded-full bg-primary/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <svg 
                              width="20" 
                              height="20" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-white"
                            >
                              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-medium mb-2">Breaking Barriers: Employment Panel</h3>
                      <p className="text-muted-foreground">Streaming on July 25th, 2023 • 2:00 PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">157 people</span> have registered for this event
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline">Add to Calendar</Button>
                      <Button>Register Now</Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
