# Vigovia Itinerary Builder

A frontend itinerary builder that allows users to create a multi-day tour plan and generate a PDF output based on the Figma design template.

## Features

- ✅ Dynamic multi-day itinerary builder
- ✅ Add/remove days from itinerary
- ✅ Morning, Afternoon, Evening activity management for each day
- ✅ Flight details management
- ✅ Hotel bookings management
- ✅ Payment plan with installments
- ✅ Inclusions/Exclusions management
- ✅ PDF generation matching Figma design exactly
- ✅ Company footer on all PDF pages
- ✅ Fully responsive design

## Technology Stack

- **React** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling for the form interface
- **html2pdf.js** - Client-side HTML to PDF converter with full CSS support
  - Enables pixel-perfect PDF generation with CSS gradients, transforms, and modern layouts
  - Converts styled HTML directly to PDF without backend dependencies

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Fill in the tour overview details (customer name, trip title, duration, etc.)
2. Add days to your itinerary and fill in activities for morning, afternoon, and evening
3. Add flight details
4. Add hotel bookings
5. Configure payment plan
6. Add inclusions and visa details
7. Click "Get Itinerary" to generate and download the PDF

## Features Implementation

### Dynamic Forms

- Add/remove days
- Add/remove activities for each time period
- Add/remove flights
- Add/remove hotels
- Add/remove inclusions
- Add/remove payment installments

### PDF Generation

- Exact match with Figma design
- Company details in footer on all pages
- Multi-page PDF output
- All data properly formatted

## Project Structure

```
src/
├── components/
│   └── ItineraryForm.jsx      # Main form component with dynamic inputs
├── utils/
│   ├── pdfGeneratorHTML.js    # PDF generation with html2pdf.js (full CSS support)
│   └── pdfGenerator.jsx       # Legacy @react-pdf/renderer version
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

## License

MIT

## Author

Vigovia Tech Pvt. Ltd
