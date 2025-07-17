import coverImage from '../assets/cover.png'
import insperLogo from '../assets/insper-logo.png'

export default function Cover() {
  return (
    <div 
      className="h-screen bg-cover flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${coverImage})`,
        overflow: 'hidden !important'
      }}
    >
      {/* Insper logo/text at the top */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
        <img src={insperLogo} alt="Insper Logo" className="h-9" />
      </div>

      {/* Main content centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 text-center max-w-[1000px]">
        <h2 className="text-white text-2xl md:text-2xl lg:text-2xl font-bold max-w-4xl mb-6">
          Retrato das Desigualdades em Saúde: Riscos de Mortalidade e Determinantes Socioeconômicos no Município de São Paulo
        </h2>
        
        <p className="text-white text-lg md:text-lg font-normal max-w-[620px] leading-relaxed">
          Estudo desenvolvido por Paulo H. Nascimento Saldiva, Ligia Vizeu Barrozo, 
          Catia Martinez Minto, Sara Lopes de Moraes e Paulo Afonso de André.
        </p>
      </div>
    </div>
  )
}