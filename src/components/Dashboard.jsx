"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Users, IndianRupee, LogOut, Home, ShoppingBag, Store, Settings, Calendar, ChevronLeft, Bell, Search, PieChart, Gift, Camera, Menu, User, ChevronDown, MapPin, Info, Landmark, Hotel, UtensilsCrossed, Clock, Check, Filter, Leaf, Beef, ChevronUp, ChevronRight, Plus, Minus, Sparkles, Shirt, Crown, Gem } from 'lucide-react'
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")
  
  // Venue state
  const [step, setStep] = useState(1) // 1: Guest Count, 2: Location, 3: Venues
  const [guestCount, setGuestCount] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [budget, setBudget] = useState(0)
  const [showVenues, setShowVenues] = useState(false)
  const [venueType, setVenueType] = useState('')
  const [venues, setVenues] = useState([]);
  const [isLoadingVenues, setIsLoadingVenues] = useState(false);

  // Events state
  const [eventDays, setEventDays] = useState(0)
  const [totalEvents, setTotalEvents] = useState(0)
  const [eventsConfigured, setEventsConfigured] = useState(false)
  const [eventDistribution, setEventDistribution] = useState([])
  const [eventStep, setEventStep] = useState(1) // 1: Days/Events selection, 2: Event distribution, 3: Event details
  const [selectedEvents, setSelectedEvents] = useState([])
  const [expandedDay, setExpandedDay] = useState(null)
  const [eventLoading, setEventLoading] = useState(false)

  // Catering state
  const [cateringType, setCateringType] = useState("")
  const [cateringStep, setCateringStep] = useState(1)
  const [cateringGuestCount, setCateringGuestCount] = useState(100)
  const [dietaryRestrictions, setDietaryRestrictions] = useState([])
  const [selectedMenu, setSelectedMenu] = useState(null)
  const [cateringLoading, setCateringLoading] = useState(false)

  // Shopping state
  const [shoppingStep, setShoppingStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedItems, setSelectedItems] = useState([])
  const [shoppingLoading, setShoppingLoading] = useState(false)

  const rajasthanLocations = [
    {
      name: 'Udaipur',
      description: 'City of Lakes & Palaces',
      image: 'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      resorts: [
        { 
          name: 'Taj Lake Palace',
          minBudget: 6500000,
          capacity: '100-800',
          description: 'Luxury palace hotel floating on Lake Pichola',
          amenities: ['Lake View', 'Royal Decor', 'Multiple Venues', 'In-house Catering'],
          image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'The Oberoi Udaivilas',
          minBudget: 6000000,
          capacity: '200-800',
          description: 'Palatial luxury resort with stunning architecture',
          amenities: ['Garden Venues', 'Lake View', 'Luxury Suites', 'Expert Planning'],
          image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'Leela Palace Udaipur',
          minBudget: 5500000,
          capacity: '150-600',
          description: 'Opulent palace with lake views and royal service',
          amenities: ['Lakeside Venue', 'Luxury Accommodations', 'Spa', 'Multiple Restaurants'],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ],
      hotels: [
        { 
          name: 'Trident Udaipur',
          minBudget: 4000000,
          capacity: '300-900',
          description: 'Premium hotel with lake views',
          amenities: ['Banquet Hall', 'Outdoor Venue', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'Radisson Blu Udaipur',
          minBudget: 3500000,
          capacity: '250-1000',
          description: 'Modern hotel with excellent amenities',
          amenities: ['Multiple Halls', 'Pool Side', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'Ramada Udaipur',
          minBudget: 3000000,
          capacity: '100-650',
          description: 'Comfortable hotel with good facilities',
          amenities: ['Banquet Hall', 'Outdoor Space', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ]
    },
    {
      name: 'Jaipur',
      description: 'The Pink City',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      resorts: [
        { 
          name: 'Rambagh Palace',
          minBudget: 6000000,
          capacity: '200-900',
          description: 'Former royal residence with grand architecture',
          amenities: ['Royal Gardens', 'Historic Setting', 'Luxury Suites', 'Fine Dining'],
          image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80'
        },
        { 
          name: 'Fairmont Jaipur',
          minBudget: 5000000,
          capacity: '150-800',
          description: 'Luxury resort with Rajasthani heritage',
          amenities: ['Grand Ballroom', 'Outdoor Venues', 'Spa', 'Multiple Restaurants'],
          image: 'https://images.unsplash.com/photo-1578898887932-7df7f9c66486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'ITC Rajputana',
          minBudget: 6500000,
          capacity: '100-700',
          description: 'Elegant hotel with traditional architecture',
          amenities: ['Banquet Halls', 'Courtyard', 'Spa', 'Multiple Dining Options'],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ],
      hotels: [
        { 
          name: 'Marriott Jaipur',
          minBudget: 4000000,
          capacity: '150-1000',
          description: 'Modern luxury hotel with excellent facilities',
          amenities: ['Ballroom', 'Outdoor Venue', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'
        },
        { 
          name: 'Hilton Jaipur',
          minBudget: 3500000,
          capacity: '100-600',
          description: 'Contemporary hotel with versatile venues',
          amenities: ['Multiple Halls', 'Rooftop', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'Golden Tulip',
          minBudget: 3000000,
          capacity: '150-700',
          description: 'Comfortable hotel with good value',
          amenities: ['Banquet Hall', 'Poolside', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ]
    },
    {
      name: 'Jodhpur',
      description: 'The Blue City',
      image: 'https://images.unsplash.com/photo-1591089627083-d9d049d833f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      resorts: [
        { 
          name: 'Umaid Bhawan Palace',
          minBudget: 6000000,
          capacity: '150-600',
          description: 'Magnificent palace with royal heritage',
          amenities: ['Royal Gardens', 'Historic Setting', 'Luxury Suites', 'Museum'],
          image: 'https://images.unsplash.com/photo-1573548842355-73bb50e50323?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'RAAS Jodhpur',
          minBudget: 5000000,
          capacity: '150-800',
          description: 'Boutique hotel with fort views',
          amenities: ['Courtyard', 'Rooftop', 'Spa', 'Fine Dining'],
          image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ],
      hotels: [
        { 
          name: 'Radisson Jodhpur',
          minBudget: 4000000,
          capacity: '100-650',
          description: 'Modern hotel with excellent amenities',
          amenities: ['Banquet Hall', 'Outdoor Venue', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        { 
          name: 'Park Plaza',
          minBudget: 3000000,
          capacity: '100-950',
          description: 'Contemporary hotel with good facilities',
          amenities: ['Multiple Halls', 'Poolside', 'Catering', 'Decor'],
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
      ]
    }
  ];

  // Event types with costs based on budget tiers
  const eventTypes = () => {
    // Calculate events budget (30% of total budget)
    const eventsBudget = (dashboardData?.budget || 0) * 0.3;
    
    return [
      {
        id: 1,
        name: 'Haldi Ceremony',
        description: 'Traditional pre-wedding ceremony with turmeric paste',
        minBudget: eventsBudget * 0.05,
        midBudget: eventsBudget * 0.08,
        maxBudget: eventsBudget * 0.12,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1600090599771-1a4fb3c6d9b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 2,
        name: 'Mehendi Ceremony',
        description: 'Artistic application of henna designs on hands and feet',
        minBudget: eventsBudget * 0.08,
        midBudget: eventsBudget * 0.12,
        maxBudget: eventsBudget * 0.15,
        duration: '4-6 hours',
        image: 'https://images.unsplash.com/photo-1600615992455-4a04b21be1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 3,
        name: 'Sangeet Ceremony',
        description: 'Musical evening with dance performances by family and friends',
        minBudget: eventsBudget * 0.15,
        midBudget: eventsBudget * 0.20,
        maxBudget: eventsBudget * 0.25,
        duration: '4-5 hours',
        image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 4,
        name: 'Wedding Ceremony',
        description: 'Main wedding ritual and vows',
        minBudget: eventsBudget * 0.25,
        midBudget: eventsBudget * 0.30,
        maxBudget: eventsBudget * 0.35,
        duration: '3-4 hours',
        image: 'https://images.unsplash.com/photo-1583939411023-c1a56adaafb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 5,
        name: 'Reception',
        description: 'Post-wedding celebration and dinner',
        minBudget: eventsBudget * 0.20,
        midBudget: eventsBudget * 0.25,
        maxBudget: eventsBudget * 0.30,
        duration: '4-6 hours',
        image: 'https://images.unsplash.com/photo-1519741347686-c1e331c5053e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 6,
        name: 'Engagement Ceremony',
        description: 'Ring exchange ceremony',
        minBudget: eventsBudget * 0.10,
        midBudget: eventsBudget * 0.15,
        maxBudget: eventsBudget * 0.20,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 7,
        name: 'Roka Ceremony',
        description: "Official announcement of the couple's union",
        minBudget: eventsBudget * 0.05,
        midBudget: eventsBudget * 0.08,
        maxBudget: eventsBudget * 0.10,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1630526720753-354c1a3c2844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 8,
        name: 'Tilak Ceremony',
        description: "Groom is welcomed by the bride's family",
        minBudget: eventsBudget * 0.05,
        midBudget: eventsBudget * 0.07,
        maxBudget: eventsBudget * 0.10,
        duration: '2-3 hours',
        image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 9,
        name: 'Grihapravesh',
        description: 'Welcoming the bride to her new home',
        minBudget: eventsBudget * 0.03,
        midBudget: eventsBudget * 0.05,
        maxBudget: eventsBudget * 0.08,
        duration: '1-2 hours',
        image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 10,
        name: 'Vidaai',
        description: 'Emotional farewell to the bride',
        minBudget: eventsBudget * 0.02,
        midBudget: eventsBudget * 0.04,
        maxBudget: eventsBudget * 0.06,
        duration: '1 hour',
        image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      }
    ];
  };

  // Dietary restriction options
  const dietaryOptions = [
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'nut-free', label: 'Nut Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'jain', label: 'Jain' },
    { id: 'vegan', label: 'Vegan' }
  ];

  // Catering menu options
  const getCateringMenus = () => {
    // Calculate catering budget (25% of total budget)
    const cateringBudget = (dashboardData?.budget || 0) * 0.25;
    
    // Vegetarian menu options
    const vegMenus = [
      {
        id: 'veg-basic',
        name: 'Basic Vegetarian',
        description: 'Simple and traditional vegetarian dishes',
        pricePerPlate: cateringBudget * 0.001,
        items: {
          starters: ['Paneer Tikka', 'Veg Spring Rolls', 'Aloo Tikki'],
          mains: ['Dal Makhani', 'Paneer Butter Masala', 'Mixed Veg Curry', 'Jeera Rice', 'Assorted Breads'],
          desserts: ['Gulab Jamun', 'Rasgulla']
        },
        image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a7d'
      },
      {
        id: 'veg-premium',
        name: 'Premium Vegetarian',
        description: 'Gourmet vegetarian dishes with fusion elements',
        pricePerPlate: cateringBudget * 0.0012,
        items: {
          starters: ['Dahi Ke Kebab', 'Mushroom Galouti', 'Paneer Tikka Trio', 'Crispy Corn'],
          mains: ['Paneer Lababdar', 'Kofta Curry', 'Dal Panchmel', 'Veg Biryani', 'Assorted Breads'],
          desserts: ['Rasmalai', 'Kesar Pista Kulfi', 'Gajar Ka Halwa']
        },
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2b415979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
      },
      {
        id: 'veg-luxury',
        name: 'Luxury Vegetarian',
        description: 'Exquisite vegetarian cuisine with international flavors',
        pricePerPlate: cateringBudget * 0.0018,
        items: {
          starters: ['Wild Mushroom Crostini', 'Truffle Arancini', 'Avocado Chaat', 'Paneer Tikka Platter'],
          mains: ['Vegetable Roulade', 'Paneer Pasanda', 'Exotic Vegetable Curry', 'Saffron Pulao', 'Artisanal Breads'],
          desserts: ['Pistachio Phirni', 'Chocolate Mousse', 'Mango Cheesecake', 'Assorted Petit Fours']
        },
        image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      }
    ];

    // Non-vegetarian menu options
    const nonVegMenus = [
      {
        id: 'nonveg-basic',
        name: 'Basic Non-Vegetarian',
        description: 'Simple and traditional non-vegetarian dishes',
        pricePerPlate: cateringBudget * 0.0012,
        items: {
          starters: ['Chicken Tikka', 'Fish Amritsari', 'Mutton Seekh Kebab'],
          mains: ['Butter Chicken', 'Fish Curry', 'Mutton Rogan Josh', 'Jeera Rice', 'Assorted Breads'],
          desserts: ['Gulab Jamun', 'Rasgulla']
        },
        image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a7d'
      },
      {
        id: 'nonveg-premium',
        name: 'Premium Non-Vegetarian',
        description: 'Gourmet non-vegetarian dishes with fusion elements',
        pricePerPlate: cateringBudget * 0.0015,
        items: {
          starters: ['Tandoori Prawns', 'Chicken Malai Tikka', 'Lamb Chops', 'Fish Tikka'],
          mains: ['Chicken Chettinad', 'Mutton Biryani', 'Prawn Curry', 'Jeera Rice', 'Assorted Breads'],
          desserts: ['Rasmalai', 'Kesar Pista Kulfi', 'Shahi Tukda']
        },
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      {
        id: 'nonveg-luxury',
        name: 'Luxury Non-Vegetarian',
        description: 'Exquisite non-vegetarian cuisine with international flavors',
        pricePerPlate: cateringBudget * 0.0022,
        items: {
          starters: ['Lobster Thermidor Bites', 'Lamb Kibbeh', 'Truffle Chicken Croquettes', 'Tuna Tataki'],
          mains: ['Duck Confit', 'Lamb Shanks', 'Grilled Salmon', 'Saffron Rice', 'Artisanal Breads'],
          desserts: ['Pistachio Phirni', 'Chocolate Mousse', 'Mango Cheesecake', 'Assorted Petit Fours']
        },
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      }
    ];

    return {
      vegMenus,
      nonVegMenus
    };
  };

  // Shopping options based on role and events
  const getShoppingOptions = () => {
    // Calculate shopping budget (18% of total budget)
    const shoppingBudget = (dashboardData?.budget || 0) * 0.18;
    const userRole = dashboardData?.role || 'bride';
    const numEvents = totalEvents || 3;
    
    // Attire options
    const attireOptions = {
      bride: [
        {
          id: 'bride-wedding',
          name: 'Wedding Lehenga',
          description: 'Traditional bridal lehenga with intricate embroidery',
          price: shoppingBudget * 0.35,
          image: 'https://images.unsplash.com/photo-1594469270998-88a11f93bde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'attire',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'bride-reception',
          name: 'Reception Outfit',
          description: 'Elegant reception gown or saree',
          price: shoppingBudget * 0.20,
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1083&q=80',
          category: 'attire',
          essential: numEvents > 3,
          forEvent: 'Reception'
        },
        {
          id: 'bride-mehendi',
          name: 'Mehendi Outfit',
          description: 'Colorful and comfortable outfit for the mehendi ceremony',
          price: shoppingBudget * 0.10,
          image: 'https://images.unsplash.com/photo-1610964729333-d7b46f1a0d8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'attire',
          essential: numEvents > 2,
          forEvent: 'Mehendi Ceremony'
        },
        {
          id: 'bride-haldi',
          name: 'Haldi Outfit',
          description: 'Simple yellow outfit for the haldi ceremony',
          price: shoppingBudget * 0.05,
          image: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'attire',
          essential: numEvents > 3,
          forEvent: 'Haldi Ceremony'
        },
        {
          id: 'bride-sangeet',
          name: 'Sangeet Outfit',
          description: 'Stylish and comfortable outfit for dancing',
          price: shoppingBudget * 0.15,
          image: 'https://images.unsplash.com/photo-1630003776066-13f53db2a285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'attire',
          essential: numEvents > 4,
          forEvent: 'Sangeet Ceremony'
        }
      ],
      groom: [
        {
          id: 'groom-wedding',
          name: 'Wedding Sherwani',
          description: 'Traditional groom sherwani with detailed embroidery',
          price: shoppingBudget * 0.25,
          image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'attire',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'groom-reception',
          name: 'Reception Outfit',
          description: 'Formal suit or indo-western outfit',
          price: shoppingBudget * 0.15,
          image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'attire',
          essential: numEvents > 3,
          forEvent: 'Reception'
        },
        {
          id: 'groom-mehendi',
          name: 'Mehendi Outfit',
          description: 'Casual ethnic wear for the mehendi ceremony',
          price: shoppingBudget * 0.08,
          image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'attire',
          essential: numEvents > 2,
          forEvent: 'Mehendi Ceremony'
        },
        {
          id: 'groom-haldi',
          name: 'Haldi Outfit',
          description: 'Simple kurta for the haldi ceremony',
          price: shoppingBudget * 0.05,
          image: 'https://images.unsplash.com/photo-1598897516650-e4dc73d8e417?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'attire',
          essential: numEvents > 3,
          forEvent: 'Haldi Ceremony'
        },
        {
          id: 'groom-sangeet',
          name: 'Sangeet Outfit',
          description: 'Stylish ethnic wear for the sangeet',
          price: shoppingBudget * 0.10,
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1083&q=80',
          category: 'attire',
          essential: numEvents > 4,
          forEvent: 'Sangeet Ceremony'
        }
      ]
    };
    
    // Jewelry options
    const jewelryOptions = {
      bride: [
        {
          id: 'bride-necklace',
          name: 'Bridal Necklace Set',
          description: 'Complete bridal necklace set with earrings and maang tikka',
          price: shoppingBudget * 0.25,
          image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'jewelry',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'bride-bangles',
          name: 'Wedding Bangles',
          description: 'Traditional wedding bangles and chura',
          price: shoppingBudget * 0.10,
          image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'jewelry',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'bride-rings',
          name: 'Wedding Rings',
          description: 'Engagement and wedding rings',
          price: shoppingBudget * 0.15,
          image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'jewelry',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'bride-anklets',
          name: 'Anklets',
          description: 'Traditional anklets (payal)',
          price: shoppingBudget * 0.05,
          image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'jewelry',
          essential: false,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'bride-reception-jewelry',
          name: 'Reception Jewelry',
          description: 'Elegant jewelry for the reception',
          price: shoppingBudget * 0.10,
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'jewelry',
          essential: numEvents > 3,
          forEvent: 'Reception'
        }
      ],
      groom: [
        {
          id: 'groom-rings',
          name: 'Wedding Rings',
          description: 'Engagement and wedding rings',
          price: shoppingBudget * 0.15,
          image: 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'jewelry',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'groom-brooch',
          name: 'Brooch and Buttons',
          description: 'Elegant brooch and buttons for sherwani',
          price: shoppingBudget * 0.05,
          image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'jewelry',
          essential: true,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'groom-watch',
          name: 'Luxury Watch',
          description: 'Premium watch for the wedding day',
          price: shoppingBudget * 0.10,
          image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'jewelry',
          essential: false,
          forEvent: 'Wedding Ceremony'
        },
        {
          id: 'groom-cufflinks',
          name: 'Cufflinks',
          description: 'Designer cufflinks for formal outfits',
          price: shoppingBudget * 0.03,
          image: 'https://images.unsplash.com/photo-1590736969955-71cc94c4dd4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          category: 'jewelry',
          essential: numEvents > 3,
          forEvent: 'Reception'
        },
        {
          id: 'groom-necklace',
          name: 'Traditional Necklace',
          description: 'Gold or pearl necklace for traditional ceremonies',
          price: shoppingBudget * 0.08,
          image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          category: 'jewelry',
          essential: false,
          forEvent: 'Wedding Ceremony'
        }
      ]
    };
    
    return {
      attire: attireOptions[userRole] || attireOptions.bride,
      jewelry: jewelryOptions[userRole] || jewelryOptions.bride
    };
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Get customer data from localStorage
        const storedCustomerData = localStorage.getItem("customerData")
        if (!storedCustomerData) {
          console.log("No customer data found, redirecting to login")
          navigate("/login")
          return
        }

        const customerData = JSON.parse(storedCustomerData)
        console.log("Customer data from localStorage:", customerData) // Debug log

        // Check if we have the required data
        if (!customerData.username && !customerData.name) {
          console.error("Required user data not found")
          navigate("/login")
          return
        }

        // Use either username or name as the identifier
        const userIdentifier = customerData.username || customerData.name
        setUserData(customerData)

        try {
          // Fetch dashboard data using the identifier
          console.log("Fetching dashboard data for user:", userIdentifier)
          const response = await axios.get(`http://localhost:8080/api/user/dashboard/${userIdentifier}`);

          console.log("Dashboard API Response:", response.data)

          if (response.status === 200 && response.data) {
            const dashboardInfo = {
              username: response.data.username || customerData.name,
              budget: response.data.budget,
              role: response.data.role,
            }
            console.log("Formatted dashboard data:", dashboardInfo)
            setDashboardData(dashboardInfo)
            setBudget(response.data.budget || 0)
            
            // Determine venue type based on main budget
            const budgetInCrores = (response.data.budget || 0) / 10000000;
            if (budgetInCrores >= 3) {
              setVenueType('Resort')
            } else if (budgetInCrores >= 1) {
              setVenueType('Hotel')
            } else {
              setVenueType('Home')
            }
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
          // Check if the error is due to no selection data
          if (error.response?.status === 404) {
            console.log("No selection data found, redirecting to selection page")
            navigate("/selection")
            return
          }
          throw error
        }
      } catch (error) {
        console.error("Dashboard initialization error:", error)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("customerData")
    navigate("/login")
  }

  // Function to format number to Indian currency format
  const formatToIndianCurrency = (num) => {
    if (!num) return "₹0"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num)
  }

  const getBudgetRecommendation = (totalBudget) => {
    const budgetInCrores = totalBudget / 10000000;
    if (budgetInCrores >= 3) {
      return "Resort Wedding Recommended"
    } else if (budgetInCrores >= 1) {
      return "Hotel Wedding Recommended"
    } else {
      return "Home/Banquet Hall Recommended"
    }
  }

  const budgetCategories = [
    {
      title: "Venue",
      percentage: 20,
      icon: <Store size={18} />,
    },
    {
      title: "Events & Ceremonies",
      percentage: 30,
      icon: <Calendar size={18} />,
    },
    {
      title: "Catering",
      percentage: 25,
      icon: <UtensilsCrossed size={18} />,
    },
    {
      title: "Attire & Jewelry",
      percentage: 18,
      icon: <ShoppingBag size={18} />,
    },
    {
      title: "Photography & Video",
      percentage: 5,
      icon: <Camera size={18} />,
    },
    {
      title: "Extra",
      percentage: 2,
      icon: <PieChart size={18} />,
    },
  ]

  const handleNavigation = (view) => {
    setCurrentView(view)
    if (view === "venue") {
      setStep(1) // Reset venue steps when navigating to venue page
    } else if (view === "events") {
      setEventStep(1) // Reset event steps when navigating to events page
    } else if (view === "catering") {
      setCateringStep(1) // Reset catering steps when navigating to catering page
    } else if (view === "shopping") {
      setShoppingStep(1) // Reset shopping steps when navigating to shopping page
    }
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const getProgressColor = (percentage) => {
    if (percentage <= 30) return "var(--progress-low)"
    if (percentage <= 70) return "var(--progress-medium)"
    return "var(--progress-high)"
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  // Close profile menu when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.user-profile')) {
      setShowProfileMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Venue functions
  const handleGuestCountSubmit = async () => {
    if (!guestCount) {
      setError('Please enter guest count');
      return;
    }

    try {
      const customerData = JSON.parse(localStorage.getItem('customerData'));
      await axios.post('http://localhost:8080/api/venue-preferences', {
        customerId: customerData.customerId,
        guestCount: parseInt(guestCount),
        weddingDate: weddingDate || null,
        venueType: venueType
      });

      if (venueType === 'Home') {
        setShowVenues(true);
        setStep(3);
      } else {
        setStep(2); // Move to location selection for Hotel/Resort
      }
    } catch (error) {
      setError('Failed to save guest count');
      console.error('Error:', error);
    }
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (userLocation) {
      await fetchVenues(userLocation);
      setShowVenues(true);
    }
  };

  const getVenueCategory = (budget) => {
    const budgetInCrores = budget / 10000000;
    if (budgetInCrores >= 3) return 'premium';
    if (budgetInCrores >= 1) return 'intermediate';
    return 'basic';
  };

  // Events & Ceremonies functions
  // Function to distribute events across days
  const distributeEvents = () => {
    if (eventDays <= 0 || totalEvents <= 0 || eventDays > 5 || totalEvents > 10) {
      setError('Please enter valid number of days (1-5) and events (1-10)');
      return;
    }

    // Create an initial distribution with at least one event per day
    let distribution = Array(eventDays).fill(1);
    let remainingEvents = totalEvents - eventDays;

    // Distribute remaining events starting from day 1
    let dayIndex = 0;
    while (remainingEvents > 0) {
      distribution[dayIndex]++;
      remainingEvents--;
      dayIndex = (dayIndex + 1) % eventDays;
    }

    setEventDistribution(distribution);
    setEventsConfigured(true);
    setEventStep(2);
    setError('');
  };

  // Get budget tier based on total budget
  const getBudgetTier = () => {
    const budgetInCrores = (dashboardData?.budget || 0) / 10000000;
    if (budgetInCrores >= 3) return 'max';
    if (budgetInCrores >= 1) return 'mid';
    return 'min';
  };

  // Get event cost based on budget tier
  const getEventCost = (event) => {
    const tier = getBudgetTier();
    if (tier === 'max') return event.maxBudget;
    if (tier === 'mid') return event.midBudget;
    return event.minBudget;
  };

  // Toggle day expansion
  const toggleDayExpansion = (dayIndex) => {
    if (expandedDay === dayIndex) {
      setExpandedDay(null);
    } else {
      setExpandedDay(dayIndex);
    }
  };

  // Add event to a specific day
  const addEventToDay = (dayIndex, eventId) => {
    const event = eventTypes().find(e => e.id === eventId);
    if (!event) return;

    const newSelectedEvents = [...selectedEvents];
    
    // If no events for this day yet, create an array
    if (!newSelectedEvents[dayIndex]) {
      newSelectedEvents[dayIndex] = [];
    }
    
    // Check if we've reached the maximum number of events for this day
    if (newSelectedEvents[dayIndex].length >= eventDistribution[dayIndex]) {
      setError(`Day ${dayIndex + 1} already has the maximum number of events (${eventDistribution[dayIndex]})`);
      return;
    }
    
    // Check if this event is already selected for any day
    const isEventAlreadySelected = newSelectedEvents.some(dayEvents => 
      dayEvents && dayEvents.some(e => e.id === eventId)
    );
    
    if (isEventAlreadySelected) {
      setError(`${event.name} is already selected for another day`);
      return;
    }
    
    newSelectedEvents[dayIndex].push(event);
    setSelectedEvents(newSelectedEvents);
    setError('');
  };

  // Remove event from a day
  const removeEventFromDay = (dayIndex, eventId) => {
    const newSelectedEvents = [...selectedEvents];
    if (newSelectedEvents[dayIndex]) {
      newSelectedEvents[dayIndex] = newSelectedEvents[dayIndex].filter(e => e.id !== eventId);
      setSelectedEvents(newSelectedEvents);
    }
  };

  // Calculate total cost of selected events
  const calculateEventsTotalCost = () => {
    let total = 0;
    selectedEvents.forEach(dayEvents => {
      if (dayEvents) {
        dayEvents.forEach(event => {
          total += getEventCost(event);
        });
      }
    });
    return total;
  };

  // Save events configuration
  const saveEventsConfiguration = async () => {
    try {
      setEventLoading(true);
      
      // Check if all days have the required number of events
      const allDaysConfigured = eventDistribution.every((requiredEvents, index) => 
        selectedEvents[index] && selectedEvents[index].length === requiredEvents
      );
      
      if (!allDaysConfigured) {
        setError('Please assign all events for each day according to the distribution');
        setEventLoading(false);
        return;
      }
      
      const customerData = JSON.parse(localStorage.getItem('customerData'));
      
      // Format data for API
      const eventsData = selectedEvents.map((dayEvents, dayIndex) => ({
        day: dayIndex + 1,
        events: dayEvents.map(event => ({
          eventId: event.id,
          eventName: event.name,
          cost: getEventCost(event)
        }))
      }));
      
      await axios.post('http://localhost:8080/api/events-configuration', {
        customerId: customerData.customerId,
        totalDays: eventDays,
        totalEvents: totalEvents,
        eventsData: eventsData,
        totalCost: calculateEventsTotalCost()
      });
      
      setEventStep(3); // Move to confirmation step
      setError('');
    } catch (error) {
      setError('Failed to save events configuration');
      console.error('Error:', error);
    } finally {
      setEventLoading(false);
    }
  };

  // Catering functions
  // Get menus based on selected type
  const getCateringMenusByType = () => {
    const { vegMenus, nonVegMenus } = getCateringMenus();
    return cateringType === 'veg' ? vegMenus : nonVegMenus;
  };

  // Calculate total catering cost
  const calculateCateringTotalCost = () => {
    if (!selectedMenu) return 0;
    const { vegMenus, nonVegMenus } = getCateringMenus();
    const menu = [...vegMenus, ...nonVegMenus].find(m => m.id === selectedMenu);
    if (!menu) return 0;
    return menu.pricePerPlate * cateringGuestCount;
  };

  // Toggle dietary restriction
  const toggleDietaryRestriction = (restrictionId) => {
    if (dietaryRestrictions.includes(restrictionId)) {
      setDietaryRestrictions(dietaryRestrictions.filter(id => id !== restrictionId));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restrictionId]);
    }
  };

  // Save catering selection
  const saveCateringSelection = async () => {
    if (!selectedMenu) {
      setError('Please select a menu');
      return;
    }

    try {
      setCateringLoading(true);
      const customerData = JSON.parse(localStorage.getItem('customerData'));
      const { vegMenus, nonVegMenus } = getCateringMenus();
      const menu = [...vegMenus, ...nonVegMenus].find(m => m.id === selectedMenu);
      
      await axios.post('http://localhost:8080/api/catering-selection', {
        customerId: customerData.customerId,
        cateringType: cateringType,
        menuId: selectedMenu,
        menuName: menu.name,
        guestCount: cateringGuestCount,
        dietaryRestrictions: dietaryRestrictions,
        pricePerPlate: menu.pricePerPlate,
        totalCost: calculateCateringTotalCost()
      });
      
      setCateringStep(3); // Move to confirmation step
      setError('');
    } catch (error) {
      setError('Failed to save catering selection');
      console.error('Error:', error);
    } finally {
      setCateringLoading(false);
    }
  };

  // Shopping functions
  // Add item to selected items
  const addItemToSelection = (item) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // Calculate total shopping cost
  const calculateShoppingTotalCost = () => {
    return selectedItems.reduce((total, item) => total + item.price, 0);
  };

  // Save shopping selection
  const saveShoppingSelection = async () => {
    try {
      setShoppingLoading(true);
      const customerData = JSON.parse(localStorage.getItem('customerData'));
      
      await axios.post('http://localhost:8080/api/shopping-selection', {
        customerId: customerData.customerId,
        items: selectedItems.map(item => ({
          itemId: item.id,
          itemName: item.name,
          category: item.category,
          price: item.price,
          forEvent: item.forEvent
        })),
        totalCost: calculateShoppingTotalCost()
      });
      
      setShoppingStep(3); // Move to confirmation step
      setError('');
    } catch (error) {
      setError('Failed to save shopping selection');
      console.error('Error:', error);
    } finally {
      setShoppingLoading(false);
    }
  };

  // Add this function to fetch venues
  const fetchVenues = async (city) => {
    try {
      setIsLoadingVenues(true);
      const query = `[out:json];
        area[name="${city}"]->.searchArea;
        (
          node["amenity"="wedding_venue"](area.searchArea);
          way["amenity"="wedding_venue"](area.searchArea);
          node["leisure"="resort"](area.searchArea);
          way["leisure"="resort"](area.searchArea);
          node["tourism"="hotel"](area.searchArea);
          way["tourism"="hotel"](area.searchArea);
        );
        out body;
        >;
        out skel qt;`;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });

      const data = await response.json();
      
      // Transform the data into a more usable format
      const transformedVenues = data.elements.map(venue => ({
        id: venue.id,
        name: venue.tags.name || 'Unnamed Venue',
        type: venue.tags.amenity === 'wedding_venue' ? 'Wedding Venue' : 
              venue.tags.leisure === 'resort' ? 'Resort' : 'Hotel',
        address: venue.tags['addr:street'] || '',
        capacity: venue.tags.capacity || 'Not specified',
        lat: venue.lat,
        lon: venue.lon
      }));

      setVenues(transformedVenues);
    } catch (error) {
      console.error('Error fetching venues:', error);
      setError('Failed to fetch venues. Please try again.');
    } finally {
      setIsLoadingVenues(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your wedding dashboard...</p>
        <div className="loading-decoration"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-message">{error}</div>
        <button className="error-button" onClick={() => navigate("/selection")}>
          Go to Selection Page
        </button>
      </div>
    )
  }

  // Render venue content based on step
  const renderVenueContent = () => {
    // Guest Count Step
    if (step === 1) {
      return (
        <div className="venue-page">
          <div className="main-header">
            <h1>Wedding Venue Selection</h1>
            <p className="subtitle">Let's start with your wedding details</p>
          </div>

          <div className="guest-count-container">
            <div className="guest-count-form">
              <div className="form-group">
                <label htmlFor="weddingDate">Wedding Date</label>
                <div className="guest-input">
                  <Calendar size={20} />
                  <input
                    id="weddingDate"
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    placeholder="Select wedding date"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="guestCount">Approximate Number of Guests</label>
                <div className="guest-input">
                  <Users size={20} />
                  <input
                    id="guestCount"
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    placeholder="Enter number of guests"
                    min="1"
                    required
                  />
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
              <button onClick={handleGuestCountSubmit} className="primary-button">
                Continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Location Selection Step
    if (step === 2) {
      return (
        <div className="venue-page">
          <div className="main-header">
            <h1>Select Your City</h1>
            <p className="subtitle">
              {venueType === 'Resort' ? 'Luxury Resorts' : 'Premium Hotels'} available in these cities
            </p>
          </div>

          <div className="location-selection-container">
            <div className="location-selection">
              <form onSubmit={handleLocationSubmit} className="location-form">
                <div className="form-group">
                  <label htmlFor="location">Select City</label>
                  <div className="location-input">
                    <MapPin size={20} />
                    <select
                      id="location"
                      className="location-select"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      required
                    >
                      <option value="">Select a city</option>
                      {indianCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="primary-button" disabled={isLoadingVenues}>
                  {isLoadingVenues ? 'Searching...' : 'Find Venues'}
                </button>
              </form>
            </div>
          </div>

          {isLoadingVenues && (
            <div className="loading-spinner">Searching for venues...</div>
          )}

          {venues.length > 0 && (
            <div className="venue-grid">
              {venues.map(venue => (
                <div key={venue.id} className="venue-card">
                  <div className="venue-details">
                    <h3>{venue.name}</h3>
                    <div className="venue-type-badge">{venue.type}</div>
                    <p className="venue-address">{venue.address}</p>
                    <div className="venue-meta">
                      <span>Capacity: {venue.capacity}</span>
                    </div>
                    <button 
                      className="enquire-btn"
                      onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${venue.lat}&mlon=${venue.lon}`, '_blank')}
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {venues.length === 0 && showVenues && !isLoadingVenues && (
            <div className="no-venues">
              <p>No venues found in this location. Try another city or adjust your search.</p>
            </div>
          )}
        </div>
      );
    }

    // Venues display step
    const venueCategory = getVenueCategory(budget);
    const selectedCity = rajasthanLocations.find(loc => loc.name === userLocation);

    return (
      <div className="venue-container">
        <div className="venue-header">
          <h1>Wedding Venues in {userLocation || 'Rajasthan'}</h1>
          <p className="venue-subtitle">{selectedCity?.description || 'Find your perfect wedding venue'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="venue-category-info">
          {venueCategory === 'premium' && (
            <div className="venue-section">
              <div className="section-header">
                <Landmark size={32} />
                <h2>Luxury Resort & Palace Venues</h2>
              </div>
              <div className="venue-grid">
                {(selectedCity?.resorts || rajasthanLocations.flatMap(loc => loc.resorts)).map(resort => (
                  <div key={resort.name} className="venue-card">
                    <div className="venue-image" style={{ backgroundImage: `url(${resort.image})` }}>
                      <div className="venue-badge premium">Premium</div>
                    </div>
                    <div className="venue-details">
                      <h3>{resort.name}</h3>
                      <p className="venue-description">{resort.description}</p>
                      <div className="venue-info">
                        <div className="info-item">
                          <IndianRupee size={16} />
                          <span>₹{(resort.minBudget/100000).toFixed(1)} Lakhs</span>
                        </div>
                        <div className="info-item">
                          <Users size={16} />
                          <span>{resort.capacity} Guests</span>
                        </div>
                      </div>
                      <div className="venue-amenities">
                        {resort.amenities?.map((amenity, index) => (
                          <span key={index} className="amenity-tag">{amenity}</span>
                        ))}
                      </div>
                      <button className="enquire-btn">Request Quote</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(venueCategory === 'premium' || venueCategory === 'intermediate') && (
            <div className="venue-section">
              <div className="section-header">
                <Hotel size={32} />
                <h2>Premium Hotel Venues</h2>
              </div>
              <div className="venue-grid">
                {(selectedCity?.hotels || rajasthanLocations.flatMap(loc => loc.hotels)).map(hotel => (
                  <div key={hotel.name} className="venue-card">
                    <div className="venue-image" style={{ backgroundImage: `url(${hotel.image})` }}>
                      <div className="venue-badge hotel">Hotel</div>
                    </div>
                    <div className="venue-details">
                      <h3>{hotel.name}</h3>
                      <p className="venue-description">{hotel.description}</p>
                      <div className="venue-info">
                        <div className="info-item">
                          <IndianRupee size={16} />
                          <span>₹{(hotel.minBudget/100000).toFixed(1)} Lakhs</span>
                        </div>
                        <div className="info-item">
                          <Users size={16} />
                          <span>{hotel.capacity} Guests</span>
                        </div>
                      </div>
                      <div className="venue-amenities">
                        {hotel.amenities?.map((amenity, index) => (
                          <span key={index} className="amenity-tag">{amenity}</span>
                        ))}
                      </div>
                      <button className="enquire-btn">Request Quote</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {venueCategory === 'basic' && (
            <div className="venue-section basic">
              <div className="section-header">
                <Home size={32} />
                <h2>Budget-Friendly Venues</h2>
              </div>
              <div className="budget-recommendations">
                <div className="recommendation-card">
                  <h3>Local Banquet Halls</h3>
                  <p>Spacious venues perfect for traditional ceremonies</p>
                  <ul className="features-list">
                    <li>Flexible decoration options</li>
                    <li>Customizable catering</li>
                    <li>Ample parking space</li>
                  </ul>
                </div>
                <div className="recommendation-card">
                  <h3>Community Centers</h3>
                  <p>Affordable venues with basic amenities</p>
                  <ul className="features-list">
                    <li>Large capacity</li>
                    <li>Basic infrastructure</li>
                    <li>Central locations</li>
                  </ul>
                </div>
                <div className="recommendation-card">
                  <h3>Home Wedding Planning</h3>
                  <p>Intimate celebration in personal space</p>
                  <ul className="features-list">
                    <li>Personalized atmosphere</li>
                    <li>Cost-effective</li>
                    <li>Traditional appeal</li>
                  </ul>
                </div>
              </div>
              <div className="budget-notice">
                <Info size={24} />
                <div>
                  <p>Looking for premium venues?</p>
                  <p>Resort venues typically start from ₹50 Lakhs</p>
                  <p>Hotel venues typically start from ₹30 Lakhs</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render Events & Ceremonies content
  const renderEventsContent = () => {
    // Calculate events budget (30% of total budget)
    const eventsBudget = (dashboardData?.budget || 0) * 0.3;

    // Render step 1: Days and Events Selection
    if (eventStep === 1) {
      return (
        <div className="events-ceremonies-container">
          <div className="main-header">
            <h1>Events & Ceremonies</h1>
            <p className="subtitle">Plan your wedding events and ceremonies</p>
          </div>
          
          <div className="events-content">
            <div className="events-config-container">
              <div className="events-config-form">
                <div className="form-group">
                  <label htmlFor="eventDays">Number of Days for Events (1-5)</label>
                  <div className="event-input">
                    <Calendar size={20} />
                    <input
                      id="eventDays"
                      type="number"
                      value={eventDays}
                      onChange={(e) => setEventDays(parseInt(e.target.value) || 0)}
                      placeholder="Enter number of days"
                      min="1"
                      max="5"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="totalEvents">Total Number of Events/Ceremonies</label>
                  <div className="event-input">
                    <Gift size={20} />
                    <input
                      id="totalEvents"
                      type="number"
                      value={totalEvents}
                      onChange={(e) => setTotalEvents(parseInt(e.target.value) || 0)}
                      placeholder="Enter number of events"
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button onClick={distributeEvents} className="primary-button">
                  Continue
                </button>
              </div>
              <div className="events-budget-info">
                <h3>Events & Ceremonies Budget</h3>
                <p className="budget-amount">{formatToIndianCurrency(eventsBudget)}</p>
                <p className="budget-note">30% of your total wedding budget</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render step 2: Event Distribution and Selection
    if (eventStep === 2) {
      return (
        <div className="events-ceremonies-container">
          <div className="main-header">
            <h1>Events & Ceremonies</h1>
            <p className="subtitle">Plan your wedding events and ceremonies</p>
          </div>
          
          <div className="events-content">
            <div className="event-distribution-container">
              <div className="distribution-header">
                <h3>Event Distribution Across Days</h3>
                <div className="distribution-summary">
                  {eventDistribution.map((count, index) => (
                    <div key={index} className="day-summary">
                      <span className="day-label">Day {index + 1}</span>
                      <span className="event-count">{count} Events</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="event-selection-container">
                <div className="days-container">
                  {eventDistribution.map((eventCount, dayIndex) => (
                    <div key={dayIndex} className="day-card">
                      <div 
                        className="day-header" 
                        onClick={() => toggleDayExpansion(dayIndex)}
                      >
                        <h3>Day {dayIndex + 1}</h3>
                        <div className="day-info">
                          <span className="events-needed">{eventCount} Events Required</span>
                          <span className="events-selected">
                            {selectedEvents[dayIndex] ? selectedEvents[dayIndex].length : 0} Selected
                          </span>
                        </div>
                        {expandedDay === dayIndex ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                      
                      {expandedDay === dayIndex && (
                        <div className="day-content">
                          <div className="selected-events">
                            <h4>Selected Events</h4>
                            {selectedEvents[dayIndex] && selectedEvents[dayIndex].length > 0 ? (
                              <div className="selected-events-list">
                                {selectedEvents[dayIndex].map(event => (
                                  <div key={event.id} className="selected-event-item">
                                    <div className="event-details">
                                      <h5>{event.name}</h5>
                                      <p>{formatToIndianCurrency(getEventCost(event))}</p>
                                    </div>
                                    <button
                                    className="remove-event-btn"
                                    onClick={() => removeEventFromDay(dayIndex, event.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="no-events">No events selected yet</p>
                          )}
                        </div>
                        
                        <div className="available-events">
                          <h4>Available Events</h4>
                          <div className="available-events-list">
                            {eventTypes()
                              .filter(event => 
                                // Filter out events that are already selected for any day
                                !selectedEvents.some(dayEvents => 
                                  dayEvents && dayEvents.some(e => e.id === event.id)
                                )
                              )
                              .map(event => (
                                <div key={event.id} className="event-option">
                                  <div className="event-option-details">
                                    <h5>{event.name}</h5>
                                    <p className="event-description">{event.description}</p>
                                    <div className="event-meta">
                                      <span className="event-cost">
                                        <IndianRupee size={14} />
                                        {formatToIndianCurrency(getEventCost(event))}
                                      </span>
                                      <span className="event-duration">
                                        <Clock size={14} />
                                        {event.duration}
                                      </span>
                                    </div>
                                  </div>
                                  <button 
                                    className="add-event-btn"
                                    onClick={() => addEventToDay(dayIndex, event.id)}
                                    disabled={selectedEvents[dayIndex] && selectedEvents[dayIndex].length >= eventDistribution[dayIndex]}
                                  >
                                    Add
                                  </button>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="events-summary">
                <h3>Events Summary</h3>
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Total Days:</span>
                    <span>{eventDays}</span>
                  </div>
                  <div className="summary-item">
                    <span>Total Events:</span>
                    <span>{totalEvents}</span>
                  </div>
                  <div className="summary-item">
                    <span>Events Budget:</span>
                    <span>{formatToIndianCurrency(eventsBudget)}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Selected Events Cost:</span>
                    <span>{formatToIndianCurrency(calculateEventsTotalCost())}</span>
                  </div>
                  <div className="budget-progress">
                    <div className="progress-label">
                      <span>Budget Utilization</span>
                      <span>{Math.round((calculateEventsTotalCost() / eventsBudget) * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ 
                          width: `${Math.min(100, (calculateEventsTotalCost() / eventsBudget) * 100)}%`,
                          background: calculateEventsTotalCost() > eventsBudget ? 'var(--error-color)' : 'var(--primary-color)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="action-buttons">
                  <button 
                    className="secondary-button"
                    onClick={() => setEventStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="primary-button"
                    onClick={saveEventsConfiguration}
                    disabled={eventLoading}
                  >
                    {eventLoading ? 'Saving...' : 'Save Events Configuration'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

    // Render step 3: Confirmation
    return (
      <div className="events-ceremonies-container">
        <div className="main-header">
          <h1>Events & Ceremonies</h1>
          <p className="subtitle">Plan your wedding events and ceremonies</p>
        </div>
        
        <div className="events-content">
          <div className="events-confirmation">
            <div className="confirmation-header">
              <div className="confirmation-icon">
                <Check size={40} />
              </div>
              <h2>Events Configuration Saved!</h2>
              <p>Your wedding events have been successfully configured.</p>
            </div>
            
            <div className="events-schedule">
              <h3>Your Wedding Events Schedule</h3>
              
              {selectedEvents.map((dayEvents, dayIndex) => (
                <div key={dayIndex} className="schedule-day">
                  <h4>Day {dayIndex + 1}</h4>
                  <div className="schedule-events">
                    {dayEvents && dayEvents.map((event, eventIndex) => (
                      <div key={event.id} className="schedule-event">
                        <div className="event-time-slot">
                          {/* This would ideally come from the database with actual times */}
                          {eventIndex === 0 ? "Morning" : 
                           eventIndex === 1 ? "Afternoon" : "Evening"}
                        </div>
                        <div className="event-card">
                          <h5>{event.name}</h5>
                          <p>{event.description}</p>
                          <div className="event-details">
                            <span className="event-cost">
                              <IndianRupee size={14} />
                              {formatToIndianCurrency(getEventCost(event))}
                            </span>
                            <span className="event-duration">
                              <Clock size={14} />
                              {event.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="confirmation-summary">
              <h3>Summary</h3>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Total Days:</span>
                  <span>{eventDays}</span>
                </div>
                <div className="summary-item">
                  <span>Total Events:</span>
                  <span>{totalEvents}</span>
                </div>
                <div className="summary-item">
                  <span>Events Budget:</span>
                  <span>{formatToIndianCurrency(eventsBudget)}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Cost:</span>
                  <span>{formatToIndianCurrency(calculateEventsTotalCost())}</span>
                </div>
              </div>
              
              <button 
                className="primary-button"
                onClick={() => setEventStep(1)}
              >
                Configure New Events
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Catering content
  const renderCateringContent = () => {
    // Calculate catering budget (25% of total budget)
    const cateringBudget = (dashboardData?.budget || 0) * 0.25;
    const { vegMenus, nonVegMenus } = getCateringMenus();

    // Render step 1: Catering Type Selection
    if (cateringStep === 1) {
      return (
        <div className="catering-container">
          <div className="main-header">
            <h1>Wedding Catering</h1>
            <p className="subtitle">Select the perfect menu for your special day</p>
          </div>
          
          <div className="catering-content">
            <div className="catering-type-container">
              <h3>Select Catering Type</h3>
              <div className="catering-types">
                <div 
                  className={`catering-type-card ${cateringType === 'veg' ? 'selected' : ''}`}
                  onClick={() => setCateringType('veg')}
                >
                  <div className="type-icon">
                    <Leaf size={40} />
                  </div>
                  <h4>Vegetarian</h4>
                  <p>Pure vegetarian menu options with a variety of regional specialties</p>
                </div>
                
                <div 
                  className={`catering-type-card ${cateringType === 'nonveg' ? 'selected' : ''}`}
                  onClick={() => setCateringType('nonveg')}
                >
                  <div className="type-icon">
                    <Beef size={40} />
                  </div>
                  <h4>Non-Vegetarian</h4>
                  <p>Mixed menu with both vegetarian and non-vegetarian options</p>
                </div>
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button 
                className="primary-button"
                onClick={() => {
                  if (!cateringType) {
                    setError('Please select a catering type');
                    return;
                  }
                  setError('');
                  setCateringStep(2);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Render step 2: Menu Selection
    if (cateringStep === 2) {
      const menus = getCateringMenusByType();
      
      return (
        <div className="catering-container">
          <div className="main-header">
            <h1>Wedding Catering</h1>
            <p className="subtitle">Select the perfect menu for your special day</p>
          </div>
          
          <div className="catering-content">
            <div className="menu-selection-container">
              <div className="menu-selection-header">
                <h3>{cateringType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Menu Options</h3>
                <button 
                  className="back-button"
                  onClick={() => setCateringStep(1)}
                >
                  Change Type
                </button>
              </div>
              
              <div className="guest-count-selector">
                <label htmlFor="guestCount">Number of Guests</label>
                <div className="guest-input">
                  <Users size={20} />
                  <input
                    id="guestCount"
                    type="number"
                    value={cateringGuestCount}
                    onChange={(e) => setCateringGuestCount(parseInt(e.target.value) || 100)}
                    min="10"
                    max="1000"
                  />
                </div>
              </div>
              
              <div className="dietary-restrictions">
                <h4>Dietary Restrictions</h4>
                <div className="restrictions-options">
                  {dietaryOptions.map(option => (
                    <div 
                      key={option.id}
                      className={`restriction-option ${dietaryRestrictions.includes(option.id) ? 'selected' : ''}`}
                      onClick={() => toggleDietaryRestriction(option.id)}
                    >
                      {dietaryRestrictions.includes(option.id) && <Check size={16} />}
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="menu-options">
                {menus.map(menu => (
                  <div 
                    key={menu.id}
                    className={`menu-card ${selectedMenu === menu.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMenu(menu.id)}
                  >
                    <div className="menu-image" style={{ backgroundImage: `url(${menu.image})` }}>
                      <div className="menu-badge">{menu.name}</div>
                    </div>
                    <div className="menu-details">
                      <h4>{menu.name}</h4>
                      <p className="menu-description">{menu.description}</p>
                      <div className="menu-price">
                        <IndianRupee size={16} />
                        <span>{formatToIndianCurrency(menu.pricePerPlate)} per plate</span>
                      </div>
                      
                      <div className="menu-items">
                        <div className="menu-section">
                          <h5>Starters</h5>
                          <ul>
                            {menu.items.starters.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="menu-section">
                          <h5>Main Course</h5>
                          <ul>
                            {menu.items.mains.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="menu-section">
                          <h5>Desserts</h5>
                          <ul>
                            {menu.items.desserts.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="menu-summary">
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Menu Type:</span>
                    <span>{cateringType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Guest Count:</span>
                    <span>{cateringGuestCount}</span>
                  </div>
                  {selectedMenu && (
                    <div className="summary-item">
                      <span>Selected Menu:</span>
                      <span>{getCateringMenusByType().find(m => m.id === selectedMenu)?.name}</span>
                    </div>
                  )}
                  <div className="summary-item">
                    <span>Price Per Plate:</span>
                    <span>
                      {selectedMenu 
                        ? formatToIndianCurrency(getCateringMenusByType().find(m => m.id === selectedMenu)?.pricePerPlate) 
                        : '-'}
                    </span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Cost:</span>
                    <span>{formatToIndianCurrency(calculateCateringTotalCost())}</span>
                  </div>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="action-buttons">
                  <button 
                    className="secondary-button"
                    onClick={() => setCateringStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="primary-button"
                    onClick={saveCateringSelection}
                    disabled={cateringLoading || !selectedMenu}
                  >
                    {cateringLoading ? 'Saving...' : 'Save Catering Selection'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render step 3: Confirmation
    const menu = [...vegMenus, ...nonVegMenus].find(m => m.id === selectedMenu);
    
    return (
      <div className="catering-container">
        <div className="main-header">
          <h1>Wedding Catering</h1>
          <p className="subtitle">Select the perfect menu for your special day</p>
        </div>
        
        <div className="catering-content">
          <div className="catering-confirmation">
            <div className="confirmation-header">
              <div className="confirmation-icon">
                <Check size={40} />
              </div>
              <h2>Catering Selection Saved!</h2>
              <p>Your wedding catering has been successfully configured.</p>
            </div>
            
            <div className="confirmation-details">
              <div className="selected-menu-card">
                <div className="menu-image" style={{ backgroundImage: `url(${menu?.image})` }}>
                  <div className="menu-badge">{cateringType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</div>
                </div>
                <div className="menu-details">
                  <h3>{menu?.name}</h3>
                  <p>{menu?.description}</p>
                  
                  <div className="menu-meta">
                    <div className="meta-item">
                      <Users size={16} />
                      <span>{cateringGuestCount} Guests</span>
                    </div>
                    <div className="meta-item">
                      <IndianRupee size={16} />
                      <span>{formatToIndianCurrency(menu?.pricePerPlate)} per plate</span>
                    </div>
                  </div>
                  
                  {dietaryRestrictions.length > 0 && (
                    <div className="dietary-tags">
                      <Filter size={16} />
                      <div className="tags">
                        {dietaryRestrictions.map(restriction => (
                          <span key={restriction} className="dietary-tag">
                            {dietaryOptions.find(opt => opt.id === restriction)?.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="menu-items">
                    <div className="menu-section">
                      <h5>Starters</h5>
                      <ul>
                        {menu?.items.starters.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="menu-section">
                      <h5>Main Course</h5>
                      <ul>
                        {menu?.items.mains.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="menu-section">
                      <h5>Desserts</h5>
                      <ul>
                        {menu?.items.desserts.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="confirmation-summary">
                <h3>Summary</h3>
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Menu Type:</span>
                    <span>{cateringType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Guest Count:</span>
                    <span>{cateringGuestCount}</span>
                  </div>
                  <div className="summary-item">
                    <span>Selected Menu:</span>
                    <span>{menu?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Price Per Plate:</span>
                    <span>{formatToIndianCurrency(menu?.pricePerPlate)}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Cost:</span>
                    <span>{formatToIndianCurrency(calculateCateringTotalCost())}</span>
                  </div>
                </div>
                
                <button 
                  className="primary-button"
                  onClick={() => setCateringStep(1)}
                >
                  Change Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Shopping content
  const renderShoppingContent = () => {
    // Calculate shopping budget (18% of total budget)
    const shoppingBudget = (dashboardData?.budget || 0) * 0.18;
    const { attire, jewelry } = getShoppingOptions();
    const userRole = dashboardData?.role || 'bride';

    // Render step 1: Category Selection
    if (shoppingStep === 1) {
      return (
        <div className="shopping-container">
          <div className="main-header">
            <h1>Wedding Shopping</h1>
            <p className="subtitle">Select attire and jewelry for your special day</p>
          </div>
          
          <div className="shopping-content">
            <div className="shopping-intro">
              <div className="intro-header">
                <h3>Welcome to Wedding Shopping</h3>
                <p>Based on your role as {userRole} and your {totalEvents || 'upcoming'} events, we've curated the perfect collection for you.</p>
              </div>
              
              <div className="budget-overview">
                <div className="budget-card">
                  <div className="budget-icon">
                    <IndianRupee size={32} />
                  </div>
                  <div className="budget-details">
                    <h4>Shopping Budget</h4>
                    <p className="budget-amount">{formatToIndianCurrency(shoppingBudget)}</p>
                    <p className="budget-note">18% of your total wedding budget</p>
                  </div>
                </div>
              </div>
              
              <div className="category-selection">
                <h3>What would you like to shop for?</h3>
                <div className="category-options">
                  <div 
                    className={`category-card ${selectedCategory === 'attire' ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory('attire')}
                  >
                    <div className="category-icon">
                      <Shirt size={48} />
                    </div>
                    <h4>Wedding Attire</h4>
                    <p>Outfits for all your ceremonies</p>
                  </div>
                  
                  <div 
                    className={`category-card ${selectedCategory === 'jewelry' ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory('jewelry')}
                  >
                    <div className="category-icon">
                      <Gem size={48} />
                      </div>
                    <h4>Wedding Jewelry</h4>
                    <p>Traditional and modern jewelry pieces</p>
                  </div>
                  
                  <div 
                    className={`category-card ${selectedCategory === 'both' ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory('both')}
                  >
                    <div className="category-icon">
                      <Sparkles size={48} />
                    </div>
                    <h4>Complete Collection</h4>
                    <p>Both attire and jewelry</p>
                  </div>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <button 
                  className="primary-button"
                  onClick={() => {
                    if (!selectedCategory) {
                      setError('Please select a shopping category');
                      return;
                    }
                    setError('');
                    setShoppingStep(2);
                  }}
                >
                  Continue to Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render step 2: Item Selection
    if (shoppingStep === 2) {
      // Filter items based on selected category
      const itemsToShow = selectedCategory === 'attire' ? attire : 
                          selectedCategory === 'jewelry' ? jewelry :
                          [...attire, ...jewelry];
      
      return (
        <div className="shopping-container">
          <div className="main-header">
            <h1>Wedding Shopping</h1>
            <p className="subtitle">
              {selectedCategory === 'attire' ? 'Select your wedding attire' : 
               selectedCategory === 'jewelry' ? 'Select your wedding jewelry' :
               'Select your complete wedding collection'}
            </p>
          </div>
          
          <div className="shopping-content">
            <div className="shopping-selection">
              <div className="selection-header">
                <h3>Recommended for {userRole}</h3>
                <button 
                  className="back-button"
                  onClick={() => setShoppingStep(1)}
                >
                  Change Category
                </button>
              </div>
              
              <div className="essential-items">
                <h4>Essential Items</h4>
                <div className="items-grid">
                  {itemsToShow
                    .filter(item => item.essential)
                    .map(item => (
                      <div 
                        key={item.id}
                        className={`item-card ${selectedItems.some(i => i.id === item.id) ? 'selected' : ''}`}
                        onClick={() => addItemToSelection(item)}
                      >
                        <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}>
                          <div className="item-badge">{item.category === 'attire' ? 'Attire' : 'Jewelry'}</div>
                          {selectedItems.some(i => i.id === item.id) && (
                            <div className="selected-overlay">
                              <Check size={32} />
                            </div>
                          )}
                        </div>
                        <div className="item-details">
                          <h5>{item.name}</h5>
                          <p className="item-description">{item.description}</p>
                          <div className="item-meta">
                            <div className="item-price">
                              <IndianRupee size={16} />
                              <span>{formatToIndianCurrency(item.price)}</span>
                            </div>
                            <div className="item-event">
                              <Calendar size={16} />
                              <span>{item.forEvent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="optional-items">
                <h4>Optional Items</h4>
                <div className="items-grid">
                  {itemsToShow
                    .filter(item => !item.essential)
                    .map(item => (
                      <div 
                        key={item.id}
                        className={`item-card ${selectedItems.some(i => i.id === item.id) ? 'selected' : ''}`}
                        onClick={() => addItemToSelection(item)}
                      >
                        <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}>
                          <div className="item-badge">{item.category === 'attire' ? 'Attire' : 'Jewelry'}</div>
                          {selectedItems.some(i => i.id === item.id) && (
                            <div className="selected-overlay">
                              <Check size={32} />
                            </div>
                          )}
                        </div>
                        <div className="item-details">
                          <h5>{item.name}</h5>
                          <p className="item-description">{item.description}</p>
                          <div className="item-meta">
                            <div className="item-price">
                              <IndianRupee size={16} />
                              <span>{formatToIndianCurrency(item.price)}</span>
                            </div>
                            <div className="item-event">
                              <Calendar size={16} />
                              <span>{item.forEvent}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              <div className="shopping-summary">
                <h3>Shopping Summary</h3>
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Shopping Budget:</span>
                    <span>{formatToIndianCurrency(shoppingBudget)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Selected Items:</span>
                    <span>{selectedItems.length}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Total Cost:</span>
                    <span>{formatToIndianCurrency(calculateShoppingTotalCost())}</span>
                  </div>
                </div>
                
                <div className="budget-progress">
                  <div className="progress-label">
                    <span>Budget Utilization</span>
                    <span>{Math.round((calculateShoppingTotalCost() / shoppingBudget) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ 
                        width: `${Math.min(100, (calculateShoppingTotalCost() / shoppingBudget) * 100)}%`,
                        background: calculateShoppingTotalCost() > shoppingBudget ? 'var(--error-color)' : 'var(--primary-color)'
                      }}
                    ></div>
                  </div>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="action-buttons">
                  <button 
                    className="secondary-button"
                    onClick={() => setShoppingStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="primary-button"
                    onClick={saveShoppingSelection}
                    disabled={shoppingLoading || selectedItems.length === 0}
                  >
                    {shoppingLoading ? 'Saving...' : 'Complete Shopping'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Render step 3: Confirmation
    return (
      <div className="shopping-container">
        <div className="main-header">
          <h1>Wedding Shopping</h1>
          <p className="subtitle">Your wedding shopping is complete</p>
        </div>
        
        <div className="shopping-content">
          <div className="shopping-confirmation">
            <div className="confirmation-header">
              <div className="confirmation-icon">
                <Check size={40} />
              </div>
              <h2>Shopping Selection Saved!</h2>
              <p>Your wedding attire and jewelry selections have been saved.</p>
            </div>
            
            <div className="selected-items-summary">
              <h3>Your Selected Items</h3>
              
              {selectedItems.some(item => item.category === 'attire') && (
                <div className="category-summary">
                  <h4>Attire</h4>
                  <div className="items-grid">
                    {selectedItems
                      .filter(item => item.category === 'attire')
                      .map(item => (
                        <div key={item.id} className="selected-item-card">
                          <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                          <div className="item-details">
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                            <div className="item-meta">
                              <div className="item-price">
                                <IndianRupee size={16} />
                                <span>{formatToIndianCurrency(item.price)}</span>
                              </div>
                              <div className="item-event">
                                <Calendar size={16} />
                                <span>{item.forEvent}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {selectedItems.some(item => item.category === 'jewelry') && (
                <div className="category-summary">
                  <h4>Jewelry</h4>
                  <div className="items-grid">
                    {selectedItems
                      .filter(item => item.category === 'jewelry')
                      .map(item => (
                        <div key={item.id} className="selected-item-card">
                          <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                          <div className="item-details">
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                            <div className="item-meta">
                              <div className="item-price">
                                <IndianRupee size={16} />
                                <span>{formatToIndianCurrency(item.price)}</span>
                              </div>
                              <div className="item-event">
                                <Calendar size={16} />
                                <span>{item.forEvent}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="confirmation-summary">
              <h3>Summary</h3>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Shopping Budget:</span>
                  <span>{formatToIndianCurrency(shoppingBudget)}</span>
                </div>
                <div className="summary-item">
                  <span>Selected Items:</span>
                  <span>{selectedItems.length}</span>
                </div>
                <div className="summary-item">
                  <span>Attire Items:</span>
                  <span>{selectedItems.filter(item => item.category === 'attire').length}</span>
                </div>
                <div className="summary-item">
                  <span>Jewelry Items:</span>
                  <span>{selectedItems.filter(item => item.category === 'jewelry').length}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Cost:</span>
                  <span>{formatToIndianCurrency(calculateShoppingTotalCost())}</span>
                </div>
              </div>
              
              <button 
                className="primary-button"
                onClick={() => setShoppingStep(1)}
              >
                Shop Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render dashboard content
  const renderDashboardContent = () => {
    return (
      <>
        <section className="overview-section">
          <div className="section-header">
            <h3>Wedding Overview</h3>
          </div>
          <div className="overview-grid">
            <div className="overview-card budget-card">
              <div className="card-icon">
                <IndianRupee size={24} />
              </div>
              <div className="card-details">
                <h4>Total Budget</h4>
                <p className="budget-amount">{formatToIndianCurrency(dashboardData?.budget || 0)}</p>
              </div>
            </div>

            <div className="overview-card role-card">
              <div className="card-icon">
                <Users size={24} />
              </div>
              <div className="card-details">
                <h4>Your Role</h4>
                <p className="role-text">
                  {dashboardData?.role
                    ? dashboardData.role.charAt(0).toUpperCase() + dashboardData.role.slice(1)
                    : "Not Selected"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="dashboard-grid">
          <section className="budget-section">
            <div className="section-header">
              <h3>Budget Allocation</h3>
              <span className="total-budget">Total: {formatToIndianCurrency(dashboardData?.budget)}</span>
            </div>
            <div className="budget-grid">
              {budgetCategories.map((category, index) => (
                <div key={index} className="budget-item">
                  <div className="budget-header">
                    <div className="budget-title">
                      {category.icon}
                      <h4>{category.title}</h4>
                    </div>
                    <p className="budget-amount">
                      {formatToIndianCurrency((dashboardData?.budget || 0) * (category.percentage / 100))}
                    </p>
                  </div>
                  <div className="budget-bar-container">
                    <div className="budget-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${category.percentage}%`,
                          background: getProgressColor(category.percentage),
                        }}
                      />
                    </div>
                    <div className="budget-percentage">{category.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="right-column">
            <section className="planning-progress-section">
              <div className="section-header">
                <h3>Planning Progress</h3>
              </div>
              <div className="planning-progress-container">
                <div className="progress-item">
                  <div className="progress-header">
                    <h4>Venue Selection</h4>
                    <span className="progress-percentage">0%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "0%" }}></div>
                  </div>
                  <button 
                    className="start-planning-btn"
                    onClick={() => handleNavigation("venue")}
                  >
                    Start Planning
                  </button>
                </div>
                
                <div className="progress-item">
                  <div className="progress-header">
                    <h4>Events & Ceremonies</h4>
                    <span className="progress-percentage">0%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "0%" }}></div>
                  </div>
                  <button 
                    className="start-planning-btn"
                    onClick={() => handleNavigation("events")}
                  >
                    Start Planning
                  </button>
                </div>
                
                <div className="progress-item">
                  <div className="progress-header">
                    <h4>Catering</h4>
                    <span className="progress-percentage">0%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "0%" }}></div>
                  </div>
                  <button 
                    className="start-planning-btn"
                    onClick={() => handleNavigation("catering")}
                  >
                    Start Planning
                  </button>
                </div>

                <div className="progress-item">
                  <div className="progress-header">
                    <h4>Shopping</h4>
                    <span className="progress-percentage">0%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "0%" }}></div>
                  </div>
                  <button 
                    className="start-planning-btn"
                    onClick={() => handleNavigation("shopping")}
                  >
                    Start Planning
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-container">
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!sidebarCollapsed && <h1 className="sidebar-logo">WedNest</h1>}
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {sidebarCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <a 
              href="#" 
              className={`nav-link ${currentView === "dashboard" ? "active" : ""}`} 
              onClick={() => handleNavigation("dashboard")}
            >
              <Home size={20} />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </a>
            <a 
              href="#" 
              className={`nav-link ${currentView === "venue" ? "active" : ""}`} 
              onClick={() => handleNavigation("venue")}
            >
              <Store size={20} />
              {!sidebarCollapsed && <span>Venues</span>}
            </a>
            <a 
              href="#" 
              className={`nav-link ${currentView === "events" ? "active" : ""}`} 
              onClick={() => handleNavigation("events")}
            >
              <Calendar size={20} />
              {!sidebarCollapsed && <span>Events & Ceremonies</span>}
            </a>
            <a 
              href="#" 
              className={`nav-link ${currentView === "catering" ? "active" : ""}`} 
              onClick={() => handleNavigation("catering")}
            >
              <UtensilsCrossed size={20} />
              {!sidebarCollapsed && <span>Catering</span>}
            </a>
            <a 
              href="#" 
              className={`nav-link ${currentView === "shopping" ? "active" : ""}`} 
              onClick={() => handleNavigation("shopping")}
            >
              <ShoppingBag size={20} />
              {!sidebarCollapsed && <span>Shopping</span>}
            </a>
            <a 
              href="#" 
              className={`nav-link ${currentView === "settings" ? "active" : ""}`} 
              onClick={() => handleNavigation("settings")}
            >
              <Settings size={20} />
              {!sidebarCollapsed && <span>Settings</span>}
            </a>
          </div>

          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="header-title">
                <h2>Welcome, {dashboardData?.username || userData?.name}</h2>
                <p className="header-subtitle">Let's plan your perfect wedding day</p>
              </div>
            </div>
            <div className="header-right">
              <div className="search-bar">
                <Search size={18} />
                <input type="text" placeholder="Search..." />
              </div>
              <div className="user-profile" onClick={toggleProfileMenu}>
                <div className="user-avatar">{userData?.name?.charAt(0) || "U"}</div>
                <div className="user-info">
                  <span className="user-name">{userData?.name || "User"}</span>
                  <span className="user-role">{dashboardData?.role || "Guest"}</span>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`profile-arrow ${showProfileMenu ? 'rotated' : ''}`} 
                />
                
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <span className="user-email">{userData?.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item">
                      <User size={16} />
                      <span>My Profile</span>
                    </button>
                    <button className="dropdown-item">
                      <Settings size={16} />
                      <span>Account Settings</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {currentView === "dashboard" && renderDashboardContent()}
          {currentView === "venue" && renderVenueContent()}
          {currentView === "events" && renderEventsContent()}
          {currentView === "catering" && renderCateringContent()}
          {currentView === "shopping" && renderShoppingContent()}
        </div>
      </main>
    </div>
  )
}

export default Dashboard;