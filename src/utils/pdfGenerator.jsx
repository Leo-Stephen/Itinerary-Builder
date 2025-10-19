import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Image } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Company Details
const COMPANY_INFO = {
  name: 'Vigovia Tech Pvt. Ltd',
  address: 'Registered Office: Hd-109 Cinnabar Hills,',
  addressLine2: 'Links Business Park, Karnataka, India.',
  phone: '+91-9504061112',
  email: 'Utkarsh@Vigovia.Com',
  cin: 'U79110KA2024PTC191890'
};

// Define styles matching Figma design
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    paddingTop: 20,
    paddingBottom: 20,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
  },
  logoBlue: {
    color: '#5B8FD9',
  },
  logoPurple: {
    color: '#764ba2',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  planPackGo: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
  },
  
  // Hero Section (gradient simulation with blue-purple blend)
  hero: {
    backgroundColor: '#6A7FCA', // Blend of blue and purple
    marginHorizontal: 30,
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  heroDuration: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 12,
  },
  heroIcons: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 16,
    color: '#ffffff',
  },
  
  // Trip Details Box
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: '2px solid #E8E1F3',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  tripDetailItem: {
    flex: 1,
  },
  tripDetailLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginBottom: 3,
  },
  tripDetailValue: {
    fontSize: 11,
    color: '#333333',
  },
  
  // Day Section
  dayContainer: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 30,
    marginBottom: 25,
    paddingBottom: 25,
    borderBottom: '2px solid #E8E1F3',
  },
  dayBadge: {
    backgroundColor: '#3D2866',
    width: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dayBadgeText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.2,
  },
  dayImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dayImagePlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E8E1F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dayImageEmoji: {
    fontSize: 50,
    color: '#666666',
  },
  dayDate: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginBottom: 4,
    textAlign: 'center',
  },
  dayTitle: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    maxWidth: 140,
  },
  dayActivities: {
    flex: 1.5,
    paddingLeft: 15,
    borderLeft: '3px solid #5B8FD9',
  },
  activityPeriod: {
    marginBottom: 15,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    border: '3px solid #3D2866',
  },
  activityPeriodLabel: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
  },
  activityItem: {
    fontSize: 10,
    color: '#333333',
    marginLeft: 18,
    marginBottom: 3,
    lineHeight: 1.4,
  },
  
  // Section Title
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginBottom: 15,
    marginHorizontal: 30,
  },
  sectionTitleHighlight: {
    color: '#764ba2',
  },
  
  // Flight Card
  flightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    border: '2px solid #E8E1F3',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 30,
    marginBottom: 12,
    gap: 15,
  },
  flightDate: {
    backgroundColor: '#ffffff',
    border: '2px solid #764ba2',
    borderRadius: 6,
    padding: 10,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
  },
  flightInfo: {
    fontSize: 11,
    color: '#333333',
    flex: 1,
  },
  flightNote: {
    fontSize: 9,
    color: '#666666',
    marginHorizontal: 30,
    marginTop: 8,
    fontStyle: 'italic',
  },
  
  // Table
  table: {
    marginHorizontal: 30,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3D2866',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  tableHeaderCell: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  tableRowEven: {
    backgroundColor: '#F5F3FF',
  },
  tableRowOdd: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    fontSize: 10,
    color: '#333333',
  },
  
  // Notes
  notesList: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  noteItem: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
  },
  
  // Payment Section
  paymentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    border: '2px solid #E8E1F3',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 30,
    marginBottom: 15,
  },
  paymentLabel: {
    backgroundColor: '#ffffff',
    border: '2px solid #764ba2',
    borderRadius: 6,
    padding: 10,
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginRight: 15,
  },
  paymentValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
  },
  
  // Visa Section
  visaBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    border: '2px solid #E8E1F3',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 30,
    marginTop: 15,
  },
  visaItem: {
    alignItems: 'center',
  },
  visaLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginBottom: 3,
  },
  visaValue: {
    fontSize: 11,
    color: '#333333',
  },
  
  // CTA Section
  ctaSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginHorizontal: 30,
  },
  ctaTitle: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#3D2866',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  ctaButtonText: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  
  // Footer
  footer: {
    borderTop: '2px solid #E8E1F3',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 15,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerSection: {
    flex: 1,
  },
  footerSectionCenter: {
    flex: 1,
    alignItems: 'center',
  },
  footerSectionRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  footerCompanyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.5,
  },
  footerLogo: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
  },
  footerTagline: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#3D2866',
    marginTop: 3,
  },
  
  // Link
  link: {
    color: '#5B8FD9',
    textDecoration: 'underline',
    fontSize: 11,
    marginHorizontal: 30,
    marginTop: 8,
  },
  
  // Inclusion Note Box
  inclusionNote: {
    backgroundColor: '#F5F3FF',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 30,
    marginTop: 12,
  },
  inclusionNoteText: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.4,
  },
});

// Header Component
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.logoText}>
      <Text style={styles.logoBlue}>via</Text>
      <Text style={styles.logoPurple}>govia</Text>
    </Text>
    <Text style={styles.planPackGo}>PLAN.PACK.GO</Text>
  </View>
);

// Footer Component
const Footer = () => (
  <View style={styles.footer}>
    <View style={styles.footerContent}>
      <View style={styles.footerSection}>
        <Text style={styles.footerCompanyName}>{COMPANY_INFO.name}</Text>
        <Text style={styles.footerText}>{COMPANY_INFO.address}</Text>
        <Text style={styles.footerText}>{COMPANY_INFO.addressLine2}</Text>
      </View>
      <View style={styles.footerSectionCenter}>
        <Text style={styles.footerText}>Phone: {COMPANY_INFO.phone}</Text>
        <Text style={styles.footerText}>Email ID: {COMPANY_INFO.email}</Text>
        <Text style={styles.footerText}>CIN: {COMPANY_INFO.cin}</Text>
      </View>
      <View style={styles.footerSectionRight}>
        <Text style={styles.footerLogo}>
          <Text style={styles.logoBlue}>via</Text>
          <Text style={styles.logoPurple}>govia</Text>
        </Text>
        <Text style={styles.footerTagline}>PLAN.PACK.GO</Text>
      </View>
    </View>
  </View>
);

// Hero Section Component
const HeroSection = ({ data }) => (
  <View style={styles.hero}>
    <Text style={styles.heroTitle}>Hi, {data.customerName}!</Text>
    <Text style={styles.heroSubtitle}>{data.tripTitle}</Text>
    <Text style={styles.heroDuration}>{data.totalDays} Days {data.totalNights} Nights</Text>
    <View style={styles.heroIcons}>
      <Text style={{ fontSize: 20, color: '#ffffff', marginHorizontal: 5 }}>✈</Text>
      <Text style={{ fontSize: 20, color: '#ffffff', marginHorizontal: 5 }}>📄</Text>
      <Text style={{ fontSize: 20, color: '#ffffff', marginHorizontal: 5 }}>☁</Text>
      <Text style={{ fontSize: 20, color: '#ffffff', marginHorizontal: 5 }}>🚗</Text>
      <Text style={{ fontSize: 20, color: '#ffffff', marginHorizontal: 5 }}>🏨</Text>
    </View>
  </View>
);

// Trip Details Component
const TripDetails = ({ data }) => (
  <View style={styles.tripDetails}>
    <View style={styles.tripDetailItem}>
      <Text style={styles.tripDetailLabel}>Departure From:</Text>
      <Text style={styles.tripDetailValue}>{data.departureFrom}</Text>
    </View>
    <View style={styles.tripDetailItem}>
      <Text style={styles.tripDetailLabel}>Departure:</Text>
      <Text style={styles.tripDetailValue}>{data.departureDate}</Text>
    </View>
    <View style={styles.tripDetailItem}>
      <Text style={styles.tripDetailLabel}>Arrival:</Text>
      <Text style={styles.tripDetailValue}>{data.arrivalDate}</Text>
    </View>
    <View style={styles.tripDetailItem}>
      <Text style={styles.tripDetailLabel}>Destination:</Text>
      <Text style={styles.tripDetailValue}>{data.destination}</Text>
    </View>
    <View style={[styles.tripDetailItem, { alignItems: 'flex-end' }]}>
      <Text style={styles.tripDetailLabel}>No. Of Travellers:</Text>
      <Text style={styles.tripDetailValue}>{data.numberOfTravelers}</Text>
    </View>
  </View>
);

// Day Component
const DaySection = ({ day }) => (
  <View style={styles.dayContainer}>
    <View style={styles.dayBadge}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text style={styles.dayBadgeText}>D</Text>
        <Text style={styles.dayBadgeText}>a</Text>
        <Text style={styles.dayBadgeText}>y</Text>
        <Text style={styles.dayBadgeText}> </Text>
        <Text style={styles.dayBadgeText}>{day.dayNumber}</Text>
      </View>
    </View>
    <View style={styles.dayImageContainer}>
      <View style={styles.dayImagePlaceholder}>
        <Text style={{ fontSize: 60, color: '#999999' }}>◯</Text>
      </View>
      <Text style={styles.dayDate}>{day.date}</Text>
      <Text style={styles.dayTitle}>{day.title}</Text>
    </View>
    <View style={styles.dayActivities}>
      <View style={styles.activityPeriod}>
        <View style={styles.activityHeader}>
          <View style={styles.activityDot} />
          <Text style={styles.activityPeriodLabel}>Morning</Text>
        </View>
        {day.morning.map((activity, idx) => (
          <Text key={idx} style={styles.activityItem}>• {activity.text}</Text>
        ))}
      </View>
      <View style={styles.activityPeriod}>
        <View style={styles.activityHeader}>
          <View style={styles.activityDot} />
          <Text style={styles.activityPeriodLabel}>Afternoon</Text>
        </View>
        {day.afternoon.map((activity, idx) => (
          <Text key={idx} style={styles.activityItem}>• {activity.text}</Text>
        ))}
      </View>
      <View style={styles.activityPeriod}>
        <View style={styles.activityHeader}>
          <View style={styles.activityDot} />
          <Text style={styles.activityPeriodLabel}>Evening</Text>
        </View>
        {day.evening.map((activity, idx) => (
          <Text key={idx} style={styles.activityItem}>• {activity.text}</Text>
        ))}
      </View>
    </View>
  </View>
);

// Flight Section Component
const FlightSection = ({ flights, note }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Flight <Text style={styles.sectionTitleHighlight}>Summary</Text>
    </Text>
    {flights.map((flight, idx) => (
      <View key={idx} style={styles.flightCard}>
        <Text style={styles.flightDate}>{flight.date}</Text>
        <Text style={styles.flightInfo}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>{flight.airline}</Text> {flight.route}
        </Text>
      </View>
    ))}
    <Text style={styles.flightNote}>{note}</Text>
  </View>
);

// Hotel Table Component
const HotelTable = ({ hotels, notes }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Hotel <Text style={styles.sectionTitleHighlight}>Bookings</Text>
    </Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>City</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Check In</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Check Out</Text>
        <Text style={[styles.tableHeaderCell, { flex: 0.7, textAlign: 'center' }]}>Nights</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Hotel Name</Text>
      </View>
      {hotels.map((hotel, idx) => (
        <View key={idx} style={[styles.tableRow, idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{hotel.city}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{hotel.checkIn}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{hotel.checkOut}</Text>
          <Text style={[styles.tableCell, { flex: 0.7, textAlign: 'center' }]}>{hotel.nights}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{hotel.hotelName}</Text>
        </View>
      ))}
    </View>
    <View style={styles.notesList}>
      {notes.map((note, idx) => (
        <Text key={idx} style={styles.noteItem}>{note}</Text>
      ))}
    </View>
  </View>
);

// Important Notes Table
const ImportantNotesTable = ({ notes }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Important <Text style={styles.sectionTitleHighlight}>Notes</Text>
    </Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Point</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Details</Text>
      </View>
      {notes.map((note, idx) => (
        <View key={idx} style={[styles.tableRow, idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={[styles.tableCell, { flex: 1.2, fontFamily: 'Helvetica-Bold' }]}>{note.point}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{note.details}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Scope of Service Table
const ScopeOfServiceTable = ({ services }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Scope Of <Text style={styles.sectionTitleHighlight}>Service</Text>
    </Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1.3 }]}>Service</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Details</Text>
      </View>
      {services.map((service, idx) => (
        <View key={idx} style={[styles.tableRow, idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={[styles.tableCell, { flex: 1.3, fontFamily: 'Helvetica-Bold' }]}>{service.service}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{service.details}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Inclusion Table
const InclusionTable = ({ inclusions, note }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Inclusion <Text style={styles.sectionTitleHighlight}>Summary</Text>
    </Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Category</Text>
        <Text style={[styles.tableHeaderCell, { flex: 0.6, textAlign: 'center' }]}>Count</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Details</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>Status / Comments</Text>
      </View>
      {inclusions.map((inclusion, idx) => (
        <View key={idx} style={[styles.tableRow, idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={[styles.tableCell, { flex: 1, fontFamily: 'Helvetica-Bold' }]}>{inclusion.category}</Text>
          <Text style={[styles.tableCell, { flex: 0.6, textAlign: 'center' }]}>{inclusion.count}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{inclusion.details}</Text>
          <Text style={[styles.tableCell, { flex: 1.2 }]}>{inclusion.status}</Text>
        </View>
      ))}
    </View>
    <View style={styles.inclusionNote}>
      <Text style={[styles.inclusionNoteText, { fontFamily: 'Helvetica-Bold' }]}>
        Transfer Policy(Refundable Upon Claim)
      </Text>
      <Text style={styles.inclusionNoteText}>{note}</Text>
    </View>
  </View>
);

// Activity Table
const ActivityTable = ({ activities }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Activity <Text style={styles.sectionTitleHighlight}>Table</Text>
    </Text>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>City</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Activity</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Type</Text>
        <Text style={[styles.tableHeaderCell, { flex: 0.8 }]}>Time Required</Text>
      </View>
      {activities.map((activity, idx) => (
        <View key={idx} style={[styles.tableRow, idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={[styles.tableCell, { flex: 1 }]}>{activity.city}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{activity.activity}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{activity.type}</Text>
          <Text style={[styles.tableCell, { flex: 0.8 }]}>{activity.timeRequired}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Payment Plan Component
const PaymentPlan = ({ data }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Payment <Text style={styles.sectionTitleHighlight}>Plan</Text>
    </Text>
    <View style={styles.paymentBox}>
      <Text style={styles.paymentLabel}>Total Amount</Text>
      <Text style={styles.paymentValue}>
        ₹ {data.totalAmount.toLocaleString('en-IN')} For {data.numberOfTravelers} Pax (Inclusive Of GST)
      </Text>
    </View>
    <View style={[styles.paymentBox, { marginTop: 0 }]}>
      <Text style={styles.paymentLabel}>TCS</Text>
      <Text style={styles.paymentValue}>{data.tcsStatus}</Text>
    </View>
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Installment</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Amount</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Due Date</Text>
      </View>
      {data.installments.map((installment, idx) => (
        <View key={idx} style={[styles.tableRow, idx % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
          <Text style={[styles.tableCell, { flex: 1, fontFamily: 'Helvetica-Bold' }]}>{installment.installmentNumber}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{installment.amount}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{installment.dueDate}</Text>
        </View>
      ))}
    </View>
  </View>
);

// Visa Details Component
const VisaDetails = ({ data }) => (
  <View>
    <Text style={styles.sectionTitle}>
      Visa <Text style={styles.sectionTitleHighlight}>Details</Text>
    </Text>
    <View style={styles.visaBox}>
      <View style={styles.visaItem}>
        <Text style={styles.visaLabel}>Visa Type:</Text>
        <Text style={styles.visaValue}>{data.visaType}</Text>
      </View>
      <View style={styles.visaItem}>
        <Text style={styles.visaLabel}>Validity:</Text>
        <Text style={styles.visaValue}>{data.visaValidity}</Text>
      </View>
      <View style={styles.visaItem}>
        <Text style={styles.visaLabel}>Processing Date:</Text>
        <Text style={styles.visaValue}>{data.visaProcessingDate}</Text>
      </View>
    </View>
  </View>
);

// CTA Component
const CTASection = () => (
  <View style={styles.ctaSection}>
    <Text style={styles.ctaTitle}>PLAN.PACK.GO!</Text>
    <View style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>Book Now</Text>
    </View>
  </View>
);

// PDF Document
const ItineraryDocument = ({ data }) => {
  // Split days for pagination
  const page1Days = data.days.slice(0, 3);
  const page2Days = data.days.slice(3);

  return (
    <Document>
      {/* Page 1: Hero, Trip Details, First 3 Days */}
      <Page size="A4" style={styles.page}>
        <Header />
        <HeroSection data={data} />
        <TripDetails data={data} />
        {page1Days.map((day, idx) => (
          <DaySection key={idx} day={day} />
        ))}
        <Footer />
      </Page>

      {/* Page 2: Remaining Days, Flights, Hotels */}
      <Page size="A4" style={styles.page}>
        <Header />
        {page2Days.map((day, idx) => (
          <DaySection key={idx} day={day} />
        ))}
        <FlightSection flights={data.flights} note={data.flightNote} />
        <HotelTable hotels={data.hotels} notes={data.hotelNotes} />
        <Footer />
      </Page>

      {/* Page 3: Important Notes, Scope of Service, Inclusions */}
      <Page size="A4" style={styles.page}>
        <Header />
        <ImportantNotesTable notes={data.importantNotes} />
        <ScopeOfServiceTable services={data.scopeOfService} />
        <InclusionTable inclusions={data.inclusions} note={data.inclusionNote} />
        <Footer />
      </Page>

      {/* Page 4: Activities, Payment Plan, Visa, CTA */}
      <Page size="A4" style={styles.page}>
        <Header />
        <ActivityTable activities={data.activities} />
        <View style={{ marginTop: 15 }}>
          <Text style={styles.sectionTitle}>
            Terms and <Text style={styles.sectionTitleHighlight}>Conditions</Text>
          </Text>
          <Text style={styles.link}>View all terms and conditions</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <PaymentPlan data={data} />
        </View>
        <View style={{ marginTop: 20 }}>
          <VisaDetails data={data} />
        </View>
        <CTASection />
        <Footer />
      </Page>
    </Document>
  );
};

// Main export function
export const generatePDF = async (formData) => {
  try {
    const blob = await pdf(<ItineraryDocument data={formData} />).toBlob();
    saveAs(blob, `${formData.customerName}_${formData.tripTitle}_Itinerary.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please check the console for details.');
  }
};

