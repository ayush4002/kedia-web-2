import { jsPDF } from 'jspdf';
import { Booking, InventoryUnit } from '@/types';
import { COMPANY_INFO } from '@/data/siteData';

/**
 * Resolves media paths to actual WebP images or documents in /media or /assets
 */
export function getMediaUrl(base: string | null | undefined, width: number = 900): string {
  if (!base) {
    return '/assets/og-default.jpg';
  }
  
  if (base.startsWith('http://') || base.startsWith('https://')) {
    return base;
  }

  if (base.endsWith('.pdf')) {
    return `/${base.replace(/^\/+/, '')}`;
  }

  // Clean base path
  const cleanBase = base.replace(/^\/+/, '').replace(/^media\//, '');
  return `/media/${cleanBase}-${width}.webp`;
}

/**
 * Format Indian Currency (Lakhs and Crores)
 */
export function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  } else if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

/**
 * Format exact currency for cost sheet and receipts
 */
export function formatExactINR(val: number): string {
  return `₹${val.toLocaleString('en-IN')}`;
}

/**
 * Format Area
 */
export function formatArea(sqft?: number | null, sqyd?: number | null): string {
  if (sqyd && sqft) {
    return `${sqyd} sq yd (${sqft} sq ft)`;
  }
  if (sqyd) {
    return `${sqyd} sq yd`;
  }
  if (sqft) {
    return `${sqft} sq ft`;
  }
  return 'Area on request';
}

/**
 * Generate and download an official itemized cost sheet PDF
 */
export function generateCostSheetPDF(unit: InventoryUnit): void {
  const doc = new jsPDF();
  
  // Header Navy Accent
  doc.setFillColor(11, 31, 58); // #0B1F3A
  doc.rect(0, 0, 210, 32, 'F');
  
  // Header Text
  doc.setTextColor(246, 241, 231); // Ivory
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(COMPANY_INFO.name.toUpperCase(), 14, 15);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('ARCHITECTURAL ESTIMATE & ITEMIZED COST SHEET (DEMO)', 14, 23);
  doc.text(`DATE: ${new Date().toLocaleDateString('en-IN')}`, 155, 23);
  
  // Property Overview
  doc.setTextColor(11, 31, 58);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('PROPERTY DETAILS', 14, 44);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Project: ${unit.projectName}`, 14, 52);
  doc.text(`Unit Number: ${unit.unitNumber} (${unit.towerOrBlock})`, 14, 59);
  doc.text(`Unit Type: ${unit.unitType} - ${unit.configuration}`, 14, 66);
  doc.text(`Area: ${unit.areaSqYd} Sq Yd (${unit.areaSqFt} Sq Ft)`, 14, 73);
  doc.text(`Facing: ${unit.facing}`, 14, 80);
  doc.text(`Possession: ${unit.possession}`, 14, 87);
  
  // Line separator
  doc.setDrawColor(200, 162, 75); // Brass
  doc.setLineWidth(0.8);
  doc.line(14, 94, 196, 94);
  
  // Itemized Breakup Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('ITEMIZED PRICE BREAKUP', 14, 105);
  
  doc.setFontSize(10);
  const items = [
    { desc: '1. Base Consideration Price', amt: formatExactINR(unit.basePrice) },
    { desc: '2. Infrastructure & External Development (IDC/EDC)', amt: formatExactINR(unit.developmentCharges) },
    { desc: '3. Clubhouse & Lifestyle Amenities Membership', amt: formatExactINR(unit.clubMembership) },
    { desc: '4. Dedicated Covered Parking Allotment', amt: formatExactINR(unit.parkingCharges) },
    { desc: '5. Goods & Services Tax (GST @ 5% applicable on construction)', amt: formatExactINR(unit.gst) },
    { desc: '6. Estimated Stamp Duty & Sub-Registrar Fee (6%)', amt: formatExactINR(unit.stampDutyRegistration) },
  ];
  
  let yPos = 115;
  items.forEach(item => {
    doc.setFont('helvetica', 'normal');
    doc.text(item.desc, 16, yPos);
    doc.text(item.amt, 194, yPos, { align: 'right' });
    yPos += 8;
  });
  
  // Total Bar
  doc.setFillColor(246, 241, 231);
  doc.rect(14, yPos + 2, 182, 14, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TOTAL ALL-INCLUSIVE ESTIMATE:', 18, yPos + 11);
  doc.text(formatExactINR(unit.totalPrice), 192, yPos + 11, { align: 'right' });
  
  // Disclaimer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  const disclaimer = [
    'Important Notice: This document is a simulated quotation generated for demonstration and architectural evaluation.',
    'Actual statutory government duties (Stamp Duty, Registration, GST) will be charged at prevailing government rates at registry.',
    `Office Address: ${COMPANY_INFO.officeAddress} | Phone: ${COMPANY_INFO.phone}`,
  ];
  let dY = yPos + 30;
  disclaimer.forEach(d => {
    doc.text(d, 14, dY);
    dY += 5;
  });
  
  doc.save(`Kedia_CostSheet_${unit.unitNumber.replace(/\s+/g, '_')}.pdf`);
}

/**
 * Generate and download an official payment receipt PDF
 */
export function generateBookingReceiptPDF(booking: Booking): void {
  const doc = new jsPDF();
  
  // Top Banner Navy
  doc.setFillColor(11, 31, 58);
  doc.rect(0, 0, 210, 36, 'F');
  
  // Header Branding
  doc.setTextColor(246, 241, 231);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(COMPANY_INFO.name.toUpperCase(), 14, 16);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL DEMO BOOKING RECEIPT & ALLOTMENT CONFIRMATION', 14, 25);
  doc.text(`REF NO: ${booking.bookingId}`, 145, 25);
  
  // Customer & Allotment Box
  doc.setTextColor(11, 31, 58);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('ALLOTMENT & PATRON DETAILS', 14, 48);
  
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Patron Name: ${booking.customerName}`, 14, 57);
  doc.text(`Phone: ${booking.customerPhone}`, 14, 64);
  doc.text(`Email: ${booking.customerEmail}`, 14, 71);
  doc.text(`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString('en-IN')}`, 14, 78);
  
  doc.text(`Project: ${booking.projectName}`, 120, 57);
  doc.text(`Allotted Unit: ${booking.unitNumber}`, 120, 64);
  doc.text(`PAN: ${booking.customerPan || 'DEMO-PAN-1234'}`, 120, 71);
  doc.text(`Payment Mode: ${booking.paymentMethod} (Simulated)`, 120, 78);
  
  // Brass dividing line
  doc.setDrawColor(200, 162, 75);
  doc.setLineWidth(0.8);
  doc.line(14, 85, 196, 85);
  
  // Token Payment Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('TRANSACTION SUMMARY', 14, 96);
  
  doc.setFillColor(246, 241, 231);
  doc.rect(14, 102, 182, 34, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Token Reservation Deposit Paid:', 18, 112);
  doc.setFont('helvetica', 'bold');
  doc.text(formatExactINR(booking.tokenAmountPaid), 190, 112, { align: 'right' });
  
  doc.setFont('helvetica', 'normal');
  doc.text('Transaction Ref ID:', 18, 120);
  doc.setFont('helvetica', 'bold');
  doc.text(booking.paymentReference, 190, 120, { align: 'right' });
  
  doc.setFont('helvetica', 'normal');
  doc.text('Total Agreed Unit Consideration:', 18, 128);
  doc.setFont('helvetica', 'bold');
  doc.text(formatExactINR(booking.totalUnitAmount), 190, 128, { align: 'right' });
  
  // Milestones
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('SUBSEQUENT PAYMENT MILESTONES', 14, 148);
  
  let mY = 158;
  booking.paymentSchedule.forEach(m => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${m.milestone} (${m.percentage}%)`, 16, mY);
    doc.text(`Due: ${m.dueDate}`, 120, mY);
    doc.setFont('helvetica', 'bold');
    doc.text(formatExactINR(m.amount), 190, mY, { align: 'right' });
    mY += 7;
  });
  
  // Signature Block
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Authorized Signatory', 150, 240);
  doc.text('Kedia Builders & Colonizers', 150, 246);
  doc.setDrawColor(180, 180, 180);
  doc.line(140, 235, 195, 235);
  
  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  doc.text('Simulated transaction receipt generated for UI demonstration. No actual debit occurred.', 14, 275);
  doc.text(`Jaipur Headquarters · ${COMPANY_INFO.phone} · ${COMPANY_INFO.email}`, 14, 281);
  
  doc.save(`Kedia_Receipt_${booking.bookingId}.pdf`);
}

