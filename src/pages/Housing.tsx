
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Building, Heart, Home, MapPin, Search, Users, Phone, Star } from "lucide-react";
import { motion } from "framer-motion";

const seniorHomes = [
  {
    id: 1,
    name: "Golden Years Residence",
    type: "Assisted Living",
    location: "Portland, OR",
    price: "$2,500 - $3,200/month",
    capacity: 120,
    amenities: ["24/7 Care Staff", "Memory Care", "Physical Therapy"],
    rating: 4.8,
    reviews: 45,
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Senior+Home",
    description: "Provides a supportive environment for seniors with varying levels of care needs. Our staff is trained to assist with daily activities while promoting independence."
  },
  {
    id: 2,
    name: "Sunset Manor",
    type: "Independent Living",
    location: "Tampa, FL",
    price: "$1,800 - $2,400/month",
    capacity: 85,
    amenities: ["Social Activities", "Transportation", "Fitness Center"],
    rating: 4.6,
    reviews: 38,
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Senior+Home",
    description: "A vibrant community for active seniors who want to maintain their independence while enjoying convenient services and social activities."
  },
  {
    id: 3,
    name: "Serene Valley Care Center",
    type: "Nursing Home",
    location: "Austin, TX",
    price: "$3,500 - $4,200/month",
    capacity: 60,
    amenities: ["Medical Staff", "Physical Rehabilitation", "Memory Care"],
    rating: 4.7,
    reviews: 52,
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Senior+Home",
    description: "Specialized nursing care facility providing 24/7 medical supervision for seniors with advanced care needs, including rehabilitation services."
  },
  {
    id: 4,
    name: "Heritage Place",
    type: "Residential Care",
    location: "Denver, CO",
    price: "$2,800 - $3,600/month",
    capacity: 90,
    amenities: ["Meals Included", "Housekeeping", "Social Activities"],
    rating: 4.5,
    reviews: 29,
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Senior+Home",
    description: "Warm residential setting offering personalized care services, nutritious meals, and engaging activities for seniors requiring varying levels of assistance."
  },
  {
    id: 5,
    name: "Maple Grove Senior Living",
    type: "Assisted Living",
    location: "Seattle, WA",
    price: "$2,600 - $3,400/month",
    capacity: 75,
    amenities: ["Memory Care", "Garden Access", "Therapy Services"],
    rating: 4.9,
    reviews: 63,
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Senior+Home",
    description: "Award-winning facility specializing in personalized care plans and memory support in a peaceful garden setting with various therapeutic programs."
  },
  {
    id: 6,
    name: "Riverside Retirement Community",
    type: "Independent Living",
    location: "Chicago, IL",
    price: "$2,100 - $2,900/month",
    capacity: 110,
    amenities: ["Community Events", "Dining Services", "Library"],
    rating: 4.4,
    reviews: 41,
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Senior+Home",
    description: "Riverside offers independent apartment living with optional services, fine dining, and a vibrant community calendar of social and cultural events."
  }
];

export default function Housing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [housingType, setHousingType] = useState("");
  const [amenityFilter, setAmenityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHome, setSelectedHome] = useState<number | null>(null);
  const homesPerPage = 4;

  // Filter homes based on search criteria
  const filteredHomes = seniorHomes.filter(home => {
    const matchesSearch = home.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          home.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = housingType === "" || home.type.toLowerCase().includes(housingType.toLowerCase());
    const matchesAmenity = amenityFilter === "" || 
                          home.amenities.some(amenity => 
                            amenity.toLowerCase().includes(amenityFilter.toLowerCase()));
    return matchesSearch && matchesType && matchesAmenity;
  });

  // Get current homes based on pagination
  const indexOfLastHome = currentPage * homesPerPage;
  const indexOfFirstHome = indexOfLastHome - homesPerPage;
  const currentHomes = filteredHomes.slice(indexOfFirstHome, indexOfLastHome);
  const totalPages = Math.ceil(filteredHomes.length / homesPerPage);

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
                Find Your Perfect Old Age Home
              </h1>
              <p className="text-muted-foreground text-center mb-8">
                It's our honor to help you find a comfortable and caring home that perfectly matches your preferences and needs. Our easy-to-use platform helps you make informed decisions.
              </p>
            </motion.div>

            <motion.div
              className="bg-secondary/30 p-6 rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex flex-col gap-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Enter your preferred location" 
                      className="pl-9 text-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={housingType} onValueChange={setHousingType}>
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Monthly Budget Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget1">Below ₹15,000</SelectItem>
                      <SelectItem value="budget2">₹15,000 - ₹25,000</SelectItem>
                      <SelectItem value="budget3">₹25,000 - ₹35,000</SelectItem>
                      <SelectItem value="budget4">Above ₹35,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Essential Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Select value={amenityFilter} onValueChange={setAmenityFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Medical Care" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24hr">24/7 Medical Staff</SelectItem>
                        <SelectItem value="regular">Regular Doctor Visits</SelectItem>
                        <SelectItem value="nursing">Nursing Care</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Room Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Room</SelectItem>
                        <SelectItem value="shared">Shared Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Suite</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Special Requirements" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheelchair">Wheelchair Access</SelectItem>
                        <SelectItem value="diet">Special Diet</SelectItem>
                        <SelectItem value="physio">Physiotherapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button onClick={() => setCurrentPage(1)}>
                  Search Facilities
                </Button>
                <p className="text-muted-foreground">
                  {filteredHomes.length} communities found
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {currentHomes.length > 0 ? (
              currentHomes.map((home, index) => (
                <motion.div
                  key={home.id}
                  className="glass-card border border-border/50 hover:border-primary/20 overflow-hidden rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={home.image} 
                      alt={home.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 text-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                      {home.rating} ({home.reviews} reviews)
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-1">{home.name}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{home.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">{home.price}</span>
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        <span className="mr-3">{home.type}</span>
                        <Users className="h-4 w-4 mr-1" />
                        <span>{home.capacity} residents</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-muted-foreground line-clamp-3">{home.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {home.amenities.map((amenity, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-secondary/80 rounded-full px-3 py-1 text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-muted-foreground">No senior living communities found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setHousingType("");
                    setAmenityFilter("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          <div className="text-center mt-12 bg-secondary/30 p-6 rounded-xl border border-border max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need Help Finding Your Perfect Home?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our caring team is here to guide you through every step of finding your ideal old age home.
            </p>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="outline" className="text-lg">
                  Watch Tutorial Video
                </Button>
                <Button size="lg" className="text-lg">
                  Compare Selected Homes
                </Button>
              </div>
              <p className="text-base text-muted-foreground">
                Need assistance? Call us at <span className="font-semibold">1800-123-4567</span> (Toll Free)
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
