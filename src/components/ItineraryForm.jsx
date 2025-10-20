import { useState, useCallback, useMemo } from 'react';
import { generatePDF } from '../utils/pdfGenerator.js';

const ItineraryForm = () => {
  const [formData, setFormData] = useState({
    // Tour Overview
    customerName: 'Rahul',
    tripTitle: 'Singapore Itinerary',
    totalDays: 4,
    totalNights: 3,
    departureFrom: 'Mumbai',
    departureDate: '31/10/2025',
    arrivalDate: '01/11/2025',
    destination: 'Singapore',
    numberOfTravelers: 4,
    
    // Daily Itinerary
    days: [
      {
        dayNumber: 1,
        date: '27th November',
        title: 'Arrival In Singapore & City Exploration',
        image: '',
        morning: [
          { text: 'Arrive In Singapore. Transfer From Airport To Hotel.' }
        ],
        afternoon: [
          { text: 'Check Into Your Hotel.' },
          { text: 'Visit Marina Bay Sands Sky Park (2-3 Hours).' },
          { text: 'Optional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.' }
        ],
        evening: [
          { text: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)' }
        ]
      }
    ],
    
    // Flights
    flights: [
      {
        date: 'Thu 10 Jan\'24',
        airline: 'Fly Air India (AX-123)',
        route: 'From Delhi (DEL) To Singapore (SIN).'
      }
    ],
    flightNote: 'Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.',
    
    // Hotels
    hotels: [
      {
        city: 'Singapore',
        checkIn: '24/02/2024',
        checkOut: '24/02/2024',
        nights: 2,
        hotelName: 'Super Townhouse Oak Vashi Formerly Blue Diamond'
      }
    ],
    hotelNotes: [
      '1. All Hotels Are Tentative And Can Be Replaced With Similar.',
      '2. Breakfast Included For All Hotel Stays.',
      '3. All Hotels Will Be 4* And Above Category',
      '4. A maximum occupancy of 2 people/room is allowed in most hotels.'
    ],
    
    // Important Notes
    importantNotes: [
      {
        point: 'Airlines Standard Policy',
        details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.'
      },
      {
        point: 'Flight/Hotel Cancellation',
        details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.'
      },
      {
        point: 'Trip Insurance',
        details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.'
      },
      {
        point: 'Hotel Check-In & Check Out',
        details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.'
      },
      {
        point: 'Visa Rejection',
        details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.'
      }
    ],
    
    // Scope of Service
    scopeOfService: [
      {
        service: 'Flight Tickets And Hotel Vouchers',
        details: 'Delivered 3 Days Post Full Payment'
      },
      {
        service: 'Web Check-In',
        details: 'Boarding Pass Delivery Via Email/WhatsApp'
      },
      {
        service: 'Support',
        details: 'Chat Support – Response Time: 4 Hours'
      },
      {
        service: 'Cancellation Support',
        details: 'Provided'
      },
      {
        service: 'Trip Support',
        details: 'Response Time: 5 Minutes'
      }
    ],
    
    // Inclusions
    inclusions: [
      {
        category: 'Flight',
        count: 2,
        details: 'All Flights Mentioned',
        status: 'Awaiting Confirmation'
      },
      {
        category: 'Tourist Tax',
        count: 2,
        details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)',
        status: 'Awaiting Confirmation'
      },
      {
        category: 'Hotel',
        count: 2,
        details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any',
        status: 'Included'
      }
    ],
    inclusionNote: 'Transfer Policy(Refundable Upon Claim)\nIf Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.',
    
    // Activities
    activities: [
      {
        city: 'Rio De Janeiro',
        activity: 'Sydney Harbour Cruise & Taronga Zoo',
        type: 'Nature/Sightseeing',
        timeRequired: '2-3 Hours'
      }
    ],
    
    // Payment Plan
    totalAmount: 9_00_000,
    tcsStatus: 'Not Collected',
    installments: [
      {
        installmentNumber: 'Installment 1',
        amount: '₹3,50,000',
        dueDate: 'Initial Payment'
      },
      {
        installmentNumber: 'Installment 2',
        amount: '₹4,00,000',
        dueDate: 'Post Visa Approval'
      },
      {
        installmentNumber: 'Installment 3',
        amount: 'Remaining',
        dueDate: '20 Days Before Departure'
      }
    ],
    
    // Visa Details
    visaType: '123456',
    visaValidity: '123456',
    visaProcessingDate: '123456'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddingDay, setIsAddingDay] = useState(false);
  const [isAddingActivity, setIsAddingActivity] = useState({}); // Track adding state per day/period
  const [isAddingFlight, setIsAddingFlight] = useState(false);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const [isAddingInclusion, setIsAddingInclusion] = useState(false);
  const [isAddingInstallment, setIsAddingInstallment] = useState(false);

  // Memoized handlers using useCallback to prevent unnecessary re-renders
  const handleInputChange = useCallback((section, index, field, value) => {
    setFormData(prev => {
      if (section === 'days') {
        const newDays = [...prev.days];
        newDays[index] = { ...newDays[index], [field]: value };
        return { ...prev, days: newDays };
      }
      return { ...prev, [field]: value };
    });
  }, []);

  const addDay = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isAddingDay) return;
    
    setIsAddingDay(true);
    setFormData(prev => ({
      ...prev,
      days: [
        ...prev.days,
        {
          dayNumber: prev.days.length + 1,
          date: '',
          title: '',
          image: '',
          morning: [{ text: '' }],
          afternoon: [{ text: '' }],
          evening: [{ text: '' }]
        }
      ]
    }));
    setTimeout(() => setIsAddingDay(false), 300);
  }, [isAddingDay]);

  const removeDay = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.filter((_, i) => i !== index)
    }));
  }, []);

  const addActivity = useCallback((dayIndex, period, event) => {
    // Prevent default behavior and event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Create unique key for this day/period combination
    const activityKey = `${dayIndex}-${period}`;
    
    // Prevent duplicate additions if already adding
    if (isAddingActivity[activityKey]) {
      console.log('🚫 Prevented duplicate activity addition');
      return;
    }

    // Set loading state for this specific button
    setIsAddingActivity(prev => ({ ...prev, [activityKey]: true }));
    
    // Add the activity with functional state update
    setFormData(prev => {
      const newDays = [...prev.days];
      const currentActivities = newDays[dayIndex][period];
      newDays[dayIndex][period] = [...currentActivities, { text: '' }];
      return { ...prev, days: newDays };
    });

    // Re-enable button after a short delay (debouncing)
    setTimeout(() => {
      setIsAddingActivity(prev => ({ ...prev, [activityKey]: false }));
    }, 300); // 300ms debounce
  }, [isAddingActivity]);

  const removeActivity = useCallback((dayIndex, period, activityIndex) => {
    setFormData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex][period] = newDays[dayIndex][period].filter((_, i) => i !== activityIndex);
      return { ...prev, days: newDays };
    });
  }, []);

  const updateActivity = useCallback((dayIndex, period, activityIndex, value) => {
    setFormData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex][period][activityIndex] = { text: value };
      return { ...prev, days: newDays };
    });
  }, []);

  const addFlight = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isAddingFlight) return;
    
    setIsAddingFlight(true);
    setFormData(prev => ({
      ...prev,
      flights: [...prev.flights, { date: '', airline: '', route: '' }]
    }));
    setTimeout(() => setIsAddingFlight(false), 300);
  }, [isAddingFlight]);

  const removeFlight = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      flights: prev.flights.filter((_, i) => i !== index)
    }));
  }, []);

  const updateFlight = useCallback((index, field, value) => {
    setFormData(prev => {
      const newFlights = [...prev.flights];
      newFlights[index] = { ...newFlights[index], [field]: value };
      return { ...prev, flights: newFlights };
    });
  }, []);

  const addHotel = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isAddingHotel) return;
    
    setIsAddingHotel(true);
    setFormData(prev => ({
      ...prev,
      hotels: [...prev.hotels, { city: '', checkIn: '', checkOut: '', nights: 0, hotelName: '' }]
    }));
    setTimeout(() => setIsAddingHotel(false), 300);
  }, [isAddingHotel]);

  const removeHotel = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels.filter((_, i) => i !== index)
    }));
  }, []);

  const updateHotel = useCallback((index, field, value) => {
    setFormData(prev => {
      const newHotels = [...prev.hotels];
      newHotels[index] = { ...newHotels[index], [field]: value };
      return { ...prev, hotels: newHotels };
    });
  }, []);

  const addInclusion = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isAddingInclusion) return;
    
    setIsAddingInclusion(true);
    setFormData(prev => ({
      ...prev,
      inclusions: [...prev.inclusions, { category: '', count: 0, details: '', status: '' }]
    }));
    setTimeout(() => setIsAddingInclusion(false), 300);
  }, [isAddingInclusion]);

  const removeInclusion = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  }, []);

  const updateInclusion = useCallback((index, field, value) => {
    setFormData(prev => {
      const newInclusions = [...prev.inclusions];
      newInclusions[index] = { ...newInclusions[index], [field]: value };
      return { ...prev, inclusions: newInclusions };
    });
  }, []);

  const addInstallment = useCallback((event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (isAddingInstallment) return;
    
    setIsAddingInstallment(true);
    setFormData(prev => ({
      ...prev,
      installments: [...prev.installments, { installmentNumber: `Installment ${prev.installments.length + 1}`, amount: '', dueDate: '' }]
    }));
    setTimeout(() => setIsAddingInstallment(false), 300);
  }, [isAddingInstallment]);

  const removeInstallment = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      installments: prev.installments.filter((_, i) => i !== index)
    }));
  }, []);

  const updateInstallment = useCallback((index, field, value) => {
    setFormData(prev => {
      const newInstallments = [...prev.installments];
      newInstallments[index] = { ...newInstallments[index], [field]: value };
      return { ...prev, installments: newInstallments };
    });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      await generatePDF(formData);
      setTimeout(() => setIsGenerating(false), 1000);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
      setIsGenerating(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-block mb-4">
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                via
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                govia
              </span>
            </h1>
          </div>
          <p className="text-xl text-white/90 font-medium mb-2">Itinerary Builder</p>
          <p className="text-white/70">Create your perfect travel experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Tour Overview Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                ✈️
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tour Overview
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Customer Name', value: formData.customerName, field: 'customerName', icon: '👤', type: 'text' },
                { label: 'Trip Title', value: formData.tripTitle, field: 'tripTitle', icon: '🎯', type: 'text' },
                { label: 'Total Days', value: formData.totalDays, field: 'totalDays', icon: '📅', type: 'number' },
                { label: 'Total Nights', value: formData.totalNights, field: 'totalNights', icon: '🌙', type: 'number' },
                { label: 'Departure From', value: formData.departureFrom, field: 'departureFrom', icon: '🛫', type: 'text' },
                { label: 'Departure Date', value: formData.departureDate, field: 'departureDate', icon: '📆', type: 'text' },
                { label: 'Arrival Date', value: formData.arrivalDate, field: 'arrivalDate', icon: '📆', type: 'text' },
                { label: 'Destination', value: formData.destination, field: 'destination', icon: '📍', type: 'text' },
              ].map((input, idx) => (
                <div key={idx} className="group">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <span>{input.icon}</span>
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    value={input.value}
                    onChange={(e) => setFormData({ ...formData, [input.field]: input.type === 'number' ? parseInt(e.target.value) : e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none font-medium"
                    placeholder={`Enter ${input.label.toLowerCase()}`}
                  />
                </div>
              ))}
              
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span>👥</span>
                  Number of Travelers
                </label>
                <input
                  type="number"
                  value={formData.numberOfTravelers}
                  onChange={(e) => setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none font-medium"
                  placeholder="Enter number of travelers"
                />
              </div>
            </div>
          </section>

          {/* Daily Itinerary Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-2xl">
                  🗓️
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Daily Itinerary
                </h2>
              </div>
              <button
                type="button"
                onClick={(e) => addDay(e)}
                disabled={isAddingDay}
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isAddingDay
                    ? 'bg-orange-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:scale-105'
                } text-white`}
              >
                {isAddingDay ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="text-xl">+</span>
                    Add Day
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.days.map((day, dayIndex) => (
                <div key={dayIndex} className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-100 animate-scaleIn">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-orange-900 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center text-sm">
                        {dayIndex + 1}
                      </span>
                      Day {dayIndex + 1}
                    </h3>
                    {formData.days.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDay(dayIndex)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Date</label>
                      <input
                        type="text"
                        value={day.date}
                        onChange={(e) => handleInputChange('days', dayIndex, 'date', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 outline-none"
                        placeholder="e.g., 27th November"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">✨ Title</label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => handleInputChange('days', dayIndex, 'title', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 outline-none"
                        placeholder="Day description"
                      />
                    </div>
                  </div>

                  {['morning', 'afternoon', 'evening'].map((period) => {
                    const activityKey = `${dayIndex}-${period}`;
                    const isAdding = isAddingActivity[activityKey] || false;
                    
                    return (
                    <div key={period} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-700 capitalize">
                          {period === 'morning' && '🌅'} {period === 'afternoon' && '☀️'} {period === 'evening' && '🌆'} {period} Activities
                        </label>
                        <button
                          type="button"
                          onClick={(e) => addActivity(dayIndex, period, e)}
                          disabled={isAdding}
                          className={`text-sm px-3 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                            isAdding 
                              ? 'bg-orange-300 cursor-not-allowed' 
                              : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
                          } text-white`}
                        >
                          {isAdding ? (
                            <>
                              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Adding...
                            </>
                          ) : (
                            '+ Add'
                          )}
                        </button>
                      </div>
                      <div className="space-y-2">
                        {day[period].map((activity, actIndex) => (
                          <div key={actIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={activity.text}
                              onChange={(e) => updateActivity(dayIndex, period, actIndex, e.target.value)}
                              className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200 outline-none"
                              placeholder="Activity description"
                            />
                            {day[period].length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeActivity(dayIndex, period, actIndex)}
                                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* Flights Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-2xl">
                  ✈️
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Flight Details
                </h2>
              </div>
              <button
                type="button"
                onClick={(e) => addFlight(e)}
                disabled={isAddingFlight}
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isAddingFlight
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:scale-105'
                } text-white`}
              >
                {isAddingFlight ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="text-xl">+</span>
                    Add Flight
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.flights.map((flight, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100 animate-scaleIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Date</label>
                      <input
                        type="text"
                        value={flight.date}
                        onChange={(e) => updateFlight(index, 'date', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">✈️ Airline</label>
                      <input
                        type="text"
                        value={flight.airline}
                        onChange={(e) => updateFlight(index, 'airline', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">🛫 Route</label>
                      <input
                        type="text"
                        value={flight.route}
                        onChange={(e) => updateFlight(index, 'route', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                  {formData.flights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFlight(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
                    >
                      Remove Flight
                    </button>
                  )}
                </div>
              ))}
              
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Flight Note</label>
                <textarea
                  value={formData.flightNote}
                  onChange={(e) => setFormData({ ...formData, flightNote: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                  rows="2"
                />
              </div>
            </div>
          </section>

          {/* Hotels Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-2xl">
                  🏨
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Hotel Bookings
                </h2>
              </div>
              <button
                type="button"
                onClick={(e) => addHotel(e)}
                disabled={isAddingHotel}
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isAddingHotel
                    ? 'bg-green-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-teal-500 hover:shadow-lg hover:scale-105'
                } text-white`}
              >
                {isAddingHotel ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="text-xl">+</span>
                    Add Hotel
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.hotels.map((hotel, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-100 animate-scaleIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">🏙️ City</label>
                      <input
                        type="text"
                        value={hotel.city}
                        onChange={(e) => updateHotel(index, 'city', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📥 Check In</label>
                      <input
                        type="text"
                        value={hotel.checkIn}
                        onChange={(e) => updateHotel(index, 'checkIn', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📤 Check Out</label>
                      <input
                        type="text"
                        value={hotel.checkOut}
                        onChange={(e) => updateHotel(index, 'checkOut', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">🌙 Nights</label>
                      <input
                        type="number"
                        value={hotel.nights}
                        onChange={(e) => updateHotel(index, 'nights', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2 lg:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">🏨 Hotel Name</label>
                      <input
                        type="text"
                        value={hotel.hotelName}
                        onChange={(e) => updateHotel(index, 'hotelName', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                  {formData.hotels.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHotel(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
                    >
                      Remove Hotel
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Inclusions Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl">
                  ✅
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Inclusions Summary
                </h2>
              </div>
              <button
                type="button"
                onClick={(e) => addInclusion(e)}
                disabled={isAddingInclusion}
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isAddingInclusion
                    ? 'bg-purple-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:scale-105'
                } text-white`}
              >
                {isAddingInclusion ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="text-xl">+</span>
                    Add Inclusion
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.inclusions.map((inclusion, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100 animate-scaleIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📋 Category</label>
                      <input
                        type="text"
                        value={inclusion.category}
                        onChange={(e) => updateInclusion(index, 'category', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">🔢 Count</label>
                      <input
                        type="number"
                        value={inclusion.count}
                        onChange={(e) => updateInclusion(index, 'count', parseInt(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Details</label>
                      <input
                        type="text"
                        value={inclusion.details}
                        onChange={(e) => updateInclusion(index, 'details', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">✨ Status</label>
                      <input
                        type="text"
                        value={inclusion.status}
                        onChange={(e) => updateInclusion(index, 'status', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                  {formData.inclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInclusion(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
                    >
                      Remove Inclusion
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Payment Plan Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-2xl">
                💳
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Payment Plan
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span>💰</span>
                  Total Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => setFormData({ ...formData, totalAmount: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 outline-none font-medium"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span>📊</span>
                  TCS Status
                </label>
                <input
                  type="text"
                  value={formData.tcsStatus}
                  onChange={(e) => setFormData({ ...formData, tcsStatus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 outline-none font-medium"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Installments</h3>
              <button
                type="button"
                onClick={(e) => addInstallment(e)}
                disabled={isAddingInstallment}
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isAddingInstallment
                    ? 'bg-yellow-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:scale-105'
                } text-white`}
              >
                {isAddingInstallment ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <span className="text-xl">+</span>
                    Add Installment
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.installments.map((installment, index) => (
                <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-100 animate-scaleIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">🏷️ Installment</label>
                      <input
                        type="text"
                        value={installment.installmentNumber}
                        onChange={(e) => updateInstallment(index, 'installmentNumber', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-yellow-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">💵 Amount</label>
                      <input
                        type="text"
                        value={installment.amount}
                        onChange={(e) => updateInstallment(index, 'amount', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-yellow-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Due Date</label>
                      <input
                        type="text"
                        value={installment.dueDate}
                        onChange={(e) => updateInstallment(index, 'dueDate', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-yellow-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 outline-none"
                      />
                    </div>
                  </div>
                  {formData.installments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInstallment(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 text-sm font-semibold"
                    >
                      Remove Installment
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Visa Details Section */}
          <section className="glass-card rounded-3xl p-8 animate-fadeInUp transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
                🛂
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Visa Details
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Visa Type', value: formData.visaType, field: 'visaType', icon: '🎫' },
                { label: 'Validity', value: formData.visaValidity, field: 'visaValidity', icon: '⏰' },
                { label: 'Processing Date', value: formData.visaProcessingDate, field: 'visaProcessingDate', icon: '📆' },
              ].map((input, idx) => (
                <div key={idx}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <span>{input.icon}</span>
                    {input.label}
                  </label>
                  <input
                    type="text"
                    value={input.value}
                    onChange={(e) => setFormData({ ...formData, [input.field]: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none font-medium"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div className="text-center animate-fadeInUp">
            <button
              type="submit"
              disabled={isGenerating}
              className={`
                relative px-12 py-5 text-xl font-bold rounded-2xl
                text-white overflow-hidden group
                ${isGenerating ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-2xl hover:scale-105'}
                transition-all duration-300
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <span className="relative flex items-center justify-center gap-3">
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🎉</span>
                    Get Your Itinerary
                    <span className="text-2xl">✨</span>
                  </>
                )}
              </span>
            </button>
            <p className="mt-4 text-white/80 text-sm">
              Click to generate your beautiful PDF itinerary
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ItineraryForm;
