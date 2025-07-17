import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import Map from "react-map-gl/mapbox";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollyCards() {
  const mapRef = useRef();
  const containerRef = useRef();

  // Map state
  const [viewState, setViewState] = useState({
    longitude: -46.6333,
    latitude: -23.5505,
    zoom: 10,
    pitch: 0,
    bearing: 0,
  });

  // Define your travel locations
  const locations = [
    {
      longitude: -46.6333,
      latitude: -23.5505,
      zoom: 10,
      pitch: 0,
      bearing: 0,
      title: "São Paulo",
    },
    {
      longitude: -43.1729,
      latitude: -22.9068,
      zoom: 12,
      pitch: 45,
      bearing: 90,
      title: "Rio de Janeiro",
    },
    {
      longitude: -47.9292,
      latitude: -15.7801,
      zoom: 11,
      pitch: 30,
      bearing: -45,
      title: "Brasília",
    },
    {
      longitude: -49.2643,
      latitude: -25.4284,
      zoom: 13,
      pitch: 60,
      bearing: 180,
      title: "Curitiba",
    },
  ];

  // Animate map transitions on scroll
  useGSAP(() => {
    locations.forEach((location, index) => {
      const cardElement = containerRef.current?.querySelector(
        `[data-card-index="${index}"]`
      );

      if (cardElement) {
        ScrollTrigger.create({
          trigger: cardElement,
          start: "center center",
          end: "center center",
          onEnter: () => {
            if (mapRef.current) {
              mapRef.current.getMap().flyTo({
                center: [location.longitude, location.latitude],
                zoom: location.zoom,
                pitch: location.pitch,
                bearing: location.bearing,
                duration: 2000,
                essential: true,
              });
            }
          },
          onEnterBack: () => {
            if (mapRef.current) {
              mapRef.current.getMap().flyTo({
                center: [location.longitude, location.latitude],
                zoom: location.zoom,
                pitch: location.pitch,
                bearing: location.bearing,
                duration: 2000,
                essential: true,
              });
            }
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "600vh",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ position: "sticky", top: 0 }} className="h-screen w-full">
        <Map
          ref={mapRef}
          initialViewState={viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          interactiveLayerIds={[]}
          dragPan={false}
          dragRotate={false}
          scrollZoom={false}
          touchZoom={false}
          touchRotate={false}
          keyboard={false}
          doubleClickZoom={false}
        ></Map>
      </div>

      <div className="relative flex flex-col items-center">
        {locations.map((location, index) => (
          <div
            key={index}
            data-card-index={index}
            className="absolute bg-white h-auto w-[80vw] md:w-[460px]  px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    rounded-lg shadow-lg
    "
            style={{ top: `${index * 120}vh` }}
          >
            <h1 className="text-2xl font-bold text-gray-800">
              {location.title}
            </h1>
            <p className="text-gray-600 mt-2">
              Exploring the beauty of {location.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
