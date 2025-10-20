import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Company Details
const COMPANY_INFO = {
  name: 'Vigovia Tech Pvt. Ltd',
  address: 'Registered Office: Hd-109 Cinnabar Hills,',
  addressLine2: 'Links Business Park, Karnataka, India.',
  phone: '+91-9504061112',
  email: 'Utkarsh@Vigovia.Com',
  cin: 'U79110KA2024PTC191890'
};

const generateHTMLTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      background: white;
    }
    
    .pdf-container {
      width: 210mm;
      background: white;
    }
    
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 20px 30px;
      background: white;
      position: relative;
      page-break-after: always;
      box-sizing: border-box;
    }
    
    .page:last-child {
      page-break-after: avoid;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .logo {
      font-size: 28px;
      font-weight: 800;
    }
    
    .logo-blue {
      color: #5B8FD9;
    }
    
    .logo-purple {
      color: #764ba2;
    }
    
    .tagline {
      font-size: 11px;
      font-weight: 700;
      color: #3D2866;
      letter-spacing: 0.3px;
    }
    
    /* Hero Section */
    .hero {
      background: linear-gradient(135deg, #5B8FD9 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      color: white;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(91, 143, 217, 0.25);
    }
    
    .hero-title {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 8px;
    }
    
    .hero-subtitle {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    
    .hero-duration {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 12px;
    }
    
    .hero-icons {
      font-size: 20px;
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
    }
    
    /* Trip Details */
    .trip-details {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 15px;
      border: 2px solid #E8E1F3;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 20px;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }
    
    .trip-detail-item {
      text-align: left;
    }
    
    .trip-detail-item:last-child {
      text-align: right;
    }
    
    .trip-detail-label {
      font-size: 10px;
      font-weight: 700;
      color: #3D2866;
      margin-bottom: 3px;
    }
    
    .trip-detail-value {
      font-size: 11px;
      color: #333333;
    }
    
    /* Day Section */
    .day-container {
      display: flex;
      gap: 12px;
      margin-bottom: 25px;
      padding-bottom: 25px;
      border-bottom: 2px solid #E8E1F3;
    }
    
    .day-badge {
      background: linear-gradient(180deg, #3D2866 0%, #4a336b 100%);
      width: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      color: white;
      font-weight: 700;
      font-size: 16px;
      padding: 20px 10px;
      letter-spacing: 2px;
      box-shadow: 0 2px 6px rgba(61, 40, 102, 0.3);
    }
    
    .day-image-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    
    .day-image-placeholder {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #E8E1F3;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      margin-bottom: 10px;
      border: 2px solid #d8d1e8;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    
    .day-date {
      font-size: 15px;
      font-weight: 700;
      color: #3D2866;
      margin-bottom: 4px;
      text-align: center;
    }
    
    .day-title {
      font-size: 10px;
      color: #666666;
      text-align: center;
      max-width: 140px;
    }
    
    .day-activities {
      flex: 2;
      padding-left: 15px;
      border-left: 4px solid #5B8FD9;
      position: relative;
    }
    
    .activity-period {
      margin-bottom: 15px;
    }
    
    .activity-period:last-child {
      margin-bottom: 0;
    }
    
    .activity-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 5px;
    }
    
    .activity-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: white;
      border: 3px solid #3D2866;
      flex-shrink: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      position: relative;
      left: -2px;
    }
    
    .activity-label {
      font-size: 12px;
      font-weight: 700;
      color: #3D2866;
    }
    
    .activity-item {
      font-size: 10px;
      color: #333333;
      margin-left: 18px;
      margin-bottom: 3px;
      line-height: 1.4;
    }
    
    /* Section Titles */
    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: #3D2866;
      margin-bottom: 15px;
      margin-top: 25px;
    }
    
    .section-title .highlight {
      background: linear-gradient(135deg, #764ba2 0%, #9b7bb7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Flight Card */
    .flight-card {
      display: flex;
      align-items: center;
      gap: 15px;
      background: #F5F3FF;
      border: 2px solid #E8E1F3;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    }
    
    .flight-date {
      background: white;
      border: 2px solid #764ba2;
      border-radius: 6px;
      padding: 10px 15px;
      font-size: 11px;
      font-weight: 700;
      color: #3D2866;
      white-space: nowrap;
      position: relative;
      clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%);
      padding-right: 20px;
    }
    
    .flight-info {
      font-size: 11px;
      color: #333333;
      flex: 1;
    }
    
    .flight-airline {
      font-weight: 700;
    }
    
    .flight-note {
      font-size: 9px;
      color: #666666;
      font-style: italic;
      margin-top: 8px;
    }
    
    /* Table */
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    
    .table-header {
      background: linear-gradient(135deg, #3D2866 0%, #5B4B8A 100%);
      color: white;
    }
    
    .table-header th {
      padding: 12px 15px;
      text-align: left;
      font-size: 11px;
      font-weight: 700;
    }
    
    .table-header th:first-child {
      border-top-left-radius: 10px;
    }
    
    .table-header th:last-child {
      border-top-right-radius: 10px;
    }
    
    .table tbody tr:nth-child(even) {
      background: #F5F3FF;
    }
    
    .table tbody tr:nth-child(odd) {
      background: white;
    }
    
    .table tbody td {
      padding: 12px 15px;
      font-size: 10px;
      color: #333333;
    }
    
    .table tbody td.bold {
      font-weight: 700;
    }
    
    .notes-list {
      font-size: 10px;
      color: #666666;
      padding-left: 18px;
      list-style: decimal;
      margin-top: 10px;
      line-height: 1.6;
    }
    
    .notes-list li {
      margin-bottom: 5px;
    }
    
    /* Payment Box */
    .payment-box {
      display: flex;
      align-items: center;
      gap: 15px;
      background: #F5F3FF;
      border: 2px solid #E8E1F3;
      border-radius: 10px;
      padding: 15px 25px 15px 15px;
      margin-bottom: 15px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      position: relative;
      clip-path: polygon(
        0 0,
        calc(100% - 15px) 0,
        100% 50%,
        calc(100% - 15px) 100%,
        0 100%
      );
    }
    
    .payment-label {
      background: white;
      border: 2px solid #764ba2;
      border-radius: 8px;
      padding: 12px 18px;
      font-size: 12px;
      font-weight: 700;
      color: #3D2866;
      white-space: nowrap;
      box-shadow: 0 1px 3px rgba(118, 75, 162, 0.15);
    }
    
    .payment-value {
      font-size: 14px;
      font-weight: 700;
      color: #3D2866;
    }
    
    /* Visa Box */
    .visa-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      border: 2px solid #E8E1F3;
      border-radius: 12px;
      padding: 20px 25px;
      text-align: center;
      margin-top: 15px;
      background: white;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }
    
    .visa-label {
      font-size: 11px;
      font-weight: 700;
      color: #3D2866;
      margin-bottom: 3px;
    }
    
    .visa-value {
      font-size: 11px;
      color: #333333;
    }
    
    /* CTA Section */
    .cta-section {
      text-align: center;
      padding: 30px 0;
    }
    
    .cta-title {
      font-size: 36px;
      font-weight: 800;
      color: #3D2866;
      margin-bottom: 20px;
      letter-spacing: 2px;
    }
    
    .cta-button {
      background: linear-gradient(135deg, #3D2866 0%, #5B4B8A 100%);
      color: white;
      padding: 14px 40px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 700;
      display: inline-block;
      box-shadow: 0 4px 8px rgba(61, 40, 102, 0.3);
    }
    
    /* Footer */
    .footer {
      border-top: 2px solid #E8E1F3;
      padding-top: 15px;
      margin-top: 15px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      font-size: 9px;
    }
    
    .footer-section {
      color: #666666;
      line-height: 1.5;
    }
    
    .footer-section:nth-child(2) {
      text-align: center;
    }
    
    .footer-section:nth-child(3) {
      text-align: right;
    }
    
    .footer-company-name {
      font-size: 11px;
      font-weight: 700;
      color: #3D2866;
      margin-bottom: 5px;
    }
    
    .footer-logo {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 3px;
    }
    
    .footer-tagline {
      font-size: 9px;
      font-weight: 700;
      color: #3D2866;
    }
    
    .inclusion-note {
      background: #F5F3FF;
      border-radius: 8px;
      padding: 12px 15px;
      font-size: 9px;
      color: #666666;
      margin-top: 12px;
      line-height: 1.5;
      border: 1px solid #E8E1F3;
      border-left: 3px solid #764ba2;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    }
    
    .inclusion-note-title {
      font-weight: 700;
      margin-bottom: 5px;
    }
    
    .link {
      color: #5B8FD9;
      text-decoration: underline;
      font-size: 12px;
      margin-top: 8px;
      display: inline-block;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    <!-- PAGE 1 -->
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <span class="logo-blue">via</span><span class="logo-purple">govia</span>
        </div>
        <div class="tagline">PLAN.PACK.GO ✈</div>
      </div>
      
      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-title">Hi, ${data.customerName}!</div>
        <div class="hero-subtitle">${data.tripTitle}</div>
        <div class="hero-duration">${data.totalDays} Days ${data.totalNights} Nights</div>
        <div class="hero-icons">
          <span>✈</span>
          <span>📄</span>
          <span>🌐</span>
          <span>🚗</span>
          <span>🏨</span>
        </div>
      </div>
      
      <!-- Trip Details -->
      <div class="trip-details">
        <div class="trip-detail-item">
          <div class="trip-detail-label">Departure From:</div>
          <div class="trip-detail-value">${data.departureFrom}</div>
        </div>
        <div class="trip-detail-item">
          <div class="trip-detail-label">Departure:</div>
          <div class="trip-detail-value">${data.departureDate}</div>
        </div>
        <div class="trip-detail-item">
          <div class="trip-detail-label">Arrival:</div>
          <div class="trip-detail-value">${data.arrivalDate}</div>
        </div>
        <div class="trip-detail-item">
          <div class="trip-detail-label">Destination:</div>
          <div class="trip-detail-value">${data.destination}</div>
        </div>
        <div class="trip-detail-item">
          <div class="trip-detail-label">No. Of Travellers:</div>
          <div class="trip-detail-value">${data.numberOfTravelers}</div>
        </div>
      </div>
      
      <!-- Daily Itinerary Section -->
      <div class="section-title" style="margin-top: 15px;">Daily <span class="highlight">Itinerary</span></div>
      
      <!-- Days (First 2 days) -->
      ${data.days.slice(0, 2).map(day => `
        <div class="day-container">
          <div class="day-badge">Day ${day.dayNumber}</div>
          <div class="day-image-section">
            <div class="day-image-placeholder">🌆</div>
            <div class="day-date">${day.date}</div>
            <div class="day-title">${day.title}</div>
          </div>
          <div class="day-activities">
            <div class="activity-period">
              <div class="activity-header">
                <div class="activity-dot"></div>
                <div class="activity-label">Morning</div>
              </div>
              ${day.morning.map(activity => `
                <div class="activity-item">• ${activity.text}</div>
              `).join('')}
            </div>
            <div class="activity-period">
              <div class="activity-header">
                <div class="activity-dot"></div>
                <div class="activity-label">Afternoon</div>
              </div>
              ${day.afternoon.map(activity => `
                <div class="activity-item">• ${activity.text}</div>
              `).join('')}
            </div>
            <div class="activity-period">
              <div class="activity-header">
                <div class="activity-dot"></div>
                <div class="activity-label">Evening</div>
              </div>
              ${day.evening.map(activity => `
                <div class="activity-item">• ${activity.text}</div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('')}
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-section">
          <div class="footer-company-name">${COMPANY_INFO.name}</div>
          <div>${COMPANY_INFO.address}</div>
          <div>${COMPANY_INFO.addressLine2}</div>
        </div>
        <div class="footer-section">
          <div>Phone: ${COMPANY_INFO.phone}</div>
          <div>Email ID: ${COMPANY_INFO.email}</div>
          <div>CIN: ${COMPANY_INFO.cin}</div>
        </div>
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-blue">via</span><span class="logo-purple">govia</span>
          </div>
          <div class="footer-tagline">PLAN.PACK.GO</div>
        </div>
      </div>
    </div>
    
    <!-- PAGE 2 -->
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <span class="logo-blue">via</span><span class="logo-purple">govia</span>
        </div>
        <div class="tagline">PLAN.PACK.GO ✈</div>
      </div>
      
      ${data.days.length > 2 ? `<div class="section-title">Daily <span class="highlight">Itinerary</span></div>` + data.days.slice(2).map(day => `
        <div class="day-container">
          <div class="day-badge">Day ${day.dayNumber}</div>
          <div class="day-image-section">
            <div class="day-image-placeholder">🌆</div>
            <div class="day-date">${day.date}</div>
            <div class="day-title">${day.title}</div>
          </div>
          <div class="day-activities">
            <div class="activity-period">
              <div class="activity-header">
                <div class="activity-dot"></div>
                <div class="activity-label">Morning</div>
              </div>
              ${day.morning.map(activity => `
                <div class="activity-item">• ${activity.text}</div>
              `).join('')}
            </div>
            <div class="activity-period">
              <div class="activity-header">
                <div class="activity-dot"></div>
                <div class="activity-label">Afternoon</div>
              </div>
              ${day.afternoon.map(activity => `
                <div class="activity-item">• ${activity.text}</div>
              `).join('')}
            </div>
            <div class="activity-period">
              <div class="activity-header">
                <div class="activity-dot"></div>
                <div class="activity-label">Evening</div>
              </div>
              ${day.evening.map(activity => `
                <div class="activity-item">• ${activity.text}</div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('') : ''}
      
      <!-- Flight Summary -->
      <div class="section-title" style="margin-top: 20px;">Flight <span class="highlight">Summary</span></div>
      ${data.flights.map(flight => `
        <div class="flight-card">
          <div class="flight-date">${flight.date}</div>
          <div class="flight-info">
            <span class="flight-airline">${flight.airline}</span> ${flight.route}
          </div>
        </div>
      `).join('')}
      ${data.flightNote ? `<div class="flight-note">${data.flightNote}</div>` : ''}
      
      <!-- Hotel Bookings -->
      <div class="section-title" style="margin-top: 30px;">Hotel <span class="highlight">Bookings</span></div>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th style="width: 15%;">City</th>
            <th style="width: 18%;">Check In</th>
            <th style="width: 18%;">Check Out</th>
            <th style="width: 10%; text-align: center;">Nights</th>
            <th style="width: 39%;">Hotel Name</th>
          </tr>
        </thead>
        <tbody>
          ${data.hotels.map(hotel => `
            <tr>
              <td style="width: 15%;">${hotel.city}</td>
              <td style="width: 18%;">${hotel.checkIn}</td>
              <td style="width: 18%;">${hotel.checkOut}</td>
              <td style="width: 10%; text-align: center;">${hotel.nights}</td>
              <td style="width: 39%;">${hotel.hotelName}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <ul class="notes-list">
        ${data.hotelNotes.map(note => `<li>${note}</li>`).join('')}
      </ul>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-section">
          <div class="footer-company-name">${COMPANY_INFO.name}</div>
          <div>${COMPANY_INFO.address}</div>
          <div>${COMPANY_INFO.addressLine2}</div>
        </div>
        <div class="footer-section">
          <div>Phone: ${COMPANY_INFO.phone}</div>
          <div>Email ID: ${COMPANY_INFO.email}</div>
          <div>CIN: ${COMPANY_INFO.cin}</div>
        </div>
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-blue">via</span><span class="logo-purple">govia</span>
          </div>
          <div class="footer-tagline">PLAN.PACK.GO</div>
        </div>
      </div>
    </div>
    
    <!-- PAGE 3 -->
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <span class="logo-blue">via</span><span class="logo-purple">govia</span>
        </div>
        <div class="tagline">PLAN.PACK.GO ✈</div>
      </div>
      
      <!-- Important Notes -->
      <div class="section-title">Important <span class="highlight">Notes</span></div>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th style="width: 30%;">Point</th>
            <th style="width: 70%;">Details</th>
          </tr>
        </thead>
        <tbody>
          ${data.importantNotes.map(note => `
            <tr>
              <td class="bold" style="width: 30%;">${note.point}</td>
              <td style="width: 70%;">${note.details}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- Scope of Service -->
      <div class="section-title" style="margin-top: 30px;">Scope Of <span class="highlight">Service</span></div>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th style="width: 32%;">Service</th>
            <th style="width: 68%;">Details</th>
          </tr>
        </thead>
        <tbody>
          ${data.scopeOfService.map(service => `
            <tr>
              <td class="bold" style="width: 32%;">${service.service}</td>
              <td style="width: 68%;">${service.details}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- Inclusion Summary -->
      <div class="section-title" style="margin-top: 30px;">Inclusion <span class="highlight">Summary</span></div>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th style="width: 18%;">Category</th>
            <th style="width: 10%; text-align: center;">Count</th>
            <th style="width: 45%;">Details</th>
            <th style="width: 27%;">Status / Comments</th>
          </tr>
        </thead>
        <tbody>
          ${data.inclusions.map(inclusion => `
            <tr>
              <td class="bold" style="width: 18%;">${inclusion.category}</td>
              <td style="width: 10%; text-align: center;">${inclusion.count}</td>
              <td style="width: 45%;">${inclusion.details}</td>
              <td style="width: 27%;">${inclusion.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="inclusion-note">
        <div class="inclusion-note-title">Transfer Policy(Refundable Upon Claim)</div>
        <div>${data.inclusionNote}</div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-section">
          <div class="footer-company-name">${COMPANY_INFO.name}</div>
          <div>${COMPANY_INFO.address}</div>
          <div>${COMPANY_INFO.addressLine2}</div>
        </div>
        <div class="footer-section">
          <div>Phone: ${COMPANY_INFO.phone}</div>
          <div>Email ID: ${COMPANY_INFO.email}</div>
          <div>CIN: ${COMPANY_INFO.cin}</div>
        </div>
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-blue">via</span><span class="logo-purple">govia</span>
          </div>
          <div class="footer-tagline">PLAN.PACK.GO</div>
        </div>
      </div>
    </div>
    
    <!-- PAGE 4 -->
    <div class="page">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <span class="logo-blue">via</span><span class="logo-purple">govia</span>
        </div>
        <div class="tagline">PLAN.PACK.GO ✈</div>
      </div>
      
      <!-- Activity Table -->
      <div class="section-title">Activity <span class="highlight">Table</span></div>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th style="width: 20%;">City</th>
            <th style="width: 40%;">Activity</th>
            <th style="width: 20%;">Type</th>
            <th style="width: 20%;">Time Required</th>
          </tr>
        </thead>
        <tbody>
          ${data.activities.map(activity => `
            <tr>
              <td style="width: 20%;">${activity.city}</td>
              <td style="width: 40%;">${activity.activity}</td>
              <td style="width: 20%;">${activity.type}</td>
              <td style="width: 20%;">${activity.timeRequired}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- Terms and Conditions -->
      <div class="section-title" style="margin-top: 30px;">Terms and <span class="highlight">Conditions</span></div>
      <a href="#" class="link">View all terms and conditions</a>
      
      <!-- Payment Plan -->
      <div class="section-title" style="margin-top: 30px;">Payment <span class="highlight">Plan</span></div>
      <div class="payment-box">
        <div class="payment-label">Total Amount</div>
        <div class="payment-value">₹${data.totalAmount.toLocaleString('en-IN')} For ${data.numberOfTravelers} Pax (Inclusive Of GST)</div>
      </div>
      <div class="payment-box">
        <div class="payment-label">TCS</div>
        <div class="payment-value">${data.tcsStatus}</div>
      </div>
      <table class="table">
        <thead class="table-header">
          <tr>
            <th style="width: 35%;">Installment</th>
            <th style="width: 35%;">Amount</th>
            <th style="width: 30%;">Due Date</th>
          </tr>
        </thead>
        <tbody>
          ${data.installments.map(installment => `
            <tr>
              <td class="bold" style="width: 35%;">${installment.installmentNumber}</td>
              <td style="width: 35%;">${installment.amount}</td>
              <td style="width: 30%;">${installment.dueDate}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <!-- Visa Details -->
      <div class="section-title" style="margin-top: 30px;">Visa <span class="highlight">Details</span></div>
      <div class="visa-box">
        <div>
          <div class="visa-label">Visa Type:</div>
          <div class="visa-value">${data.visaType}</div>
        </div>
        <div>
          <div class="visa-label">Validity:</div>
          <div class="visa-value">${data.visaValidity}</div>
        </div>
        <div>
          <div class="visa-label">Processing Date:</div>
          <div class="visa-value">${data.visaProcessingDate}</div>
        </div>
      </div>
      
      <!-- CTA Section -->
      <div class="cta-section">
        <div class="cta-title">PLAN.PACK.GO!</div>
        <div class="cta-button">Book Now</div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-section">
          <div class="footer-company-name">${COMPANY_INFO.name}</div>
          <div>${COMPANY_INFO.address}</div>
          <div>${COMPANY_INFO.addressLine2}</div>
        </div>
        <div class="footer-section">
          <div>Phone: ${COMPANY_INFO.phone}</div>
          <div>Email ID: ${COMPANY_INFO.email}</div>
          <div>CIN: ${COMPANY_INFO.cin}</div>
        </div>
        <div class="footer-section">
          <div class="footer-logo">
            <span class="logo-blue">via</span><span class="logo-purple">govia</span>
          </div>
          <div class="footer-tagline">PLAN.PACK.GO</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

export const generatePDF = async (formData) => {
  try {
    console.log('🚀 Starting PDF generation...');
    
    // Create HTML content
    const htmlContent = generateHTMLTemplate(formData);
    
    // Create temporary container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '-9999px';
    container.style.width = '210mm';
    container.style.zIndex = '-9999';
    container.innerHTML = htmlContent;
    document.body.appendChild(container);
    
    // Wait for fonts and images to load
    console.log('⏳ Waiting for assets to load...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Capture with html2canvas (high quality)
    console.log('📸 Capturing content...');
    const canvas = await html2canvas(container, {
      scale: 2, // 2x resolution for crisp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // A4 width in pixels at 96 DPI
      windowHeight: 1123 // A4 height in pixels at 96 DPI
    });
    
    // Create PDF
    console.log('📄 Creating PDF...');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save PDF
    const filename = `${formData.customerName}_${formData.tripTitle}_Itinerary.pdf`;
    pdf.save(filename);
    
    // Clean up
    document.body.removeChild(container);
    
    console.log('✅ PDF generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    alert('Error generating PDF. Please check the console for details.');
  }
};

