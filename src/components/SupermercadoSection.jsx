import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import supermercado from "../assets/supermercado.png";
import supermercadoTwo from "../assets/supermercadoTwo.png";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function SupermercadoSection() {
  const containerRef = useRef();
  const [currentImage, setCurrentImage] = useState(0); // 0 for first image, 1 for second image

  // ScrollTrigger for background fade effect
  useGSAP(() => {
    const firstCardElement = containerRef.current?.querySelector(
      `[data-card-index="0"]`
    );
    const secondCardElement = containerRef.current?.querySelector(
      `[data-card-index="1"]`
    );

    if (firstCardElement) {
      ScrollTrigger.create({
        trigger: firstCardElement,
        start: "bottom center",
        onEnter: () => {
          // Keep first image when entering first card
          setCurrentImage(0);
        },
        onLeaveBack: () => {
          // Keep first image when going back to first card
          setCurrentImage(0);
        },
      });
    }

    if (secondCardElement) {
      ScrollTrigger.create({
        trigger: secondCardElement,
        start: "top center",
        onEnter: () => {
          // Switch to second image when entering second card
          setCurrentImage(1);
        },
        onLeaveBack: () => {
          // Switch back to first image when leaving second card
          setCurrentImage(0);
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      <div style={{ position: "sticky", top: 0 }} className="h-screen w-full">
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative">
          {/* First image - supermercado */}
          <img
            src={supermercado}
            alt="Supermercado illustration"
            className={`max-w-auto xl:max-w-[600px] object-contain absolute z-10 transition-opacity duration-1000 ease-in-out ${
              currentImage === 0 ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Second image - supermercadoTwo */}
          <img
            src={supermercadoTwo}
            alt="Supermercado Two illustration"
            className={`max-w-auto xl:max-w-[600px] object-contain absolute z-10 transition-opacity duration-1000 ease-in-out ${
              currentImage === 1 ? "opacity-100" : "opacity-0"
            }`}
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
            }}
          >
            <div className="text-[#000000]">{card.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
