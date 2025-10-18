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

export const generatePDF = async (formData) => {
  // Create a temporary container for PDF content
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm'; // A4 width
  container.style.backgroundColor = 'white';
  document.body.appendChild(container);

  // Generate all pages
  const pages = [];
  
  // Page 1: Cover Page & Day-by-Day Itinerary
  pages.push(createPage1(formData));
  
  // Page 2: Continued Days & Flight/Hotel Summary
  pages.push(createPage2(formData));
  
  // Page 3: Important Notes & Inclusions
  pages.push(createPage3(formData));
  
  // Page 4: Activities & Payment Plan
  pages.push(createPage4(formData));

  const pdf = new jsPDF('p', 'mm', 'a4');

  for (let i = 0; i < pages.length; i++) {
    container.innerHTML = pages[i];
    
    // Wait a bit for rendering
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    if (i > 0) {
      pdf.addPage();
    }
    
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  }

  // Clean up
  document.body.removeChild(container);

  // Download the PDF
  pdf.save(`${formData.customerName}_${formData.tripTitle}_Itinerary.pdf`);
};

// Helper function to create page header
const createHeader = () => {
  return `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 30px 40px; background: white;">
      <div style="font-size: 36px; font-weight: 700; color: #3D2866;">
        <span style="color: #5B8FD9;">via</span><span style="color: #764ba2;">govia</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #3D2866;">
        <span>PLAN.PACK.GO</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#3D2866"/>
        </svg>
      </div>
    </div>
  `;
};

// Helper function to create page footer
const createFooter = () => {
  return `
    <div style="background: white; padding: 20px 40px; border-top: 2px solid #E8E1F3; margin-top: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: start;">
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 14px; color: #3D2866; margin-bottom: 8px;">${COMPANY_INFO.name}</div>
          <div style="font-size: 12px; color: #666; line-height: 1.6;">
            ${COMPANY_INFO.address}<br/>
            ${COMPANY_INFO.addressLine2}
          </div>
        </div>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 12px; color: #666; line-height: 1.8;">
            <strong>Phone:</strong> ${COMPANY_INFO.phone}<br/>
            <strong>Email ID:</strong> ${COMPANY_INFO.email}<br/>
            <strong>CIN:</strong> ${COMPANY_INFO.cin}
          </div>
        </div>
        <div style="flex: 1; text-align: right;">
          <div style="font-size: 32px; font-weight: 700; color: #3D2866;">
            <span style="color: #5B8FD9;">via</span><span style="color: #764ba2;">govia</span>
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #3D2866; margin-top: 4px;">PLAN.PACK.GO</div>
        </div>
      </div>
    </div>
  `;
};

// Page 1: Cover & Daily Itinerary
const createPage1 = (data) => {
  const firstThreeDays = data.days.slice(0, 3);
  
  return `
    <div style="font-family: 'Inter', sans-serif; background: white; padding: 0; min-height: 297mm;">
      ${createHeader()}
      
      <!-- Hero Section -->
      <div style="background: linear-gradient(135deg, #5B8FD9 0%, #764ba2 100%); padding: 40px 60px; margin: 0 40px; border-radius: 16px; text-align: center; color: white;">
        <h1 style="font-size: 42px; font-weight: 700; margin: 0 0 16px 0;">Hi, ${data.customerName}!</h1>
        <h2 style="font-size: 36px; font-weight: 600; margin: 0 0 12px 0;">${data.tripTitle}</h2>
        <p style="font-size: 24px; margin: 0 0 20px 0;">${data.totalDays} Days ${data.totalNights} Nights</p>
        <div style="display: flex; justify-content: center; gap: 20px; font-size: 28px;">
          <span>✈️</span><span>📄</span><span>🌐</span><span>🚗</span><span>🏨</span>
        </div>
      </div>
      
      <!-- Trip Details -->
      <div style="background: white; border: 2px solid #E8E1F3; border-radius: 12px; padding: 20px 30px; margin: 30px 40px; display: flex; justify-content: space-between;">
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 13px; color: #3D2866; margin-bottom: 4px;">Departure From:</div>
          <div style="font-size: 14px; color: #333;">${data.departureFrom}</div>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 13px; color: #3D2866; margin-bottom: 4px;">Departure:</div>
          <div style="font-size: 14px; color: #333;">${data.departureDate}</div>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 13px; color: #3D2866; margin-bottom: 4px;">Arrival:</div>
          <div style="font-size: 14px; color: #333;">${data.arrivalDate}</div>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 13px; color: #3D2866; margin-bottom: 4px;">Destination:</div>
          <div style="font-size: 14px; color: #333;">${data.destination}</div>
        </div>
        <div style="flex: 1; text-align: right;">
          <div style="font-weight: 700; font-size: 13px; color: #3D2866; margin-bottom: 4px;">No. Of Travellers:</div>
          <div style="font-size: 14px; color: #333;">${data.numberOfTravelers}</div>
        </div>
      </div>
      
      <!-- Daily Itinerary -->
      <div style="padding: 0 40px;">
        ${firstThreeDays.map(day => `
          <div style="display: flex; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid #E8E1F3; padding-bottom: 30px;">
            <div style="background: #3D2866; color: white; width: 80px; border-radius: 16px; padding: 20px 10px; text-align: center; writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 700; font-size: 16px; flex-shrink: 0;">
              Day ${day.dayNumber}
            </div>
            <div style="flex: 1;">
              <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin: 0 auto 12px; background: #E8E1F3;">
                  <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px;">
                    🌆
                  </div>
                </div>
                <div style="font-weight: 700; font-size: 18px; color: #3D2866; margin-bottom: 4px;">${day.date}</div>
                <div style="font-size: 14px; color: #666;">${day.title}</div>
              </div>
            </div>
            <div style="flex: 1.5; padding-left: 20px; border-left: 3px solid #5B8FD9;">
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background: white; border: 3px solid #3D2866;"></div>
                  <div style="font-weight: 700; font-size: 15px; color: #3D2866;">Morning</div>
                </div>
                ${day.morning.map(activity => `
                  <div style="font-size: 13px; color: #333; line-height: 1.6; margin-left: 24px; margin-bottom: 4px;">• ${activity.text}</div>
                `).join('')}
              </div>
              
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background: white; border: 3px solid #3D2866;"></div>
                  <div style="font-weight: 700; font-size: 15px; color: #3D2866;">Afternoon</div>
                </div>
                ${day.afternoon.map(activity => `
                  <div style="font-size: 13px; color: #333; line-height: 1.6; margin-left: 24px; margin-bottom: 4px;">• ${activity.text}</div>
                `).join('')}
              </div>
              
              <div>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                  <div style="width: 12px; height: 12px; border-radius: 50%; background: white; border: 3px solid #3D2866;"></div>
                  <div style="font-weight: 700; font-size: 15px; color: #3D2866;">Evening</div>
                </div>
                ${day.evening.map(activity => `
                  <div style="font-size: 13px; color: #333; line-height: 1.6; margin-left: 24px; margin-bottom: 4px;">• ${activity.text}</div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${createFooter()}
    </div>
  `;
};

// Page 2: Remaining Days, Flights & Hotels
const createPage2 = (data) => {
  const remainingDays = data.days.slice(3);
  
  return `
    <div style="font-family: 'Inter', sans-serif; background: white; padding: 0; min-height: 297mm;">
      ${createHeader()}
      
      <!-- Remaining Days -->
      ${remainingDays.length > 0 ? `
        <div style="padding: 0 40px;">
          ${remainingDays.map(day => `
            <div style="display: flex; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid #E8E1F3; padding-bottom: 30px;">
              <div style="background: #3D2866; color: white; width: 80px; border-radius: 16px; padding: 20px 10px; text-align: center; writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 700; font-size: 16px; flex-shrink: 0;">
                Day ${day.dayNumber}
              </div>
              <div style="flex: 1;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <div style="width: 200px; height: 200px; border-radius: 50%; overflow: hidden; margin: 0 auto 12px; background: #E8E1F3;">
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 48px;">
                      🌆
                    </div>
                  </div>
                  <div style="font-weight: 700; font-size: 18px; color: #3D2866; margin-bottom: 4px;">${day.date}</div>
                  <div style="font-size: 14px; color: #666;">${day.title}</div>
                </div>
              </div>
              <div style="flex: 1.5; padding-left: 20px; border-left: 3px solid #5B8FD9;">
                <div style="margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: white; border: 3px solid #3D2866;"></div>
                    <div style="font-weight: 700; font-size: 15px; color: #3D2866;">Morning</div>
                  </div>
                  ${day.morning.map(activity => `
                    <div style="font-size: 13px; color: #333; line-height: 1.6; margin-left: 24px; margin-bottom: 4px;">• ${activity.text}</div>
                  `).join('')}
                </div>
                
                <div style="margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: white; border: 3px solid #3D2866;"></div>
                    <div style="font-weight: 700; font-size: 15px; color: #3D2866;">Afternoon</div>
                  </div>
                  ${day.afternoon.map(activity => `
                    <div style="font-size: 13px; color: #333; line-height: 1.6; margin-left: 24px; margin-bottom: 4px;">• ${activity.text}</div>
                  `).join('')}
                </div>
                
                <div>
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: white; border: 3px solid #3D2866;"></div>
                    <div style="font-weight: 700; font-size: 15px; color: #3D2866;">Evening</div>
                  </div>
                  ${day.evening.map(activity => `
                    <div style="font-size: 13px; color: #333; line-height: 1.6; margin-left: 24px; margin-bottom: 4px;">• ${activity.text}</div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      <!-- Flight Summary -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Flight <span style="color: #764ba2;">Summary</span></h2>
        ${data.flights.map(flight => `
          <div style="background: #F5F3FF; border: 2px solid #E8E1F3; border-radius: 12px; padding: 20px 30px; margin-bottom: 16px; display: flex; align-items: center; gap: 20px;">
            <div style="background: white; border: 2px solid #764ba2; border-radius: 8px; padding: 12px 24px; font-weight: 700; font-size: 14px; color: #3D2866;">
              ${flight.date}
            </div>
            <div style="flex: 1; font-size: 14px; color: #333;">
              <strong style="color: #3D2866;">${flight.airline}</strong> ${flight.route}
            </div>
          </div>
        `).join('')}
        <div style="font-size: 12px; color: #666; margin-top: 12px; font-style: italic;">
          ${data.flightNote}
        </div>
      </div>
      
      <!-- Hotel Bookings -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Hotel <span style="color: #764ba2;">Bookings</span></h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #3D2866; color: white;">
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 12px 0 0 0;">City</th>
              <th style="padding: 14px; text-align: left; font-size: 14px;">Check In</th>
              <th style="padding: 14px; text-align: left; font-size: 14px;">Check Out</th>
              <th style="padding: 14px; text-align: center; font-size: 14px;">Nights</th>
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 0 12px 0 0;">Hotel Name</th>
            </tr>
          </thead>
          <tbody>
            ${data.hotels.map((hotel, index) => `
              <tr style="background: ${index % 2 === 0 ? '#F5F3FF' : 'white'};">
                <td style="padding: 14px; font-size: 13px; color: #333;">${hotel.city}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${hotel.checkIn}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${hotel.checkOut}</td>
                <td style="padding: 14px; font-size: 13px; color: #333; text-align: center;">${hotel.nights}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${hotel.hotelName}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="margin-top: 16px; font-size: 12px; color: #666;">
          ${data.hotelNotes.map(note => `<div style="margin-bottom: 4px;">${note}</div>`).join('')}
        </div>
      </div>
      
      ${createFooter()}
    </div>
  `;
};

// Page 3: Important Notes, Scope of Service & Inclusions
const createPage3 = (data) => {
  return `
    <div style="font-family: 'Inter', sans-serif; background: white; padding: 0; min-height: 297mm;">
      ${createHeader()}
      
      <!-- Important Notes -->
      <div style="padding: 0 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Important <span style="color: #764ba2;">Notes</span></h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #3D2866; color: white;">
              <th style="padding: 14px; text-align: left; font-size: 14px; width: 30%; border-radius: 12px 0 0 0;">Point</th>
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 0 12px 0 0;">Details</th>
            </tr>
          </thead>
          <tbody>
            ${data.importantNotes.map((note, index) => `
              <tr style="background: ${index % 2 === 0 ? '#F5F3FF' : 'white'};">
                <td style="padding: 14px; font-size: 13px; color: #333; font-weight: 600;">${note.point}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${note.details}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Scope of Service -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Scope Of <span style="color: #764ba2;">Service</span></h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #3D2866; color: white;">
              <th style="padding: 14px; text-align: left; font-size: 14px; width: 35%; border-radius: 12px 0 0 0;">Service</th>
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 0 12px 0 0;">Details</th>
            </tr>
          </thead>
          <tbody>
            ${data.scopeOfService.map((service, index) => `
              <tr style="background: ${index % 2 === 0 ? '#F5F3FF' : 'white'};">
                <td style="padding: 14px; font-size: 13px; color: #333; font-weight: 600;">${service.service}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${service.details}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Inclusion Summary -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Inclusion <span style="color: #764ba2;">Summary</span></h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #3D2866; color: white;">
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 12px 0 0 0;">Category</th>
              <th style="padding: 14px; text-align: center; font-size: 14px;">Count</th>
              <th style="padding: 14px; text-align: left; font-size: 14px;">Details</th>
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 0 12px 0 0;">Status / Comments</th>
            </tr>
          </thead>
          <tbody>
            ${data.inclusions.map((inclusion, index) => `
              <tr style="background: ${index % 2 === 0 ? '#F5F3FF' : 'white'};">
                <td style="padding: 14px; font-size: 13px; color: #333; font-weight: 600;">${inclusion.category}</td>
                <td style="padding: 14px; font-size: 13px; color: #333; text-align: center;">${inclusion.count}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${inclusion.details}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${inclusion.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #F5F3FF; border-radius: 8px; font-size: 12px; color: #666;">
          <strong>Transfer Policy(Refundable Upon Claim)</strong><br/>
          ${data.inclusionNote.replace('\n', '<br/>')}
        </div>
      </div>
      
      ${createFooter()}
    </div>
  `;
};

// Page 4: Activities & Payment Plan
const createPage4 = (data) => {
  return `
    <div style="font-family: 'Inter', sans-serif; background: white; padding: 0; min-height: 297mm;">
      ${createHeader()}
      
      <!-- Activity Table -->
      <div style="padding: 0 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Activity <span style="color: #764ba2;">Table</span></h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #3D2866; color: white;">
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 12px 0 0 0;">City</th>
              <th style="padding: 14px; text-align: left; font-size: 14px;">Activity</th>
              <th style="padding: 14px; text-align: left; font-size: 14px;">Type</th>
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 0 12px 0 0;">Time Required</th>
            </tr>
          </thead>
          <tbody>
            ${data.activities.map((activity, index) => `
              <tr style="background: ${index % 2 === 0 ? '#F5F3FF' : 'white'};">
                <td style="padding: 14px; font-size: 13px; color: #333;">${activity.city}</td>
                <td style="padding: 14px; font-size: 13px; color: #333; border: 3px solid #5B8FD9; border-left: none; border-right: none;">${activity.activity}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${activity.type}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${activity.timeRequired}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Terms and Conditions -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 12px;">Terms and <span style="color: #764ba2;">Conditions</span></h2>
        <a href="#" style="color: #5B8FD9; text-decoration: underline; font-size: 14px;">View all terms and conditions</a>
      </div>
      
      <!-- Payment Plan -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Payment <span style="color: #764ba2;">Plan</span></h2>
        
        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <div style="flex: 1; background: #F5F3FF; border: 2px solid #E8E1F3; border-radius: 12px; padding: 16px; display: flex; align-items: center;">
            <div style="background: white; border: 2px solid #764ba2; border-radius: 8px; padding: 12px 24px; font-weight: 700; font-size: 14px; color: #3D2866; margin-right: 20px;">
              Total Amount
            </div>
            <div style="font-size: 18px; font-weight: 700; color: #3D2866;">
              ₹ ${data.totalAmount.toLocaleString('en-IN')} For ${data.numberOfTravelers} Pax (Inclusive Of GST)
            </div>
          </div>
        </div>
        
        <div style="background: #F5F3FF; border: 2px solid #E8E1F3; border-radius: 12px; padding: 16px; display: flex; align-items: center; margin-bottom: 20px;">
          <div style="background: white; border: 2px solid #764ba2; border-radius: 8px; padding: 12px 24px; font-weight: 700; font-size: 14px; color: #3D2866; margin-right: 20px;">
            TCS
          </div>
          <div style="font-size: 16px; font-weight: 600; color: #3D2866;">
            ${data.tcsStatus}
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background: #3D2866; color: white;">
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 12px 0 0 0;">Installment</th>
              <th style="padding: 14px; text-align: left; font-size: 14px;">Amount</th>
              <th style="padding: 14px; text-align: left; font-size: 14px; border-radius: 0 12px 0 0;">Due Date</th>
            </tr>
          </thead>
          <tbody>
            ${data.installments.map((installment, index) => `
              <tr style="background: ${index % 2 === 0 ? '#F5F3FF' : 'white'};">
                <td style="padding: 14px; font-size: 13px; color: #333; font-weight: 600;">${installment.installmentNumber}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${installment.amount}</td>
                <td style="padding: 14px; font-size: 13px; color: #333;">${installment.dueDate}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Visa Details -->
      <div style="padding: 0 40px; margin-top: 40px;">
        <h2 style="font-size: 28px; font-weight: 700; color: #3D2866; margin-bottom: 20px;">Visa <span style="color: #764ba2;">Details</span></h2>
        <div style="background: white; border: 2px solid #E8E1F3; border-radius: 12px; padding: 20px 30px; display: flex; justify-content: space-around;">
          <div>
            <div style="font-weight: 700; font-size: 14px; color: #3D2866; margin-bottom: 4px;">Visa Type:</div>
            <div style="font-size: 14px; color: #333;">${data.visaType}</div>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: #3D2866; margin-bottom: 4px;">Validity:</div>
            <div style="font-size: 14px; color: #333;">${data.visaValidity}</div>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px; color: #3D2866; margin-bottom: 4px;">Processing Date:</div>
            <div style="font-size: 14px; color: #333;">${data.visaProcessingDate}</div>
          </div>
        </div>
      </div>
      
      <!-- CTA Section -->
      <div style="text-align: center; padding: 40px; margin: 40px 0;">
        <h1 style="font-size: 48px; font-weight: 700; color: #3D2866; margin-bottom: 24px;">PLAN.PACK.GO!</h1>
        <div style="display: inline-block; background: #3D2866; color: white; padding: 16px 48px; border-radius: 50px; font-size: 18px; font-weight: 700;">
          Book Now
        </div>
      </div>
      
      ${createFooter()}
    </div>
  `;
};

