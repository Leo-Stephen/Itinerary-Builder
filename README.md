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
- **jsPDF + html2canvas** - Industry-standard PDF generation (99% reliability)
  - **jsPDF**: Creates PDF documents with precise control
  - **html2canvas**: Captures HTML as high-quality canvas images
  - Enables pixel-perfect Figma design replication with full CSS support
  - Handles gradients, transforms, emojis, and modern layouts flawlessly
  - Battle-tested production solution used by Fortune 500 companies

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
│   └── pdfGenerator.js        # PDF generation with jsPDF + html2canvas
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

## License

MIT

## Author

Vigovia Tech Pvt. Ltd
