import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import houseBackground from "../assets/houseBackground.png";
import houseOne from "../assets/houseOne.png";
import {
  default as houseBackground2,
  default as panoramicImage,
} from "../assets/panoramicImage.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function HouseSection() {
  const containerRef = useRef();
  const panoramicSliderRef = useRef();
  const [showBackground, setShowBackground] = useState(false);
  const [showBackground2, setShowBackground2] = useState(false);
  const [showPanoramicScroll, setShowPanoramicScroll] = useState(false);

  // ScrollTrigger for background fade effect and panoramic scroll
  useGSAP(() => {
    const firstCardElement = containerRef.current?.querySelector(
      `[data-card-index="0"]`
    );
    const secondCardElement = containerRef.current?.querySelector(
      `[data-card-index="1"]`
    );
    const thirdCardElement = containerRef.current?.querySelector(
      `[data-card-index="2"]`
    );

    if (firstCardElement) {
      ScrollTrigger.create({
        trigger: firstCardElement,
        start: "bottom center",
        onEnter: () => {
          setShowBackground(true);
        },
        onLeaveBack: () => {
          setShowBackground(false);
        },
      });
    }

    if (secondCardElement) {
      ScrollTrigger.create({
        trigger: secondCardElement,
        start: "bottom center",
        onEnter: () => {
          setShowBackground2(true);
        },
        onLeaveBack: () => {
          setShowBackground2(false);
        },
      });
    }

    if (thirdCardElement) {
      ScrollTrigger.create({
        trigger: thirdCardElement,
        start: "bottom center",
        onEnter: () => {
          setShowPanoramicScroll(true);
        },
        onLeaveBack: () => {
          setShowPanoramicScroll(false);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Separate useGSAP for panoramic scroll animation
  useGSAP(() => {
    if (showPanoramicScroll && panoramicSliderRef.current) {
      const panoramicImg = panoramicSliderRef.current.querySelector("img");
      const fourthCardElement = containerRef.current?.querySelector(
        `[data-card-index="3"]`
      );

      if (panoramicImg && fourthCardElement) {
        // Wait for image to load and get actual dimensions
        const setupScroll = () => {
          const imgWidth = panoramicImg.offsetWidth;
          const viewportWidth = window.innerWidth;
          const scrollDistance = imgWidth - viewportWidth;

          if (scrollDistance > 0) {
            gsap.to(panoramicImg, {
              scrollTrigger: {
                trigger: fourthCardElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
              },
              x: -scrollDistance,
              ease: "none",
            });
          }
        };

        // If image is already loaded
        if (panoramicImg.complete && panoramicImg.offsetWidth > 0) {
          setupScroll();
        } else {
          // Wait for image to load
          panoramicImg.onload = setupScroll;
          // Fallback timeout in case onload doesn't fire
          setTimeout(setupScroll, 100);
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showPanoramicScroll]);

  // Define the text cards content and positions
  const cards = [
    {
      top: 0,
      text: (
        <>
          Às 5h30, Maria já está no ponto de ônibus. Duas conduções e quase duas
          horas depois, ela chega ao trabalho no centro da cidade.{" "}
          <strong>
            O trajeto diário de Maria ilustra a realidade de milhões de
            brasileiros que vivem nas periferias das grandes cidades.
          </strong>
        </>
      ),
    },
    {
      top: 150,
      text: (
        <>
          Durante o trajeto, Maria aproveita para tomar o café da manhã que não
          conseguiu fazer em casa.{" "}
          <strong>
            Um biscoito recheado e um suco de caixinha substituem uma refeição
            mais nutritiva
          </strong>
          , mas é o que o tempo e o orçamento permitem.
        </>
      ),
    },
    {
      top: 300,
      text: (
        <>
          No trabalho, Maria é auxiliar de limpeza em um hospital público.
          <strong>
            Seu trabalho é essencial, mas a carga horária intensa e o estresse
            do ambiente hospitalar impactam diretamente sua saúde.
          </strong>
        </>
      ),
    },
    {
      top: 450,
      text: (
        <>
          Ao final do dia, Maria retorna para casa às 19h.{" "}
          <strong>
            Entre trabalho, transporte e cuidados domésticos, sobra pouco tempo
            para cuidar da própria saúde
          </strong>
          , perpetuando um ciclo que afeta diretamente o controle de sua
          diabetes.
        </>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="h-[720vh]">
      <div
        style={{ position: "sticky", top: 0 }}
        className="h-screen w-full overflow-hidden"
      >
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden">
          {/* First background image with fade effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${houseBackground})`,
              opacity:
                showBackground && !showBackground2 && !showPanoramicScroll
                  ? 1
                  : 0,
            }}
          />

          {/* Second background image with fade effect */}
          <div
            className="absolute inset-0 bg-cover transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${houseBackground2})`,
              opacity: showBackground2 && !showPanoramicScroll ? 1 : 0,
            }}
          />

          {/* Panoramic horizontal scroll container */}
          <div
            ref={panoramicSliderRef}
            className="absolute inset-0 bg-cover overflow-hidden transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: showPanoramicScroll ? 1 : 0,
            }}
          >
            <img
              src={panoramicImage}
              alt="Panoramic view"
              className="h-full w-auto"
              style={{
                minWidth: "300vw",
                height: "100vh",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Main house image - fades out when background appears */}
          <img
            src={houseOne}
            alt="House illustration"
            className="max-w-full max-h-full object-contain relative z-10 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: showBackground ? 0 : 1,
            }}
          />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {cards.map((card, index) => (
          <div
            key={index}
            data-card-index={index}
            className="absolute bg-[#FFFFFF]/90 h-auto w-[80vw] md:w-[460px] border border-[#000000]/20 px-[30px]
    py-[25px]
    lg:px-[32px]
    lg:py-[25px]
    rounded-xl shadow-lg
    "
            style={{
              top: `${card.top}vh`,
              opacity: index === 0 || index === 1 || index === 2 ? 0 : 1,
            }}
          >
            <div className="text-[#000000]">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
