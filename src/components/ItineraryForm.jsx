import { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

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

  const handleInputChange = (section, index, field, value) => {
    setFormData(prev => {
      if (section === 'days') {
        const newDays = [...prev.days];
        newDays[index] = { ...newDays[index], [field]: value };
        return { ...prev, days: newDays };
      }
      return { ...prev, [field]: value };
    });
  };

  const addDay = () => {
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
  };

  const removeDay = (index) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.filter((_, i) => i !== index)
    }));
  };

  const addActivity = (dayIndex, period) => {
    setFormData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex][period].push({ text: '' });
      return { ...prev, days: newDays };
    });
  };

  const removeActivity = (dayIndex, period, activityIndex) => {
    setFormData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex][period] = newDays[dayIndex][period].filter((_, i) => i !== activityIndex);
      return { ...prev, days: newDays };
    });
  };

  const updateActivity = (dayIndex, period, activityIndex, value) => {
    setFormData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex][period][activityIndex].text = value;
      return { ...prev, days: newDays };
    });
  };

  const addFlight = () => {
    setFormData(prev => ({
      ...prev,
      flights: [...prev.flights, { date: '', airline: '', route: '' }]
    }));
  };

  const removeFlight = (index) => {
    setFormData(prev => ({
      ...prev,
      flights: prev.flights.filter((_, i) => i !== index)
    }));
  };

  const updateFlight = (index, field, value) => {
    setFormData(prev => {
      const newFlights = [...prev.flights];
      newFlights[index][field] = value;
      return { ...prev, flights: newFlights };
    });
  };

  const addHotel = () => {
    setFormData(prev => ({
      ...prev,
      hotels: [...prev.hotels, { city: '', checkIn: '', checkOut: '', nights: 0, hotelName: '' }]
    }));
  };

  const removeHotel = (index) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels.filter((_, i) => i !== index)
    }));
  };

  const updateHotel = (index, field, value) => {
    setFormData(prev => {
      const newHotels = [...prev.hotels];
      newHotels[index][field] = value;
      return { ...prev, hotels: newHotels };
    });
  };

  const addInclusion = () => {
    setFormData(prev => ({
      ...prev,
      inclusions: [...prev.inclusions, { category: '', count: 0, details: '', status: '' }]
    }));
  };

  const removeInclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  const updateInclusion = (index, field, value) => {
    setFormData(prev => {
      const newInclusions = [...prev.inclusions];
      newInclusions[index][field] = value;
      return { ...prev, inclusions: newInclusions };
    });
  };

  const addInstallment = () => {
    setFormData(prev => ({
      ...prev,
      installments: [...prev.installments, { installmentNumber: `Installment ${prev.installments.length + 1}`, amount: '', dueDate: '' }]
    }));
  };

  const removeInstallment = (index) => {
    setFormData(prev => ({
      ...prev,
      installments: prev.installments.filter((_, i) => i !== index)
    }));
  };

  const updateInstallment = (index, field, value) => {
    setFormData(prev => {
      const newInstallments = [...prev.installments];
      newInstallments[index][field] = value;
      return { ...prev, installments: newInstallments };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF(formData);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 my-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-vigovia-purple mb-2">Vigovia Itinerary Builder</h1>
        <p className="text-gray-600">Create your perfect travel itinerary</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Tour Overview Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <h2 className="text-2xl font-bold text-vigovia-purple mb-4">Tour Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
              <input
                type="text"
                value={formData.tripTitle}
                onChange={(e) => setFormData({ ...formData, tripTitle: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
              <input
                type="number"
                value={formData.totalDays}
                onChange={(e) => setFormData({ ...formData, totalDays: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Nights</label>
              <input
                type="number"
                value={formData.totalNights}
                onChange={(e) => setFormData({ ...formData, totalNights: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure From</label>
              <input
                type="text"
                value={formData.departureFrom}
                onChange={(e) => setFormData({ ...formData, departureFrom: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <input
                type="text"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
              <input
                type="text"
                value={formData.arrivalDate}
                onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
              <input
                type="number"
                value={formData.numberOfTravelers}
                onChange={(e) => setFormData({ ...formData, numberOfTravelers: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Daily Itinerary Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-vigovia-purple">Daily Itinerary</h2>
            <button
              type="button"
              onClick={addDay}
              className="px-4 py-2 bg-vigovia-purple text-white rounded-lg hover:bg-opacity-90 transition"
            >
              + Add Day
            </button>
          </div>
          
          {formData.days.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-6 p-4 bg-vigovia-light-purple rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-vigovia-purple">Day {dayIndex + 1}</h3>
                {formData.days.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDay(dayIndex)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  >
                    Remove Day
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={day.date}
                    onChange={(e) => handleInputChange('days', dayIndex, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => handleInputChange('days', dayIndex, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
              </div>

              {/* Morning Activities */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Morning Activities</label>
                  <button
                    type="button"
                    onClick={() => addActivity(dayIndex, 'morning')}
                    className="text-sm px-2 py-1 bg-vigovia-blue text-white rounded hover:bg-opacity-90"
                  >
                    + Add Activity
                  </button>
                </div>
                {day.morning.map((activity, actIndex) => (
                  <div key={actIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={activity.text}
                      onChange={(e) => updateActivity(dayIndex, 'morning', actIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                      placeholder="Activity description"
                    />
                    {day.morning.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActivity(dayIndex, 'morning', actIndex)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Afternoon Activities */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Afternoon Activities</label>
                  <button
                    type="button"
                    onClick={() => addActivity(dayIndex, 'afternoon')}
                    className="text-sm px-2 py-1 bg-vigovia-blue text-white rounded hover:bg-opacity-90"
                  >
                    + Add Activity
                  </button>
                </div>
                {day.afternoon.map((activity, actIndex) => (
                  <div key={actIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={activity.text}
                      onChange={(e) => updateActivity(dayIndex, 'afternoon', actIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                      placeholder="Activity description"
                    />
                    {day.afternoon.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActivity(dayIndex, 'afternoon', actIndex)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Evening Activities */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Evening Activities</label>
                  <button
                    type="button"
                    onClick={() => addActivity(dayIndex, 'evening')}
                    className="text-sm px-2 py-1 bg-vigovia-blue text-white rounded hover:bg-opacity-90"
                  >
                    + Add Activity
                  </button>
                </div>
                {day.evening.map((activity, actIndex) => (
                  <div key={actIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={activity.text}
                      onChange={(e) => updateActivity(dayIndex, 'evening', actIndex, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                      placeholder="Activity description"
                    />
                    {day.evening.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActivity(dayIndex, 'evening', actIndex)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Flights Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-vigovia-purple">Flight Details</h2>
            <button
              type="button"
              onClick={addFlight}
              className="px-4 py-2 bg-vigovia-purple text-white rounded-lg hover:bg-opacity-90 transition"
            >
              + Add Flight
            </button>
          </div>
          
          {formData.flights.map((flight, index) => (
            <div key={index} className="mb-4 p-4 bg-vigovia-light-purple rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={flight.date}
                    onChange={(e) => updateFlight(index, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
                  <input
                    type="text"
                    value={flight.airline}
                    onChange={(e) => updateFlight(index, 'airline', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <input
                    type="text"
                    value={flight.route}
                    onChange={(e) => updateFlight(index, 'route', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
              </div>
              {formData.flights.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFlight(index)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                >
                  Remove Flight
                </button>
              )}
            </div>
          ))}
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Note</label>
            <textarea
              value={formData.flightNote}
              onChange={(e) => setFormData({ ...formData, flightNote: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              rows="2"
            />
          </div>
        </section>

        {/* Hotels Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-vigovia-purple">Hotel Bookings</h2>
            <button
              type="button"
              onClick={addHotel}
              className="px-4 py-2 bg-vigovia-purple text-white rounded-lg hover:bg-opacity-90 transition"
            >
              + Add Hotel
            </button>
          </div>
          
          {formData.hotels.map((hotel, index) => (
            <div key={index} className="mb-4 p-4 bg-vigovia-light-purple rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={hotel.city}
                    onChange={(e) => updateHotel(index, 'city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                  <input
                    type="text"
                    value={hotel.checkIn}
                    onChange={(e) => updateHotel(index, 'checkIn', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                  <input
                    type="text"
                    value={hotel.checkOut}
                    onChange={(e) => updateHotel(index, 'checkOut', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nights</label>
                  <input
                    type="number"
                    value={hotel.nights}
                    onChange={(e) => updateHotel(index, 'nights', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                  <input
                    type="text"
                    value={hotel.hotelName}
                    onChange={(e) => updateHotel(index, 'hotelName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
              </div>
              {formData.hotels.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHotel(index)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                >
                  Remove Hotel
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Inclusions Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-vigovia-purple">Inclusions Summary</h2>
            <button
              type="button"
              onClick={addInclusion}
              className="px-4 py-2 bg-vigovia-purple text-white rounded-lg hover:bg-opacity-90 transition"
            >
              + Add Inclusion
            </button>
          </div>
          
          {formData.inclusions.map((inclusion, index) => (
            <div key={index} className="mb-4 p-4 bg-vigovia-light-purple rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={inclusion.category}
                    onChange={(e) => updateInclusion(index, 'category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                  <input
                    type="number"
                    value={inclusion.count}
                    onChange={(e) => updateInclusion(index, 'count', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <input
                    type="text"
                    value={inclusion.details}
                    onChange={(e) => updateInclusion(index, 'details', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <input
                    type="text"
                    value={inclusion.status}
                    onChange={(e) => updateInclusion(index, 'status', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
              </div>
              {formData.inclusions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInclusion(index)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                >
                  Remove Inclusion
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Payment Plan Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <h2 className="text-2xl font-bold text-vigovia-purple mb-4">Payment Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TCS Status</label>
              <input
                type="text"
                value={formData.tcsStatus}
                onChange={(e) => setFormData({ ...formData, tcsStatus: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-vigovia-purple">Installments</h3>
            <button
              type="button"
              onClick={addInstallment}
              className="px-4 py-2 bg-vigovia-purple text-white rounded-lg hover:bg-opacity-90 transition"
            >
              + Add Installment
            </button>
          </div>
          
          {formData.installments.map((installment, index) => (
            <div key={index} className="mb-4 p-4 bg-vigovia-light-purple rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Installment</label>
                  <input
                    type="text"
                    value={installment.installmentNumber}
                    onChange={(e) => updateInstallment(index, 'installmentNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="text"
                    value={installment.amount}
                    onChange={(e) => updateInstallment(index, 'amount', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="text"
                    value={installment.dueDate}
                    onChange={(e) => updateInstallment(index, 'dueDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
                  />
                </div>
              </div>
              {formData.installments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstallment(index)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                >
                  Remove Installment
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Visa Details Section */}
        <section className="border-2 border-vigovia-purple rounded-lg p-6">
          <h2 className="text-2xl font-bold text-vigovia-purple mb-4">Visa Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visa Type</label>
              <input
                type="text"
                value={formData.visaType}
                onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Validity</label>
              <input
                type="text"
                value={formData.visaValidity}
                onChange={(e) => setFormData({ ...formData, visaValidity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Processing Date</label>
              <input
                type="text"
                value={formData.visaProcessingDate}
                onChange={(e) => setFormData({ ...formData, visaProcessingDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vigovia-purple focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-12 py-4 bg-gradient-to-r from-vigovia-blue to-vigovia-purple text-white text-xl font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            Get Itinerary
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItineraryForm;

