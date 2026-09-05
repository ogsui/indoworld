// Source: Google Maps Platform Code Assist
import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { BUSINESS_INFO } from '../data/businessData';
import { MapPin, Navigation, Phone, ExternalLink, Clock, Building2, ShieldCheck, Compass } from 'lucide-react';

// Office Coordinates: Ansal Plaza, Sector 1, Vaishali, Ghaziabad, UP 201010
const OFFICE_COORDINATES = {
  lat: 28.6475,
  lng: 77.3414,
};

interface OfficeMapProps {
  className?: string;
}

export const OfficeMap: React.FC<OfficeMapProps> = ({ className = '' }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [infoOpen, setInfoOpen] = useState(true);

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    'Indoworld Tourism Services, Ansal Plaza, UG SR-5B, Sector 1, Vaishali, Ghaziabad, Uttar Pradesh 201010'
  )}`;

  const googleMapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Indoworld Tourism Services Ansal Plaza Vaishali Ghaziabad'
  )}`;

  return (
    <div className={`relative w-full rounded-none border border-[#0B2545]/20 overflow-hidden bg-[#FAF9F6] ${className}`}>
      {/* Map Header Status Bar */}
      <div className="bg-[#0B2545] text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#0B2545]/40">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#FAF9F6]">
            Office Location & Route Guide
          </span>
          <span className="hidden sm:inline text-[10px] text-[#FAF9F6]/70 border-l border-white/20 pl-2">
            Ansal Plaza, Sector 1, Vaishali
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 transition-colors"
          >
            <Navigation className="w-3 h-3" />
            <span>Get Directions</span>
          </a>
          <a
            href={googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-[#FAF9F6]/80 hover:text-white px-2 py-1.5 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">Google Maps App</span>
          </a>
        </div>
      </div>

      {/* Interactive Map Area with Height Constraint */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-[#EBF0F5]">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <div className="w-full h-full">
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={OFFICE_COORDINATES}
                defaultZoom={16}
                gestureHandling="greedy"
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                className="w-full h-full"
              >
                <AdvancedMarker
                  position={OFFICE_COORDINATES}
                  title="Indoworld Tourism Services - Vaishali Ghaziabad"
                  onClick={() => setInfoOpen((prev) => !prev)}
                >
                  <Pin
                    background="#002FA7"
                    borderColor="#0B2545"
                    glyphColor="#FFFFFF"
                    scale={1.3}
                  />
                </AdvancedMarker>

                {infoOpen && (
                  <InfoWindow
                    position={OFFICE_COORDINATES}
                    onCloseClick={() => setInfoOpen(false)}
                    maxWidth={300}
                  >
                    <div className="p-1 text-[#0B2545]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#DC2626] uppercase tracking-wider mb-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Indoworld Tourism Services</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1A1A1A] leading-snug mb-1">
                        {BUSINESS_INFO.address.line1}
                      </p>
                      <p className="text-[11px] text-gray-600 mb-2">
                        {BUSINESS_INFO.address.locality}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} - {BUSINESS_INFO.address.pincode}
                      </p>
                      <div className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600" />
                        <span>{BUSINESS_INFO.workingHours.summary}</span>
                      </div>
                      <a
                        href={googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-[#002FA7] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider hover:bg-[#0B2545]"
                      >
                        <Navigation className="w-2.5 h-2.5" />
                        Navigate Here
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </div>
          </APIProvider>
        ) : (
          /* High-Fidelity Interactive Map Preview with Direct Google Maps Integration */
          <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
            {/* Architectural Cartographic Blueprint Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#002FA7_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B2545]/5 via-transparent to-[#0B2545]/15 pointer-events-none" />

            {/* Top Navigation Strip */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="bg-white/95 backdrop-blur-sm border border-[#0B2545]/20 px-3 py-1.5 shadow-sm text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#DC2626] font-bold block">
                  NCR Headquarters
                </span>
                <span className="text-xs font-bold text-[#0B2545]">
                  Ansal Plaza, Sector 1, Vaishali
                </span>
              </div>
              <div className="bg-white/95 backdrop-blur-sm border border-[#0B2545]/20 px-2.5 py-1 text-[10px] font-semibold text-[#0B2545] shadow-sm flex items-center gap-1">
                <Compass className="w-3 h-3 text-[#002FA7]" />
                <span>28.6475° N, 77.3414° E</span>
              </div>
            </div>

            {/* Central Pin & Location Card */}
            <div className="my-auto z-10 flex flex-col items-center text-center max-w-md w-full px-2">
              <div className="relative mb-3 group cursor-pointer" onClick={() => window.open(googleMapsDirectionsUrl, '_blank')}>
                <div className="absolute -inset-2 rounded-full bg-[#002FA7]/20 animate-ping opacity-75" />
                <div className="relative w-12 h-12 rounded-full bg-[#002FA7] text-white flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="bg-white border-2 border-[#0B2545] p-4 sm:p-5 shadow-xl w-full text-left">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DC2626]">
                      {BUSINESS_INFO.established} Incorporated • Upper Ground Floor
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#0B2545]">
                      {BUSINESS_INFO.name}
                    </h4>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 border border-emerald-300">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Office
                  </span>
                </div>

                <p className="text-xs text-[#1A1A1A] leading-relaxed mb-3">
                  <strong className="text-[#0B2545]">UG SR-5B</strong>, Ansal Plaza, Sector 1, Vaishali, Ghaziabad, Uttar Pradesh 201010
                  <span className="block text-[11px] text-gray-500 mt-0.5">
                    (Direct access via Gate 1 & Central Upper Ground concourse)
                  </span>
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] border-t border-gray-200 pt-2.5 mb-3.5">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                      Metro Connectivity
                    </span>
                    <span className="font-bold text-[#0B2545]">
                      5 Mins from Vaishali Metro
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-semibold">
                      Desk Assistance
                    </span>
                    <span className="font-bold text-[#DC2626]">
                      {BUSINESS_INFO.displayPhone}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#002FA7] hover:bg-[#0B2545] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 text-center flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#FAF9F6]" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="sm:w-auto bg-[#FAF9F6] hover:bg-gray-100 text-[#0B2545] border border-[#0B2545]/40 text-xs font-bold uppercase tracking-wider py-2.5 px-3 text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Call Office</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Landmarks Pill Strip */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 z-10 text-[10px] text-[#0B2545]/90">
              <span className="bg-white/90 backdrop-blur-sm border border-[#0B2545]/20 px-2 py-0.5">
                📍 Blue Line Metro: Vaishali Station (1.2 km)
              </span>
              <span className="bg-white/90 backdrop-blur-sm border border-[#0B2545]/20 px-2 py-0.5">
                📍 Anand Vihar ISBT (4.5 km)
              </span>
              <span className="bg-white/90 backdrop-blur-sm border border-[#0B2545]/20 px-2 py-0.5">
                📍 Mahagun Metro Mall (2.1 km)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Transit & Landmark Reference Footnote */}
      <div className="bg-[#FAF9F6] p-3 sm:p-4 border-t border-[#0B2545]/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#0B2545]">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-[#002FA7]/10 text-[#002FA7] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            1
          </div>
          <div>
            <span className="font-bold block text-[#1A1A1A]">Blue Line Metro</span>
            <span className="text-[11px] text-gray-600">Alight at Vaishali Metro Station; e-rickshaw or 12-min walk directly to Ansal Plaza.</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            2
          </div>
          <div>
            <span className="font-bold block text-[#1A1A1A]">Private Vehicle Parking</span>
            <span className="text-[11px] text-gray-600">Spacious secure basement & surface visitor parking inside the Ansal Plaza complex.</span>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded-full bg-[#002FA7]/10 text-[#002FA7] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
            3
          </div>
          <div>
            <span className="font-bold block text-[#1A1A1A]">Upper Ground Floor</span>
            <span className="text-[11px] text-gray-600">Locate Suite UG SR-5B on Upper Ground; signage visible from main escalator corridor.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
