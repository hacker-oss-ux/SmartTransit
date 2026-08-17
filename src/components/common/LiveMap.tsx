import React, { useEffect, useRef } from 'react';
import { useTransit } from '../../context/TransitContext';
import { routeCoordinates } from '../../data/mockData';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
  Navigation,
  Maximize2,
  AlertCircle,
} from 'lucide-react';

interface LiveMapProps {
  heightClass?: string;
  showControls?: boolean;
  interactive?: boolean;
}

export const LiveMap: React.FC<LiveMapProps> = ({
  heightClass = 'h-96 sm:h-[480px]',
  showControls = true,
  interactive = true,
}) => {
  const { bus, stops } = useTransit();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const busMarkerRef = useRef<L.Marker | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = bus.currentLocation.lat;
      const initialLng = bus.currentLocation.lng;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 14,
        zoomControl: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: false,
        doubleClickZoom: interactive,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      if (interactive && showControls) {
        L.control.zoom({ position: 'bottomright' }).addTo(map);
      }

      const polyline = L.polyline(routeCoordinates, {
        color: '#1A73E8',
        weight: 5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);
      routePolylineRef.current = polyline;

      L.circle([9.7025, 76.6740], {
        radius: 260,
        color: '#0F9D58',
        fillColor: '#0F9D58',
        fillOpacity: 0.15,
        weight: 1.5,
        dashArray: '4, 6',
      }).addTo(map).bindPopup('<b>St. Thomas College Safe Zone</b><br>Campus Gate & Drop Point');

      stops.forEach((stop, idx) => {
        const isDestination = stop.isDestination;
        const stopHtml = `
          <div style="display:flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; background:${isDestination ? '#0F9D58' : stop.isPassed ? '#1E293B' : '#1A73E8'}; color:white; font-size:10px; font-weight:800; border:2px solid white; box-shadow:0 3px 6px rgba(0,0,0,0.25);">
            ${idx + 1}
          </div>
        `;

        const stopIcon = L.divIcon({
          html: stopHtml,
          className: 'custom-stop-icon',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        L.marker([stop.lat, stop.lng], { icon: stopIcon })
          .addTo(map)
          .bindPopup(`
            <div style="padding: 6px; font-family: sans-serif;">
              <span style="font-size: 10px; font-weight: bold; color: #1A73E8;">STOP #${idx + 1}</span>
              <h4 style="font-size: 12px; font-weight: bold; margin: 2px 0;">${stop.name}</h4>
              <p style="font-size: 11px; color: #64748B; margin: 0;">Scheduled: ${stop.scheduledTime}</p>
              <p style="font-size: 10px; color: ${stop.isPassed ? '#0F9D58' : '#F59E0B'}; font-weight: 600; margin-top: 2px;">
                ${stop.isPassed ? '✓ Reached' : stop.isCurrent ? '● Current Stop' : '○ Upcoming'}
              </p>
            </div>
          `);
      });

      const busHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-12 h-12 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-10 h-10 rounded-2xl bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white relative z-10 bus-pulse-ring">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 6v6"></path><path d="M15 6v6"></path><path d="M2 12h19.6"></path><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C18.1 6.8 17.2 6 16.2 6H7.8c-1 0-1.9.8-2.2 1.8L4.2 12.8c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>
            </svg>
          </div>
          <div style="position:absolute; top:-24px; left:50%; transform:translateX(-50%); background:#0F172A; color:white; font-size:9px; font-weight:800; padding:2px 6px; border-radius:9999px; white-space:nowrap; border:1px solid rgba(255,255,255,0.3); box-shadow:0 2px 4px rgba(0,0,0,0.2);">
            ST-102 • ${bus.speedKmH} km/h
          </div>
        </div>
      `;

      const busIcon = L.divIcon({
        html: busHtml,
        className: 'bus-marker-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const busMarker = L.marker([initialLat, initialLng], { icon: busIcon }).addTo(map);
      busMarkerRef.current = busMarker;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (busMarkerRef.current && mapInstanceRef.current) {
      const lat = bus.currentLocation.lat;
      const lng = bus.currentLocation.lng;

      busMarkerRef.current.setLatLng([lat, lng]);

      const updatedBusHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-12 h-12 rounded-full bg-blue-500/25 animate-ping"></div>
          <div class="w-10 h-10 rounded-2xl bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white relative z-10 bus-pulse-ring">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 6v6"></path><path d="M15 6v6"></path><path d="M2 12h19.6"></path><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C18.1 6.8 17.2 6 16.2 6H7.8c-1 0-1.9.8-2.2 1.8L4.2 12.8c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>
            </svg>
          </div>
          <div style="position:absolute; top:-24px; left:50%; transform:translateX(-50%); background:#0F172A; color:white; font-size:9px; font-weight:800; padding:2px 6px; border-radius:9999px; white-space:nowrap; border:1px solid rgba(255,255,255,0.3); box-shadow:0 2px 4px rgba(0,0,0,0.2);">
            ST-102 • ${bus.speedKmH} km/h
          </div>
        </div>
      `;
      const updatedIcon = L.divIcon({
        html: updatedBusHtml,
        className: 'bus-marker-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      busMarkerRef.current.setIcon(updatedIcon);

      mapInstanceRef.current.panTo([lat, lng], { animate: true, duration: 1.2 });
    }
  }, [bus.currentLocation, bus.speedKmH]);

  const handleCenterOnBus = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([bus.currentLocation.lat, bus.currentLocation.lng], 15, {
        duration: 1.0,
      });
    }
  };

  const handleFitRoute = () => {
    if (mapInstanceRef.current && routePolylineRef.current) {
      mapInstanceRef.current.fitBounds(routePolylineRef.current.getBounds(), {
        padding: [40, 40],
      });
    }
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100`}>
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {bus.gpsStatus !== 'CONNECTED' && (
        <div className="absolute top-3 left-3 right-3 sm:right-auto z-20 bg-amber-500/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Connection lost. Showing last known bus location.</span>
        </div>
      )}

      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md text-xs flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-800">Bus ST-102</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-mono">{bus.speedKmH} km/h</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold text-blue-700">ETA {bus.etaMinutes}m</span>
        </div>
      </div>

      {showControls && (
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={handleCenterOnBus}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md text-xs font-bold transition hover:scale-102"
            title="Center View on Bus"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            <span>Recenter Bus</span>
          </button>

          <button
            onClick={handleFitRoute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md text-xs font-bold transition hover:scale-102"
            title="View Full Route"
          >
            <Maximize2 className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Full Route</span>
          </button>
        </div>
      )}
    </div>
  );
};
