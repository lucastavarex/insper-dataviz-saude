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
      text: (
        <>
          A desigualdade socioeconômica no município de São Paulo pode ser visualizada de forma clara por meio do Índice GeoSES, que resume as condições socioeconômicas da cidade. O mapa a seguir, com dados de 2010, revela como fatores como renda, educação e infraestrutura urbana estão distribuídos de maneira desigual entre diferentes regiões da cidade. As áreas em azul indicam regiões com melhores condições socioeconômicas, enquanto as áreas em vermelho representam regiões com maior vulnerabilidade.
        </>
      ),
    },
    {
      longitude: -43.1729,
      latitude: -22.9068,
      zoom: 12,
      pitch: 45,
      bearing: 90,
      text: (
        <>
          Notamos que a desigualdade aumenta progressivamente à medida que nos afastamos do centro da cidade. Tenha este mapa em mente, pois ele será fundamental para compreender a relação com os demais mapas apresentados a seguir.
        </>
      ),
    },
    {
      longitude: -47.9292,
      latitude: -15.7801,
      zoom: 11,
      pitch: 30,
      bearing: -45,
      text: (
        <>
          A seguir, contaremos a história de <strong>Maria</strong>, que mora no Jardim Helena, um bairro periférico da Zona Leste de São Paulo. Este é um caso hipotético, mas pode ser muito comum na realidade brasileira.
        </>
      ),
    },
    {
      longitude: -49.2643,
      latitude: -25.4284,
      zoom: 13,
      pitch: 60,
      bearing: 180,
      text: (
        <>
          O dia começa cedo: às <strong>4h da manhã</strong>, Maria já está de pé para preparar o café das crianças e tomar um banho rápido antes de sair. Como o tempo é curto, a primeira refeição do dia não é feita como deveria. Os alimentos ultraprocessados, como achocolatados e biscoitos recheados dão lugar às frutas, aos ovos e ao suco caseiro.
          <br /><br />
          Maria tem <strong>Diabetes Mellitus</strong> e precisa medir sua glicose diariamente, mas sua rotina é tão corrida que nem sempre ela consegue fazer isso como deveria.
        </>
      ),
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
          mapStyle="mapbox://styles/mapbox/light-v10"
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
            className="absolute bg-[#FFFFFF]/90 h-auto w-[80vw] md:w-[460px] border border-[#000000]/20 px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    rounded-xl shadow-lg
    "
            style={{ top: `${index * 120}vh` }}
          >
            <div className="text-[#000000]">
              {location.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
